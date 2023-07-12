//https://firebase.google.com/docs/database/web/start
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://endorsements-b4a86-default-rtdb.firebaseio.com/",
};
console.log(appSettings);

const app = initializeApp(appSettings);
const database = getDatabase(app);
const db = ref(database, "endorsements");
const toDb = ref(database, "endorsements/to");
const commentDb = ref(database, "endorsements/comments");
const fromDb = ref(database, "endorsements/from");

const textFieldEl = document.getElementById("endorsementInput");
const publishBtnEl = document.getElementById("publishBtn");
const endorsementsListEl = document.getElementById("endorsements-list");
const toEl = document.getElementById("to-input");
const fromEl = document.getElementById("from-input");

//add to list and database
publishBtnEl.addEventListener("click", function () {
  let endorsementValue = textFieldEl.value;
  let toInputValue = toEl.value;
  let fromInputValue = fromEl.value;
  console.log(endorsementValue);
  //to push the user infor into db
  push(toDb, toInputValue);
  push(commentDb, endorsementValue);
  push(fromDb, fromInputValue);
  //clear the values
  clearValue(textFieldEl);
  clearValue(toEl);
  clearValue(fromEl);
});
// using the db to append the site and refreshing the endorsement list.
onValue(db, function (snapshot) {
  if (snapshot.exists()) {
    let arr = Object.values(snapshot.val());
    console.log(arr);
    clearElement(endorsementsListEl);
    loopAppend(arr);
  } else {
    endorsementsListEl.innerHTML = `<p class="itemBox">No endorsements here... yet</p>`;
  }
});

function loopAppend(items) {
  console.log(items);
  let item = Object.values(items);
  let to = Object.values(Object.values(item)[2]);
  let comment = Object.values(Object.values(item)[0]);
  let from = Object.values(Object.values(item)[1]);
  console.log(to.length);
  console.log(comment);
  let loopToArr = [];
  let loopCommentArr = [];
  let loopFromArr = [];
  for (let i = 0; i < to.length; i++) {
    console.log(comment[i]);
    console.log(to[i]);
    console.log(from[i]);
    //from array
    loopFromArr.push(from[i]);
    //comment array
    loopCommentArr.push(comment[i]);
    //to array
    loopToArr.push(to[i]);

    appendItem(loopToArr, loopCommentArr, loopFromArr, endorsementsListEl);
  }
}

function clearElement(element) {
  element.innerHTML = "";
}

function clearValue(element) {
  element.value = "";
}

function appendItem(itemOne, itemTwo, itemThree, element) {
  console.log(itemOne);
  let section = document.createElement("section");
  for (let i = 0; i < itemOne.length; i++) {
    section.classList.add("itemBox");
    section.innerHTML = `<p class="bold noBottom">To: ${itemOne[i]}</p>
    <p class="noBottom">${itemTwo[i]}</p>
    <p class="bold last">From: ${itemThree[i]}</p>`;
    element.appendChild(section);
  }
}

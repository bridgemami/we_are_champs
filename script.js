//https://firebase.google.com/docs/database/web/start
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://endorsements-9b6d2-default-rtdb.firebaseio.com//",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsDb = ref(database, "endorsements");

const textFieldEl = document.getElementById("endorsement-input");
const publishBtnEl = document.getElementById("publishBtn");
const endorsementsListEl = document.getElementById("endorsements-list");
const toEl = document.getElementById("to-input");
const fromEl = document.getElementById("from-input");
const unfinishedEl = document.getElementById("unfinished");

//add to list and database
publishBtnEl.addEventListener("click", function () {
  let endorsementInputValue = textFieldEl.value;
  let toInputValue = toEl.value;
  let fromInputValue = fromEl.value;

  if(endorsementInputValue ==="" || toInputValue ==="" || fromInputValue === ""){
    unfinishedEl.classList.remove("hide");
    unfinishedEl.classList.add("itemBox");
  }
  else{
  unfinishedEl.classList.remove("itemBox");
    unfinishedEl.classList.add("hide");

  push(endorsementsDb,{ "to":toInputValue, "comment":endorsementInputValue, "from":fromInputValue});

  clearValue(textFieldEl);
  clearValue(toEl);
  clearValue(fromEl);
  }
});
// using the db to append the site and refreshing the endorsement list.
onValue(endorsementsDb, function (snapshot) {
  if (snapshot.exists()) {
    let arr = Object.values(snapshot.val());
    clearElement(endorsementsListEl);
    loopAppend(arr);
  } else {
    endorsementsListEl.innerHTML = `<p class="itemBox">No endorsements here... yet</p>`;
  }
});

function loopAppend(items) {

 for(let i = (items.length - 1 ); i >= 0; i--) {
    let completedEndorsement = Object.values(items[i]); 
    console.log(completedEndorsement); 
     appendItem(completedEndorsement, endorsementsListEl);
   }
  }


function clearElement(element) {
  element.innerHTML = "";
}

function clearValue(element) {
  element.value = "";
}

function appendItem(endorsementItems, element) {
  // console.log(to);
  let section = document.createElement("section");

  for (let i = (endorsementItems.length - 1 ); i >= 0; i--) {
    section.classList.add("itemBox");
    section.innerHTML = `<p class="bold noBottom">To: ${endorsementItems[2]}</p>
    <p class="noBottom">${endorsementItems[0]}</p>
    <p class="bold last">From: ${endorsementItems[1]}</p>`;
    element.appendChild(section);
  }
}

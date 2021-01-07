// const { json } = require("express");
// const indexedDB =
//       window.indexedDB || 
//       window.mozIndexedDB || 
//       window.webkitIndexedDB || 
//       window.msIndexedDB;

let db;
const request = indexedDB.open("accounts", 1);

request.onupgradeneeded = function(event) {
    event.target.result;
    createObjectStore("pending", { autoIncrement: true });
  };

request.onerror = function(err) {
    console.log((err),"There was an error");
  };

request.onsuccess = function(e) {
    db = request.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

function saveRecord (record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
};

function checkDatabase() {
    const transaction = db.transaction(["pending"], "readonly");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();


getAll.onsuccess = () => {
    if (getAll.results.length > 0) {
        fetch("/api/transactioin/bulk", {
            method: "POST",
            body: JSON.stringify(getAll.results),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
    })
        .then((response) => response.json())
        .then(() =>{
            const transaction = db.transaction(["pending"], "readwrite");
            const store = transaction.objectStore("pending");
            store.clear();

        })
};
}}
function deletePending() {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.clear();
}

window.addEventListener("online", checkDatabase);
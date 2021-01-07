let db;
const request = window.indexedDB.open(databaseName, 1);

request.onupgradeneeded = function(event) {
    event.target.reselt.createObjectStore("pending", { keyPath: "_id", autoIncrement: true });
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


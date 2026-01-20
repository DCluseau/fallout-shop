// Functions
function toggleCategory(category){
    document.getElementById(category).classList.toggle("bg-warning");
    document.getElementById(category).classList.toggle("text-dark");
    document.getElementById(category).classList.toggle("text-warning");
}
function toggleItems(category){
    document.getElementById(category).classList.toggle("bg-warning");
    document.getElementById(category).classList.toggle("text-dark");
    document.getElementById(category).classList.toggle("text-warning");
}

// JSON management
var dbFile = localStorage.getItem("json_db.json");
var db = JSON.parse(dbFile);
console.log(db);

// Events
document.getElementById("category1").addEventListener("click", toggleCategory("category1"));


// JSON management model

// Storing data:
// const myObj = {name: "John", age: 31, city: "New York"};
// const myJSON = JSON.stringify(myObj);
// localStorage.setItem("testJSON", myJSON);

// Retrieving data:
// let text = localStorage.getItem("testJSON");
// let obj = JSON.parse(text);
// document.getElementById("demo").innerHTML = obj.name; 

// const myJSON = '{"name":"John", "age":30, "car":null}';
// const myObj = JSON.parse(myJSON);
// document.getElementById("demo").innerHTML = myObj.name;
// const answer = require("../index.js")
// import {answer} from "index.js"
const answers = ["Kapili Hostel", "Lecture Hall", "Lake Serpentine", "Cricket Field"];
var level = document.getElementById("level").innerHTML;
var ans;
function changeHandler() {
    ans = document.getElementById("inputanswer").value;
}
document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(ans, level)
    if (ans.toLowerCase() === answers[parseInt(level)].toLowerCase())
       { console.log(true)
        switch (parseInt(level)) {
            case 0:
                window.location.replace("http://localhost:8080/mastermind") 
                break;
            case 1:
                window.location.replace("http://localhost:8080/sixteen")
                break;
            case 2:
                window.location.replace("http://localhost:8080/crossword")
                break;
            case 3:
                window.location.replace("http://localhost:8080/mysteryroom")
                break;
            default:
                break;
        }}
    else
        alert("Wrong answer,please try again !!")
})
// const answer = require("../index.js")
// import {answer} from "index.js"
const answers = ["answer1", "answer2", "answer3", "answer4"];
var level = document.getElementById("level").innerHTML;
var ans;
function changeHandler() {
    ans = document.getElementById("inputanswer").value;
}
document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(ans)
    if (ans === answers[level])
        switch (level) {
            case 0:
                window.location.href = "http://localhost:8080/mastermind" 
                break;
            case 1:
                windown.location.href = "http://localhost:8080/sixteen"
            case 2:
                window.location.href = "http://localhost:8080/crossword"
            case 3:
                window.location.href = "http://localhost:8080/mysteryroom"
            default:
                break;
        }
    else
        alert("Wrong answer,please try again !!")
})
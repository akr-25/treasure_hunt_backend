// const answer = require("../index.js")
// import {answer} from "index.js"
const answers = ["answer1", "answer2", "answer3", "answer4"]
var ans = document.getElementById("inputanswer");
var ans2;
var level = document.getElementById("level").innerHTML;

function changeHandler() {
    var ans2 = document.getElementById("inputanswer").value;
}
document.getElementById("submitButton").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(ans, ans2)
    if(ans === answers[level])
    console.log("pass")
    else 
    console.log("fail")
})
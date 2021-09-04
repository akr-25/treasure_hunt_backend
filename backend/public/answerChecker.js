// const answer = require("../index.js")
// import {answer} from "index.js"
const answers = ["answer1", "answer2", "answer3", "answer4"]
var ans = document.getElementById("inputanswer").value;
var level = document.getElementById("level").innerHTML;
document.getElementById("submitButton").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(level, answers[level], "now", ans)
    if(ans === answers[level])
    console.log("pass")
    else 
    console.log("fail")
})
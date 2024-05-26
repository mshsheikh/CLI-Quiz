#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apilink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
async function fetchData(data) {
    let fetchQuiz = await fetch(data);
    let quiz = await fetchQuiz.json();
    return quiz.results;
}
let data = await fetchData(apilink);
async function startQuiz() {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "fName",
        message: "What is your name?",
    });
    for (let i = 1; i < 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answer.map((val) => val),
        });
        if (ans.quiz === data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Correct"));
        }
        else {
            console.log(chalk.bold.italic.red(data[i].correct_answer));
        }
    }
    console.log(`Dear ${chalk.bold.green(name.fName)}! Your score is ${chalk.bold.green(score)} out of ${chalk.bold.green("5")}`);
}
startQuiz();

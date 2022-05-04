// ==UserScript==
// @name         Dream Crusher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ethan Zeronik
// @match        https://www.hoodamath.com/games/mathtimedtests.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hoodamath.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.clear();

    //wait for web load
    setTimeout(() => {
        //start timer
        let startTime = window.performance.now();


        let game = document.getElementById("game").contentWindow.document;

        //get us to the game
        game.getElementById("choice4").click();
        game.getElementById("choice1").click();

        //then iterate
        while (document.getElementById("game").contentWindow.document.getElementById("email").style.visibility == 'hidden') {
            //get our question
            let textQuestion = game.getElementById("question").innerText;
            let operation = textQuestion.split(' ')[1];
            let numberOne = parseInt(textQuestion.split(' ')[0]);
            let numberTwo = parseInt(textQuestion.split(' ')[2]);
            let answer;

            //switch on operation
            switch (operation) {
                case '+':
                    answer = numberOne + numberTwo;
                    break;
                case '-':
                    answer = numberOne - numberTwo;
                    break;
                case '×':
                    answer = numberOne * numberTwo;
                    break;
                case '÷':
                    answer = numberOne / numberTwo;
                    break;
                default:
                    console.log(`unknown question! ${textQuestion}`);
                    break;
            }

            //then we turn our answer into a string & press each button
            answer = answer.toString();
            for (const char of answer) {
                game.getElementById(char).click();
            }

            //press enter
            game.getElementById("enter").click();
        }

        //end timer
        let endTime = window.performance.now();
        console.log(`Test time: ${endTime - startTime} ms`);

        //fill out our name
        game.getElementById('floatingName').children[0].setAttribute('value', 'riggyz505');
    }, 100);
})();
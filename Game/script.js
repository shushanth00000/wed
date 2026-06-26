// Sudoku Master - Part 1

const puzzle = [
5,3,0,0,7,0,0,0,0,
6,0,0,1,9,5,0,0,0,
0,9,8,0,0,0,0,6,0,
8,0,0,0,6,0,0,0,3,
4,0,0,8,0,3,0,0,1,
7,0,0,0,2,0,0,0,6,
0,6,0,0,0,0,2,8,0,
0,0,0,4,1,9,0,0,5,
0,0,0,0,8,0,0,7,9
];

const solution = [
5,3,4,6,7,8,9,1,2,
6,7,2,1,9,5,3,4,8,
1,9,8,3,4,2,5,6,7,
8,5,9,7,6,1,4,2,3,
4,2,6,8,5,3,7,9,1,
7,1,3,9,2,4,8,5,6,
9,6,1,5,3,7,2,8,4,
2,8,7,4,1,9,6,3,5,
3,4,5,2,8,6,1,7,9
];

let mistakes = 0;
let seconds = 0;
let timer;

const board = document.getElementById("board");

function startTimer(){

    clearInterval(timer);

    seconds = 0;

    timer = setInterval(function(){

        seconds++;

        let min = Math.floor(seconds/60);

        let sec = seconds % 60;

        if(min < 10) min = "0"+min;
        if(sec < 10) sec = "0"+sec;

        document.getElementById("time").innerHTML =
        min + ":" + sec;

    },1000);

}

function createBoard(){

    board.innerHTML = "";

    for(let i=0;i<81;i++){

        let cell = document.createElement("input");

        cell.type = "text";
        cell.maxLength = 1;
        cell.addEventListener("input", function(){

    this.value = this.value.replace(/[^1-9]/g,"");

});


        cell.min = 1;
        cell.max = 9;

        cell.classList.add("cell");

        cell.id = "cell"+i;

        if(puzzle[i] != 0){

            cell.value = puzzle[i];

            cell.disabled = true;

            cell.classList.add("fixed");

        }

        board.appendChild(cell);

    }

}

startTimer();

createBoard();

// PART 2
// Check if the player's board matches the solution
function checkBoard(){

    let correct = true;

    for(let i=0;i<81;i++){

        let cell = document.getElementById("cell"+i);

        let value = Number(cell.value);

        if(value !== solution[i]){

            correct = false;

            if(!cell.disabled){

                cell.style.background = "#ffb3b3";

            }

        }else{

            if(!cell.disabled){

                cell.style.background = "#b6ffb6";

            }

        }

    }

    if(correct){

        clearInterval(timer);

        document.getElementById("message").innerHTML =
        "🎉 Congratulations! You solved the Sudoku!";

        document.getElementById("message").style.color = "green";

    }else{

        document.getElementById("message").innerHTML =
        "❌ Some answers are incorrect.";

        document.getElementById("message").style.color = "red";

    }

}


// Give one correct hint
function giveHint(){

    for(let i=0;i<81;i++){

        let cell = document.getElementById("cell"+i);

        if(cell.disabled)
            continue;

        if(cell.value == ""){

            cell.value = solution[i];

            cell.style.background = "#fff59d";

            return;

        }

    }

}


// Reset the puzzle
function resetBoard(){

    for(let i=0;i<81;i++){

        let cell = document.getElementById("cell"+i);

        if(!cell.disabled){

            cell.value = "";

            cell.style.background = "white";

        }

    }

    mistakes = 0;

    document.getElementById("mistakes").innerHTML = mistakes;

    document.getElementById("message").innerHTML = "";

}


// Toggle Dark Mode
function toggleDarkMode(){

    document.body.classList.toggle("dark");

}


// Detect mistakes while typing
for(let i=0;i<81;i++){

    document.addEventListener("input",function(e){

        if(e.target.id !== "cell"+i)
            return;

        let value = Number(e.target.value);

        if(value === 0)
            return;

        if(value !== solution[i]){

    mistakes++;

    document.getElementById("mistakes").innerHTML = mistakes;

    e.target.style.background = "#ff8080";

    if(mistakes >= 3){

        clearInterval(timer);

        document.getElementById("message").innerHTML =
        "💀 Game Over! Click Restart to play again.";

        document.getElementById("message").style.color = "red";

        // Disable every cell
        for(let j=0;j<81;j++){

            document.getElementById("cell"+j).disabled = true;

        }

        return;
    }

}else{

    e.target.style.background = "#b6ffb6";

}

    });

}

// PART 3
// Multiple Sudoku puzzles
const puzzles = [

[
5,3,0,0,7,0,0,0,0,
6,0,0,1,9,5,0,0,0,
0,9,8,0,0,0,0,6,0,
8,0,0,0,6,0,0,0,3,
4,0,0,8,0,3,0,0,1,
7,0,0,0,2,0,0,0,6,
0,6,0,0,0,0,2,8,0,
0,0,0,4,1,9,0,0,5,
0,0,0,0,8,0,0,7,9
],

[
0,0,0,2,6,0,7,0,1,
6,8,0,0,7,0,0,9,0,
1,9,0,0,0,4,5,0,0,
8,2,0,1,0,0,0,4,0,
0,0,4,6,0,2,9,0,0,
0,5,0,0,0,3,0,2,8,
0,0,9,3,0,0,0,7,4,
0,4,0,0,5,0,0,3,6,
7,0,3,0,1,8,0,0,0
]

];

// Matching solutions
const solutions = [

[
5,3,4,6,7,8,9,1,2,
6,7,2,1,9,5,3,4,8,
1,9,8,3,4,2,5,6,7,
8,5,9,7,6,1,4,2,3,
4,2,6,8,5,3,7,9,1,
7,1,3,9,2,4,8,5,6,
9,6,1,5,3,7,2,8,4,
2,8,7,4,1,9,6,3,5,
3,4,5,2,8,6,1,7,9
],

[
4,3,5,2,6,9,7,8,1,
6,8,2,5,7,1,4,9,3,
1,9,7,8,3,4,5,6,2,
8,2,6,1,9,5,3,4,7,
3,7,4,6,8,2,9,1,5,
9,5,1,7,4,3,6,2,8,
5,1,9,3,2,6,8,7,4,
2,4,8,9,5,7,1,3,6,
7,6,3,4,1,8,2,5,9
]

];

// Start a random puzzle
function newGame(){

    const random = Math.floor(Math.random()*puzzles.length);

    for(let i=0;i<81;i++){

        puzzle[i] = puzzles[random][i];
        solution[i] = solutions[random][i];

    }

    mistakes = 0;

    document.getElementById("mistakes").innerHTML = "0";

    document.getElementById("message").innerHTML = "";

    startTimer();

    createBoard();

}
function resetBoard(){

    mistakes = 0;

    document.getElementById("mistakes").innerHTML = "0";

    document.getElementById("message").innerHTML = "";

    clearInterval(timer);

    startTimer();

    createBoard();

}
// Highlight row and column
document.addEventListener("focusin",function(e){

    if(!e.target.classList.contains("cell"))
        return;

    let index = Number(e.target.id.replace("cell",""));

    let row = Math.floor(index/9);

    let col = index%9;

    for(let i=0;i<81;i++){

        let cell=document.getElementById("cell"+i);

        let r=Math.floor(i/9);

        let c=i%9;

        if(r===row || c===col){

            if(!cell.disabled)
                cell.style.background="#d8ecff";

        }

    }

});

document.addEventListener("focusout",function(){

    for(let i=0;i<81;i++){

        let cell=document.getElementById("cell"+i);

        if(!cell.disabled)
            cell.style.background="white";

    }

});
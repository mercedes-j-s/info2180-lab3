"use strict";

var player = "X"
var tracker = [];
var game = true;

window.onload = function()
{
    var board = document.getElementsById("board");
    boardLayout(board);
    var btn = document.querySelector(".btn")
    btn.addEventListener('click',restartGame);
}

function boardLayout(board)
{
    var divLength = board.getElementsByTagName('div').length;

    for (var i = 0; i < divLength; i++)
    {
        board.getElementsByTagName('div')[i].classList.add('square');
        board.getElementsByTagName('div')[i].addEventListener('click',clickSquare);
        board.getElementsByTagName('div')[i].addEventListener('mouseover',MouseOver);
        board.getElementsByTagName('div')[i].addEventListener('mouseout',MouseOut);
        board.getElementsByTagName('div')[i].setAttribute('id',i);
    }
}

function clickSquare(clickEvent)
{
    var clickedSquare = clickEvent.target;

    if(game == true)
    {
        clickedSquare.classList.add(player);
        clickedSquare.textContent = player;

            if(!checkWin())
            {
                if (player == "X")
                {
                   tracker.push(player);
                   player = "O";
                   clickedSquare.classList.remove(player); 
                }
                else
                {
                    tracker.push(player);
                    player = "X";
                    clickedSquare.classList.remove(player);
                }
            }
    }
}

function MouseOver(overEvent)
{
    var overSquare = overEvent.target;
    overSquare.classList.add('hover');
}

function MouseOut(outEvent)
{
    var outSquare = outEvent.target;
    outSquare.classList.remove('hover');
}

//Code for horizontal row
function checkWin()
{
    for (var i=0; i < 3; i++)
    {
        var startplace = i * 3;
        var endplace = startplace+3;
        var presentX = 0;
        var presentO = 0;

        for (startplace; startplace,endplace; startplace++)
        {
            var checkElement = document.getElementById(startplace).textContent;
            if(checkElement == "X")
            {
                presentX+=1;
            }
            if(checkElement == "O")
            {
                presentO+=1;
            }
        }
            if(presentX==3 || presentO==3)
            {
                winMess();
                return true
            }
        
    }
    //End of Code for horizontal row

    //Code for vertical row 
    for(var i = 0; i < 3; i++)
    {
        var startplace = i;
        var presentX = 0;
        var presentO = 0;

        for(var r = 0; r < 3; r++)
        {
            var checkElement = document.getElementById(startplace).textContent;
            if(checkElement == "X")
            {
                presentX+=1;
            }
            else if(checkElement == "O")
            {
                presentO+=1;
            }
            startplace+=3;
        }
        if (presentX==3 || presentO==3)
        {
            winMess();
            return true
        }
    }
    //End of Code for vertical row 

    //Code for diagonal row
    if((document.getElementById(0).textContent=="x") && (document.getElementById(4).textContent=="x") && (document.getElementById(8).textContent=="x") || (document.getElementById(0).textContent=="o") && (document.getElementById(4).textContent=="o") && (document.getElementById(8).textContent=="o"))
    {
        winMess();
        return true;
    }

    if((document.getElementById(2).textContent=="x") && (document.getElementById(4).textContent="x") && (document.getElementById(6).textContent=="x") || (document.getElementById(2).textContent=="o") && (document.getElementById(4).textContent="o") && (document.getElementById(6).textContent=="o"))
    {
        winMess();
        return true;
    }
    //End of Code for vertical row 

    if(tracker.length==8)
    {
        var tieMessage = document.getElementById('status');
        tieMessage.textContent = "There was a tie. Click New Game to play again";
        game = false;
    }
}

function winMess()
{
    var winMess = document.getElementbyId('status');
        winMess.classList.add('you-won');
        winMess.textContent = "Congratulations! "+ player+ " is Winner";
        game = false;
}

function restartGame()
{
    var squareInfo = document.getElementsByClassName("square");
    for (var i=0; i < squareInfo.length; i++)
    {
        squareInfo[i].classList.remove('X');
        squareInfo[i].classList.remove('O');
        squareInfo[i].textContent = "";
    }

    var restartMess = document.getElementById('status');
    restartMess.classList.remove('you-won');
    restartMess.textContent = "Click a square to play an X or O.";

    tracker = [];
    game = true;
}


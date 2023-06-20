console.log('Welcome to JS');
let victory_music = new Audio('./assets/victory_tone.mp3');
let intro = new Audio('./assets/intro_bgm.mp3');
let move = new Audio('./assets/move.mp3');
let turn = "X";

// function to change the turn
const changeTurn = () => {
    if (turn == 'X')
    return '0';
    else
    return 'X';
}
let count = 0;

if (count == 0) {
    intro.play();
}

// Game Logic
let box = document.getElementsByClassName('box');
Array.from(box).forEach(element => {
    element.addEventListener('click', (e) => {
        intro.pause();
        let boxText = element.querySelector('.boxText');
        if (boxText.innerText == '') {
                count++;
                boxText.innerText = turn;
                move.play();
                turn = changeTurn();
                document.getElementById('info').innerHTML = `Turn for ${turn}`;
                element.classList.add('prohibited');

                if (document.getElementById('win').style.display == 'flex') {
                    alert("Game Over!! Press Reset to start again");
                    reset.click();
                }

                checkWin();

                if (count == '9' && document.getElementById('info').innerHTML == 'Turn for 0') {
                    document.getElementById('info').innerHTML = `Draw!! Nobody Wins`;
                    document.getElementById('draw').style.display = 'flex';
                    victory_music.play();
                }
            }
            else {
                alert('Already Marked!! Choose one that is not marked');
            }
        })
});

// function to check win
const checkWin = () => {
    let boxText = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        if ((boxText[e[0]].innerText == boxText[e[1]].innerText) && (boxText[e[2]].innerText == boxText[e[1]].innerText) && (boxText[e[0]].innerText != "")) {
            console.log("won");
            boxText[e[0]].style.textdecoration = 'underline';
            if (turn == 'X') {
                document.getElementById('info').innerText = `0 Won`;
            }
            else {
                document.getElementById('info').innerText = `X Won`;
            }
            document.getElementById('win').style.display = 'flex';
            Array.from(box).forEach(element => {
                element.classList.add('prohibited');
            })
            victory_music.play();
        }
    })
}

let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let boxText = document.getElementsByClassName('boxText');
    Array.from(boxText).forEach(element => {
        element.innerText = "";
        let box = document.getElementsByClassName('box');
        Array.from(box).forEach(element => {
            element.classList.remove('prohibited');
        });
    });
    turn = 'X';
    count = 0;
    document.getElementById('info').innerHTML = `Turn for ${turn}`;
    let win = document.getElementById('win');
    win.style.display = 'none';
    let draw = document.getElementById('draw');
    draw.style.display = 'none';
});
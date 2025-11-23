let boxes;
document.addEventListener('DOMContentLoaded', function() {
    boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector("#reset-game");
    let newgamebtn = document.querySelector("#new-game");
    let msgcontainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let turnO = true;
    const winpatterns = [
        [0,1,2], [0,3,6], [0,4,8],
        [1,4,7], [2,5,8], [2,4,6],
        [3,4,5], [6,7,8],
    ];

    const resetgame = () => {
        turnO = true;
        enableboxes();
        msgcontainer.classList.add("hide");
        
        boxes.forEach(box => {
            box.classList.remove('winning-box', 'draw-box', 'pulse', 'bounce');
            box.style.animation = '';
        });
        document.body.classList.remove('confetti-active');
    }
    
    const disableboxes = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    }
    
    const enableboxes = () => {
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
            box.classList.remove('winning-box', 'draw-box', 'pulse', 'bounce');
            box.style.animation = '';
        }
    }
    
    const showWinner = (winner, winningPattern) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        disableboxes();
        
        animateWinningBoxes(winningPattern);
        createConfetti();
    }

    const showDraw = () => {
        msg.innerText = "Game ended in a Draw!";
        msgcontainer.classList.remove("hide");
        disableboxes();
        
        
        boxes.forEach(box => {
            box.classList.add('draw-box', 'pulse');
        });
    }

    const animateWinningBoxes = (winningPattern) => {
        winningPattern.forEach((index, i) => {
            setTimeout(() => {
                boxes[index].classList.add('winning-box', 'pulse');
                boxes[index].style.animationDelay = `${i * 0.2}s`;
            }, i * 200);
        });
        
        msgcontainer.classList.add('bounce');
    }

    const checkWinner = () => {
        for(let pattern of winpatterns){
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val === pos2val && pos2val === pos3val){
                    console.log("winner", pos1val);
                    showWinner(pos1val, pattern);
                    return true;
                }
            }
        }
        
        let allFilled = true;
        for(let box of boxes) {
            if(box.innerText === "") {
                allFilled = false;
                break;
            }
        }
        if(allFilled) {
            showDraw();
            return true;
        }
        
        return false;
    }

    const createConfetti = () => {
        document.body.classList.add('confetti-active');
        
        for(let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 20);
        }
    }

    const getRandomColor = () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked");
            
            box.classList.add('click-animation');
            setTimeout(() => {
                box.classList.remove('click-animation');
            }, 300);
            
            if(turnO){
                box.innerText = "O";
                box.style.color = "#3498db"; 
                turnO = false;
            } else {
                box.innerText = "X";
                box.style.color = "#e74c3c";
                turnO = true;
            }
            box.disabled = true;
            
            setTimeout(() => {
                checkWinner();
            }, 100);
        });
    });

    if (resetbtn) {
        resetbtn.addEventListener("mouseenter", () => {
            resetbtn.classList.add('button-hover');
        });
        resetbtn.addEventListener("mouseleave", () => {
            resetbtn.classList.remove('button-hover');
        });
        resetbtn.addEventListener("click", resetgame);
    }

    if (newgamebtn) {
        newgamebtn.addEventListener("mouseenter", () => {
            newgamebtn.classList.add('button-hover');
        });
        newgamebtn.addEventListener("mouseleave", () => {
            newgamebtn.classList.remove('button-hover');
        });
        newgamebtn.addEventListener("click", resetgame);
    }
});
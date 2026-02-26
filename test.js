const board = document.getElementById("board");

const colors = ["red","orange","yellow","green","blue","purple"];
let selectedColor = "red";

colors.forEach(color => {
    const b = document.createElement("button");
    b.className = "color";
    b.dataset.color = color;
    b.style.background = color;

    if(color === "red") {
        b.classList.add("selected");
    }

    b.onclick = () => {
        document.querySelectorAll(".color").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        selectedColor = color;
    }

    document.getElementById("palette").appendChild(b);
});

const cellSide = 40;
let m = 0, n = 0;
let dragging = false;
let typingCell = null;
let pieces = [];  

function clearTyping() {
    if(typingCell) {
        typingCell.classList.remove("typing");
        typingCell = null;
    }
}

document.getElementById("create").onclick = () => {
    clearTyping();
    pieces.length = 0;

    m = Number(document.getElementById("m").value);
    n = Number(document.getElementById("n").value);

    board.innerHTML = "";
    board.style.display = "grid";
    board.style.gridTemplateRows = `repeat(${m}, ${cellSide}px)`;
    board.style.gridTemplateColumns = `repeat(${n}, ${cellSide}px)`;

    for(let i = 0; i < m*n; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = Math.floor(i/n);
        cell.dataset.col = i%n;

        board.appendChild(cell);

        cell.addEventListener("mousedown",(e)=>{
            if(e.shiftKey){
                clearTyping();
                typingCell=cell;
                cell.classList.add("typing");
                return;
            }

            if(cell.classList.contains("occupied")) return;
            dragging=true;

            let piece = [cell];
            pieces.push({cells: piece, color: selectedColor});

            drawPieces();
        });

        cell.addEventListener("mouseenter", () => {
            if(!dragging) return;
            const currentPiece = pieces.at(-1);
            if(currentPiece.cells.includes(cell) || cell.classList.contains("occupied")) return;

            currentPiece.cells.push(cell);
            drawPieces();
        });
    }
};

document.addEventListener("mouseup", () => {
    dragging = false;
});

document.addEventListener("click", (e) => {
    if(!e.shiftKey) clearTyping();
});

document.addEventListener("keydown",(e)=>{

    if(!typingCell) return;

    if(e.key==="Backspace"){
        typingCell.textContent="";
        typingCell.dataset.char="";
        return;
    }

    if(e.key.length===1){
        typingCell.textContent=e.key;
        typingCell.dataset.char=e.key;
    }
});

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if(pieces.length === 0) return;
        pieces.pop();
        drawPieces();
    }
});

function cellAt(r, c) {
    const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
    if(!cell) return false;
    return cell.classList.contains("occupied");
}

function drawPieces() {
    document.querySelectorAll(".cell").forEach(c => {
        c.style.backgroundColor = "";
        c.classList.remove("occupied");
        c.style.border = "1px solid gray"; 
    });

    for(let piece of pieces) {
        for(let cell of piece.cells) {
            cell.style.backgroundColor = piece.color;
            cell.classList.add("occupied");

            const row = Number(cell.dataset.row);
            const col = Number(cell.dataset.col);

            const hasUp = piece.cells.some(c => Number(c.dataset.row) === row-1 && Number(c.dataset.col) === col);
            const hasDown = piece.cells.some(c => Number(c.dataset.row) === row+1 && Number(c.dataset.col) === col);
            const hasLeft = piece.cells.some(c => Number(c.dataset.row) === row && Number(c.dataset.col) === col-1);
            const hasRight = piece.cells.some(c => Number(c.dataset.row) === row && Number(c.dataset.col) === col+1);

            cell.style.borderTop = hasUp ? "1px solid gray" : "3px solid black";
            cell.style.borderBottom = hasDown ? "1px solid gray" : "3px solid black";
            cell.style.borderLeft = hasLeft ? "1px solid gray" : "3px solid black";
            cell.style.borderRight = hasRight ? "1px solid gray" : "3px solid black";
        }
    }
}
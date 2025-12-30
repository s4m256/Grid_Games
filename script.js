const board = document.getElementById("board");
const btn = document.getElementById("create");

btn.onclick = () => {
    const m = Number(document.getElementById("m").value);
    const n = Number(document.getElementById("n").value);

    board.innerHTML = "";
    board.style.gridTemplateRows = `repeat(${m}, 50px)`;
    board.style.gridTemplateColumns = `repeat(${n}, 50px)`;

    for(let i = 0; i < m * n; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        board.appendChild(cell);
    }
};
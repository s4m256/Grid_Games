const board = document.getElementById("board");
const btn = document.getElementById("create");

btn.onclick = () => {
    const m = Number(document.getElementById("m").value);
    const n = Number(document.getElementById("n").value);

    board.innerHTML = "";
    board.style.gridTemplateRows = `repeat(${m}, 40px)`;
    board.style.gridTemplateColumns = `repeat(${n}, 40px)`;

    boardState = Array(m).fill(null).map(()=>Array(n).fill(null));

    for(let i = 0; i < m * n; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        board.appendChild(cell);

        cell.onclick = () => {
            const currentColor = cell.dataset.color || "";

            if(currentColor == selectedColor) {
                cell.style.backgroundColor = "";
                cell.dataset.color = "";
                cell.classList.remove("marked");
            } else {
                cell.style.backgroundColor = selectedColor;
                cell.dataset.color = selectedColor;
                cell.classList.add("marked");
            }
        };
    }
};


let selectedColor = "black";

document.querySelectorAll(".color").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".color")
            .forEach(b => b.classList.remove("selected"));
        
        btn.classList.add("selected");
        selectedColor = btn.dataset.color;
    };
});
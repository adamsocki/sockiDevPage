let lineCounter = 0;
const colors = [
  '#e74c3c', // red
  '#3498db', // blue
  '#2ecc71', // green
  '#9b59b6', // purple
  '#f1c40f', // yellow
  '#e67e22', // orange
  '#1abc9c', // turquoise
  '#8e44ad', // dark purple
  '#34495e', // dark blue
  '#95a5a6', // gray
  '#16a085', // dark green
  '#f39c12', // dark yellow
  '#d35400', // dark orange
  '#c0392b', // dark red
  '#7f8c8d', // dark gray
];
let lines = [[]];
let currentLine = 0;

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = 'cell' + i;
        cell.ondrop = drop;
        cell.ondragover = allowDrop;
        grid.appendChild(cell);
    }
}

function createLine() {
    const line = [];
    lines.push(line);
    updateLineControl();
}

function addStation(lineIndex) {
    const station = document.createElement('div');
    station.classList.add('station');
    station.style.borderColor = colors[lineIndex];
    station.innerText = lines[lineIndex].length + 1;
    station.id = 'station' + lineIndex + '_' + lines[lineIndex].length;
    station.draggable = true;
    station.ondragstart = drag;
    lines[lineIndex].push(station);
    document.getElementById('cell' + (lineIndex * 10 + lines[lineIndex].length - 1)).appendChild(station);
}

function removeStation(lineIndex) {
    if (lines[lineIndex].length > 0) {
        const station = lines[lineIndex].pop();
        station.parentElement.removeChild(station);
    }
}

function updateLineControl() {
    const control = document.getElementById('lineControl');
    control.innerHTML = '';
    lines.forEach((line, i) => {
        const lineControl = document.createElement('div');
        lineControl.innerHTML = 'Line ' + (i + 1) + ': <button onclick="addStation(' + i + ')">Add Station</button> <button onclick="removeStation(' + i + ')">Remove Station</button>';
        control.appendChild(lineControl);
    });
    const addLineButton = document.createElement('button');
    addLineButton.innerText = 'Add New Line';
    addLineButton.onclick = createLine;
    control.appendChild(addLineButton);
    updateSummary();
}

function updateSummary() {
    const summary = document.getElementById('summary');
    summary.innerText = 'Number of Lines: ' + lines.length + ', Total Stations: ' + lines.reduce((total, line) => total + line.length, 0);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

createGrid();
createLine();
updateLineControl();
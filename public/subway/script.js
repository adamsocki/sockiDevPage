let lineCounter = 0;
const lineColors = [
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

document.getElementById('addLine').addEventListener('click', addLine);

function updateSummary() {
  document.getElementById('lineCount').textContent = `Number of Lines: ${lineCounter}`;
  const stationCount = document.querySelectorAll('.station').length;
  document.getElementById('stationCount').textContent = `Number of Stations: ${stationCount}`;
}

function addLine() {
  lineCounter++;
  
  const mapContainer = document.querySelector('.map-container');

  const lineControls = document.createElement('div');
  lineControls.classList.add('controls');

  // Add Station Button
  const addStationButton = document.createElement('button');
  addStationButton.textContent = `Add Station to Line ${lineCounter}`;
  addStationButton.addEventListener('click', function() { addStation(this.parentElement.nextElementSibling); });
  lineControls.appendChild(addStationButton);

  // Remove Station Button
  const removeStationButton = document.createElement('button');
  removeStationButton.textContent = `Remove Station from Line ${lineCounter}`;
  removeStationButton.addEventListener('click', function() { removeStation(this.parentElement.nextElementSibling); });
  lineControls.appendChild(removeStationButton);

  mapContainer.appendChild(lineControls);

  const map = document.createElement('div');
  map.classList.add('map');
  map.dataset.line = lineCounter;
  mapContainer.appendChild(map);

  updateSummary()
}

function removeStation(map) {
  if (map.childNodes.length > 0) {
    map.removeChild(map.lastChild);
  }

  updateSummary()
}


function addStation(map) {
  const lineNumber = parseInt(map.dataset.line, 10) - 1;
  const station = document.createElement('div');
  station.classList.add('station');

  const lineColor = lineColors[lineNumber % lineColors.length];
  const line = document.createElement('div');
  line.classList.add('line');
  line.style.backgroundColor = lineColor;
  station.appendChild(line);

  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.borderColor = lineColor;
  station.appendChild(dot);

  map.appendChild(station);

  updateSummary()
}

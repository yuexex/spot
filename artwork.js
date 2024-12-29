let pragmatica;
let params = {
  text: "SPOT",
  fontSize: 32,
  gridSize: 10,
  xGap: 0,
  yGap: 0,
  amplitude: 200,
  showBackground: true,
  guiTheme: "dark",
};

let palette = [
  "#FF4848", // red
  "#FFA52C", // orange
  "#FFFF4C", // yellow
  "#32D046", // green
  "#2CBBFA", // mint
  "#17BCE8", // teal
  "#4CB8E9", // cyan
  "#12A7F2", // blue
  "#8B5CF6", // indigo
  "#C742F5", // purple
  "#F8459C", // pink
  "#AC8366", // brown
];

function preload() {
  pragmatica = loadFont("./Pragmatica-Medium.ttf");
}

p5.initMetrics(16, 300);

function setup() {
  frameRate(10);
  createCanvas(mmpx(200), mmpx(300), {
    guiOpen: true,
    guiPosition: "right",
    loop: true,
    wallpaperColor: "#18181B",
    shadowVisible: false,
  });
  textFont(pragmatica);

  const gui = addGUI("PRIKOL");
  gui.add(params, "text").name("Display Text");
  gui.add(params, "fontSize", 32, 256, 1).name("Font Size");
  gui.add(params, "gridSize", 1, 20, 1).name("Grid Size");
  gui.add(params, "xGap", -500, 500, 1).name("X Gap");
  gui.add(params, "yGap", -500, 500, 1).name("Y Gap");
  gui.add(params, "amplitude", -500, 500, 1).name("amplitude");
  gui.add(params, "showBackground").name("Show Background");
}

function renderText() {
  noStroke();
  fill(255);
  textSize(mmpx(params.fontSize / 8));
  textAlign(CENTER, CENTER);

  push();
  fill(random(palette));
  const bounds = pragmatica.textBounds(
    params.text,
    0,
    0,
    mmpx(params.fontSize / 8)
  );
  rectMode(CENTER);
  rect(0, 0, bounds.w * 1.4, bounds.h * 2.5); // Slightly larger than the text
  fill(255);
  text(params.text, 0, 0);
  pop();
}

function renderTextGrid() {
  const xOffset = width / params.gridSize;
  const yOffset = height / params.gridSize;
  const time = millis() * 0.002; // Use time for continuous oscillation

  const frequency = 2; // Frequency of oscillation
  const amplitude = params.amplitude || 30; // Intensity of oscillation

  const xGap = params.xGap || 10; // Horizontal spacing adjustment
  const yGap = params.yGap || 10; // Vertical spacing adjustment

  for (let i = 0; i < params.gridSize; i++) {
    for (let j = 0; j < params.gridSize; j++) {
      push();

      // Calculate oscillation offset for X-axis with phase shift based on Y-axis
      const oscillation = sin(time + i * frequency + j * 0.5) * amplitude;

      // Apply xGap and yGap to the grid positioning
      translate(i * (xOffset + xGap) + oscillation, j * (yOffset + yGap));

      renderText();
      pop();
    }
  }
}

function draw() {
  if (params.showBackground) {
    background("#ffffff");
  }
  renderTextGrid();
}

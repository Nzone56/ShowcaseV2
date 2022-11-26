const WIDTH = 500, HEIGHT = 500;
const SIZE = WIDTH / 15;

const MOVES = [
  "U", "U'", "U2",
  "D", "D'", "D2",
  "R", "R'", "R2",
  "L", "L'", "L2",
  "F", "F'", "F2",
  "B", "B'", "B2",
];

const COLOR_MAP = {
  1: [255],
  2: [255, 255, 0],
  3: [255, 0, 0],
  4: [255, 128, 0],
  5: [0, 255, 0],
  6: [0, 0, 255],
};

const KEY_MAP = {
  U: () => turnFace(up, 0),
  "U'": () => { turnFace(up, 0); turnFace(up, 0); turnFace(up, 0); },
  U2: () => { turnFace(up, 0); turnFace(up, 0); },
  D: () => turnFace(down, 1),
  "D'": () => { turnFace(down, 1); turnFace(down, 1); turnFace(down, 1); },
  D2: () => { turnFace(down, 1); turnFace(down, 1); },
  R: () => turnFace(right, 2),
  "R'": () => { turnFace(right, 2); turnFace(right, 2); turnFace(right, 2); },
  R2: () => { turnFace(right, 2); turnFace(right, 2); },
  L: () => turnFace(left, 3),
  "L'": () => { turnFace(left, 3); turnFace(left, 3); turnFace(left, 3); },
  L2: () => { turnFace(left, 3); turnFace(left, 3); },
  F: () => turnFace(front, 4),
  "F'": () => { turnFace(front, 4); turnFace(front, 4); turnFace(front, 4); },
  F2: () => { turnFace(front, 4); turnFace(front, 4); },
  B: () => turnFace(back, 5),
  "B'": () => { turnFace(back, 5); turnFace(back, 5); turnFace(back, 5); },
  B2: () => { turnFace(back, 5); turnFace(back, 5); },
};

let up, down, right, left, front, back;
let easycam;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  setAttributes("antialias", true);

  initPos();

  easycam = createEasyCam();
  easycam.rotateY(PI / 4);
  easycam.rotateX(PI / 5);
  easycam.setDistance(500);
  easycam.setDistanceMin(300);
  easycam.setDistanceMax(500);

  createUI();
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  strokeWeight(3);

  translate((-SIZE * 3) / 2, (-SIZE * 3) / 2, (SIZE * 3) / 2);

  paintFace(up, 0, 0, -SIZE * 3, PI / 2, 0, 0);
  paintFace(down, 0, SIZE * 3, 0, -PI / 2, 0, 0);
  paintFace(right, SIZE * 3, 0, 0, 0, PI / 2, 0);
  paintFace(left, 0, 0, -SIZE * 3, 0, -PI / 2, 0);
  paintFace(front, 0, 0, 0, 0, 0, 0);
  paintFace(back, SIZE * 3, 0, -SIZE * 3, 0, PI, 0);

  pos = easycam.getPosition();
  dist = easycam.getDistance();

  error = map(dist, 200, 500, 0.5, 0.4);

  x = Math.round((pos[0] / dist) * 100) / 100;
  y = Math.round((pos[1] / dist) * 100) / 100;
  z = Math.round((pos[2] / dist) * 100) / 100;

  facing_green = z >= 0 + error && z <= 1;
  facing_blue = z >= -1 && z <= 0 - error;
  facing_orange = x >= -1 && x <= 0 - error;
  facing_red = x >= 0 + error && x <= 1;
  facing_white = y >= -1 && y <= 0 - error;
  facing_yellow = y >= 0 + error && y <= 1;

  !facing_green && paintFace(front, 0, 0, SIZE * 4, 0, 0, 0);
  !facing_blue && paintFace(back, SIZE * 3, 0, -SIZE * 7, 0, PI, 0);
  !facing_orange && paintFace(left, -SIZE * 4, 0, -SIZE * 3, 0, -PI / 2, 0);
  !facing_red && paintFace(right, SIZE * 7, 0, 0, 0, PI / 2, 0);
  !facing_white && paintFace(up, 0, -SIZE * 4, -SIZE * 3, PI / 2, 0, 0);
  !facing_yellow && paintFace(down, 0, SIZE * 7, 0, -PI / 2, 0, 0);
}

function paintFace(face, x, y, z, rotX, rotY, rotZ) {
  push();
  translate(x, y, z);
  rotateX(rotX);
  rotateY(rotY);
  rotateZ(rotZ);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      fill(COLOR_MAP[face[i][j]]);
      rect(i * SIZE, j * SIZE, SIZE, SIZE);
    }
  }
  pop();
}

function scramble() {
  let moves = [];
  for (let i = 0; i < 20; i++) {
    let move = MOVES[floor(random(0, MOVES.length))];
    if (KEY_MAP[move]) KEY_MAP[move]();
    moves.push(move);
  }
  print(moves);

  document.getElementById("moves").innerHTML = moves.join(" ");
}

function initPos() {
  up = new Array(3).fill(1).map(() => new Array(3).fill(1));
  down = new Array(3).fill(2).map(() => new Array(3).fill(2));
  right = new Array(3).fill(3).map(() => new Array(3).fill(3));
  left = new Array(3).fill(4).map(() => new Array(3).fill(4));
  front = new Array(3).fill(5).map(() => new Array(3).fill(5));
  back = new Array(3).fill(6).map(() => new Array(3).fill(6));
}

function createUI() {
  createButton("Scramble")
    .mousePressed(scramble)
    .position(width + 20, 20);

  createButton("Reset")
    .mousePressed(initPos)
    .position(width + 20, 60);

  let button_size = 30;
  let spacing = 10;

  createDiv("🔃")
    .position(width + 20, 150)
    .style("font-size", "20px");

  createDiv("🔄️")
    .position(width + 20 + button_size + spacing, 150)
    .style("font-size", "20px");

  createDiv("2️⃣")
    .position(width + 20 + (button_size + spacing) * 2, 150)
    .style("font-size", "20px");


  MOVES.forEach((move, i) => {
    let color = [0, 0, 0];
    if (move.includes("U")) color = COLOR_MAP[1];
    if (move.includes("D")) color = COLOR_MAP[2];
    if (move.includes("R")) color = COLOR_MAP[3];
    if (move.includes("L")) color = COLOR_MAP[4];
    if (move.includes("F")) color = COLOR_MAP[5];
    if (move.includes("B")) color = COLOR_MAP[6];

    createButton(move)
      .mousePressed(KEY_MAP[move])
      .position(
        10 + width + spacing + (i % 3) * (button_size + spacing),
        180 + spacing + floor(i / 3) * (button_size + spacing),
      )
      .size(button_size, button_size)
      .style("background-color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  });

  selectAll("button").forEach((button) => {
    button.style("font-size", "12pt");
    button.style("font-weight", "bold");
    button.style("text-align", "center");
  });

  // text for the scramble moves
  createDiv("")
    // position bottom with white letters
    .position(20, height - 40)
    .style("color", "white")
    .style("font-size", "20px")
    .id("moves");
}


function turnFace(face, n) {
  let temp;
  if (n == 0) {
    temp = front[0][0];
    front[0][0] = right[0][0];
    right[0][0] = back[0][0];
    back[0][0] = left[0][0];
    left[0][0] = temp;
    temp = front[1][0];
    front[1][0] = right[1][0];
    right[1][0] = back[1][0];
    back[1][0] = left[1][0];
    left[1][0] = temp;
    temp = front[2][0];
    front[2][0] = right[2][0];
    right[2][0] = back[2][0];
    back[2][0] = left[2][0];
    left[2][0] = temp;
  }
  if (n == 1) {
    temp = front[0][2];
    front[0][2] = left[0][2];
    left[0][2] = back[0][2];
    back[0][2] = right[0][2];
    right[0][2] = temp;
    temp = front[1][2];
    front[1][2] = left[1][2];
    left[1][2] = back[1][2];
    back[1][2] = right[1][2];
    right[1][2] = temp;
    temp = front[2][2];
    front[2][2] = left[2][2];
    left[2][2] = back[2][2];
    back[2][2] = right[2][2];
    right[2][2] = temp;
  }
  if (n == 2) {
    temp = front[2][0];
    front[2][0] = down[2][0];
    down[2][0] = back[0][2];
    back[0][2] = up[2][0];
    up[2][0] = temp;
    temp = front[2][1];
    front[2][1] = down[2][1];
    down[2][1] = back[0][1];
    back[0][1] = up[2][1];
    up[2][1] = temp;
    temp = front[2][2];
    front[2][2] = down[2][2];
    down[2][2] = back[0][0];
    back[0][0] = up[2][2];
    up[2][2] = temp;
  }
  if (n == 3) {
    temp = back[2][0];
    back[2][0] = down[0][2];
    down[0][2] = front[0][2];
    front[0][2] = up[0][2];
    up[0][2] = temp;
    temp = back[2][1];
    back[2][1] = down[0][1];
    down[0][1] = front[0][1];
    front[0][1] = up[0][1];
    up[0][1] = temp;
    temp = back[2][2];
    back[2][2] = down[0][0];
    down[0][0] = front[0][0];
    front[0][0] = up[0][0];
    up[0][0] = temp;
  }
  if (n == 4) {
    temp = up[0][2];
    up[0][2] = left[2][2];
    left[2][2] = down[2][0];
    down[2][0] = right[0][0];
    right[0][0] = temp;
    temp = up[1][2];
    up[1][2] = left[2][1];
    left[2][1] = down[1][0];
    down[1][0] = right[0][1];
    right[0][1] = temp;
    temp = up[2][2];
    up[2][2] = left[2][0];
    left[2][0] = down[0][0];
    down[0][0] = right[0][2];
    right[0][2] = temp;
  }
  if (n == 5) {
    temp = up[0][0];
    up[0][0] = right[2][0];
    right[2][0] = down[2][2];
    down[2][2] = left[0][2];
    left[0][2] = temp;
    temp = up[1][0];
    up[1][0] = right[2][1];
    right[2][1] = down[1][2];
    down[1][2] = left[0][1];
    left[0][1] = temp;
    temp = up[2][0];
    up[2][0] = right[2][2];
    right[2][2] = down[0][2];
    down[0][2] = left[0][0];
    left[0][0] = temp;
  }
  temp = face[0][0];
  face[0][0] = face[0][2];
  face[0][2] = face[2][2];
  face[2][2] = face[2][0];
  face[2][0] = temp;
  temp = face[0][1];
  face[0][1] = face[1][2];
  face[1][2] = face[2][1];
  face[2][1] = face[1][0];
  face[1][0] = temp;
}

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
  easycam.rotateX(PI / 8);
  easycam.setDistance(250);
  easycam.setDistanceMin(200);
  easycam.setDistanceMax(500);

  const scrambleButton = createButton("Scramble");
  scrambleButton.mousePressed(scramble);
  scrambleButton.position(10, 0);

  const resetButton = createButton("Reset");
  resetButton.mousePressed(initPos);
  resetButton.position(80, 0);

  let button_size = 50;

  MOVES.forEach((move, i) => {
    let button = createButton(move);
    button.mousePressed(KEY_MAP[move]);
    button.position(button_size * (i % 3), button_size * floor(i / 3) + 60);
  });

}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(0);
  translate((-SIZE * 3) / 2, (-SIZE * 3) / 2, (SIZE * 3) / 2);
  paintFace(up, 0, 0, -SIZE * 3, PI / 2, 0, 0);
  paintFace(down, 0, SIZE * 3, 0, -PI / 2, 0, 0);
  paintFace(right, SIZE * 3, 0, 0, 0, PI / 2, 0);
  paintFace(left, 0, 0, -SIZE * 3, 0, -PI / 2, 0);
  paintFace(front, 0, 0, 0, 0, 0, 0);
  paintFace(back, SIZE * 3, 0, -SIZE * 3, 0, PI, 0);

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
  for (let i = 0; i < 20; i++) {
    let move = MOVES[floor(random(0, MOVES.length))];
    if (KEY_MAP[move]) KEY_MAP[move]();
  }
}

function initPos() {
  up = new Array(3).fill(1).map(() => new Array(3).fill(1));
  down = new Array(3).fill(2).map(() => new Array(3).fill(2));
  right = new Array(3).fill(3).map(() => new Array(3).fill(3));
  left = new Array(3).fill(4).map(() => new Array(3).fill(4));
  front = new Array(3).fill(5).map(() => new Array(3).fill(5));
  back = new Array(3).fill(6).map(() => new Array(3).fill(6));
}
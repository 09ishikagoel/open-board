let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let { top: canvasTop } = canvas.getBoundingClientRect();
canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight - canvasTop;
  canvas.width = window.innerWidth;
  redrawLines();
});
ctx.lineCap = "round";
ctx.lineJoin = "round";
let db = [];
let redoDB = [];
let isMouseDown = false;
let line = [];
canvas.addEventListener("mousedown", function (e) {
  console.log(e);
  isMouseDown = true;
  let x = e.clientX;
  let y = e.clientY - canvasTop;
  ctx.beginPath();
  ctx.moveTo(x, y);
  let pointObject = {
    id: "md",
    x,
    y,
    lineWidth: ctx.lineWidth,
    strokeStyle: ctx.strokeStyle,
  };
  line.push(pointObject);
  socket.emit("md" , pointObject); 
});
canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    if (redoDB.length) {
      redoDB = [];
    }
    let x = e.clientX;
    let y = e.clientY - canvasTop;
    ctx.lineTo(x, y);
    ctx.stroke();
    let pointObject = {
      id: "mm",
      x,
      y
    };
    line.push(pointObject);
    socket.emit("mm" , pointObject);
  }
});
canvas.addEventListener("mouseup", function (e) {
  isMouseDown = false;
  db.push(line);
  line = [];
  socket.emit("mu");
});
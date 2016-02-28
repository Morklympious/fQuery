var x = 5,
    y = 10;

function example() {
  return 'This is an example function we can export'
}

function write(msg) {
  console.log(msg);
}

module.exports = {
  x: x,
  y: y,
  example: example,
  write: write
}

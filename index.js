// const knightMoves =

// x = x + 2 // y = y + 1
// x = x - 2 // y = y - 1
setArray = (i, j) => {
  return [
    [i + 2, j + 1],
    [i + 2, j - 1],
    [i + 1, j + 2],
    [i + 1, j - 2],
    [i - 2, j - 1],
    [i - 2, j + 1],
    [i - 1, j - 2],
    [i - 1, j + 2],
  ].filter(
    (element) =>
      element[0] >= 0 && element[0] < 8 && element[1] >= 0 && element[1] < 8
  );
};
const adjList = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => [])
);
const vertices = Array.from({ length: 8 }, () => Array(8));

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    setArray(i, j).forEach((element) => {
      adjList[i][j].push(element);
    });
    vertices[i][j] = vertex([i, j], adjList[i][j]);
  }
}

function vertex(index, vertices) {
  return {
    index,
    vertices,
  };
}

function knightMoves(start, finish) {
  let [startX, startY] = start;
  let [finishX, finishY] = finish;
  const queue = [];
  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  const prev = Array.from({ length: 8 }, () => Array(8).fill(null));

  let current = vertices[startX][startY];
  let [currX, currY] = current.index;
  let [neighborX, neighborY] = [null];
  queue.push(current);
  visited[currX][currY] = true;

  while (queue.length != 0) {
    current = queue.shift();
    [currX, currY] = current.index;

    // console.log(current);

    current.vertices.forEach((vertice) => {
      // add all curr neighbors
      // if not visited or in queue
      let neighbor = vertices[vertice[0]][vertice[1]];
      [neighborX, neighborY] = neighbor.index;

      if (!visited[neighborX][neighborY]) {
        queue.push(neighbor);
        visited[neighborX][neighborY] = true;
        prev[neighborX][neighborY] = current.index;
      }
    });

    if (JSON.stringify(current.index) == JSON.stringify(finish)) {
      // console.log(current);
      break;
    }
  }

  let path = [];
  let i = 0;
  let [tempX, tempY] = [];
  for (
    let atX = finishX, atY = finishY;
    !(atX == startX && atY == startY);
    i++, atX = tempX, atY = tempY
  ) {
    // console.log("at", atX, atY);
    // console.log("prev-at",prev[atX][atY][0], prev[atX][atY][1])
    path.push([atX, atY]);

    [tempX, tempY] = prev[atX][atY];
  }
  path.push(start);
  path.reverse();

  return {
    path,
    message:
      `You made it in ${path.length - 1} moves! Here's your path:` +
      path.map((vertex) => `\n[${vertex}]`).join(""),
  };
}

let result = knightMoves([0,0], [7, 7]);
console.log(result.message);

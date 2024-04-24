terrain = [];

voroniSize = 1;


cubeSize = 10;

size = Math.floor(window.innerHeight / cubeSize);

detail = 3;

maxDetail = detail * 4;

for (x = 0; x < size; x++) {
  terrain.push([]);
  for (y = 0; y < size; y++) {
    terrain[x].push([]);
    for (i = 0; i < maxDetail; i++) {
      terrain[x][y].push(i);
    }
    if (x == 0) {
      terrain[x][y] = [0];
    }
    if (y == 0) {
      terrain[x][y] = [0];
    }
    if (x == size - 1) {
      terrain[x][y] = [0];
    }
    if (y == size - 1) {
      terrain[x][y] = [0];
    }

    if (x == 1) {
      terrain[x][y] = [0];
    }
    if (y == 1) {
      terrain[x][y] = [0];
    }
    if (x == size - 2) {
      terrain[x][y] = [0];
    }
    if (y == size - 2) {
      terrain[x][y] = [0];
    }
  }
}

acceptable = [];
function accept(num) {
  let acceptnum = true;
  for (i = 0; i < acceptable.length; i++) {
    if (acceptable[i] == num) {
      acceptnum = false;
    }
  }
  if (acceptnum) {
    acceptable.push(num);
  }
}

function adapt(x, y, unAcceptable) {
  if (terrain[x][y].length > 1) {
    for (i = 0; i < terrain[x][y].length; i++) {
      for (j = 0; j < unAcceptable.length; j++) {
        if (unAcceptable[j] == terrain[x][y][i]) {
          terrain[x][y].splice(i, 1);
        }
      }
    }
  }
}

passedTime = 0;
pointerX = 1;
pointerY = 2;

once = true;

randX = 0;

randY = 0;

//voronization

voroni = [];

function draw() {
  if (once) {
    for (x = 0; x < terrain.length; x++) {
      for (y = 0; y < terrain[x].length; y++) {
        // if (terrain[x][y].length == 1) {
        if (terrain[x][y][0] >= 0 && terrain[x][y][0] <= detail - 1) {
          context.fillStyle = `rgb(${terrain[x][y][0] * 50},${
            terrain[x][y][0] * 50
          },${255})`;
        }
        if (terrain[x][y][0] >= detail && terrain[x][y][0] <= detail * 2 - 2) {
          context.fillStyle = `rgb(${255 - (terrain[x][y][0] - detail) * 30},${
            255 - (terrain[x][y][0] - detail) * 30
          },${30})`;
        }
        if (
          terrain[x][y][0] >= detail * 2 - 1 &&
          terrain[x][y][0] <= detail * 3 - 1
        ) {
          context.fillStyle = `rgb(${50},${
            200 - (terrain[x][y][0] - detail * 2) * 30
          },${50})`;
        }
        if (
          terrain[x][y][0] >= detail * 3 &&
          terrain[x][y][0] <= detail * 4 - 1
        ) {
          context.fillStyle = `rgb(${
            100 + (terrain[x][y][0] - detail * 3) * 40
          },${100 + (terrain[x][y][0] - detail * 3) * 40},${
            100 + (terrain[x][y][0] - detail * 3) * 40
          })`;
        }
        context.fillRect(x * cubeSize, y * cubeSize, cubeSize, cubeSize);
      }
      // }
    }
  } else {
    for (x = 0; x < window.innerHeight; x += voroniSize) {
      for (y = 0; y < window.innerHeight; y += voroniSize) {
        dist = 1000;
        for (
          i = Math.floor(x / cubeSize) - 2;
          i < Math.floor(x / cubeSize) + 2;
          i++
        ) {
          for (
            j = Math.floor(y / cubeSize) - 2;
            j < Math.floor(y / cubeSize) + 2;
            j++
          ) {
            if (i >= 0 && j >= 0 && i < size - 1 && j < size - 1) {
              curDist = Math.sqrt(
                Math.pow(x - voroni[i][j].x, 2) +
                  Math.pow(y - voroni[i][j].y, 2)
              );
              if (dist > curDist) {
                dist = curDist;
                choseni = i;
                chosenj = j;
              }
            }
          }
        }

        if (
          voroni[choseni][chosenj].color >= 0 &&
          voroni[choseni][chosenj].color <= detail - 1
        ) {
          context.fillStyle = `rgb(${voroni[choseni][chosenj].color * 50},${
            voroni[choseni][chosenj].color * 50
          },${255})`;
        }
        if (
          voroni[choseni][chosenj].color >= detail &&
          voroni[choseni][chosenj].color <= detail * 2 - 2
        ) {
          context.fillStyle = `rgb(${
            255 - (voroni[choseni][chosenj].color - detail) * 30
          },${255 - (voroni[choseni][chosenj].color - detail) * 30},${30})`;
        }
        if (
          voroni[choseni][chosenj].color >= detail * 2 - 1 &&
          voroni[choseni][chosenj].color <= detail * 3 - 1
        ) {
          context.fillStyle = `rgb(${50},${
            200 - (voroni[choseni][chosenj].color - detail * 2) * 30
          },${50})`;
        }
        if (
          voroni[choseni][chosenj].color >= detail * 3 &&
          voroni[choseni][chosenj].color <= detail * 4 - 1
        ) {
          context.fillStyle = `rgb(${
            100 + (voroni[choseni][chosenj].color - detail * 3) * 40
          },${100 + (voroni[choseni][chosenj].color - detail * 3) * 40},${
            100 + (voroni[choseni][chosenj].color - detail * 3) * 40
          })`;
        }

        context.fillRect(x, y, voroniSize, voroniSize);
      }
    }
  }
}

function update() {
  if (pointerY < size - 3) {
    for (speed = 0; speed < 1; speed++) {
      for (x = 1; x < terrain.length - 1; x++) {
        for (y = 1; y < terrain[x].length - 1; y++) {
          if (
            !(
              terrain[x - 1][y].length == 1 &&
              terrain[x + 1][y].length == 1 &&
              terrain[x][y - 1].length == 1 &&
              terrain[x][y + 1].length == 1
            )
          ) {
            acceptable = [];
            for (z = 0; z < terrain[x][y].length; z++) {
              for (c = 0; c < maxDetail; c++) {
                if (terrain[x][y][z] == c) {
                  if (c != 0) {
                    accept(c - 1);
                  }
                  accept(c);
                  if (c != maxDetail - 1) {
                    accept(c + 1);
                  }
                }
              }
            }
            unAcceptable = [];
            for (c = 0; c < maxDetail; c++) {
              unAcceptable.push(c);
            }
            for (i = 0; i < acceptable.length; i++) {
              for (j = 0; j < unAcceptable.length; j++) {
                if (acceptable[i] == unAcceptable[j]) {
                  unAcceptable.splice(j, 1);
                }
              }
            }

            adapt(x - 1, y, unAcceptable);

            adapt(x, y - 1, unAcceptable);

            adapt(x + 1, y, unAcceptable);

            adapt(x, y + 1, unAcceptable);
          }
        }
      }
    }
    passedTime++;

    if (passedTime < 1000) {
      prevX = randY;
      prevY = randY;
      do {
        do {
          randX = Math.floor(Math.random() * size);
        } while (randX > prevX - 12 && randX < prevX + 12);

        do {
          randY = Math.floor(Math.random() * size);
        } while (randY > prevY - 12 && randY < prevY + 12);
      } while (terrain[randX][randY].length <= 1);
      while (terrain[randX][randY].length > 1) {
        terrain[randX][randY].splice(
          Math.floor(Math.random() * terrain[randX][randY].length),
          1
        );
      }
    } else {
      do {
        if (pointerX > size - 2) {
          pointerX = 2;
          pointerY++;
        } else {
          pointerX++;
        }
      } while (terrain[pointerX][pointerY].length <= 1);
      while (terrain[pointerX][pointerY].length > 1) {
        terrain[pointerX][pointerY].splice(
          Math.floor(Math.random() * terrain[pointerX][pointerY].length),
          1
        );
      }
    }
  } else {
    if (once) {
      once = false;
      for (x = 0; x < terrain.length; x++) {
        voroni.push([]);
        for (y = 0; y < terrain[x].length; y++) {
          voroni[x].push({
            x: Math.random() * cubeSize + x * cubeSize,
            y: Math.random() * cubeSize + y * cubeSize,
            color: terrain[x][y][0],
          });
        }
      }
    }
  }
}

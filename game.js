terrain = [];

voroniSize = 1

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

randX = 0

randY = 0

//voronization

voroni = [];

function draw() {
  if (once) {
    for (x = 0; x < terrain.length; x++) {
      for (y = 0; y < terrain[x].length; y++) {
        if (terrain[x][y].length == 1) {
          if (terrain[x][y][0] >= 0 && terrain[x][y][0] <= detail - 1) {
            context.fillStyle = "blue";
          }
          if (
            terrain[x][y][0] >= detail &&
            terrain[x][y][0] <= detail * 2 - 1
          ) {
            context.fillStyle = "yellow";
          }
          if (
            terrain[x][y][0] >= detail * 2 &&
            terrain[x][y][0] <= detail * 3 - 1
          ) {
            context.fillStyle = "green";
          }
          if (
            terrain[x][y][0] >= detail * 3 &&
            terrain[x][y][0] <= detail * 4 - 1
          ) {
            context.fillStyle = "#2b2b2b";
          }
          context.fillRect(x * cubeSize, y * cubeSize, cubeSize, cubeSize);
        }
      }
    }
  } else {
    for(x = 0 ; x < window.innerHeight; x+=voroniSize){
      for(y = 0 ; y < window.innerHeight; y+=voroniSize){
        dist = 1000
        for(i = 0; i < voroni.length; i++){
          curDist = Math.sqrt(Math.pow(x-voroni[i].x,2)+Math.pow(y-voroni[i].y,2))
          if(dist > curDist){
            dist = curDist
            choseni = i
          }
        }
        
        if (voroni[choseni].color >= 0 && voroni[choseni].color <= detail - 1) {
          context.fillStyle = "blue";
        }
        if (
          voroni[choseni].color >= detail &&
          voroni[choseni].color <= detail * 2 - 1
        ) {
          context.fillStyle = "yellow";
        }
        if (
          voroni[choseni].color >= detail * 2 &&
          voroni[choseni].color <= detail * 3 - 1
        ) {
          context.fillStyle = "green";
        }
        if (
          voroni[choseni].color >= detail * 3 &&
          voroni[choseni].color <= detail * 4 - 1
        ) {
          context.fillStyle = "#2b2b2b";
        }

        context.fillRect(x,y,voroniSize,voroniSize)
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
      prevX = randY
      prevY = randY
      do {
        do{
          randX = Math.floor(Math.random() * size);
        }while(randX > prevX - 12 && randX < prevX + 12)
        
        do{
          randY = Math.floor(Math.random() * size);
        }while(randY > prevY - 12 && randY < prevY + 12)
        
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
        for (y = 0; y < terrain[x].length; y++) {
          voroni.push({
            x: Math.random() * cubeSize + x * cubeSize,
            y: Math.random() * cubeSize + y * cubeSize,
            color: terrain[x][y][0]
          });
        }
      }
    }
  }
}

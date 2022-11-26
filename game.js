terrain = [];

cubeSize = 10;

size = Math.floor(window.innerHeight / cubeSize);

detail = 3

maxDetail = detail*4

for (x = 0; x < size; x++) {
  terrain.push([]);
  for (y = 0; y < size; y++) {
    terrain[x].push([]);
    for(i = 0; i< maxDetail; i++){
      terrain[x][y].push(i)
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

acceptable = []
function accept(num){
  let acceptnum = true
  for(i=0; i<acceptable.length; i++ ){
    if(acceptable[i] == num){
      acceptnum = false
    }
  }
  if(acceptnum){
    acceptable.push(num)
  }
}

function draw() {
  for (x = 0; x < terrain.length; x++) {
    for (y = 0; y < terrain[x].length; y++) {
      if (terrain[x][y].length == 1) {
        if (terrain[x][y][0] >= 0 && terrain[x][y][0] <= detail-1) {
          context.fillStyle = "blue";
        }
        if (terrain[x][y][0] >= detail && terrain[x][y][0] <= detail*2 -1) {
          context.fillStyle = "yellow";
        }
        if (terrain[x][y][0] >= detail*2 && terrain[x][y][0] <= detail*3 -1) {
          context.fillStyle = "green";
        }
        if (terrain[x][y][0] >= detail*3 && terrain[x][y][0] <= detail*4 -1) {
          context.fillStyle = "#2b2b2b";
        }
        context.fillRect(x * cubeSize, y * cubeSize, cubeSize, cubeSize);
      }
    }
  }
}

function update() {
  for(times = 0 ; times < 10; times++){
    for (x = 1; x < terrain.length-1; x++) {
      for (y = 1; y < terrain[x].length-1; y++) {
        acceptable = []
        for(z = 0; z < terrain[x][y].length; z++){
          for(c = 0; c< maxDetail; c++){
            if(terrain[x][y][z] == c){
              if(c!=0){
                accept(c-1)
              }
              accept(c)
              if(c!=maxDetail-1){
                accept(c+1)
              }
            }
          }
        }
        unAcceptable = []
        for(c=0; c< maxDetail; c++){
          unAcceptable.push(c)
        }
        for(i=0; i<acceptable.length;i ++){
          for(j= 0; j< unAcceptable.length ;j++){
            if(acceptable[i] == unAcceptable[j]){
              unAcceptable.splice(j,1)
            }
          }
        }
  
        for(i = 0 ; i < terrain[x-1][y].length; i++){
          for(j = 0 ; j < unAcceptable.length; j++){
            if(unAcceptable[j] == terrain[x-1][y][i]){
              terrain[x-1][y].splice(i,1)
            }
          }
        }
  
        for(i = 0 ; i < terrain[x][y-1].length; i++){
          for(j = 0 ; j < unAcceptable.length; j++){
            if(unAcceptable[j] == terrain[x][y-1][i]){
              terrain[x][y-1].splice(i,1)
            }
          }
        }
  
        for(i = 0 ; i < terrain[x+1][y].length; i++){
          for(j = 0 ; j < unAcceptable.length; j++){
            if(unAcceptable[j] == terrain[x+1][y][i]){
              terrain[x+1][y].splice(i,1)
            }
          }
        }
  
        for(i = 0 ; i < terrain[x][y+1].length; i++){
          for(j = 0 ; j < unAcceptable.length; j++){
            if(unAcceptable[j] == terrain[x][y+1][i]){
              terrain[x][y+1].splice(i,1)
            }
          }
        }

  
      }
    }
  }
  do{
    randX = Math.floor(Math.random()*size)
  randY = Math.floor(Math.random()*size)
  }while(terrain[randX][randY].length<1)
  
  for(i=0; i< maxDetail+1; i ++){
    if(terrain[randX][randY].length > 1){
      terrain[randX][randY].splice(Math.floor(Math.random()*terrain[randX][randY].length),1)
    }
  }
}

const rover = [ 
  {
    direction: "N", 
    travelLog: [],
  },
  {
    direction: "S", 
    travelLog: [],
  }
]

//Si no pongo la grid fuera las funciones no cogen su length;
const grid = [];

function generateGrid(height, width, obstacles) {

  if (obstacles > height * width) {
    console.log("More obstacles than grid size");
    return;
  }

  for (i = 0; i < height; i++) {
    let array = [];
    for (j = 0; j < width; j++) {
      array.push("");
    }
    grid.push(array);
  }

  while (obstacles > 0) {
    let randomX = Math.floor(Math.random() * height);
    let randomY = Math.floor(Math.random() * width);

    if (grid[randomX][randomY] !== "o") {
      grid[randomX][randomY] = "o";
      obstacles--;
    }
  } 

  for (j = 0; j < rover.length; j++) {
    let randomX = Math.floor(Math.random() * grid.length);
    let randomY =  Math.floor(Math.random() * grid[0].length);
    if (grid[randomX][randomY] !== "o") {
      rover[j].x = randomX;
      rover[j].y = randomY;
    } else {
      j--;
    }
  }
  
  /*rover.forEach(function generateXY(element){
    let randomX = Math.floor(Math.random() * grid.length);
    let randomY =  Math.floor(Math.random() * grid[0].length);
    if (grid[randomX][randomY] !== "o") {
      element.x = randomX;
      element.y = randomY;
    } else {
      generateXY(element);
    }
    
  });  Error: No lee grid*/

  return grid;
}

function turnLeft(object){
  console.log("turnLeft was called!");
  
  switch (object.direction) {
    case "N":
      object.direction = "W"
    break;
    case "E":
      object.direction = "N"
    break;
    case "W":
      object.direction = "S"
    break;
    case "S":
      object.direction = "E"
    break;
  }
}


function turnRight(object){
  console.log("turnRight was called!");
  
  switch (object.direction) {
    case "N":
      object.direction = "E"
    break;
    case "E":
      object.direction = "S"
    break;
    case "W":
      object.direction = "N"
     break;
    case "S":
      object.direction = "W"
    break;
  }
}

function checkRoverPosition(object, operation) {
  
  let isEqual = function(string) {
    
    for (i = 0; i < rover.length; i++) {
      if (rover[i] === object) { 
        continue;
      }
      if (rover[i].string === object.string) {
        return i;
      } else {
        return "Not equal";
      }
    }
  }

  let substractX = function(object, string) {
    
    if (object.x === 0) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(string) !== "Not equal" && object.x - 1 === rover[isEqual(string)].x) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let substractY = function(object, string) {
    
    if (object.y === 0) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(string) !== "Not equal" && object.y - 1 === rover[isEqual(string)].y) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let addX = function(object, string) {
    
    if (object.x === grid.length - 1) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(string) !== "Not equal" && object.x + 1 === rover[isEqual(string)].x) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let addY = function(object, string) {

    if (object.y === grid[0].length - 1) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(string) !== "Not equal" && object.y - 1 === rover[isEqual(string)].y) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  switch (operation) {
    case "minusOneX":
      if (substractX(object, "y")) {
        return true;
      };
    
    case "minusOneY": 
      if (substractY(object, "x")) {
        return true;
      }
    
    case "plusOneX":
      if (addX(object, "y")) {
        return true;
      }
    
    case "plusOneY":
      if (addY(object, "x")) {
        return true;
      }
  }
}

function moveForward(object){
  console.log("moveForward was called");
  
  if (object.direction === "N") {
    
    if (checkRoverPosition(object, "minusOneX") !== true) {
      object.x -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
      
  } else if (object.direction === "W") {
    
    if (checkRoverPosition(object, "minusOneY") !== true) {

      object.y -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }

  } else if (object.direction === "S") {

    if (checkRoverPosition(object, "plusOneX") !== true) {

      object.x += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  
  } else if (object.direction === "E") {
    
    if (checkRoverPosition(object, "plusOneY") !== true) {
   
      object.y += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  }
  return;
}

function moveBackward(object) {
  console.log("moveBackward was called");

  if (object.direction === "N") {
      
    if (checkRoverPosition(object, "plusOneX") !== true) {
  
      object.x += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }

  } else if (object.direction === "W") {
    
    if (checkRoverPosition(object, "plusOneY") !== true) {
    
      object.y += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
      
  } else if (object.direction === "S") {
   
    if (checkRoverPosition(object, "minusOneX") !== true) {
    
      object.x -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
      
  } else if (object.direction === "E") {
      
    if (checkRoverPosition(object, "minusOneY") !== true) {
      
      object.y -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  }
  return;
}

function command(string) {

  //Hacer un for de rover para cambiar los argumentos en las funciones y evitar repetirme con los forEach, mejor para el console.log de travelLog. 
  for (i = 0; i < string.length; i++) {
    
    if (string.charAt(i) !== "f" && string.charAt(i) !== "b" && string.charAt(i) !== "r" && string.charAt(i) !== "l") {
      console.log("Error \"" + string.charAt(i) + "\"" + " in position " + i + ", Commands are: f, b, r, l.")
      return;
    }
    
    for (j = 0; j < rover.length; j++) {
      if (string.charAt(i) === "f") {
        moveForward(rover[j]);
        console.log(rover[j].travelLog);
      } else if (string.charAt(i) === "r") {
        turnRight(rover[j]);
        console.log(rover[j].travelLog);
      } else if (string.charAt(i) === "l") {
        turnLeft(rover[j]);
        console.log(rover[j].travelLog);
      } else if (string.charAt(i) === "b") {
        moveBackward(rover[j]);
        console.log(rover[j].travelLog);
      }
    }
  }
}


//A arreglar: funcion command, llamadas infinitas si length > 1, el checker hace console.log si x o y dan true (x: 2 y: 3) (x: 3-1 y:7)
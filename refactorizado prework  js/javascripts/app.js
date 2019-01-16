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

function turnRight(object) {
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
  
  let isEqual = function(str) {
    
    for (l = 0; l < rover.length; l++) {
      if (rover[l] === object) { 
        continue;
      }
      if (str === "y") {
        if (rover[l].y === object.y) {
          return i;
        } 
      } else if (str === "x") {
        if (rover[l].x === object.x) {
          return i;
        } 
      }
    }
    return "Not equal";
  }

  let substractX = function(object, str) {
    
    if (object.x === 0) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(str) !== "Not equal" && object.x - 1 === rover[isEqual(str)].x) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let substractY = function(object, str) {
    
    if (object.y === 0) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(str) !== "Not equal" && object.y - 1 === rover[isEqual(str)].y) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let addX = function(object, str) {
    
    if (object.x === grid.length - 1) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(str) !== "Not equal" && object.x + 1 === rover[isEqual(str)].x) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  let addY = function(object, str) {

    if (object.y === grid[0].length - 1) {
      console.log("Danger: Grid " + grid.length + "x" + grid[0].length + " size");
      return true;
    }
    
    if (isEqual(str) !== "Not equal" && object.y - 1 === rover[isEqual(str)].y) {
      console.log("Danger: Another rover in that position");
      return true;
    }
  }

  switch (operation) {
    case "minusOneX":
      return substractX(object, "y");
    
    case "minusOneY": 
      return substractY(object, "x");

    case "plusOneX":
      return addX(object, "y");
        
    case "plusOneY":
      return addY(object, "x");

  }
}

function moveForward(object){
  console.log("moveForward was called");
  
  if (object.direction === "N") {
    
    if (checkRoverPosition(object, "minusOneX") === true) {
      return;
    } else {
      object.x -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  }
      
  if (object.direction === "W") {
    
    if (checkRoverPosition(object, "minusOneY") === true) {
      return;
    } else {
      object.y -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  } 
  
  if (object.direction === "S") {

    if (checkRoverPosition(object, "plusOneX") === true) {
      return;
    } else {
      object.x += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  } 
  
  if (object.direction === "E") {
    
    if (checkRoverPosition(object, "plusOneY") === true) {
      return;
    } else {
      object.y += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  }
}

function moveBackward(object) {
  console.log("moveBackward was called");

  if (object.direction === "N") {
      
    if (checkRoverPosition(object, "plusOneX") === true) {
      return;
    } else {
      object.x += 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  } 
  
  if (object.direction === "W") {
    
    if (checkRoverPositioin(object, "plusOneY") === true) {
      return;i
    } else {i
      object.y += 1;i
      object.travelLog.puish("x:" + object.x + " y:" + object.y);
    }   
  } 
  
  if (object.direction === "S") {
   
    if (checkRoverPosition(object, "minusOneX") === true) {
      return;
    } else {
      object.x -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }   
  } 
  
  if (object.direction === "E") {
      
    if (checkRoverPosition(object, "minusOneY") === true) {
      return;
    } else {
      object.y -= 1;
      object.travelLog.push("x:" + object.x + " y:" + object.y);
    }
  }
}

function command(string) {
 
  for (i = 0; i < string.length; i++) {

    if (string.charAt(i) !== "f" && string.charAt(i) !== "b" && string.charAt(i) !== "r" && string.charAt(i) !== "l") {
      console.log("Error \"" + string.charAt(i) + "\"" + " in position " + i + ", Commands are: f, b, r, l.")
      return;
    }
    console.log(i); 
    for (j = 0; j < rover.length; j++) {
      
      if (string.charAt(i) === "f") {
        moveForward(rover[j]);
        
      } else if (string.charAt(i) === "r") {
        turnRight(rover[j]);
        
      } else if (string.charAt(i) === "l") {
        turnLeft(rover[j]);
        
      } else if (string.charAt(i) === "b") {
        moveBackward(rover[j]);
        
      }
      console.log(rover[j].travelLog);
      
    }
  }
}

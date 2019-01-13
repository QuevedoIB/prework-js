const rovObject = {
  direction: "N", 
  travelLog: [],
}

const rovObject2 = {
  direction: "S", 
  travelLog: [],
}

function generateGrid(height, width, obstacles) {
  const grid = [];

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

  rovObject.x = grid.length / 2 - 1;
  rovObject.y = grid[0].length / 2 - 1;
  rovObject2.x = grid.length / 2 - 1;
  rovObject2.y = grid[0].length / 2 + 2;

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
  
  if (rovObject.x !== rovObject2.x && rovObject.y !== rovObject2.y) {
    return;
  }

  if (object === rovObject) {
    switch (operation) {
      case "sumX":
        return rovObject.x + 1 === rovObject2.x;
      
      case "sumY": 
        return rovObject.y + 1 === rovObject2.y;
      
      case "substrX":
        return rovObject.x - 1 === rovObject2.x;
      
      case "substrY":
        return rovObject.y - 1 === rovObject2.y;
    }
  } 

  if (object === rovObject2) {
    switch (operation) {
      case "sumX":
        return rovObject2.x + 1 === rovObject.x;
      
      case "sumY": 
        return rovObject2.y + 1 === rovObject.y;
      
      case "substrX":
        return rovObject2.x - 1 === rovObject.x;
     
      case "substrY":
        return rovObject2.y - 1 === rovObject.y;
    }
  }
}

function moveForward(object){
  console.log("moveForward was called")
  
  let gridXLength = rovObject.x * 2 + 1;
  let gridYLength = rovObject.y * 2 + 1;

  if (object.direction === "N") {
    
    if (object.x === 0) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "substrX")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.x -= 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "W") {
    
    if (object.y === 0) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "substrY")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.y -= 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "S") {
    
    if (object.x === gridXLength - 1) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "sumX")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.x += 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "E") {
    
    if (object.y === gridYLength - 1) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "sumX")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.y += 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);
  }
}

function moveBackward(object){
  console.log("moveBackward was called")

  let gridXLength = rovObject.x * 2 + 1;
  let gridYLength = rovObject.y * 2 + 1;

  if (object.direction === "N") {
    
    if (object.x === gridXLength - 1) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "sumX")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.x += 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "W") {
    
    if (object.y === gridYLength - 1) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "sumY")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.y += 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "S") {
    
    if (object.x === 0) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "substrX")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.x -= 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);

  } else if (object.direction === "E") {
    
    if (object.y === 0) {
      console.log("Danger 10x10 grid");
      return;
    }

    if (checkRoverPosition(object, "substrY")) {
      console.log("Danger: Another Rover in that position");
      return;
    }

    object.y -= 1;
    object.travelLog.push("x:" + object.x + " y:" + object.y);
  }
}

function command(string){

  for (i = 0; i < string.length; i++) {
    
    if (string[i] !== "f" && string[i] !== "b" && string[i] !== "r" && string[i] !== "l") {
      console.log("Error \"" + string[i] + "\"" + " in position " + i + ", Commands are: f, b, r, l.")
      return;
    }
    
    if (string[i] === "f") {
      moveForward(rovObject);
      moveForward(rovObject2);
    } else if (string[i] === "r") {
      turnRight(rovObject);
      turnRight(rovObject2);
    } else if (string[i] === "l") {
      turnLeft(rovObject);
      turnLeft(rovObject2);
    } else if (string[i] === "b") {
      moveBackward(rovObject);
      moveBackward(rovObject2);
    }
  }
  console.log(rovObject.travelLog, rovObject2.travelLog);
}




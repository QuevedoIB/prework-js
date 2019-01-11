let rovObj = {
  direction: "N", 
}

rovObj.x = 0;
rovObj.y = 0;
rovObj.travelLog = [];


function turnLeft(direction){
  console.log("turnLeft was called!");
  switch (rovObj.direction) {
    case "N":
      rovObj.direction = "W"
    break;
    case "E":
      rovObj.direction = "N"
    break;
    case "W":
      rovObj.direction = "S"
    break;
    case "S":
      rovObj.direction = "E"
    break;
  }
}


function turnRight(direction){
  console.log("turnRight was called!");
  switch (rovObj.direction) {
    case "N":
      rovObj.direction = "E"
    break;
    case "E":
      rovObj.direction = "S"
    break;
    case "W":
      rovObj.direction = "N"
    break;
    case "S":
      rovObj.direction = "W"
    break;
  }
}

function moveForward(direction){
  console.log("moveForward was called")
  
  if (rovObj.x === -5 || rovObj.y === -5 || rovObj.x === 5 || rovObj.y === 5) {
    console.log("Danger 10x10 grid");
    return;
  }

  if (rovObj.direction === "N") {
    
    rovObj.x -= 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "W") {
    
    rovObj.y -= 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "S") {
    
    rovObj.x += 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "E") {
    
    rovObj.y += 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);
  }
}

function moveBackward(direction){
  console.log("moveBackward was called")
  
  if (rovObj.x === -5 || rovObj.y === -5 || rovObj.x === 5 || rovObj.y === 5) {
    console.log("Danger 10x10 grid");
    return;
  }

  if (rovObj.direction === "N") {
    
    rovObj.x += 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "W") {
    
    rovObj.y += 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "S") {
    
    rovObj.x -= 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);

  } else if (rovObj.direction === "E") {
    
    rovObj.y -= 1;
    rovObj.travelLog.push("x:" + rovObj.x + " y:" + rovObj.y);
  }
}

function command(string){
  
  for (i = 0; i < string.length; i++) {
    
    if (string[i] !== "f" && string[i] !== "b" && string[i] !== "r" && string[i] !== "l") {
      console.log("Error \"" + string[i] + "\"" + " in position " + i + ", Commands are: f, b, r, l.")
      return;
    }
    
    if (string[i] === "f") {
      moveForward(rovObj.direction);
    } else if (string[i] === "r") {
      turnRight(rovObj.direction);
    } else if (string[i] === "l") {
      turnLeft(rovObj.direction);
    } else if (string[i] === "b") {
      moveBackward(rovObj.direction);
    }
  }
  console.log(rovObj.travelLog);
}




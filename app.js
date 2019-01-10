let rovObj = {
  direction: "N", 
}

rovObj.x = 0;
rovObj.y = 0;


function turnLeft(rovObj.direction){
  console.log("turnLeft was called!");
  switch (rovObj.direction) {
    case "N":
      rovObj.direction === "W"
    break;
    case "E":
      rovObj.direction === "N"
    break;
    case "W":
      rovObj.direction === "S"
    break;
    case "S":
      rovObj.direction === "E"
    break;
  }
}


function turnRight(rovObj.direction){
  console.log("turnRight was called!");
  switch (rovObj.direction) {
    case "N":
      rovObj.direction === "E"
    break;
    case "E":
      rovObj.direction === "S"
    break;
    case "W":
      rovObj.direction === "N"
    break;
    case "S":
      rovObj.direction === "W"
    break;
  }
}

function moveForward(rovObj.direction){
  console.log("moveForward was called")
  if (rovObj.direction === "N") {
    rovObj.x -= 1;
    console.log("Position is: " + rovObj.x " , " + rovObj.y);
  } else if (rovObj.direction === "W") {
    rovObj.y -= 1;
    console.log("Position is: " + rovObj.x " , " + rovObj.y);
  } else if (rovObj.direction === "S") {
    rovObj.x += 1;
    console.log("Position is: " + rovObj.x " , " + rovObj.y);
  } else if (rovObj.direction === "E") {
    rovObj.y += 1;
    console.log("Position is: " + rovObj.x " , " + rovObj.y);
  }
}

function command(string){
  for (i = 0; i < string.length; i++) {
    if (string[i] === "f") {
      moveForward(rovObj.direction);
    } else if (string[i] === "r") {
      turnRight(rovObj.direction);
    } else if (string[i] === "l") {
      turnLeft(rovObj.direction);
    }
  }
}

console.log(command("rffrfflfrff"));
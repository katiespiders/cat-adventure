// Cat model does things with escape points and holds the current room
var Cat = function (name, current_room, points) {
  this.name = name;
  this.current_room = current_room;
  this.points = points;
  this.changePoints = function(){
    this.points = this.points + this.current_room.points;
    return this.points;
  }
}

var Room = function (new_name, new_description, new_exits, new_points) {
  this.name = new_name;
  this.description = new_description;
  this.exits = new_exits;
  this.points = new_points;
  this.getDescription = function(){
    return this.name + ": " + this.description;
  };
};

//
// Begin fixed data!
//
var kitchen = new Room(
  "Kitchen", 
  "A nice roomy kitchen. Not very safe. There may be dogs nearby.",
  ["Living Room", "Dining Room"],
  0
);

var living_room = new Room(
  "Living Room",
  "Lots of perches, but frequently full of dogs. Kind of safe, but not a good spot for naps!",
  ["Kitchen"],
  2
);

var dining_room = new Room(
  "Dining Room",
  "There's a big table and some chairs and OH NO IT'S A DOG",
  ["Kitchen", "Bedroom"],
  -4
);

var bedroom = new Room(
  "Bedroom",
  "YAY! We finally found the nice toasty warm sunbeam!",
  ["Dining Room"],
  20
);

// Actually creates the new Starbuck
var starbuck = new Cat(
  "Starbuck",
  kitchen,
  5
);

//
// End fixed data!
//

// don't forget to populate this with data!
// var starbuck = new Cat();

$(document).ready(function(){
  // Adds a click event to all run classes that exist on page load
  $(".run").click(function() {
    // gets the id of the element, which will indicate which room we're looking at
    var id = $(this)[0].id;
    // calls the click event function, which is listed separately
    runClick(id);
  });

  $(".look").click(function() {
    var id = $(this)[0].id;
    lookClick(id);
  })
});

function lookClick(id) {
  switch (id) {
    case "look-dining-room":
      alert(dining_room.getDescription());
      break;
    case "look-kitchen":
      alert(kitchen.getDescription());
      break;
    case "look-living-room":
      alert(living_room.getDescription());
      break;
    case "look-bedroom":
      alert(bedroom.getDescription());
      break;
  }
}

function runClick(id) {
  // Detects the right id and sets the current room based on this
  switch (id) {
    case "run-dining-room":
      starbuck.current_room = dining_room;
      break;
    case "run-kitchen":
      starbuck.current_room = kitchen;
      break;
    case "run-living-room":
      starbuck.current_room = living_room;
      break;
    case "run-bedroom":
      starbuck.current_room = bedroom;
      break;
  }
  // Changes the title/header text
  document.getElementsByClassName("current-room")[0].innerHTML = "Oh no! Starbuck is trapped in the " + starbuck.current_room.name.toLowerCase() + "!";
  
  // creates an array with our exit divs
  var allExits = [document.getElementsByClassName("exit1")[0], document.getElementsByClassName("exit2")[0]];
  
  // runs function that removes users
  removeExits(allExits[0]);
  removeExits(allExits[1]);

  addExits(allExits);

  updatePoints();
}

// This section removes all all of the existing runs/looks from the DOM.
function removeExits(exit) {
  while(exit.hasChildNodes()) {
    exit.removeChild(exit.lastChild);
  }
}

function addExits(allExits) {
  for(i = 0; i < starbuck.current_room.exits.length; i++) {
    // replaces spaces with hyphens & goes lower case--so Dining Room becomes dining-room
    var id_string = starbuck.current_room.exits[i].split(' ').join('-').toLowerCase();
    
    // creates "run" span
    var newExitRun = document.createElement("span");
    updateElement(newExitRun, "run", id_string);
    newExitRun.addEventListener("click", function(){runClick('run-' + id_string)}, false);
    allExits[i].appendChild(newExitRun);

    var newExitLook = document.createElement("span");
    updateElement(newExitLook, "look", id_string);
    newExitLook.addEventListener("click", function(){lookClick('look-' + id_string)}, false);
    allExits[i].appendChild(newExitLook);
  }
}

function updateElement(el, type, id) {
  el.innerHTML = getTypeString(type) + "the " + starbuck.current_room.exits[i].toLowerCase();
  el.className = type;
  el.setAttribute("id", type + "-" + id);
}

function getTypeString(string) {
  if(string == "run") {
    return "Run towards ";
  } else {
    return " Look at ";
  }
}

function updatePoints() {
  starbuck.changePoints();
  document.getElementsByClassName("points")[0].innerHTML = starbuck.points;
}
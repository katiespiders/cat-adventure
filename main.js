// Write a cat model HERE!
var Cat = function (name, current_room, points) {
  this.name = name;
  this.current_room = current_room;
  this.points = points;
  this.getPoints = function(){
    return this.points;
  }
  this.changePoints = function(diff){
    this.points = this.points + diff;
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
// Begin fixture data!
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
  ["Stairs"],
  20
);

var starbuck = new Cat(
  "Starbuck";
  kitchen;
  5;
);

//
// End fixture data!
//

// don't forget to populate this with data!
// var starbuck = new Cat();

$(document).ready(function(){
  // should be replaced with your beginning/end game logic
  // while (true) {
    $("#dining-room").click(function() {
      alert( dining_room.getDescription() );
    });

    $("#living-room").click(function() {
      alert( living_room.getDescription() );
    });




    $("").click(function() {

    })
    // Add more!
  // }
});
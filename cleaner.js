
/**
 * Summary: Given a 
 *
 * @author Andrew Steele.
 * @since 12.01.2018
 */
  
/** jshint {inline configuration here} */

const fs = require('fs');

var directions = {
  'N': [0,-1],
  'S': [0,1],
  'W': [-1,0],
  'E': [1,0]
};

class Room {
	constructor(X, Y, space, begin, dirt, instructions){
		this.X = X;
		this.Y = Y;
		this.space = space;
		this.begin = begin;
		this.dirt = dirt;
		this.instructions = instructions;
		this.end = undefined;
		this.cleaned = 0;
	}
}

/**
 * Summary: reads input data from given file path.
 *
 * @param {string}   path: file path to input values.
 * 
 * @return {string} string that contains data from input file.
 */
var read_file = function(path){
	var data = fs.readFileSync(path).toString().split("\n");
	return data;
}

/**
 * Summary: initiate Room object with data from input file.
 *
 * @param {string}   data: string that contains data from input file.
 * 
 * @return {Room} instantiated Room object.
 */
var init_room = function(data){

	for(let i=0; i<data.length-1; i++){
		data[i] = data[i].split(" ").map(Number);
	}

	var X = data[0][0];
	var Y = data[0][1];
	var begin = data[1];
	var dirt = data.slice(2,data.length-1);
	var instructions = data[data.length-1].split('');
	var space = init_space(X,Y);
	var room = new Room(X, Y, space, begin, dirt, instructions);

	dirt_in_room(room);

	return room;
}

/**
 * Summary: intitiate a 2D array with given X,Y dimensions filled with zeros.
 *
 * @param {integer}   X: denotes the columns of 2D array.
 * @param {integer}   Y: denotes the rows of 2D array.
 * 
 * @return {array} 2D array representing space of room. 
 */
var init_space = function(X, Y){
	space = [];
	for(let i=0; i<Y; i++){
		space.push(new Array(X).fill(0));
	}

	return space;
}

/**
 * Summary: Sets the coordinates in the space that have dirt to one.  
 *
 * @param {Room}   room: Room object.
 */
var dirt_in_room = function(room){
	for(let i=0; i<room.dirt.length; i++){
		room.space[transform_y(room.Y, room.dirt[i][1])][room.dirt[i][0]] = 1;
	}
}

/**
 * Summary: Since [0,0] is bottom left of space, transform Y coordinate to reflect this.  
 *
 * @param {integer}   Y: denotes the rows of 2D array.
 * @param {integer}   Y_coord: denotes the row of coordinate.
 *
 * @return {integer} transformed Y coordinate. 
 */
var transform_y = function(Y, Y_coord){
	return Y-Y_coord-1;
}

/**
 * Summary: Check if coordinate is within dimensions of the room.
 *
 * @param {integer}   X: denotes the columns of 2D array.
 * @param {integer}   Y: denotes the rows of 2D array.
 * @param {array}  	  coordinate: denotes location within the space.
 */
var check_valid_coordinate = function(X, Y, coordinate){
	if(coordinate[0]>=0 && coordinate[0]<X && coordinate[1]>=0 && coordinate[1]<Y){
		return true;
	}else{
		return false;
	}
}

/**
 * Summary: Run through instructions and record if dirt was cleaned up.
 *
 * @param {Room}   room: Room object
 */
var clean_room = function(room){
	current = [room.begin[0],transform_y(room.Y, room.begin[1])];

	if(!check_valid_coordinate(room.X, room.Y, current)){
		console.log("Invalid starting coordinate...");
		process.exit();
	}

	for(let i=0; i<room.instructions.length; i++){
		new_coordinate = [current[0]+directions[room.instructions[i]][0], current[1]+directions[room.instructions[i]][1]];

		if(check_valid_coordinate(room.X, room.Y, new_coordinate)){
			if(room.space[new_coordinate[1]][new_coordinate[0]] == 1){
				room.cleaned++;
				room.space[new_coordinate[1]][new_coordinate[0]] = 0;

			}
			current = new_coordinate;
		}
	}
	room.end = [current[0], transform_y(room.Y, current[1])];
}

/**
 * Summary: Run through instructions and record if dirt was cleaned up.
 *
 * @param {string}   path: file path to input values.
 */
var main = function(path='input.txt'){
	data = read_file(path);
	room = init_room(data);
	clean_room(room);

	console.log(room.end[0] + " " + room.end[1]);
	console.log(room.cleaned);
}

var args = process.argv.slice(2);
main(args[0]);

module.exports = {
	read_file,
	init_room,
	init_space,
	dirt_in_room,
	transform_y,
	check_valid_coordinate,
	clean_room,
	main
};






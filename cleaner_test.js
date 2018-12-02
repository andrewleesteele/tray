var chai = require('chai');
var cleaner = require('./cleaner');
var assert = chai.assert;


describe('read_file', function() {
  
    it('read and split input.txt', function() {
    var data = cleaner.read_file('input.txt');

    assert.equal(data.length, 6);
	});

	it('read and split input2.txt', function() {
    var data = cleaner.read_file('input2.txt');

    assert.equal(data.length, 5);
	});
});

describe('init_room', function() {

    it('check Room instantiation input.txt', function() {
    var data = cleaner.read_file('input.txt');
    var room = cleaner.init_room(data);

    assert.equal(room.X, 5);
    assert.equal(room.Y, 5);
    assert.deepEqual(room.begin, [1,2]);
    assert.deepEqual(room.dirt, [[1,0],[2,2],[2,3]]);
    assert.deepEqual(room.instructions, ['N','N','E','S','E','E','S','W','N','W','W']);
	});

    it('check Room instantiation input2.txt', function() {
    var data = cleaner.read_file('input2.txt');
    var room = cleaner.init_room(data);

    assert.equal(room.X, 4);
    assert.equal(room.Y, 3);
    assert.deepEqual(room.begin, [0,0]);
    assert.deepEqual(room.dirt, [[3,2],[2,1]]);
    assert.deepEqual(room.instructions, ['N','N','N','E','E','E','S','W']);
	});
});

describe('init_space', function() {
	
	it('check space instantiation input.txt', function() {
    	var data = cleaner.read_file('input.txt');
    	var room = cleaner.init_room(data);

    	assert.equal(room.space.length, 5);
    	assert.equal(room.space[0].length, 5);
	});

	it('check space instantiation input2.txt', function() {
    	var data = cleaner.read_file('input2.txt');
    	var room = cleaner.init_room(data);
    	
    	assert.equal(room.space[0].length, 4);
    	assert.equal(room.space.length, 3);
	});
});

describe('dirt_in_room', function() {
	
	it('check dirt instantiation input.txt', function() {
    	var data = cleaner.read_file('input.txt');
    	var room = cleaner.init_room(data);

    	assert.equal(room.space[4][1], 1);
    	assert.equal(room.space[2][2], 1);
    	assert.equal(room.space[1][2], 1);
	});

	it('check dirt instantiation input2.txt', function() {
    	var data = cleaner.read_file('input2.txt');
    	var room = cleaner.init_room(data);
    	
    	assert.equal(room.space[0][3], 1);
    	assert.equal(room.space[1][2], 1);
	});
});

describe('transform_y', function() {
	
	it('check valid y transform', function() {

    	assert.equal(cleaner.transform_y(5,2), 2);
    	assert.equal(cleaner.transform_y(5,0), 4);
	});
});

describe('check_valid_coordinate', function() {
	
	it('check valid coordinate', function() {
    	var data = cleaner.read_file('input.txt');
    	var room = cleaner.init_room(data);

    	assert.equal((cleaner.check_valid_coordinate(5,5,[5,5])), false);
    	assert.equal((cleaner.check_valid_coordinate(5,5,[0,0])), true);
    	assert.equal((cleaner.check_valid_coordinate(5,5,[5,4])), false);
    	assert.equal((cleaner.check_valid_coordinate(5,5,[4,5])), false);
    	assert.equal((cleaner.check_valid_coordinate(5,5,[-1,5])), false);
    	assert.equal((cleaner.check_valid_coordinate(5,5,[5,-1])), false);
	});
});

describe('clean_room', function() {
	
	it('clean room input.txt', function() {
    	var data = cleaner.read_file('input.txt');
    	var room = cleaner.init_room(data);
    	cleaner.clean_room(room);

    	assert.deepEqual(room.end, [1,3]);
    	assert.equal(room.cleaned, 1);
	});

	it('clean room input2.txt', function() {
    	var data = cleaner.read_file('input2.txt');
    	var room = cleaner.init_room(data);
    	cleaner.clean_room(room);

    	assert.deepEqual(room.end, [2,1]);
    	assert.equal(room.cleaned, 2);
	});
});



















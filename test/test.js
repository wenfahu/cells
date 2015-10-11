$(document).ready(function(){
    numOfCells = 5;
    canvas = $('body');
    test('initArray', function(assert){
	var arr = initArray();
	ok(arr[0][0] == 0, '0,0 right');
	ok(arr[0][1] == 0, '0,0 right');
	ok(arr[0][2] == 0, '0,0 right');
	ok(arr[1][0] == 0, '0,0 right');
	ok(arr[1][1] == 0, '0,0 right');
	ok(arr[1][2] == 0, '0,0 right');
	ok(arr[2][0] == 0, '0,0 right');
	ok(arr[2][1] == 0, '0,0 right');
	ok(arr[2][2] == 0, '0,0 right');
    });
    test('aliveNeighbors', function(assert){
	var arr = initArray();
	arr[0][0] = 0;
	arr[0][1] = 1;
	arr[0][2] = 0;
	arr[1][0] = 1;
	arr[1][1] = 0;
	arr[1][2] = 0;
	arr[2][0] = 0;
	arr[2][1] = 0;
	arr[2][2] = 1;
	ok(aliveNeighbors(arr, 0, 0) == 2, '0,0 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 0, 1) == 0, '0,1 has 0 alive neighbors');
	ok(aliveNeighbors(arr, 0, 2) == 2, '0,2 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 1, 0) == 0, '1,0 has 0 alive neighbors');
	ok(aliveNeighbors(arr, 1, 1) == 2, '1,1 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 1, 2) == 2, '1,2 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 2, 0) == 2, '2,0 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 2, 1) == 2, '2,1 has 2 alive neighbors');
	ok(aliveNeighbors(arr, 2, 2) == 0, '2,2 has 0 alive neighbors');
    });
    test('update grid', function(assert){
	var arr = initArray();
	arr[0][0] = 0;
	arr[0][1] = 1;
	arr[0][2] = 0;
	arr[1][0] = 1;
	arr[1][1] = 0;
	arr[1][2] = 0;
	arr[2][0] = 0;
	arr[2][1] = 0;
	arr[2][2] = 1;
	var aux = update(arr);
	ok(aux[0][0] == 0, '0, 0 ok');
	ok(aux[0][1] == 0, '0, 1 ok');
	ok(aux[0][2] == 0, '0, 2 ok');
	ok(aux[1][0] == 0, '1, 0 ok');
	ok(aux[1][1] == 0, '1, 1 ok');
	ok(aux[1][2] == 0, '1, 2 ok');
	ok(aux[2][0] == 0, '2, 0 ok');
	ok(aux[2][1] == 0, '2, 1 ok');
	ok(aux[2][2] == 0, '2, 2 ok');
    });
});

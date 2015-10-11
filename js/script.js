var pixelSize = 4;
var numOfCells = 160;

var canvas = document.getElementById('background');
canvas.width = pixelSize*numOfCells;
canvas.height = pixelSize*numOfCells;

var context = canvas.getContext('2d');
var arr = [];

function initArray(){
    var arr = [];
    for(var i = 0; i < numOfCells; i++){
	arr[i] = [];
	for(var j = 0; j < numOfCells; j++){
	    arr[i][j] = 0;
	}
    }
    return arr;
}

function drawGrid(arr){
    arr.map(function(row, x){
	row.map(function(item, y){
	    drawCell(x, y, item);
	})
    });
}

function drawCell(x, y, alive){
    context.beginPath();
    context.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? 'black': '#eee';
    context.fill();
}

function randomGrid(arr){
    arr.map(function(row, x){
	row.map(function(item, y){
	    if(Math.log(Math.random()*10) < -0.6){
		arr[x][y] = 1;
	    }
	});
    });
}


function aliveNeighbors(arr, x, y){
    if(x >= 0 && y >= 0 && x <= numOfCells - 1 && y <= numOfCells - 1){
	var totalAive = 0;
	function isAlive(x, y){
	    return arr[x] && arr[x][y] && arr[x][y] != 2;
	}
	if(isAlive(x, y-2)) totalAive++; 
	if(isAlive(x, y-1)) totalAive++;
	if(isAlive(x-2, y)) totalAive++; 
	if(isAlive(x-1, y)) totalAive++;
	if(isAlive(x+1, y)) totalAive++; 
	if(isAlive(x+2, y)) totalAive++;
	if(isAlive(x, y+1)) totalAive++;
	if(isAlive(x, y+2)) totalAive++;
	// debugger;
	return totalAive;
    }
    else{
	return 0;
    }
}

function getMouseClickCoordinate(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;
    
    console.log('x: ' + x, 'y: ' + y);

    var x_cord = Math.floor(x/pixelSize);
    var y_cord = Math.floor(y/pixelSize);
    console.log(x_cord, y_cord);

    return {
	X: x_cord,
	Y: y_cord
    }
}

function update(arr){
    var auxArr = initArray();

    arr.map(function(row, x){
	row.map(function(item, y){
	    var cell = item;

	    var alives = aliveNeighbors(arr, x, y);
	    
	    if(cell == 1){
		if(alives < 2){
		    auxArr[x][y] = 0;
		}
		else if(alives == 2 || alives == 3){
		    auxArr[x][y] = 1;
		}
		else if(alives > 3){
		    auxArr[x][y] = 0;
		}
	    }

	    else if(cell == 0 && alives == 3){
		auxArr[x][y] = 1;
	    }
	});
    });
    return auxArr;
}

function _play(){
    var auxArr = update(arr);
    drawGrid(auxArr);
    arr = auxArr;
}

(function(){
    arr = initArray();
    randomGrid(arr); 

    $('button#update').click(function(){
	// var auxArr = update(arr);
	// drawGrid(auxArr);
	// arr= auxArr;
	_play();
    });

    $('button#auto').click(function(){
	setInterval(function(){
	    _play()
	}, 1000)
    });

    $('button#change').click(function(event){
	event.preventDefault();
	numOfCells = $('input[name=cell]').val() || 160;
	arr = initArray();
	randomGrid(arr);
    });

    $(canvas).click(function(event){
	var pos = getMouseClickCoordinate(this, event);
	console.log(pos.X, pos.Y);
	$('tbody').append(
	    '<tr>' +
		'<td>' + pos.X + '</td>' +
		'<td>' + pos.Y + '</td>' +
	    '</tr>'
	);

	arr[pos.X][pos.Y] = 2;
    });
})();
    


Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 49 || charCode > 57))
        return false;    
    return true;
}

function locate_cell(board) {
    for (var j = 0; j < board.length; j++) {
        for (var i = 0; i < board[0].length; i++) {
            if (board[j][i] == 0) {
                return [j, i];
            }
        }
    }
    return null;
}

function check_guess(board, position, guess) {
    var y = position[0],
        x = position[1];
    
    for (var i = 0; i < board[0].length; i++) {
        if (board[y][i] == guess && x != i){
            return false;
        }
    }
    
    for (var j = 0; j < board.length; j++) {
        if (board[j][x] == guess && y != j){
            return false;
        }
    }
    
    var sect_x = Math.floor(x/3)
    var sect_y = Math.floor(y/3)
    
    sect_y_range = Array.range(sect_y*3, sect_y*3 + 3)
    sect_x_range = Array.range(sect_x*3, sect_x*3 + 3)
    
    for (j in sect_y_range) {
        for (i in sect_x_range) {
            if (board[sect_y_range[j]][sect_x_range[i]] == guess && [sect_x_range[i], sect_y_range[j]] != position) {
                return false;
            }
        }
    }
    
    return true;
}

function find_solution(board) {
    var position = locate_cell(board)
    
    if (position == null) {
        return true;
    } else {
        var y = position[0],
            x = position[1];
    }
    
    values = Array.range(1,10)
    attempts = 0;
    for (i in values) {
        if (check_guess(board, [y,x], values[i]) == true) {
            board[y][x] = values[i];
            
            if (find_solution(board) == true) {
                return true;
            }
            
            board[y][x] = 0;
        }
        attempts += 1;
        if (attempts > 50) {
            return false
        }
    }  
}

document.getElementById('solve').addEventListener('click', function(){
    var errmsg = document.getElementById("errmsg");
    errmsg.classList.add("hidden");
    var valueArr = [];
    var totalArr = [];
    var enteredVals =[]
    count = 0;
    rowcount = 0;
    document.querySelectorAll('.aa').forEach(function(el){
        if (el.value == "") {
            valueArr.push(0);
        } else {
            valueArr.push(parseInt(el.value));
            enteredVals.push([rowcount, count])
        }
        count += 1;
        if (count == 9) {
            totalArr.push(valueArr);
            rowcount += 1
            valueArr = [];
            count = 0;
        }
    });
    
    countx = 0;
    county = 0;
    countvals = 0;
    console.log(JSON.parse(JSON.stringify(enteredVals)));
    if (find_solution(totalArr) == true){
        document.querySelectorAll('.bb').forEach(function(el){
            if (countvals < enteredVals.length && county == enteredVals[countvals][0] && countx == enteredVals[countvals][1]) {
                el.innerHTML = totalArr[county][countx];
                el.classList.add("enteredVal")
                countvals += 1;
            } else {
                el.innerHTML = totalArr[county][countx];
            }
            
            countx += 1;
            if (countx == 9) {
                countx = 0;
                county += 1;
            }
        });
        var solution = document.getElementById("solution");
        solution.classList.remove("hidden");
        var inputbox = document.getElementById("inputbox");
        inputbox.classList.add("hidden");
    } else {
        var errmsg = document.getElementById("errmsg");
        errmsg.classList.remove("hidden");
        errmsg.classList.add("fade-in")
    };
});

document.getElementById('reset').addEventListener('click', function(){
    location.reload();
});

document.getElementById('clear').addEventListener('click', function(){
    location.reload();
});
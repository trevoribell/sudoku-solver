board1 = [
    [5,0,0,0,0,0,0,0,2],
    [0,8,0,6,0,0,0,0,5],
    [0,0,0,5,3,4,0,7,0],
    [0,7,0,4,0,0,9,0,0],
    [0,0,8,0,5,0,6,0,0],
    [0,0,1,0,0,3,0,5,0],
    [8,1,3,9,2,0,0,0,0],
    [2,0,0,3,0,1,0,8,0],
    [7,0,0,0,4,0,0,0,3]
]

def display_board(board):
    for j in range(len(board)):
        if j % 3 == 0 and j != 0:
            print("- - - - - - - - - - -")
            
        for i in range(len(board[0])):
            if i % 3 == 0 and i != 0:
                print("| ", end="")
            if i == len(board)-1:
                print(board[j][i])
            else:
                print(str(board[j][i]), end=" ")
    return
                
def locate_cell(board):
    for j in range(len(board)):
        for i in range(len(board[0])):
            if board[j][i] == 0:
                return (j, i)
    return None

def check_guess(board, position, guess):
    y,x = position
    
    for i in range(len(board[0])):
        if board[y][i] == guess and x != i:
            return False
    
    for j in range(len(board)):
        if board[j][x] == guess and y != j:
            return False
        
    sect_x = x // 3
    sect_y = y // 3
    
    for j in range(sect_y*3, sect_y*3 + 3):
        for i in range(sect_x*3, sect_x*3 + 3):
            if board[j][i] == guess and (i,j) != position:
                return False
        
    return True

def find_solution(board):
    find = locate_cell(board)
    if not find:
        return True
    else:
        y,x = find
        
    for i in range(1,10):
        if check_guess(board, (y,x), i):
            board[y][x] = i
            
            if find_solution(board):
                return True
        
            board[y][x] = 0
    return
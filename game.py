import random

# Define the game board
board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]

# Define the possible winning combinations
winning_combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

# Define the players
players = ['X', 'O']

# Get the current player
current_player = random.choice(players)

# Define the function to print the game board
def print_board(board):
    for row in board:
        print(' | '.join(row))
        print('---------')

# Define the function to get the player's move
def get_move(player, board):
    while True:
        try:
            move = int(input(f"{player}'s turn. Enter your move (1-9): ")) - 1
            if 0 <= move < 9 and board[move // 3][move % 3] == ' ':
                return (move // 3, move % 3)
            else:
                print("Invalid move. Try again.")
        except ValueError:
            print("Invalid input. Enter a number between 1 and 9.")

# Define the function to check if the current player has won
def has_won(player, board):
    for winning_combination in winning_combinations:
        if all(board[i // 3][i % 3] == player for i in winning_combination):
            return True
    return False

# Define the function to check if the game is a draw
def is_draw(board):
    return all(board[i // 3][i % 3] != ' ' for i in range(9))

# Define the function to get the next player
def get_next_player(current_player):
    return 'X' if current_player == 'O' else 'O'

# Start the game loop
while True:
    # Display the game board
    print_board(board)

    # Get the player's move
    move = get_move(current_player, board)

    # Update the game board
    board[move[0]][move[1]] = current_player

    # Check if the current player has won
    if has_won(current_player, board):
        print_board(board)
        print(f"{current_player} has won!")
        break

    # Check if the game is a draw
    if is_draw(board):
        print_board(board)
        print("The game is a draw!")
        break
    

    # Switch to the next player
    current_player = get_next_player(current_player)


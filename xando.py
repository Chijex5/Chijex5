import tkinter as tk
import random
from tkinter import messagebox

class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Tic-Tac-Toe")
        self.difficulty_level = None
        self.current_player = None
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.create_widgets()
        self.create_board_buttons()
        self.winning_combinations = [[(0, 0), (0, 1), (0, 2)], [(1, 0), (1, 1), (1, 2)], [(2, 0), (2, 1), (2, 2)],
                                     [(0, 0), (1, 0), (2, 0)], [(0, 1), (1, 1), (2, 1)], [(0, 2), (1, 2), (2, 2)],
                                     [(0, 0), (1, 1), (2, 2)], [(0, 2), (1, 1), (2, 0)]]
        self.player_score = {'X': 0, 'O': 0}
        self.update_score_display()
    def minimax(self, is_maximizing, alpha, beta):
        if self.check_win('O'):
            return 1
        elif self.check_win('X'):
            return -1
        elif self.check_draw():
            return 0

        if is_maximizing:
            best_score = float('-inf')
            for i in range(3):
                for j in range(3):
                    if self.board[i][j] == ' ':
                        self.board[i][j] = 'O'
                        score = self.minimax(False, alpha, beta)
                        self.board[i][j] = ' '
                        best_score = max(score, best_score)
                        alpha = max(alpha, best_score)
                        if beta <= alpha:
                            break  # Beta cut-off
            return best_score
        else:
            best_score = float('inf')
            for i in range(3):
                for j in range(3):
                    if self.board[i][j] == ' ':
                        self.board[i][j] = 'X'
                        score = self.minimax(True, alpha, beta)
                        self.board[i][j] = ' '
                        best_score = min(score, best_score)
                        beta = min(beta, best_score)
                        if beta <= alpha:
                            break  # Alpha cut-off
            return best_score
    
    def heuristic_score(self):
        score = 0
        for combo in self.winning_combinations:
            player_count = combo.count('O')
            opponent_count = combo.count('X')
            if player_count == 2 and opponent_count == 0:
                score += 10  # Two in a row for AI
            elif opponent_count == 2 and player_count == 0:
                score -= 10  # Two in a row for opponent
        return score


    def create_widgets(self):
        # Create the game board frame
        self.board_frame = tk.Frame(self.root)
        self.board_frame.pack()

        # Create the buttons frame
        self.buttons_frame = tk.Frame(self.root)
        self.buttons_frame.pack()

        # Create the reset button
        self.reset_button = tk.Button(self.buttons_frame, text="Reset", command=self.reset_game)
        self.reset_button.pack()

        # Create the difficulty level selection
        self.difficulty_label = tk.Label(self.buttons_frame, text="Select difficulty:")
        self.difficulty_label.pack()
        self.difficulty_var = tk.StringVar()
        self.difficulty_var.set("Easy")
        self.difficulty_menu = tk.OptionMenu(self.buttons_frame, self.difficulty_var, "Easy", "Hard")
        self.difficulty_menu.pack()

        # Create the score display
        self.score_label = tk.Label(self.buttons_frame, text="Score: X - 0  O - 0")
        self.score_label.pack()

    def create_board_buttons(self):
        self.buttons = [[None for _ in range(3)] for _ in range(3)]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j] = tk.Button(self.board_frame, text="", width=5, height=2,
                                                command=lambda row=i, col=j: self.on_button_click(row, col))
                self.buttons[i][j].grid(row=i, column=j)

    def update_score_display(self):
        self.score_label.config(text=f"Score: X - {self.player_score['X']}  O - {self.player_score['O']}")

    def on_button_click(self, row, col):
        if self.current_player == 'X' and self.board[row][col] == ' ':
            self.board[row][col] = 'X'
            self.buttons[row][col].config(text='X')
            if self.check_win('X'):
                self.player_score['X'] += 1
                self.update_score_display()
                self.display_winner('X')
            elif self.check_draw():
                self.display_draw()
            else:
                self.current_player = 'O'
                self.make_ai_move()

    def check_win(self, player):
        for combo in self.winning_combinations:
            if all(self.board[row][col] == player for (row, col) in combo):
                return True
        return False

    def check_draw(self):
        return all(symbol != ' ' for row in self.board for symbol in row)

    def reset_game(self):
        self.current_player = 'X'
        self.difficulty_level = self.difficulty_var.get()
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j].config(text="")
        self.update_score_display()
        if self.current_player == 'O':
            self.make_ai_move()

    def display_winner(self, player):
        messagebox.showinfo("Winner!", f"Player {player} wins!")

    def display_draw(self):
        messagebox.showinfo("Draw!", "The game is a draw!")

    def make_ai_move(self):
       if self.difficulty_level == "Easy":
           empty_cells = [(row, col) for row in range(3) for col in range(3) if self.board[row][col] == ' ']
           if empty_cells:
               row, col = random.choice(empty_cells)
               self.board[row][col] = 'O'
               self.buttons[row][col].config(text='O')
               if self.check_win('O'):
                   self.player_score['O'] += 1
                   self.update_score_display()
                   self.display_winner('O')
               elif self.check_draw():
                   self.display_draw()
               else:
                   self.current_player = 'X'
       else:
           best_score = float('-inf')
           best_move = None
           alpha = float('-inf')
           beta = float('inf')
           for i in range(3):
               for j in range(3):
                   if self.board[i][j] == ' ':
                       self.board[i][j] = 'O'
                       score = self.minimax(False, alpha, beta)
                       self.board[i][j] = ' '
                       if score > best_score:
                           best_score = score
                           best_move = (i, j)
                           alpha = max(alpha, best_score)
                       if beta <= alpha:
                           break  # Beta cut-off
           if best_move:
               row, col = best_move
               self.board[row][col] = 'O'
               self.buttons[row][col].config(text='O')
               if self.check_win('O'):
                   self.player_score['O'] += 1
                   self.update_score_display()
                   self.display_winner('O')
               elif self.check_draw():
                   self.display_draw()
               else:
                   self.current_player = 'X'



root = tk.Tk()
app = TicTacToeGUI(root)
root.mainloop()
# 
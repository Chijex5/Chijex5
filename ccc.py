# -*- coding: utf-8 -*-
"""
Created on Sat Apr 13 09:09:05 2024

@author: CHIJIOKE
"""

# -*- coding: utf-8 -*-
"""
Created on Sat Apr 13 08:17:21 2024

@author: CHIJIOKE
"""

import tkinter as tk
import random

class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Tic-Tac-Toe")
        self.current_player = random.choice(['X', 'O'])
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.create_widgets()
        self.create_board_buttons()
        self.winning_combinations = [[(0, 0), (0, 1), (0, 2)], [(1, 0), (1, 1), (1, 2)], [(2, 0), (2, 1), (2, 2)],
                                     [(0, 0), (1, 0), (2, 0)], [(0, 1), (1, 1), (2, 1)], [(0, 2), (1, 2), (2, 2)],
                                     [(0, 0), (1, 1), (2, 2)], [(0, 2), (1, 1), (2, 0)]]
        self.player_score = {'X': 0, 'O': 0}
        self.update_score_display()

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
        if self.board[row][col] == ' ':
            self.board[row][col] = self.current_player
            self.buttons[row][col].config(text=self.current_player)
            if self.check_win():
                self.player_score[self.current_player] += 1
                self.update_score_display()
                self.display_winner()
                return
            elif self.check_draw():
                self.display_draw()
                return
            self.current_player = 'O' if self.current_player == 'X' else 'X'

    def check_win(self):
        for combo in self.winning_combinations:
            symbol = self.board[combo[0][0]][combo[0][1]]
            if symbol != ' ' and all(self.board[row][col] == symbol for (row, col) in combo):
                return True
        return False

    def check_draw(self):
        return all(symbol != ' ' for row in self.board for symbol in row)

    def reset_game(self):
        self.current_player = random.choice(['X', 'O'])
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j].config(text="")
        self.update_score_display()

    def display_winner(self):
        winner = "Player O" if self.current_player == 'O' else "Player X"
        tk.messagebox.showinfo("Winner!", f"{winner} wins!")
        self.reset_game()

    def display_draw(self):
        tk.messagebox.showinfo("Draw!", "The game is a draw!")
        self.reset_game()

root = tk.Tk()
app = TicTacToeGUI(root)
root.mainloop()

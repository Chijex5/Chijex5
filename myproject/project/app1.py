from flask import Flask, render_template, request, send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('bookshop.html')
@app.route('/dashboard')
def dshboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5000, debug=True)
import os
from flask import Flask, render_template, request, send_file
from class_list2 import print_subject_list  # Import the function from your separate script
from class_list2 import convert_lowercase_to_uppercase

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('second.html')

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    if request.method == 'POST':
        subject_code = request.form['subject_code']  # Get the subject code from the submitted form
        
        # Call the print_subject_list function with the entered subject code
        pdf_path = print_subject_list(subject_code)
        
        if pdf_path and os.path.exists(pdf_path):
            return send_file(pdf_path, as_attachment=True)
        else:
            return "Error: Unable to generate PDF."

if __name__ == '__main__':
    app.run(debug=True)

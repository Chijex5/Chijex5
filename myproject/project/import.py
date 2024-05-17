from flask import Flask, request, jsonify, render_template, session
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

import logging
from datetime import timedelta

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'MonkeyHatesBanana'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)  # Example expiration time
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Iam08023029886$@localhost/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True  
app.config['SESSION_COOKIE_HTTPONLY'] = True  



jwt = JWTManager(app)
db = SQLAlchemy(app)
CORS(app)



class UserProfile(db.Model):
    __tablename__ = 'user_profile'
    id = db.Column(db.Integer, primary_key=True)
    regno = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    department = db.Column(db.String(255))
    address = db.Column(db.String(255))
    level = db.Column(db.String(10))
    password = db.Column(db.String(255))

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    regno = db.Column(db.String(50), db.ForeignKey('user_profile.regno'), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    # Define relationship with UserProfile
    user_profile = db.relationship('UserProfile', backref='user', uselist=False)
    def is_active(self):
        # Always return True to indicate that the user is active
        return True
    def get_id(self):
        # Return the regno attribute as the unique identifier
        return str(self.regno)

class Item(db.Model):
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    regno = db.Column(db.Integer, db.ForeignKey('user.regno'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    department = db.Column(db.String(255))
    address = db.Column(db.String(255))
    level = db.Column(db.String(10))
    
    # Define relationship with User
    user = db.relationship('User', backref='items')
    
logging.basicConfig(filename='app.log', level=logging.INFO)

@app.route('/')
def bookshop():
    return render_template('bookshop.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/protected')
@jwt_required()
def protected_route():
    return jsonify({'message': 'Access granted'})

 




@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        regno = data['regno']
        name = data['name']
        email = data['email']
        phone = data['phone']
        address = data['address']
        department = data['department']
        level = data['level']
        password = data['password']
        # Create a new UserProfile object and add it to the database
        new_user = UserProfile(regno=regno, name=name, email=email, phone=phone, department=department, address=address, level=level, password=password)
        db.session.add(new_user)
        db.session.commit()
        return 'User profile added successfully!'
    except Exception as e:
        logging.exception(f'An error occurred: {e}')
        return 'An error occurred while processing the request.', 500

@app.route('/login', methods=['POST'])
def login():
    # Get username and password from request
    





@app.route('/get_items', methods=['GET'])
@jwt_required()
def get_items():
    try:
        # Get the user's identity from the JWT token
        username = get_jwt_identity()

        # Query the database to retrieve items associated with the current user's username
        items = Item.query.filter_by(regno=username).all()

        # Serialize the items data into JSON format
        items_data = []
        for item in items:
            item_data = {
                'id': item.id,
                'user_id': item.regno,
                'name': item.name,
                'email': item.email,
                'phone': item.phone,
                'department': item.department,
                'address': item.address,
                'level': item.level
            }
            items_data.append(item_data)

        # Return the serialized items data as JSON response
        return jsonify({'items': items_data}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


    
@app.route('/update_item', methods=['POST'])
def update_item():
    # Get the item data from the request body
    item_data = request.json


    item_id = item_data.get('id')  # Assuming you have an 'id' field in the item data
    item = Item.query.get(item_id)
    if item:
        item.name = item_data.get('name')
        item.email = item_data.get('email')
        item.phone = item_data.get('phone')
        item.department = item_data.get('department')
        item.address = item_data.get('address')
        item.level = item_data.get('level')
        
        db.session.commit()
        return jsonify({'message': 'Item updated successfully'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True, threaded=True)
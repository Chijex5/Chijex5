from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Iam08023029886$@localhost/test'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
class LoginDetails(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    regno = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<LoginDetails {self.regno}>'

class ProfileDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('login_details.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<ProfileDetails {self.email}>'
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_username = data.get('new_username')
    new_password = data.get('new_password')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')
    department = data.get('department')
    level = data.get('level')
    name = data.get('name')

    # Check if the regno already exists
    existing_user = LoginDetails.query.filter_by(regno=new_username).first()
    if existing_user:
        return jsonify({'message': 'Registration number already exists'}), 400

    # Create a new user
    new_user = LoginDetails(regno=new_username, password=new_password, name=name)
    db.session.add(new_user)
    db.session.commit()

    # Create a new profile for the user
    new_profile = ProfileDetails(user_id=new_user.id, email=email, phone=phone, address=address, department=department, level=level)
    db.session.add(new_profile)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

    # Create a new user
    new_user = LoginDetails(regno=regno, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Create a new profile for the user
    new_profile = ProfileDetails(user_id=new_user.id, email=email, phone=phone)
    db.session.add(new_profile)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

@login_manager.user_loader
def load_user(user_id):
    return LoginDetails.query.get(int(user_id))

@app.route('/login', methods=['POST'], endpoint='login_api')
def login():
    data = request.get_json()
    regno = data.get('regno')
    password = data.get('password')

    user = LoginDetails.query.filter_by(regno=regno).first()
    if user and user.password == password:
        login_user(user)
        return jsonify({'message': 'Authentication successful'}), 200
    else:
        return jsonify({'message': 'Authentication failed'}), 401

@app.route('/profile', methods=['GET'])
@login_required
def get_profile():
    user_id = current_user.id
    profile = ProfileDetails.query.filter_by(user_id=user_id).first()
    if profile:
        profile_data = {
            'email': profile.email,
            'phone': profile.phone
        }
        return jsonify(profile_data), 200
    else:
        return jsonify({'message': 'Profile not found'}), 404

@app.route('/profile', methods=['PUT'])
@login_required
def update_profile():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    department = data.get('department')
    address = data.get('address')
    level = data.get('level')

    user_id = current_user.id
    profile = ProfileDetails.query.filter_by(user_id=user_id).first()

    if profile:
        profile.email = email
        profile.phone = phone
        profile.department = department
        profile.address = address
        profile.level = level

        # Update the name in the LoginDetails table
        user = LoginDetails.query.get(user_id)
        user.name = name

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'message': 'Profile not found'}), 404

    
from flask_cors import CORS

app = Flask(__name__)
# ... (other app configurations)

CORS(app) 
@app.route('/', endpoint='render_login')
def start():
    return render_template('bookshop.html')



@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

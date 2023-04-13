
from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_migrate import Migrate
from flask_restful import Resource
import bcrypt
from functools import wraps
from flask_cors import CORS

HTTP_METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=HTTP_METHODS, allow_headers=["Content-Type"], supports_credentials=True)
app.secret_key = 'my_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@127.0.0.1:3306/db_note'
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)

def check_password(plain_password, hashed_password):
    plain_password = plain_password.encode('utf-8')
    hashed_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_password, hashed_password) 

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()
    
    # check if the user exists and the password is correct
    if user and check_password(password, user.password):
        session.permanent = True
        session['user_id'] = user.id
        
        return {
            'message': 'user logged in successfully',
            'id': user.id,
            'name': user.name
        }, 200
    else:
        return 'Login failed', 401




def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        #if 'user_id' not in session:
            #return {'message': 'Unauthorized access'}, 401
        return f(*args, **kwds)
    return wrapper

## MODELS
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(255))
    content = db.Column(db.Text)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    user = db.relationship('User', backref=db.backref('notes', lazy='dynamic'))

## APIs
class NoteResource(Resource):
    def post(self):
        data = request.get_json()

        title = data.get('title')
        content = data.get('content')
        due_date = data.get('due_date')
        user_id = data.get('user_id')

        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        note = Note(title=title, content=content, due_date=due_date, user_id=user_id)

        db.session.add(note)
        db.session.commit()

        return {'message': 'Note created successfully'}, 201

    def get(self, note_id=None):
        if note_id:
            note = Note.query.get(note_id)
            if note:
                return {'note': {'id': note.id, 'title': note.title, 'content': note.content, 'due_date': str(note.due_date), 'user_id': note.user_id}}
            else:
                return {'error': 'Note not found'}, 404
        else:
            notes = Note.query.all()
            return {'notes': [{'id': note.id, 'title': note.title, 'content': note.content, 'due_date': str(note.due_date), 'user_id': note.user_id} for note in notes]}

    def put(self, note_id):
        note = Note.query.get(note_id)
        if note:
            data = request.get_json()
            if 'title' in data:
                note.title = data['title']
            if 'content' in data:
                note.content = data['content']
            if 'due_date' in data:
                note.due_date = data['due_date']
            db.session.commit()
            return {'note': {'id': note.id, 'title': note.title, 'content': note.content, 'due_date': str(note.due_date), 'user_id': note.user_id}}
        else:
            return {'error': 'Note not found'}, 404
            
    def delete(self, note_id):
        note = Note.query.get(note_id)
        if note:
            db.session.delete(note)
            db.session.commit()
            return {'message': 'Note deleted successfully.'}
        else:
            return {'error': 'Note not found'}, 404

class UserResource(Resource):
    @authenticate
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if user:
                return {'user': {'id': user.id, 'name': user.name, 'email': user.email}}
            else:
                return {'error': 'User not found'}, 404
        else:
            users = User.query.all()
            return {'users': [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]}

    def post(self):
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')

        existing_user = User.query.filter_by(email=email).first() is not None
        if existing_user:
            return {'error': 'A user with the same email already exists'}, 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = User(name=name, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return {'user': {'id': user.id, 'name': user.name, 'email': user.email}}, 200
    @authenticate
    def put(self, user_id):
        ## user only can update their name
        user = User.query.get(user_id)
        if user:
            name = request.json.get('name', user.name)
            user.name = name
            db.session.commit()
            return {'user': {'id': user.id, 'name': user.name}}
        else:
            return {'error': 'User not found'}, 404
    @authenticate
    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'result': 'User deleted'}
        else:
            return {'error': 'User not found'}, 404

api.add_resource(UserResource, '/user', '/user/<int:user_id>')
api.add_resource(NoteResource, '/note', '/note/<int:note_id>')

@app.route('/')
def index():
    return "App is working!"



@app.route('/logout', methods=HTTP_METHODS)
def logout():
    id = session.pop('user_id', None)
    return 'User logged out ' + str(id) , 200

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Error creating database tables: {e}")
    app.run(port=8001, debug=True)

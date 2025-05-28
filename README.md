# Le Note

a note app, where user can login/signup and write their notes

## Technologies used
- MongoDB
- Express
- React
- NodeJS
## package
- CORS
- Mongoose
- passport
- express-session
- bcrypt

### TODO:
- [x] update note
- [x] (frontend) fix delete btn and box, when deleting note
- [x] (frontend) add user profile image or icon
- [x] (frontend) save button display only on change
- [x] Login/Signup model, logout, function

## Screenshots

### Login screen
![login-screen](/assets/login.png)
### Main screen
![main-screen](/assets/main.png)
### Note added
![added-a-note](/assets/added_note.png)
### Save button display on changes
![updatenote-save-button](/assets/with_saveBtn.png)

## How to use

```
# Clone the repo
git clone https://github.com/CarrotRP/le-note.git

# NOTE: use 2 terminal for this app

# Go to frontend and install dependencies
cd le-note
cd frontend
npm install

# Go to backend and install dependencies
cd le-note
cd backend
npm install

# Create your database in mongoose, get db access, then create .env file inside le-note/backend
# inside .env
# PORT=YOURPORT(3000 is default)
# name='yourdbaccessname'
# password= 'yourdbaccesspw'
# secret= 'anywordorstringyouwant'

# In the backend terminal run
node app

# In the frontend terminal run
npm run dev

```
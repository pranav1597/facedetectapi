const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profileid');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	}
});

db.select('*').from('users').then(data => {
	console.log(data);
});


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('Its working') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req , res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req , res) => { profile.handleProfileId(req, res, db) })
app.put('/profile/image', (req , res) => { image.handleImage(req, res, db) })
app.post('/profile/imageurl', (req , res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
console.log(`app is running on port ${process.env.PORT}`);
});
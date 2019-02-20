/* REQUIRES */
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


/* MODULES */
const sql = require('./sql');
const session = require('./session');

const app = express();

/* USES */
app.use(bodyparser.json());
app.use(cors());

app.use(session.passport.initialize());

/* ROUTES */
app.get('/', function(req, res) {
	res.send('Welcome to the API/Back-end!');
});

app.post('/login', session.passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	
	req.token = session.generateToken(req.user);
	res.json({
		token: req.token,
		user: req.user
	});

});

app.get('/me', session.check, function(req, res) {
  res.json(req.user);
});

/* START SERVER */
app.listen(process.env.PORT || 3000);
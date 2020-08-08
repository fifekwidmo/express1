const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home', (req, res) => {
	res.render('index');
});
app.get('/about', (req, res) => {
	res.render('about');
});
app.get('/history', (req, res) => {
	res.render('history');
});
app.get('/info', (req, res) => {
	res.render('info');
});
app.get('/contact', (req, res) => {
	res.render('contact');
});
app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message, image } = req.body;
	if(author && sender && title && message && image) {
		res.render('contact', { isSent: true, filename: req.body.image });
	}
	else {
		res.render('contact', { isError: true });
	}
});
app.use('/user', (req, res, next) => {
	res.render('forbidden');
});
app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});
app.use((req, res) => {
	res.render('404');
})
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
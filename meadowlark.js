var express = require("express");
var fortunes = require("./lib/fortune.js");

var app = express();

// setup handlebars view engine
var handlebars = require('express3-handlebars')
					.create({ 
						'defaultLayout' : 'main'
					});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

app.set("port", process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use( function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req, res) {
	res.render('about', { 
		fortune : fortunes.getFortune(),
		pageTestScript: '/qa/test-about.js'
	});
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

app.get('/tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

// custom 404
app.use( function(req, res) {
	res.status(404);
	res.render('404');
});

// custom 500
app.use( function(err, req, res, next) {
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen( app.get('port'), function() {
	console.log( 'Express started on http://localhost:' + 
			   app.get('port') + '; press Ctrl+C to terminate.');
});
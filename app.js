var express = require('express');
var path = require('path');

var db = require('mongoskin').db("localhost/testdb", { w: 0});
    db.bind('event');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());



app.get('/events', function(req, res){
	db.event.find().toArray(function(err, data){
		if (err) res.send("error");
		else res.send(data);
	});
});

app.post('/events',function(req, res){
	db.event.insert(req.body, function(err, result){
		if (err) res.send("error");
		else res.send(result[0]);
	});
});

app.put('/events/:id', function(req, res){
	var id = req.params.id;
	delete req.body._id;
	db.event.updateById(id, req.body, function(err, result){
		if (err) res.send("error");
		else res.send(req.body);
	});			
});
app.delete('/events/:id', function(req, res){
	var id = req.params.id;
	db.event.removeById(id, function(err, result){
		if (err) res.send("error");
		else res.send(req.body);
	});
});


app.listen(3000);
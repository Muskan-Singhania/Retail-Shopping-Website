var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/Muskan');

var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email =req.body.email;
	var phone =req.body.phone;
	var user = req.body.user;
	var pass = req.body.password;
	var dob =req.body.dob;

	var data = {
		"firstName":firstName,
		"lastName":lastName,
		"email":email,
		"phone":phone,
		"username":user,
		"password":pass,
		"date of birth":dob
	}
	db.collection('data').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
		console.log(data);
			
	});	
	return res.redirect('signup_success.html');
})



app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
})


app.listen(3001, function() {
	console.log("server listening at port 3001");
});


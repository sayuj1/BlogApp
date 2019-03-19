//importing required modules
var express = require('express');
app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//setting up connection to the database
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true });

//setting up basic things
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// ROUTES

app.get("/", function(req, res){
    res.redirect('/blogs');
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blog});
        }
    });
});

//Server Setup
app.listen(3000, function(){
    console.log("Server started at PORT: 3000");
});
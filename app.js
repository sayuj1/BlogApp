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

//INDEX ROUTE
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

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    var data = {
        title: req.body.title, 
        image: req.body.image,
        body: req.body.body
    }
    Blog.create(data, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//Server Setup
app.listen(3000, function(){
    console.log("Server started at PORT: 3000");
});
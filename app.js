const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//var ts = ["beer","cake"];

app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-mani:Mani@1999@cluster0.xa7r1.mongodb.net/tdlDB",{useNewUrlParser : true, useUnifiedTopology: true});

const tdlSchema = {
  name : String
};

const Item = mongoose.model("Item", tdlSchema);

const i1 = new Item({
  name : " dress "
});

const i2 = new Item({
  name : " dress "
});

const i3 = new Item({
  name : " dress "
});
const defaultitems = [i1,i2,i3];





app.get("/", function(req, res) {

 var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  Item.find({},function(err, found){
    // if(found.length===0){
    //   Item.insertMany(defaultitems, function(err){
    //     if(err){
    //       console.log(err);
    //     }else{
    //       console.log("saved default items to DB");
    //     }
    //   });
    //   res.redirect("/");
    // }
   // else{
        res.render("list", {  kind: day,  nlis: found  });
    // }


  })


});



// app.get("/about",function(req,res){
//   res.render("about");
// })

app.post("/", function(req, res) {
   var itemName = req.body.newitem;
   const item = new Item({
     name : itemName
   });
   item.save();
   res.redirect("/");
});

app.post("/delete", function(req,res){
const checkitem = req.body.cb ;

Item.findByIdAndRemove(checkitem, function(err){
  if(!err){
    console.log("succ in del check item");
  }
  res.redirect("/");

  });



});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {

  console.log("server up");

});

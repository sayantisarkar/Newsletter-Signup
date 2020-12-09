const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members : [
      {
        email_address: email,
        status : "subscribed",
        merge_fields :{
          FNAME :firstName,
          LNAME :lastName
        }
      }
    ]
  };

 var jsonData = JSON.stringify(data);
 console.log (jsonData);

  var options = {
    url : "https://us7.api.mailchimp.com/3.0/lists/757e1eb477",
    method : "POST",
    headers :{
      "Authorization" : "sayanti20 6642b4d9b033896f3245b353900720d1-us7"
    },
    body : jsonData
  };

  request(options, function(error, response,body){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else if(error){
      res.sendFile(__dirname + "/failure.html");
       //console.log(error);
    }else{
      res.sendFile(__dirname + "/failure.html");
      //console.log(response.statusCode);
    }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});

//6642b4d9b033896f3245b353900720d1-us7
//757e1eb477

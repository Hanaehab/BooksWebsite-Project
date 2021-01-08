var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var app = express();
var bodyparser= require('body-parser');
const { render } = require('ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



app.get('/',function(req,res){
  res.render('login')
});

app.get('/registration',function(req,res){
  res.render('registration')
});

app.get('/dune',function(req,res){
  res.render('dune')
});

app.get('/fiction',function(req,res){
  res.render('fiction')
});

app.get('/flies',function(req,res){
  res.render('flies')
});

app.get('/grapes',function(req,res){
  res.render('grapes')
});

app.get('/home',function(req,res){
  res.render('home')
});

app.get('/leaves',function(req,res){
  res.render('leaves')
});

app.get('/mockingbird',function(req,res){
  res.render('mockingbird')
});

app.get('/novel',function(req,res){
  res.render('novel')
});

app.get('/poetry',function(req,res){
  res.render('poetry')
});

app.get('/readlist',function(req,res){
  res.render('readlist')
});

app.get('/searchresults',function(req,res){
  res.render('searchresults')
});

app.get('/sun',function(req,res){
  res.render('sun')
});  



app.use(session({ 
  
  // It holds the secret key for session 
  secret: 'Your_Secret_Key', 
  // Forces the session to be saved 
  // back to the session store 
  resave: true, 
  // Forces a session that is "uninitialized" 
  // to be saved to the store 
  saveUninitialized: true
})) 
 

app.post('/register',function(req,res){
  var x={user: req.body.username , password: req.body.password };
  req.session.name=req.body.username;
  if(!fs.existsSync("users.json"))
  {
  var users =new Array();
  var y= JSON.stringify(users);
  fs.writeFileSync("users.json",y);
  }
  var i= fs.readFileSync("users.json");
  var data = JSON.parse(i);
  var flag= false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x.user){
        flag=true;
        res.render('alertRegistration');
        break;
    }
  } 
  if(flag==false){
    data.push(x);
    var y=JSON.stringify(data);
    fs.writeFileSync("users.json",y);
    //creating wantToRead 
    if(!fs.existsSync("wantToRead.json"))
  {
  var wantToRead =new Array();
  wantToRead.push({user: x.user , books: []});
  var y= JSON.stringify(wantToRead);
  fs.writeFileSync("wantToRead.json",y);
  }
    else{
      var i= fs.readFileSync("wantToRead.json");
      var data = JSON.parse(i);
      data.push({user: x.user , books: []});
      var y=JSON.stringify(data);
      fs.writeFileSync("wantToRead.json",y);
    }
      res.render('home');
}});


app.post('/',function(req,res){
  var x={user: req.body.username , password: req.body.password };
  req.session.name=req.body.username;
  var y= fs.readFileSync("users.json");
  var data = JSON.parse(y);
  var userexists= false;
  for(var i=0;i<data.length;i++){
    if(data[i].user==x.user){
      userexists=true;
      if(data[i].password==x.password){
        res.render('home');
        break;
      }
      else {
        res.render('alertPassword');
      }
    }
  }
  if(userexists==false){
    res.render('alertLoginUsername');
  }
});


app.post('/sun',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='The Sun and Her Flowers'){
             bookExists=true;
             res.render('alertsun');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('The Sun and Her Flowers');
        res.render('sun');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

app.post('/dune',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='Dune'){
             bookExists=true;
             res.render('alertdune');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('Dune');
        res.render('dune');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

app.post('/flies',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='Lord of the Flies'){
             bookExists=true;
             res.render('alertflies');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('Lord of the Flies');
        res.render('flies');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

app.post('/grapes',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='The Grapes of Wrath'){
             bookExists=true;
             res.render('alertgrapes');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('The Grapes of Wrath');
        res.render('grapes');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

app.post('/leaves',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='Leaves of Grass'){
             bookExists=true;
             res.render('alertleaves');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('Leaves of Grass');
        res.render('leaves');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

app.post('/mockingbird',function(req,res){
  var x=req.session.name;
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookExists=false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x){
        for(var j=0;j<data[i].books.length;j++){
           if(data[i].books[j]=='To Kill a Mockingbird'){
             bookExists=true;
             res.render('alertmockingbird');
             break;
           }
        }
        if(bookExists==false){
        data[i].books.push('To Kill a Mockingbird');
        res.render('mockingbird');
        break;
      }
    }
  } 
    var y=JSON.stringify(data);
    fs.writeFileSync("wantToRead.json",y);``
});

var books= [{name: 'The Sun and Her Flowers', ref:'/sun'},
{name: 'To Kill a Mockingbird', ref:'/mockingbird'},
{name: 'Dune', ref:'/dune'},
{name: 'Lord of the Flies', ref:'/flies'},
{name: 'The Grapes of Wrath', ref:'/grapes'},
{name: 'Leaves of Grass', ref:'/leaves'}];



app.post('/search',function(req,res){
var keyword = req.body.Search;
var results=[];
var flag=false;
for(var i=0;i<books.length;i++){
  if(books[i].name.toLowerCase().includes(keyword.toLowerCase())){
    results.push(books[i]);
    flag=true;
    
  }
}
if(flag == false){
  res.render('booknotfound');
}
else{
res.render('searchresults',{results: results});
}
});

app.post('/readlist',function(req,res){
  var x=req.session.name;
  console.log(x);
  var i= fs.readFileSync("wantToRead.json");
  var data = JSON.parse(i);
  var bookNames=[]
  for(var i=0;i<data.length;i++){
    if(data[i].user == x){
      bookNames=data[i].books;
      }  
  }
  var results=[]
  for(var i=0;i<bookNames.length;i++){
    for(var j=0;j<books.length;j++){
      if(bookNames[i] == books[j].name){
        results.push(books[j]);
        }  
    }  
  }
  res.render('readlist',{results: results});
  var y=JSON.stringify(data);
  fs.writeFileSync("wantToRead.json",y);
});

if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log("Server started")});
}
else{
  app.listen(3000,function(){console.log("Server started on port 3000")});
}

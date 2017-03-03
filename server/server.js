var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('superlogin');
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
var config = {
  dbServer: {
    protocol: 'http://',
    host: 'localhost:5984',
    user: 'admin',
    password: 'goltra0121',
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: 'gmail.user@gmail.com',
    options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'userpass'
        }
    }
  },
  security: {
    maxFailedLogins: 3,
    lockoutTime: 600,
    tokenLife: 86400,
    loginOnRegistration: true,
  },
  userModel:{
    whitelist:['profile.empresa','profile.typeuser']
  },
  providers: { 
    local: true
  }
}
function a(){
  console.log(' esto es a y b y c');
}

// Initialize SuperLogin 
var superlogin = new SuperLogin(config);

function associateDB(userDoc){
  if(userDoc){
    console.log('***associateDB*** ');
    console.log(userDoc.profile.empresa);
   superlogin.addUserDB(userDoc._id,userDoc.profile.empresa,'shared'); 
    console.log('***--associateDB--*** ');
  }
}
superlogin.onCreate(function(userDoc,provider){
  associateDB(userDoc);
});
superlogin.on('signup',function(userDoc,provider){
  console.log('****signup evento****');
  
  console.log('****--signup evento--****');
}) 
// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);

app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));
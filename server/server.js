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

app.use(function (req, res, next) {
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
  userModel: {
    whitelist: ['profile.empresa', 'profile.tipoCuenta']
  },
  providers: {
    local: true
  }
}
function a() {
  console.log(' esto es a y b y c');
}

// Initialize SuperLogin 
var superlogin = new SuperLogin(config);

superlogin.onCreate(function (userDoc, provider) {
  return new Promise(function (resolve, reject) {
    console.log(userDoc);
    console.log('resolve promise onCreate');
    var empresa = (userDoc.profile != undefined ? userDoc.profile.empresa : 'ninguna');
    var tipoCuenta = (userDoc.profile != undefined) ? userDoc.profile.tipoCuenta : 'ninguno';
    var ok = true;
    var err;
    console.log('tipo: ' + tipoCuenta);
    var k = [empresa, tipoCuenta]
    //prueba query desde server
    superlogin.userDB.query('goltra/empresa', { key: k })
      .then(function (result) {
        if (result.rows.length > 0) {
          console.log('error, mas de una bd para la empresa');
          err = { status: 400,error:"Database already exist for an account", message: "No puede crear esa empresa porque ya existe" };
          ok = false;
        }

        console.log("Numero de empresas con el nombre " + empresa + ": " + (result.rows.length > 0 ? result.rows[0].value : 0));

        userDoc.personalDBs = {
          [empresa]: {
            name: empresa,
            type: 'shared'
          }
        };

        console.log('Ok vale ');
        console.log(ok);

        if (ok)
          resolve(userDoc);
        else
          reject(err);
      });
    //**************************/

  });
});
// superlogin.on('signup', function (userDoc, provider) {
//   console.log('****signup evento****');

//   console.log('****--signup evento--****');
// })


app.get('/add-uuid',function(req,res){
  
  console.log(req.query.uuid);
  res.send('guardado' + req.query.uuid);
});

// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);

app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));
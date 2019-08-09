var bodyParseer = require("body-parser");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//set up boday parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

require('./routes')

// Index
app.get('/', function(req, res) {
    res.render('index', {loginMessage: '', RegisterMessage: '', typeStatus: '',  infoUser: ''});
});
// Request Password
app.get('/users/forgot-password', function(req, res) {
    res.render('reset_password', { resetPass: '', typeStatus: '', infoUser: ''});
});

// Request the Log in passing the email and password
app.post('/users/login', function(req, res) {
    var infoUser = req.body;
    
  Parse.User.logIn(infoUser.usernameLogin, infoUser.passwordLogin, {
      success: function(user) {
        res.render('index', { loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser});
      },
      error: function(user, error) {
        res.render('index', { loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
      }
  });

});

// Register the user passing the username, password and email
app.post('/users/register', function(req, res) {
    var infoUser = req.body;
    
  var user = new Parse.User();
  user.set("username", infoUser.usernameRegister);
  user.set("password", infoUser.passwordRegister);
  user.set("email", infoUser.emailRegister);

  user.signUp(null, {
    success: function(user) {
      res.render('index', { loginMessage : '', RegisterMessage: "User created!", typeStatus: "success",  infoUser: infoUser});
    },
    error: function(user, error) {
      res.render('index', { loginMessage : '', RegisterMessage: error.message, typeStatus: "danger",  infoUser: infoUser});
    }
  });
});

// Request the Password reset passing the email
app.post('/users/forgot-password', function(req, res) {
    var infoUser = req.body;
    
  Parse.User.requestPasswordReset(infoUser.email, {
    success: function(user) {
      console.log(user);
      res.render('reset_password', { resetPass: "Check your email!", typeStatus: "success", infoUser: infoUser});
    },
    error: function(error) {
      res.render('reset_password', { resetPass: error.message, typeStatus: "danger", infoUser: infoUser});
    }
  });
});
'use strict';

const app = require('../app');





// change password
const success = (data) => {
  console.log(data);
  console.log("Password was succesfully changed!");
  $( '#change-password' ).each(function(){
    this.reset();
  });
};




// Error modal for taken email
const failure = (error) => {
  console.error(error);


$('#sign-up' ).each(function(){
this.reset();
});

};


// Error modal for wrong password
const failureSignIn = () => {
  console.log("Wrong Password!");

  $('#sign-in' ).each(function(){
  this.reset();


});
};



// Sign up
const onSuccess = function (data) {
  app.user = data.user;


console.log(data);
console.log("Sign up was successful!");

$('#sign-up-job-modal').modal('hide');
$(".modal-backdrop").hide();

$('#sign-in-modal-link').show();
$('#sign-up-modal-link').hide();

// reset form fields
$('#sign-up' ).each(function(){
this.reset();
});

};



// Sign in
const signInSuccess = (data) => {
  console.log(data);
  app.user = data.user;
  console.log(app.user._id);
  console.log(app.user.token);


};


// Sign out
const signOutSuccess = () => {


  console.log('You signed out succesfully!');
  delete app.user;


};














module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  onSuccess,

  app,
  failureSignIn,


};

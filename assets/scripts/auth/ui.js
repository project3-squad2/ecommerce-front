'use strict';

const app = require('../app');
const api = require('./api');





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





// handlebars
let displayUploads = function(monsters){
  // debugger;
  let picturesListingTemplate = require('../templates/pictures.handlebars');

  // remove all the content table
   $('#all-monsters').empty();
  // append content from GET request using handlebars
  $('#all-monsters').append(picturesListingTemplate({

  // debugger;
    monsters
  }));
};





const showPicturesSuccess = (data) => {

  app.monsters = data.monsters;

  displayUploads(data);
  console.log(app.monsters);
};


const uploadSuccess =  (data) => {
  console.log(data);

  api.getAllPictures(showPicturesSuccess, failure);

};







// Sign in
const signInSuccess = (data) => {
  console.log(data);
  app.user = data.user;
  console.log(app.user._id);
  console.log(app.user.token);

  console.log(app.user.admin);

   if(app.user.admin === true){
       $('.jumbotron, #monsters, #cart-modal-link, #sign-up-modal-link, #sign-in-modal-link, #orders-modal-link').hide();
       $('#admin, #multipart-form-data, .content').show();


         api.getAllPictures(showPicturesSuccess, failure);

   }

   $('.sign-in-warn').hide();
  $('#checkout-button').show();
};


// Sign out
const signOutSuccess = () => {

  console.log('You signed out succesfully!');
  delete app.user;


};


// success monsters, show up!
const successMonsters = (monsters) => {
   console.log(monsters);

   $('#monsters').empty();

   let displayAllMonsters = require('../templates/display-all-monsters.handlebars');

   $('#monsters').append(displayAllMonsters(monsters));
};


// one monster
const successMonster = (monster) => {
  console.log(monster);
  let oneMonster = require('../templates/monster.handlebars');
  $('#item').modal('show');
  $('#item-add').empty().append(oneMonster(monster));

};







const deleteMonsterSuccess = (data) => {
  console.log(data);
  console.log("Monster is deleted!");

  displayUploads();

  // fire ajax if delete was successful and delete if on the front end
  api.getAllPictures(showPicturesSuccess, failure);
};



// update
const updateMonsterSuccess = (data) => {
  console.log(data);
  console.log("Monster was updated!");


  // fire ajax if update was successful and show jobs on the front end
  api.getAllPictures(showPicturesSuccess, failure);
};






module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  onSuccess,
  successMonster,
  app,
  failureSignIn,
  successMonsters,
  uploadSuccess,
  showPicturesSuccess,
  deleteMonsterSuccess,
  updateMonsterSuccess



};

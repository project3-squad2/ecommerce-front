'use strict';


const getFormFields = require(`../../../lib/get-form-fields`);

const cartStorage = require('./cart_storage');
const api = require('./api');
const ui = require('./ui');

//AUTH EVENTS
// Sign up
const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(this);
  // console.log(data);
   api.signUp(data)
   .done(ui.onSuccess)
   .fail(ui.failure);
};

const showSignUpModal = function showSignUpModal(){
  $('#sign-up-modal').modal('show');
};

const closeModalSignUp = function closeModalSignUp() {
    $('#sign-up-modal').modal('hide');
};


// Sign in
const showSignInModal = function showSignInModal(){
  $('#sign-in-modal').modal('show');
};

const closeModalSignIn = function closeModalSignIn() {
    $('#sign-in-modal').modal('hide');
};


const onSignIn = function (event) {

  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.signIn(data)
   .done(ui.signInSuccess)
   .fail(ui.failureSignIn);
};

// Change passowrd
const showChangePasswordModal = function showChangePasswordModal(){
  $('#change-password-modal').modal('show');
};

const closeModalChangePassword = function closeModalChangePassword() {
    $('#change-password-modal').modal('hide');
};

const onChangePassword = function(event) {
  event.preventDefault();
  let data = getFormFields(this);
  console.log(data);
    api.changePassword(data)
    .done(ui.success)
    .fail(ui.failure);
};

// Sign out
const showSignOutModal = function showSignOutModal(){
  $('#sign-out-modal').modal('show');
};

const closeModalSignOut = function closeModalSignOut() {
    $('#sign-out-modal').modal('hide');
};


const onSignOut = function (event) {
    event.preventDefault();
    api.signOut()
   .done(ui.signOutSuccess)
   .fail(ui.failure);
};
//END AUTH EVENTS



// load all monsters
const onPageLoad = function () {
  //  debugger;
  api.getAllMonsters()
     .done(ui.successMonsters)
     .fail(ui.failure);
};

//show a single monster
const onShowMonster = function (id) {
  console.log(id);
    // event.preventDefault();
    api.showMonster(id)
    // ui.successMonster();
   .done(ui.successMonster)
   .fail(ui.failure);

};

const closeModalCart = function closeModalCart() {
    $('#item').modal('hide');

};


const onAddToCart = function (event) {
  event.preventDefault();
  let form = document.getElementById("form");
  console.log(form);
  let targ = form[1];
    console.log(targ);
  let val = targ.value;
  if (val > 0) {
    closeModalCart();
    cartStorage.addItems();
    $('.item-added').fadeIn(500).fadeOut(1000);
    if (cartStorage.cartObj.items.length > 0) {
      $('.no-items').hide();
    }
  } else {
    $('.invalid').fadeIn(500).fadeOut(1500);
  }
};



const showCartModal = function showCartModal(){
  $('#cart').modal('show');
};



// orders
const showOrdersModal = function showOrdersModal(){
  $('#orders-modal').modal('show');
};



// const closeModalSignOut = function closeModalSignOut() {
//     $('#sign-out-modal').modal('hide');
// };

const uploadMonster = function (){

  event.preventDefault();

  let data = new FormData(this);
  console.log(data);
    $.ajax({
    url: 'http://localhost:3000/monsters',
    method: 'POST',
    contentType: false,
    processData: false,
    data,
  }).done(ui.uploadSuccess)
    .fail((err) => console.error(err));


};




const addHandlers = () => {

    $('#sign-up-modal-link').on('click', showSignUpModal);
    $('#sign-up').on('submit', onSignUp);
    $('#sign-up1').on('click', closeModalSignUp);

    $('#sign-in-modal-link').on('click', showSignInModal);
    $('#sign-in').on('submit', onSignIn);
    $('#sign-in1').on('click', closeModalSignIn);

    $('#change-password-modal-link').on('click', showChangePasswordModal);
    $('#change-password').on('submit', onChangePassword);
    $('#change-password1').on('click', closeModalChangePassword);

    $('#sign-out-modal-link').on('click', showSignOutModal);
    $('#sign-out').on('submit', onSignOut);
    $('#sign-out1').on('click', closeModalSignOut);

    $("#sign-out1").on('click', function () {
          $('#table, #create-job-modal-link').hide();

            location.reload();

    });

//displays all products upon page load
    $(document).ready(onPageLoad);

//show a single monster when the monster is clicked
    $(document).on('click', '.col-md-4', function(){
      let id = $(this).data('id');
      console.log(id);
      onShowMonster(id);
    });

  // cart
    $('.add-to-cart').on('click', onAddToCart);
    $('#cart-modal-link').on('click', function() {
      showCartModal();
    });


// orders
$('#orders-modal-link').on('click', showOrdersModal);

$('#sign-out').on('submit', onSignOut);
$('#sign-out1').on('click', closeModalSignOut);

$('#multipart-form-data').on('submit', uploadMonster);





// $('.btn btn-warning delete-monster').on('click', onDeleteMonster);
$('.delete-monster-btn').on('click', function (event) {
     event.preventDefault();
     let id = $(this).attr("data-monster-id");

    //  debugger;
     api.deleteMonster(ui.deleteMonsterSuccess, ui.failure, id);
   });

  //adds a job id to the submit button
  $('#admin').on('click', '.delete-monster', function(event){
  event.preventDefault();
  let id = $(event.target).attr("data-monster-id");
  $(".delete-monster-btn").attr("data-monster-id", id);
  });



};


module.exports = {
  addHandlers,

};

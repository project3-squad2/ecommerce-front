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


const onAddToCart = function (event) {
  event.preventDefault();
  let form = document.getElementById("form");
  console.log(form);
  let targ = form[1];
    console.log(targ);
  let val = targ.value;
  if (val > 0) {
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

const closeModalCart = function closeModalCart() {
    $('#cart').modal('hide');

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


    $('.add-to-cart').on('click', onAddToCart);
    $('#cart-modal-link').on('click', function() {
      showCartModal();
      // $('.show-cart').empty();
      // let displayCart = require('../templates/cart.handlebars');
      // $('.show-cart').empty().append(displayCart(items));
    });

    $('#checkout').on('click', closeModalCart);

};


module.exports = {
  addHandlers,

};

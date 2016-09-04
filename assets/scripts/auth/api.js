'use strict';

const app = require('../app');
// const api = require('../api');


const signIn = (data) => $.ajax({
  url: app.api + '/sign-in',
  method: 'POST',
  data,
});



const changePassword = (data) => $.ajax({
  url: app.api + '/change-password/' + app.user._id,
  method: 'PATCH',
  data,
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});


const signUp = (data) => $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    data,
   });



const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});



const getAllMonsters = () => $.ajax({
  url: app.api + '/monsters/',
  method: 'GET',

});

const showMonster = (id) => $.ajax({
  url: app.api + '/monsters/' + id,
    method: 'GET',
});



module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getAllMonsters,
  showMonster

};

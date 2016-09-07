'use strict';

const app = require('../app.js');
const api = require('./stripe_api');
const ui = require('./stripe_ui');
const cart = require('./cart_storage');


let currentOrder = {
  "order": cart.cartObj
};


let handler = StripeCheckout.configure({
  key: 'pk_test_cMvUIbtaYpnRoAAdrjFX246D',
  locale: 'auto',
  token: function(token) {
    let credentials = {
      stripeToken: token.id,
      amount: currentOrder.order.total * 100
    };
    api.addStripeCharge(credentials).then(ui.success).catch(ui.failure);
  }
});


const onCheckout = (event) => {
  event.preventDefault();
  if (!app.user || currentOrder.order.total === 0) {
    return;
  }
  let data = currentOrder;
  api.createOrder(data)
    .then(ui.createOrderSuccess)
    .catch(ui.failure);
  handler.open({
    name: 'Monster for hire',
    closed: function() {
      api.changePaidStatus().then(ui.changePaidStatusSuccess).catch(ui.failure);
    },
    amount: currentOrder.order.total * 100
  });
};


const addHandlers = () => {
  $('#checkout-button').on('click', onCheckout);
  $(window).on('popstate', function() {
    handler.close();
  });
};


module.exports = {
  addHandlers,
};

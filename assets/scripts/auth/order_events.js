'use strict';

const api = require('./api');
const orderApi = require('./order_api');
const orderUi = require('./order_ui');
const ui = require('./ui');

const onCart = function(event) {
  event.preventDefault();
  // console.log('Cart Button clicked');
};

const onCheckout = function(event) {
  event.preventDefault();
  // console.log('Checkout Button clicked')
  $('#products').hide();
  $('#checkout-page').show();
};

const onBrowse = function(event) {
  event.preventDefault();
  $('#checkout-page').hide();
  $('#products').show();
};

const onPreviousOrders = (event) => {
  event.preventDefault();
  orderApi.getPreviousOrders()
  .done(orderUi.getOrderSuccess)
  .fail(orderUi.failure);
};

const onDeleteOrder = (event)=> {
  event.preventDefault();
  let orderIDtoDelete = $(event.target).data("order-id");
  // console.log(orderIDtoDelete);
  api.deleteOrder(orderIDtoDelete)
  .done(ui.successDeleteOrder)
  .fail(ui.failure);
};

const addHandlers = () => {
  $('#cart-button').on('click', onCart);
  $('#check-out-button').on('click', onCheckout);
  $('#logo').on('click', onBrowse);
  $('#prev-orders').on('submit', onPreviousOrders);
  $('#checkout-page').hide();
  $(document).on('click','.deleteButtons', onDeleteOrder);
};



module.exports = {
  addHandlers,
  onCart,
  onCheckout,
};

'use strict';

const app = require('../app.js');



const getPreviousOrders = () => {
  return $.ajax({
    url: app.api + '/owner_orders/' + app.user._id,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const deleteOrder = function (orderIDtoDelete) {
  return $.ajax(
  {
    url: app.api + '/orders/' + orderIDtoDelete,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }
  );
};

module.exports = {
  getPreviousOrders,
  deleteOrder,
};

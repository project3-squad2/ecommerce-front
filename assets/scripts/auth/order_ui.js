'use strict';

const app = require('../app.js');

// let displayOrders = function(data) {
//   console.log(data);
//   let getOrders = require('../templates/orders.handlebars');
//     $('#previous-orders').empty().append(getOrders({
//       orders:data.orders
//     }));
//   };

  // let displayOrders = function(data) {
  //   console.log(data);
  //   let getOrders = require('../templates/orders.handlebars');
  //   let templateSource   = $("#orders-template").html(),
  //   template = Handlebars.compile(templateSource),
  //     $('#previous-orders').empty().append(getOrders({
  //       orders:data.orders
  //     }));
  //   };

const getOrderSuccess = (data) => {

  app.orders = data.orders;
  let previousOrders = "<table> <tr> <th>Total</th> <th>Date Purchased</th> <th>Monster</th> <th>Price</th> <th>Quantity</th> </tr>";
    for (let i = 0; i < app.orders.length; i++) {
      previousOrders = previousOrders + "<tr><td>" + app.orders[i].total + "</td>";

      let date = app.orders[i].createdAt.slice(0, 10).split('-');
        previousOrders = previousOrders + '<td>' + date[1] +'/'+ date[2] +'/'+ date[0] + '</td>';

  //for each item in an order
          for(let j=0; j<app.orders[i].items.length;j++) {
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].name + '</td>';
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].price + '</td>';
            previousOrders = previousOrders + '<td>' + app.orders[i].items[j].quantity + '</td>';

          }
      }
  $('#previous-orders').html(previousOrders);
};



module.exports = {
  getOrderSuccess,
};

'use strict';

const app = require('../app.js');

const getOrderSuccess = (data) => {
  // console.log(data);
  app.orders = data.orders;

  if (app.orders.length !== 0)
  {
    //with delete column
    // let orderHistory = "<table> <tr> <th> Delete </th> <th> Total Cost ($) </th> <th> Item </th> <th> Quantity </th> </tr>";
    //without delete column  -- to re add delete button, add the <tr> tag to the first order history
    let orderHistory = "<table> <tr> <th> Total Cost ($) </th> <th> Item </th> <th> Quantity </th> </tr>";

      for (let i = 0; i < app.orders.length; i++)
        {
          // orderHistory = orderHistory + "<td> <button class='deleteButtons' data-order-id='" + app.orders[i]._id + "'>Delete</button>" + "</td>";
          orderHistory = orderHistory + "<tr><td>" + app.orders[i].total + "</td>";
            for(let j=0; j<app.orders[i].items.length;j++)
                                        {
                                        orderHistory = orderHistory + "<td>" + app.orders[i].items[j].name + "</td>";
                                        orderHistory = orderHistory + "<td>" + app.orders[i].items[j].quantity + "</td></tr>";
                                        if (j+1 < app.orders[i].items.length)
                                          {
                                            orderHistory = orderHistory + "<tr><td></td>";
                                          }
                                        }
        }

        orderHistory = orderHistory + "</table>";

    $("#order-history").html(orderHistory);
  }

  else

  {
    $("#order-history").text("Current user does not have any orders..place an order!!");
  }

};


module.exports = {
  getOrderSuccess,
};

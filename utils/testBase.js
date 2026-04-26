const {test} = require("@playwright/test");


exports.customtest = test.extend({
    testDataForOrder:
    {
          email: "Usertest1211@gmail.com",
          password: "Password@1",
          productName: "iphone 13 pro",
          cardNumber: "0001 9931 9292 9999",
          monthValue: "02",
          DateValue: "10",
          cvvNumber: "0099",
          nameOnCard: "Vikas",
          couponCode: "rahulshettyacademy",
          countryName: "India"
     }
})
Feature: Ecommerce Validation
  @Regression
  Scenario: 
    Given a login to Ecommerce application with "Usertest1211@gmail.com" and "Password@1"
    When adding product "iphone 13 pro" to cart
    Then verify "iphone 13 pro" is present in the orders
    When Enter valid details that include "0001 9931 9292 9999" "02" "10" "0019" "Vikas" "rahulshettyacademy" "Usertest1211@gmail.com" "India" details and Place the order
    Then verify order is present in Order History with "Usertest1211@gmail.com" and "iphone 13 pro"


  @Validations
  Scenario Outline: 
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    | username               | password    |
    | Usertest1211@gmail.com | Password@11 |
    | Usertest1288@gmail.com | sPssword@11 |
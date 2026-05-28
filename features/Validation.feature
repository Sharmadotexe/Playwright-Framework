Feature: Ecommerce Validation
  @Validations
  Scenario Outline: 
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    | username               | password    |
    | Usertest1211@gmail.com | Password@11 |
    | Usertest1288@gmail.com | sPssword@11 |
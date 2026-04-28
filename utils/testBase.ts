// customFixture.ts
type TestDataForOrder = {
  email: string;
  password: string;
  productName: string;
  cardNumber: string;
  monthValue: string;
  DateValue: string;
  cvvNumber: string;
  nameOnCard: string;
  couponCode: string;
  countryName: string;
};

type CustomFixtures = {
  testDataForOrder: TestDataForOrder;
};

import { test as base } from '@playwright/test';

export const customtest = base.extend<CustomFixtures>({
  testDataForOrder: {
    email: 'Usertest1211@gmail.com',
    password: 'Password@1',
    productName: 'iphone 13 pro',
    cardNumber: "4419931929299990",
    monthValue: "12",
    DateValue: "10",
    cvvNumber: "1099",
    nameOnCard: 'Vikas',
    couponCode: 'rahulshettyacademy',
    countryName: 'India',
  },
});
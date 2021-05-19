//Setting Status and and Background colors
import * as model from './model.js';
export const setStatusColor = function () {
  model.state.data.forEach(inv => setStatusBgColors(inv));
};

export const setStatusBgColors = function (inv) {
  if (inv.status === 'paid') {
    inv.bgColor = 'bgPaidStatus';
    inv.bgColorCircle = 'bgPaidCircle';
  }
  if (inv.status === 'pending') {
    inv.bgColor = 'bgPendingStatus';
    inv.bgColorCircle = 'bgPendingCircle';
  }

  if (inv.status === 'draft') {
    inv.bgColor = 'bgDraftStatus';
    inv.bgColorCircle = 'bgDraftCircle';
  }

  return inv.bgColor;
};

//Calculating Date
export const calculateDueDate = function (paymentTerm, issueDate) {
  if (paymentTerm === 'Select Payment Terms') {
    return 0;
  }

  let [, number] = paymentTerm.split(' ');
  const result = new Date(issueDate);
  console.log(result);

  number = +number + 1;
  result.setDate(result.getDate() + number);
  const [letterDay, month, day, year, ...rest] = result.toString().split(' ');
  console.log(month, day, year);

  return `${year}-0${result.getMonth() + 1}-${day}`;
};

//Generate new Invoice Id;
export const generateRandomId = function () {
  const letters = randomLetters(2);
  const randomNum = randomInt(0, 9000);
  return letters.concat(randomNum);
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomLetters = function (length) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
};

export const getCreatedDateNumber = function (paymentTerm) {
  let [, number] = paymentTerm.split(' ');

  return +number;
};

export const getBtnValue = function (btnValue) {
  if (btnValue === 'Save & Send') {
    return 'pending';
  } else {
    return 'draft';
  }
};
export const getItemTotal = function (newItem) {
  return newItem.reduce((acc, item) => acc + item.total, 0);
};

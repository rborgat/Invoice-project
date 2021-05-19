import jsonData from '../../data.json';
import Invoice from './invoice';
import { v4 as uuidv4 } from 'uuid';
import * as helper from './helper';

export const state = {
  data: [],
  darkMode: [],
};

const createObject = function () {
  state.data = jsonData.map(obj => {
    const newInvoice = new Invoice();
    newInvoice.id = obj.id;
    newInvoice.timeCreated = obj.createdAt;
    newInvoice.paymentDue = obj.paymentDue;
    newInvoice.description = obj.description;
    newInvoice.paymentTerms = obj.paymentTerms;
    newInvoice.status = obj.status;
    newInvoice.clientEmail = obj.clientEmail;
    newInvoice.clientName = obj.clientName;
    newInvoice.senderAddress = obj.senderAddress;
    newInvoice.clientAddress = obj.clientAddress;
    newInvoice.items = obj.items;
    newInvoice.total = obj.total;
    newInvoice.items[0].itemNamesElId = uuidv4();
    newInvoice.items[0].itemPriceElId = uuidv4();
    newInvoice.items[0].itemQuantityElId = uuidv4();
    newInvoice.items[0].itemTotalElId = uuidv4();
    newInvoice.items[0].itemId = uuidv4();

    return newInvoice;
  });

  helper.setStatusColor();
  setLocalStorage();

  return state.data;
};

const setLocalStorage = function () {
  localStorage.setItem('Data34', JSON.stringify(state.data));
};

const setDarkModeStorage = function () {
  console.log(state.darkMode);

  localStorage.setItem('Color34', JSON.stringify(state.darkMode));
};
export const getDarkModeStorage = function () {
  const colors = localStorage.getItem('Color34');
  console.log(`colors ${colors}`);

  if (colors) {
    state.darkMode = JSON.parse(colors);
    console.log(state.darkMode);
    console.log('Im here');
  }
};
const getLocalStorage = function () {
  const data = localStorage.getItem('Data34');

  return data;
};

export const loadInvoiceData = function () {
  let data = getLocalStorage();

  if (!data) {
    createObject();
    return state.data;
  }
  state.data = JSON.parse(data);
  return state.data;
};

export const findInvoiceById = function (id) {
  return state.data.find(inv => inv.id === id);
};
export const findInvoiceByIdIndex = function (id) {
  return state.data.findIndex(inv => inv.id === id);
};
export const validateForms = function (data) {
  if (data.length > 0) {
    return data.filter(el => el[1] === '');
  }
};
export const deleteInvoice = function (index) {
  state.data.splice(index, 1);
  setLocalStorage();
  return state.data;
};

const createSenderAddress = function (obj) {
  return {
    street: obj.senderStreet,
    city: obj.senderCity,
    postCode: obj.senderZipcode,
    country: obj.senderCountry,
  };
};
const createClientAddreess = function (obj) {
  return {
    street: obj.clientStreet,
    city: obj.clientCity,
    postCode: obj.clientZipcode,
    country: obj.clientCountry,
  };
};
const createItems = function (items) {
  return items.map(data => {
    return {
      id: data.itemId,
      itemName: data.itemName,
      itemPrice: data.itemPrice,
      itemTotal: data.itemTotal,
      itemQuantity: data.itemQuantity,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      total: data.total,
    };
  });
};

export const createNewInvoice = function (obj, items, paymentTerm, btnValue) {
  let newItem = [];
  const newInvoice = new Invoice();
  newInvoice.id = helper.generateRandomId();
  const senderAddress = createSenderAddress(obj);
  const clientAddress = createClientAddreess(obj);

  if (items) {
    newItem = createItems(items);
  }
  newInvoice.timeCreated = obj.issueDate;
  if (paymentTerm && obj.issueDate) {
    newInvoice.paymentDue = helper.calculateDueDate(paymentTerm, obj.issueDate);
  } else {
    newInvoice.paymentDue = '';
  }
  newInvoice.description = obj.projectDescription;
  newInvoice.paymentTerms = helper.getCreatedDateNumber(paymentTerm);
  newInvoice.status = helper.getBtnValue(btnValue);
  newInvoice.clientEmail = obj.clientsEmail;
  newInvoice.clientName = obj.clientsName;
  newInvoice.senderAddress = senderAddress;
  newInvoice.clientAddress = clientAddress;
  newInvoice.items = newItem;
  newInvoice.total = helper.getItemTotal(newItem);

  helper.setStatusBgColors(newInvoice);
  state.data.push(newInvoice);
  setLocalStorage();
};

export const updateInvoice = function (
  invoice,
  obj,
  items,
  paymentTerm,
  btnValue
) {
  let newItem = [];
  if (items) {
    newItem = createItems(items);
  }

  const senderAddress = createSenderAddress(obj);
  const clientAddress = createClientAddreess(obj);

  //console.log(helper.calculateDueDate(paymentTerm, obj.issueDate));

  invoice.timeCreated = obj.issueDate;
  invoice.paymentDue = helper.calculateDueDate(paymentTerm, obj.issueDate);
  invoice.description = obj.projectDescription;
  invoice.paymentTerms = helper.getCreatedDateNumber(paymentTerm);
  invoice.clientEmail = obj.clientsEmail;
  invoice.clientName = obj.clientsName;
  invoice.senderAddress = senderAddress;
  invoice.clientAddress = clientAddress;
  invoice.items = newItem;
  invoice.total = helper.getItemTotal(newItem);

  setLocalStorage();
};
export const changeStatus = function (inv, status) {
  inv.status = status;
  helper.setStatusBgColors(inv);
  setLocalStorage();
  return inv;
};

export const searchByStatus = function (value) {
  return state.data.filter(inv => inv.status === value);
};

export const saveBgColor = function (value) {
  console.log(value);

  if (value) {
    state.darkMode.push(value);
    console.log(state.darkMode);
  } else {
    state.darkMode = [];
  }
  setDarkModeStorage();
};

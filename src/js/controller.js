//import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
//import 'simplebar/dist/simplebar.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import homeView from './view/homePageView';
import detailView from './view/detailView';
import formView from './view/formView';
import itemView from './view/itemView';
import editView from './view/editView';
import headerOptionView from './view/headerOptionView';
import darkView from './view/darkModeView';

const controlDisplayInvoices = function () {
  const data = model.loadInvoiceData();
  homeView.render(data);
  homeView.updateNavBar();
};

const controlDisplayInvoiceDetails = function () {
  const id = window.location.hash.substring(1);
  if (!id) return;
  const invoice = model.findInvoiceById(id);
  detailView.render(invoice);
  detailView.updateHeaderStatus(invoice);
};

const controlFormInput = function (
  data,
  selectPaymentValue,
  selectPaymentElement,
  items,
  btnValue
) {
  formView.removeClasses();

  const formData = model.validateForms(data);

  const bool = formView.handleForm(
    formData,
    selectPaymentElement,
    selectPaymentValue,
    items
  );

  if (bool) return;
  const dataItems = itemView.returnData();
  const obj = Object.fromEntries(data);

  if (btnValue === 'Save Changes') {
    const id = window.location.hash.substring(1);
    const invoice = model.findInvoiceById(id);

    model.updateInvoice(invoice, obj, dataItems, selectPaymentValue, btnValue);
  }
  if (btnValue === 'Save & Send') {
    model.createNewInvoice(obj, dataItems, selectPaymentValue, btnValue);
  }
  itemView.clearItemArray();
  formView.clearForm();
  formView.addByClassName('overlay', 'hidden');
  location.reload();
};
const controlFormInputDraft = function (
  data,
  selectPaymentValue,
  items,
  btnValue
) {
  const obj = Object.fromEntries(data);
  const dataItems = itemView.returnData();
  model.createNewInvoice(obj, dataItems, selectPaymentValue, btnValue);
  itemView.clearItemArray();
  formView.clearForm();
  formView.addByClassName('overlay', 'hidden');
  location.reload();
};

const controlAddNewItem = function (option) {
  itemView.render();
  darkView.itemDarkView();
};

const confirmDeleteItem = function () {
  const id = window.location.hash.substring(1);
  console.log(id);

  if (!id) return;

  const invoice = model.findInvoiceById(id);
  const invIdx = model.findInvoiceByIdIndex(id);
  const data = model.deleteInvoice(invIdx);
  detailView.addByClassName('delete-box', 'hidden');
  detailView.removeByClassName('delete-message', 'hidden');
};
const controlDiscardForm = function () {
  formView.removeClasses();
  itemView.clearItemArray();
  location.reload();
};
const controlStatusChanged = function () {
  const id = window.location.hash.substring(1);
  const invoice = model.findInvoiceById(id);
  const inv = model.changeStatus(invoice, 'paid');
  location.reload();
};
const controlEditInvoice = function () {
  const id = window.location.hash.substring(1);
  const invoice = model.findInvoiceById(id);
  editView.updateForm(invoice);
  itemView.render(invoice.items);
  darkView.itemDarkView(invoice.items);
};
const controlFilterInvoice = function (value) {
  const invoices = model.searchByStatus(value);
  homeView.render(invoices);
  darkView.addBgColorOnLoad(model.state.darkMode);
};
const displayHomeView = function () {
  homeView.render(model.state.data);
  darkView.addBgColorOnLoad(model.state.darkMode);
};
const controlDarkViewMode = function (value) {
  model.saveBgColor(value);
};
const controlLoadDarkView = function () {
  model.getDarkModeStorage();
  darkView.addBgColorOnLoad(model.state.darkMode);
};

const init = function () {
  homeView.addLoadInvoiceHandler(controlDisplayInvoices);
  detailView.deleteBigScreen();
  detailView.deleteSmallScreen();
  detailView.cancelDelete();
  detailView.confirmDeleteDetail(confirmDeleteItem);
  detailView.gobacktoHomePage();
  detailView.markAsPaid(controlStatusChanged);
  detailView.markAsPaidSmall(controlStatusChanged);
  detailView.addHandleEditBtn(controlEditInvoice);
  detailView.addHandlerDetaiLEdit(controlEditInvoice);
  detailView.addLoadInvoiceHandler(controlDisplayInvoiceDetails);
  formView.addHandlerNewInvoice();
  formView.removeHandlerNewInvoice(controlDiscardForm);
  formView.addHandlerPaymentBtn();
  formView.addHandlerPaymentTerms();
  formView._addRemoveFormHandler(controlDiscardForm);

  formView.addNewInvoiceSave(controlFormInput);
  formView.addNewInvoiceDraft(controlFormInputDraft);
  itemView.addHandlerNewItem(controlAddNewItem);
  itemView.addDeleteHandler(controlAddNewItem);
  itemView.addTotalItemHandler();
  headerOptionView.addFilterHandler(displayHomeView);
  headerOptionView.addSelectionOptionHandler(controlFilterInvoice);
  darkView.addBackgroundColor(controlDarkViewMode);
  darkView.addLoadInvoiceHandler(controlLoadDarkView);
};
init();

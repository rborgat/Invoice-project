'use strict';
import View from './view';

class FormView extends View {
  btnSave = document.querySelector('.btn-save');
  form = document.querySelector('form');
  _newInvoice = document.querySelector('.btn-filter');
  _overlays = document.querySelector('.overlay');
  _discardBtn = document.querySelector('.btn-discard');
  _draftBtn = document.querySelector('.btn-draft');
  _selectPayment = document.querySelector('.selected__payment');
  _paymentTerms = document.querySelector('.radio');

  constructor() {
    super();
  }

  clearForm() {
    document.querySelectorAll('input').forEach(input => {
      if (input.type !== 'button') {
        input.value = '';
      }
    });
    this._selectPayment.textContent = 'Select Payment Terms';
  }
  getEmptyElements(data) {
    const elementsArr = [];
    data.forEach(arr => {
      const [...input] = document.getElementsByName(arr[0]);
      const inputEl = input[0];
      const label = input[0].parentElement.firstElementChild;
      const span = label.firstElementChild;
      elementsArr.push(inputEl, label);

      if (span) {
        elementsArr.push(span);
      }
    });
    return elementsArr;
  }
  _updateSelectedPayment(e) {
    const target = e.target.closest('.option');
    const value = target.lastElementChild.textContent;

    this._selectPayment.textContent = value;
    document
      .querySelector('.select__payment-container ')
      .classList.remove('active');
  }
  addHandlerPaymentTerms() {
    document
      .querySelector('.select__payment-container')
      ?.addEventListener('click', this._updateSelectedPayment.bind(this));
  }
  addHandlerPaymentBtn() {
    this._selectPayment?.addEventListener('click', function (e) {
      document
        .querySelector('.select__payment-container ')
        .classList.toggle('active');
    });
  }
  addHandlerNewInvoice() {
    this._newInvoice?.addEventListener('click', function () {
      document.querySelector('.overlay').classList.remove('hidden');
    });
  }
  removeHandlerNewInvoice(handler) {
    this._discardBtn?.addEventListener('click', e => {
      document.querySelector('.overlay').classList.add('hidden');

      this.clearForm();
      handler();
    });
  }
  _addRemoveFormHandler(handler) {
    document.querySelector('.overlay').addEventListener('click', e => {
      console.log(e.target);

      if (!e.target.classList.contains('overlay')) return;
      this.addByClassName('overlay', 'hidden');
      handler();
    });
  }
  _addHandlerGetInvoice() {
    const items = document.querySelector('.item_name');
    const dataArr = [...new FormData(this.form)];
    return {
      items,
      dataArr,
    };
  }

  addNewInvoiceSave(handler) {
    this.btnSave?.addEventListener('click', e => {
      e.preventDefault();
      const obj = this._addHandlerGetInvoice();
      console.log(e.target);

      handler(
        obj.dataArr,
        this._selectPayment.textContent,
        this._selectPayment,
        obj.items,
        e.target.value
      );
    });
  }
  addNewInvoiceDraft(handler) {
    this._draftBtn?.addEventListener('click', e => {
      e.preventDefault();
      const obj = this._addHandlerGetInvoice();
      handler(
        obj.dataArr,
        this._selectPayment.textContent,
        this._selectPayment,
        obj.items,
        e.target.value
      );
    });
  }
  removeClasses() {
    this.removeByClassName('text-alert', 'text-alert');
    this.removeByClassName('border-alert', 'border-alert');
    this.addByClassName('itemErrorMessage', 'hidden');
    this.addByClassName('allItemMessage', 'hidden');
    this.addByClassName('label-span', 'hidden');
  }
  handleForm(formData, selectPaymentElement, selectPaymentValue, items) {
    if (
      formData.length > 0 ||
      selectPaymentValue === 'Select Payment Terms' ||
      !items
    ) {
      if (formData.length > 0) {
        const elements = this.getEmptyElements(formData);
        this.addClassByElements('text-alert', elements);
        this.addClassByElements('border-alert', elements);
        this.removeByClassName('allItemMessage', 'hidden');
      }
      if (selectPaymentValue === 'Select Payment Terms') {
        this.addClassByElements('border-alert', [selectPaymentElement]);
      }
      if (!items) {
        this.removeByClassName('itemErrorMessage', 'hidden');
      }

      return true;
    }
    return false;
  }
}

export default new FormView();

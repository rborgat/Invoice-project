import View from './view';
import { v4 as uuidv4 } from 'uuid';
import icons from '../../../src/img/*.svg';
class ItemView extends View {
  _parentElement = document.querySelector('.allItems');
  _andNewItenBtn = document.querySelector('.btn__add-item');
  index = 0;
  constructor() {
    super();
    this._data = [];

    self = this;
  }

  updateItemValues(
    id,
    quantityValue = '',
    priceValue = '',
    totalValue = '',
    itemNameValue = ''
  ) {
    const item = this._findItem(id);

    item.quantity = quantityValue;
    item.price = priceValue;
    item.total = totalValue;
    item.name = itemNameValue;

    const markup = this.generateMarkupItem(item);

    item.markup = markup;
  }
  clearItemArray() {
    this._data = [];
    this._parentElement.innerHTML = '';
  }
  _addTotal(quantityValue, priceValue) {
    const total = quantityValue * priceValue;
    return total;
  }
  _clearItemValues(priceEl, totalEl, quantityEl) {
    quantityEl.lastElementChild.value = '';
    totalEl.lastElementChild.value = '';
    priceEl.lastElementChild.value = '';
  }
  returnData() {
    return this._data;
  }
  _addPriceHandler(itemPrice) {
    const id = itemPrice.parentElement.parentElement.dataset.id;
    const priceValue = +itemPrice.value;
    const [itemName, quantityEl, priceEl, totalEl] = [
      ...itemPrice.parentElement.parentElement.children,
    ];

    if (priceValue < 1) {
      alert('Price should be positive');
      this._clearItemValues(priceEl, totalEl, quantityEl);
      this.updateItemValues(id);
      return;
    }
    const quantityValue = +quantityEl.lastElementChild.value;

    if (quantityValue >= 1) {
      const itemNameValue = itemName.lastElementChild.value;
      this.UpdateValues(id, quantityValue, priceValue, totalEl, itemNameValue);
    }
  }

  _addQuantityHandler(itemQuantity) {
    const quantityValue = +itemQuantity.value;
    const id = itemQuantity.parentElement.parentElement.dataset.id;

    const [itemName, quantityEl, priceEl, totalEl] = [
      ...itemQuantity.parentElement.parentElement.children,
    ];
    if (quantityValue < 1) {
      alert('Quantity should be positive');
      this._clearItemValues(priceEl, totalEl, quantityEl);
      this.updateItemValues(id);
      return;
    }
    const priceValue = +priceEl.lastElementChild.value;
    const itemNameValue = itemName.lastElementChild.value;
    if (priceValue >= 1) {
      this.UpdateValues(id, quantityValue, priceValue, totalEl, itemNameValue);
    }
  }

  UpdateValues(id, quantityValue, priceValue, totalEl, itemNameValue) {
    const totalValue = this._addTotal(quantityValue, priceValue);
    this.updateItemValues(
      id,
      quantityValue,
      priceValue,
      totalValue,
      itemNameValue
    );
    totalEl.lastElementChild.value = this._convertNumber(totalValue);
  }
  addTotalItemHandler() {
    document.querySelector('.allItems')?.addEventListener('input', e => {
      e.preventDefault();
      if (e.target.classList.contains('item_price')) {
        this._addPriceHandler(e.target);
      }
      if (e.target.classList.contains('item_quantity')) {
        this._addQuantityHandler(e.target);
      }
      if (e.target.classList.contains('item_name')) {
        const id = e.target.parentElement.parentElement.dataset.id;
        const value = e.target.parentElement.lastElementChild.value;
        this.updateItemValues(id, '', '', '', value);
      }
      return;
    });
  }
  _findItem(id) {
    return this._data.find(m => m.itemId === id);
  }

  _findItemByIndex(id) {
    return this._data.findIndex(m => m.id === id);
  }
  deleteFromArr(id, element) {
    const index = this._findItemByIndex(id);
    this._data.splice(index, 1);
    element.remove();
  }
  addDeleteHandler(handler) {
    document
      .querySelector('.allItems')
      ?.addEventListener('click', function (e) {
        const target = e.target.closest('.delete-icon');
        if (!target) return;
        const element = e.target.parentElement.parentElement;
        self.deleteFromArr(element.id, element);
      });
  }
  addHandlerNewItem(handler) {
    this._andNewItenBtn?.addEventListener('click', e => {
      e.preventDefault();
      const obj = this._createNewItem();
      handler(obj);
    });
  }

  _createNewItemObj() {
    const itemNamesElId = uuidv4();
    const itemQuantityElId = uuidv4();
    const itemPriceElId = uuidv4();
    const itemTotalElId = uuidv4();
    const itemId = uuidv4();

    const obj = {
      itemId,
      itemNamesElId,
      itemPriceElId,
      itemTotalElId,
      itemQuantityElId,
      name: '',
      quantity: '',
      price: '',
      total: '',
    };
    return obj;
  }
  _createNewItem() {
    const item = this._createNewItemObj();
    this._data.push(item);
    return this._data;
  }

  generateMarkup() {
    return this._data.map(m => this.generateMarkupItem(m)).join('');
  }
  generateMarkupItem(obj) {
    return `
    <div class="form__item-list--detail" data-id= "${obj.itemId}" >
    <div class="form__group item-names "  >
      <label for="${obj.itemNamesElId}" class="form__label">Item Name</label>
      <input type="text" class="form__input item_name" name="${
        obj.itemNamesElId
      }" value = "${obj.name}" placeholder="Banner Design" id="${
      obj.itemNamesElId
    }">
     </div>
     <div class="form__group itemQuantity">
      <label for="${obj.itemQuantityElId}" class="form__label">Qty.</label>
      <input type="number" class="form__input item_quantity" name="${
        obj.itemQuantityElId
      }" placeholder="1" value = "${obj.quantity}" id="${obj.itemQuantityElId}">
     </div>
     <div class="form__group">
      <label for="${obj.itemPriceElId}" class="form__label">Price</label>
      <input type="number" class="form__input item_price" name="${
        obj.itemPriceElId
      }" value= "${obj.price}"placeholder="156.00" id="${obj.itemPriceElId}" >
     </div>
     <div class="form__group">
      <label for="${
        obj.itemTotalElId
      }" class="form__label" id="item-total-label">Total</label>
      <input type="text" class="form__input item_total" name= "${
        obj.itemTotalElId
      }" value ="${this._convertNumber(obj.total)}" placeholder="156.00" id="${
      obj.itemTotalElId
    }" disabled>
     </div>
     <div class="icon-delete"><img class="delete-icon" data-idx="${
       this.index
     }" src="${icons['icon-delete']}" alt="icon-delete"></div>

    </div> 
        `;
  }
}

export default new ItemView();

import View from './view';
import Invoice from '../invoice';
import icons from '../../../src/img/*.svg';

class HomePageView extends View {
  _parentElement = document.querySelector('.invoice');
  _beginText = document.querySelector('.start-text');
  _endText = document.querySelector('.end-text');
  _invoiceTxt = document.querySelector('.invoice__text');
  _totalTxt = document.querySelector('.total-text');
  _numberTxt = document.querySelector('.number-text');
  constructor() {
    super();
  }

  updateNavBar() {
    if (!this._data) {
      this._invoiceTxt.textContent = 'No invoices';
      return;
    }

    if (this._beginText && this._totalTxt && this._numberTxt && this._endText) {
      this._beginText.textContent = 'There are ';
      this._totalTxt.textContent = 'total ';
      this._numberTxt.textContent = `${this._data.length} `;
      this._endText.textContent = 'invoices';
    }
  }

  generateMarkup() {
    return this._data.map(inv => this.generateMarkupItem(inv)).join('');
  }

  generateMarkupItem(inv) {
    return `
    <a href="./detail.html#${inv.id}" class="invoice__item">
    <span class="invoice__item--ticket"><div class="hash">#</div>${
      inv.id
    }</span>
    <span class="invoice__item--date">${this._convertDate(
      inv.paymentDue
    )}</span>
    <span class="invoice__item--name">${this._convertName(
      inv.clientName
    )}</span>
    <span class="invoice__item--amount">${this._convertNumber(inv.total)}</span>

    <div class ="status__box-contanainer">
    <div class="status__box ${inv.bgColor}">
      <div class="status">
        <div class="status__circle ${inv.bgColorCircle}"></div>
        <div class="status__word">${inv.status}</div>
      </div>
    </div>
    </div>

    <span class="invoice__arrow-left-icon">
      <img src="${icons['icon-arrow-right']}" alt=""
    /></span>
    </a>
    
    `;
  }
}

export default new HomePageView();

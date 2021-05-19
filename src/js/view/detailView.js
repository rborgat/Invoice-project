import View from './view';

class DetailView extends View {
  _parentElement = document.querySelector('.invoice__detail');
  _statusBox = document.querySelector('.header-detail__status-box');
  _statusCircle = document.querySelector('.circles');
  _statusWord = document.querySelector('.words');
  _deleteFirstBtn = document.querySelector('.delete-first');
  _cancelBtn = document.querySelector('.btn-cancel');
  _confirmDeleteBtn = document.querySelector('.delete-confirm');
  _detailEditBtn = document.querySelector('.btn-edit');
  generateMarkup() {
    const markup = this.generateMarkupItem(this._data);

    return markup;
  }
  updateDiv() {
    $('#here').load(window.location.href + ' #here');
  }
  _generateIndividualItemMarkup(inv) {
    const markup = inv.items
      .map(item => this._generateIndividualItem(item))
      .join('');

    return markup;
  }
  markAsPaid(handler) {
    document.querySelector('.btn-paid-detail')?.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
  markAsPaidSmall(handler) {
    document
      .querySelector('.btn-mark-as-paid-small-screen')
      ?.addEventListener('click', function (e) {
        e.preventDefault();
        handler();
      });
  }
  gobacktoHomePage() {
    document.querySelector('.btn-goback')?.addEventListener('click', e => {
      this.addByClassName('overlay', 'hidden');
      this.addByClassName('delete-message', 'hidden');
    });
  }
  startDelete() {
    const id = window.location.hash;
    document.querySelector('.ticket__number').textContent = id;
    document.querySelector('.id').textContent = id;
    this.removeByClassName('overlay', 'hidden');
    this.addByClassName('overlay-box', 'hidden');
    this.addByClassName('btn__section', 'hidden');
    this.removeByClassName('delete-box', 'hidden');
  }
  deleteBigScreen() {
    document.querySelector('.delete-first')?.addEventListener('click', e => {
      e.preventDefault();
      this.startDelete();
    });
  }
  deleteSmallScreen() {
    document
      .querySelector('.btn-delete-small-screen')
      ?.addEventListener('click', e => {
        e.preventDefault();
        this.startDelete();
      });
  }
  cancelDelete() {
    this._cancelBtn?.addEventListener('click', e => {
      e.preventDefault();
      this.addByClassName('overlay', 'hidden');
      this.addByClassName('overlay-box', 'hidden');
      this.addByClassName('btn__section', 'hidden');
      this.addByClassName('delete-box', 'hidden');
      this.addByClassName('delete-message', 'hidden');
    });
  }
  confirmDeleteDetail(handler) {
    this._confirmDeleteBtn?.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  addHandleEditBtn(handler) {
    this._detailEditBtn?.addEventListener('click', e => {
      e.preventDefault();
      this.removeByClassName('overlay', 'hidden');
      this.removeByClassName('overlay-box', 'hidden');
      this.removeByClassName('btn__section', 'hidden');
      this.addByClassName('delete-box', 'hidden');
      this.addByClassName('delete-message', 'hidden');

      handler();
    });
  }
  addHandlerDetaiLEdit(handler) {
    document.querySelector('.btn-detail-edit')?.addEventListener('click', e => {
      e.preventDefault();
      this.removeByClassName('overlay', 'hidden');
      this.removeByClassName('overlay-box', 'hidden');
      this.removeByClassName('btn__section', 'hidden');
      this.addByClassName('delete-box', 'hidden');
      this.addByClassName('delete-message', 'hidden');

      handler();
    });
  }
  _generateIndividualItem(item) {
    return `
             <tr>
                <td class="item-name">${item.name}</td>
                <td class="item-quantity">${item.quantity}</td>
                <td class="item-price">${this._convertNumber(item.price)}</td>
                <td class="total">${this._convertNumber(item.total)}</td>
              </tr>
      `;
  }
  generateMarkupItem(inv) {
    return `
          <div class="invoice__detail-title margin-bottom-small">
            <div class="invoice__detail-title__box--1">
              <h2 class="invoice__detail-title__ticket-number heading-tertiary">
                <span>#</span>${inv.id}
              </h2>
              <p class="invoice__detail-title__company-name">${
                inv.description
              }</p>
            </div>
            <div class="invoice__detail-title__box--2">
              <p class="company-street">${inv.senderAddress.street}</p>
              <p class="company-city">${inv.senderAddress.city}</p>
              <p class="company-zipcode">${inv.senderAddress.postCode}</p>
              <p class="company-country">${inv.senderAddress.country}</p>
            </div>
          </div>
          <div class="invoice__detail-customer-info margin-bottom-small">
            <div class="invoice__detail-dates">
              <p class="margin-bottom-extra-small">Invoice Date</p>
              <p
                class="invoice__detail-invoice-date heading-tertiary margin-bottom-small"
              >
               ${this._convertDate(inv.timeCreated)}
              </p>
              <p class="margin-bottom-extra-small">Payment Due</p>
              <p class="invoice__detail-payment-due-date heading-tertiary">
                ${this._convertDate(inv.paymentDue)}
              </p>
            </div>
            <div class="invoice__detail-customer-billing-info">
              <p class="margin-bottom-extra-small">Bill To</p>
              <p
                class="invoice__detail-customer-name heading-tertiary margin-bottom-mini"
              >
                ${inv.clientName}
              </p>
              <p class="invoice__detail-customer-street">${
                inv.clientAddress.street
              }</p>
              <p class="invoice__detail-customer-city">${
                inv.clientAddress.city
              }</p>
              <p class="invoice__detail-customer-country">${
                inv.clientAddress.postCode
              }</p>
              <p>${inv.clientAddress.country}</p>
            </div>
            <div class="invoice__detail-customer-email-info">
              <p class="margin-bottom-extra-small">Sent to</p>
              <p class="invoice__detail-customer-email heading-tertiary info">
                ${inv.clientEmail}
              </p>
            </div>
          </div>
          <div class="invoice__detail-ticket">
            <table id="t01" class="">
              <tr>
                <th>Item Name</th>
                <th>QTY.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              ${this._generateIndividualItemMarkup(inv)}
            </table>

            <div class="total__bar">
              <p class="ticket__total-title">Amount Due</p>
              <p class="invoice__total">${this._convertNumber(inv.total)}</p>
            </div>
          </div>
        
    
    `;
  }
  updateHeaderStatus(inv) {
    this._statusBox.classList.add(inv.bgColor);
    this._statusCircle.classList.add(inv.bgColorCircle);
    this._statusWord.textContent = inv.status;
  }
}

export default new DetailView();

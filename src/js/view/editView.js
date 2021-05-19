import View from './view';

class EditView extends View {
  form = document.querySelector('form');
  updateForm(invoice) {
    const dataArr = [...new FormData(this.form)];

    let elements = Array.from(this._createElements(dataArr));

    this._updateElements(elements, invoice);
  }

  _createElements(arr) {
    return arr
      .map(el => {
        return [...document.getElementsByName(el[0])];
      })
      .flat();
  }
  _updateElements(elements, invoice) {
    elements[0].value = invoice.senderAddress.street;
    elements[1].value = invoice.senderAddress.city;
    elements[2].value = invoice.senderAddress.postCode;
    elements[3].value = invoice.senderAddress.country;
    elements[4].value = invoice.clientName;
    elements[5].value = invoice.clientEmail;
    elements[6].value = invoice.clientAddress.street;
    elements[7].value = invoice.clientAddress.city;
    elements[8].value = invoice.clientAddress.postCode;
    elements[9].value = invoice.clientAddress.country;
    elements[10].valueAsDate = new Date(invoice.timeCreated);
    elements[11].value = invoice.description;
    document.querySelector('.selected__payment').textContent =
      invoice.paymentTerms === null
        ? 'Select Payment Terms'
        : this.paymentTerm(invoice.paymentTerms);
    console.log(invoice.paymentTerms);
    console.log('dakdladlsdl');

    document.querySelector('.ticket-edit').textContent = '';
    document.querySelector('.ticket-edit').textContent = `#${invoice.id}`;
  }
}

export default new EditView();

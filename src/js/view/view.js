export default class View {
  _data;
  _parentElement = '';

  constructor() {}
  render(data = '', option = false) {
    if (data) {
      this._data = data;
    }

    const markup = this.generateMarkup(option);
    if (this._parentElement) {
      this._parentElement.innerHTML = '';
    }
    this._parentElement?.insertAdjacentHTML('afterbegin', markup);
  }
  addLoadInvoiceHandler(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  _convertNumber(num) {
    let numeral = require('numeral');
    let total = numeral(num).format('$0,0.00');
    return total;
  }
  _convertDate(date) {
    let result = '';
    date = date + 'T00:00';
    const newDate = new Date(date);
    const [letterDay, month, day, year, ...rest] = newDate
      .toString()
      .split(' ');

    if (Object.prototype.toString.call(newDate) === '[object Date]') {
      // it is a date
      if (isNaN(newDate.getTime())) {
        // d.valueOf() could also work
        result = '';
      } else {
        result = `Due ${day} ${month} ${year}`;
      }
    } else {
      // not a date
    }

    return result;
  }

  _convertName(name) {
    if (name) {
      let [firstName, lastName] = name.split(' ');
      lastName = lastName[0];
      return name.length >= 10 ? `${firstName} ${lastName}.` : name;
    } else {
      return '';
    }
  }

  removeByClassName(className, classToRemove) {
    console.log(className, classToRemove);

    document.querySelectorAll(`.${className}`).forEach(cl => {
      cl.classList.remove(classToRemove);
    });
  }
  addByClassName(className, classToRemove) {
    document
      .querySelectorAll(`.${className}`)
      .forEach(cl => cl.classList.add(classToRemove));
  }

  removeClassByElements(className, elements) {
    elements.forEach(el => {
      el.classList.remove(className);
    });
  }
  addClassByElements(name, elements) {
    elements.forEach(el => {
      if (el.className === 'label-span hidden') {
        el.classList.remove('hidden');
      } else {
        el.classList.add(name);
      }
    });
  }

  paymentTerm = function (term) {
    if (term === 1) {
      return 'Net 1 Day';
    }
    if (term === 7) {
      return 'Net 7 Days';
    }
    if (term == 14) {
      return 'Net 14 Days';
    }
    if (term === 30) {
      return 'Net 30 Days';
    }
  };
}

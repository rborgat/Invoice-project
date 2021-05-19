import View from './view';
import icons from '../../../src/img/*.svg';

class DarkModeView extends View {
  _imgBox = document.querySelector('.sidebar__bottom');
  _body = document.querySelector('body');
  _header = document.querySelector('.header');
  _invoiceTitle = document.querySelector('.invoice__title');
  _sidebar = document.querySelector('.sidebar');
  _btnDraft = document.querySelector('.btn-draft');
  _options = document.querySelector('.options');
  _optionsLabel = document.querySelectorAll('.options__radio-label');
  _headerDetail = document.querySelector('.header-detail__container');
  _invoiceDetail = document.querySelector('.invoice__detail');
  _colorMix = document.querySelectorAll('.colorMix');
  _table = document.querySelector('table');
  _totalBar = document.querySelector('.total__bar');
  _bgNAVY = document.querySelector('.bgDarkNavy');
  addBackgroundColor(handler) {
    let classN;
    this._imgBox?.addEventListener('click', e => {
      this._body.classList.toggle('bgDarkNavy');
      this.darkViewAddByToggle();

      classN = this._body.className;
      if (classN) {
        this.darKViewByCSSStyle();
        this.darkViewChangeIcon(true);
      }

      if (!classN) {
        this.darkViewClearCSSStyle();
        this.darkViewChangeIcon(false);
      }

      handler(classN);
    });
  }

  addBgColorOnLoad(data) {
    console.log(data);

    if (data?.length >= 1) {
      this._body.classList.add('bgDarkNavy');
      this.darkViewAdd();

      this.darKViewByCSSStyle();
    }
  }

  itemDarkView(items) {
    if (document.querySelector('body').classList.contains('bgDarkNavy')) {
      document.querySelectorAll('form input')?.forEach(input => {
        input.style.color = 'white';
        input.style.backgroundColor = '#252945';
      });
      document
        .querySelectorAll('form label')
        ?.forEach(input => input.classList.add('colorTextWhite'));
    } else {
      document.querySelectorAll('form input')?.forEach(input => {
        input.style.color = '';
        input.style.backgroundColor = '';
      });

      document
        .querySelectorAll('form label')
        ?.forEach(input => input.classList.remove('colorTextWhite'));
    }
  }

  darkViewAdd() {
    document.querySelectorAll('.invoice__item')?.forEach(cl => {
      cl.classList.add('bgNavyL');
      cl.classList.add('colorTextWhite');
    });

    document.querySelectorAll('.invoice__item--amount')?.forEach(cl => {
      cl.classList.add('colorTextWhite');
    });
    document.querySelectorAll('.hash')?.forEach(cl => {
      cl.classList.add('lightPrimaryText');
    });
    document.querySelectorAll('.invoice__item--ticket')?.forEach(cl => {
      cl.classList.add('colorTextWhite');
    });
    this._sidebar?.classList.add('bgNavyL');
    this._header?.classList.add('colorTextWhite');
    this._invoiceTitle?.classList.add('colorTextWhite');
    this._options?.classList.add('bgNavyL');
    this._optionsLabel?.forEach(label => {
      label.classList.add('colorTextWhite');
    });
    this._headerDetail?.classList.add('bgNavyL');
    this._invoiceDetail?.classList.add('colorTextWhite');
    this._invoiceDetail?.classList.add('bgNavyL');
    document.querySelector('.detail-buttons')?.classList.add('bgNavyL');
    document
      .querySelector('.invoice__detail-customer-name')
      ?.classList.add('colorTextWhite');
    document
      .querySelector('.invoice__detail-customer-email')
      ?.classList.add('colorTextWhite');
    document
      .querySelector('.invoice__detail-invoice-date')
      ?.classList.add('colorTextWhite');
    document
      .querySelector('.invoice__detail-payment-due-date')
      ?.classList.add('colorTextWhite');
    document
      .querySelector('.invoice__detail-title__ticket-number')
      ?.classList.add('colorTextWhite');
    document.querySelector('.status-word')?.classList.add('colorTextWhite');
    document.querySelector('table')?.classList.add('bgNavyL');

    document.querySelector('.overlay__container')?.classList.add('bgDarkNavy');
    document.querySelector('.overlay-box')?.classList.add('bgDarkNavy');
    document.querySelector('.btn__section')?.classList.add('bgNavyL');
    document
      .querySelectorAll('form label')
      ?.forEach(input => input.classList.add('colorTextWhite'));
    document.querySelector('.overlay__title')?.classList.add('colorTextWhite');
    document.querySelector('.selected__payment')?.classList.add('bgNavyL');
    document
      .querySelector('.selected__payment')
      .classList.add('colorTextWhite');
    document.querySelectorAll('.titles')?.forEach(title => {
      title.classList.add('bgPrimary');
    });
    document.querySelectorAll('.allItems input')?.forEach(item => {
      item.classList.add('bgNavyL');
    });
    document.querySelectorAll('.option')?.forEach(option => {
      option.classList.add('bgNavyL');
    });
    document
      .querySelector('.left-icon__title')
      ?.classList.add('left-icon__title-dark');
    document.querySelector('.delete-message')?.classList.add('bgNavyL');
    document.querySelector('.delete-message')?.classList.add('colorTextWhite');
  }

  darKViewByCSSStyle() {
    if (document.querySelector('.overlay-detail')) {
      document.querySelector('.btn-edit').style.backgroundColor = '#494e6e';
      document.querySelector('.btn-edit').style.color = 'white';
      document
        .querySelector('.btn-edit')
        ?.addEventListener('mouseover', function (e) {
          e.target.style.backgroundColor = '#141625';
        });
      document.querySelector('.gback').style.color = 'white';
      document
        .querySelector('.btn-edit')
        ?.addEventListener('mouseout', function (e) {
          e.target.style.backgroundColor = '#494e6e';
        });

      document.querySelector('.btn-detail-edit').style.backgroundColor =
        '#494e6e';
      document.querySelector('.btn-detail-edit').style.color = 'white';
      document
        .querySelector('.btn-detail-edit')
        ?.addEventListener('mouseover', function (e) {
          e.target.style.backgroundColor = '#141625';
        });
      document
        .querySelector('.btn-detail-edit')
        ?.addEventListener('mouseout', function (e) {
          e.target.style.backgroundColor = '#494e6e';
        });

      document.querySelector('table').style.backgroundColor = '#494e6e';

      //'rgba(42, 46, 79, 0.95)';
      document.querySelector('.total__bar').style.backgroundColor = '#0c0e16';
      document.querySelectorAll('.item-name')?.forEach(item => {
        item.style.color = 'white';
      });
      document.querySelectorAll('.total')?.forEach(item => {
        item.style.color = 'white';
      });
      document.querySelector('.delete-box').style.backgroundColor = '#252945';
      document.querySelector('.delete-box').style.color = 'white';
      document.querySelector('.delete-box__title').style.color = 'white';
      document.querySelector('.btn-edit').style.backgroundColor = '#494e6e';
      document.querySelector('.btn-edit').style.color = 'white';
      document.querySelector('.btn-detail-edit').style.backgroundColor =
        '#494e6e';
      document.querySelector('.btn-detail-edit').style.color = 'white';
    }
    this.darkViewChangeIcon(true);
    document.querySelectorAll('form input')?.forEach(input => {
      input.style.color = 'white';
      input.style.backgroundColor = '#252945';
    });
    document.querySelector('.select__payment-container').style.backgroundColor =
      '#252945';

    document
      .querySelector('.btn__add-item')
      ?.addEventListener('mouseover', function (e) {
        e.target.style.backgroundColor = '#494e6e';
      });
    document
      .querySelector('.btn__add-item')
      ?.addEventListener('mouseout', function (e) {
        e.target.style.backgroundColor = '#252945';
      });

    if (document.querySelector('.invoice')) {
      document.querySelector('.btn-discard').style.backgroundColor = '#494e6e';
      document.querySelector('.btn-discard').style.color = 'white';
      document
        .querySelector('.btn-discard')
        ?.addEventListener('mouseover', function (e) {
          e.target.style.backgroundColor = '#141625';
        });
      document
        .querySelector('.btn-discard')
        ?.addEventListener('mouseout', function (e) {
          e.target.style.backgroundColor = '#494e6e';
        });
    }
    const btnValue = document
      .querySelectorAll('.status__word')
      .forEach(word => {
        if (word.textContent === 'draft') {
          word.style.color = 'white';
          word.parentElement.firstElementChild.style.backgroundColor = 'white';
        }
      });
  }
  darkViewAddByToggle() {
    this._sidebar.classList.toggle('bgNavyL');
    document.querySelectorAll('.invoice__item').forEach(cl => {
      cl.classList.toggle('bgNavyL');
      cl.classList.toggle('colorTextWhite');
    });
    document.querySelectorAll('.invoice__item--amount')?.forEach(cl => {
      cl.classList.toggle('colorTextWhite');
    });
    document.querySelectorAll('.hash')?.forEach(cl => {
      cl.classList.toggle('lightPrimaryText');
    });
    document.querySelectorAll('.invoice__item--ticket')?.forEach(cl => {
      cl.classList.toggle('colorTextWhite');
    });
    this._header?.classList.toggle('colorTextWhite');

    this._invoiceTitle?.classList.toggle('colorTextWhite');
    this._options?.classList.toggle('bgNavyL');
    this._optionsLabel?.forEach(label => {
      label.classList.toggle('colorTextWhite');
    });
    this._headerDetail?.classList.toggle('bgNavyL');
    this._invoiceDetail?.classList.toggle('colorTextWhite');
    this._invoiceDetail?.classList.toggle('bgNavyL');
    document.querySelector('.detail-buttons')?.classList.toggle('bgNavyL');
    document
      .querySelector('.invoice__detail-customer-name')
      ?.classList.toggle('colorTextWhite');
    document
      .querySelector('.invoice__detail-customer-email')
      ?.classList.toggle('colorTextWhite');
    document
      .querySelector('.invoice__detail-invoice-date')
      ?.classList.toggle('colorTextWhite');
    document
      .querySelector('.invoice__detail-payment-due-date')
      ?.classList.toggle('colorTextWhite');
    document
      .querySelector('.invoice__detail-title__ticket-number')
      ?.classList.toggle('colorTextWhite');
    document.querySelector('.status-word')?.classList.toggle('colorTextWhite');
    document.querySelector('.delete-box')?.classList.toggle('bgNavyL');

    document
      .querySelector('.overlay__container')
      ?.classList.toggle('bgDarkNavy');
    document.querySelector('.overlay-box')?.classList.toggle('bgDarkNavy');
    document.querySelector('.btn__section')?.classList.toggle('bgNavyL');
    document
      .querySelectorAll('form label')
      ?.forEach(input => input.classList.toggle('colorTextWhite'));
    document
      .querySelector('.overlay__title')
      ?.classList.toggle('colorTextWhite');
    document.querySelector('.selected__payment')?.classList.toggle('bgNavyL');
    document
      .querySelector('.selected__payment')
      ?.classList.toggle('colorTextWhite');
    document.querySelectorAll('.titles')?.forEach(title => {
      title.classList.toggle('bgPrimary');
    });
    document.querySelectorAll('.option')?.forEach(option => {
      option.classList.toggle('bgNavyL');
    });
    document
      .querySelector('.left-icon__title')
      ?.classList.toggle('left-icon__title-dark');
    document.querySelector('.delete-message')?.classList.toggle('bgNavyL');
    document
      .querySelector('.delete-message')
      ?.classList.toggle('colorTextWhite');
  }

  darkViewClearCSSStyle() {
    if (document.querySelector('.overlay-detail')) {
      document.querySelector('table').style.backgroundColor = '#f8f8fb';
      document.querySelector('.total__bar').style.backgroundColor = '#373b53';
      document.querySelectorAll('.item-name')?.forEach(item => {
        item.style.color = 'black';
      });
      document.querySelectorAll('.total')?.forEach(item => {
        item.style.color = 'black';
      });
      document.querySelector('.delete-box').style.color = '';
      document.querySelector('.delete-box').style.backgroundColor = '';
      document.querySelector('.delete-box').style.color = '';
      document.querySelector('.delete-box__title').style.color = '';
      document.querySelector('.btn-edit').style.backgroundColor = '';
      document.querySelector('.btn-edit').style.color = '';
      document.querySelector('.btn-detail-edit').style.backgroundColor = '';
      document.querySelector('.btn-detail-edit').style.color = '';
    }
    this.darkViewChangeIcon(false);
    document.querySelectorAll('form input')?.forEach(input => {
      input.style.color = '';
      input.style.backgroundColor = '';

      document.querySelector(
        '.select__payment-container'
      ).style.backgroundColor = '';
    });

    if (document.querySelector('.invoice')) {
      document.querySelector('.btn-discard').style.backgroundColor = '';
      document.querySelector('.btn-discard').style.color = '';
      document
        .querySelector('.btn-discard')
        ?.addEventListener('mouseover', function (e) {
          e.target.style.backgroundColor = '';
        });
      document
        .querySelector('.btn-discard')
        ?.addEventListener('mouseout', function (e) {
          e.target.style.backgroundColor = '';
        });
    }
    const btnValue = document
      .querySelectorAll('.status__word')
      .forEach(word => {
        if (word.textContent === 'draft') {
          word.style.color = '';
          word.parentElement.firstElementChild.style.backgroundColor = '';
        }
      });
  }

  darkViewChangeIcon(darkMode) {
    if (darkMode) {
      console.log('IIDiaiiidisdisi');

      document.querySelector('.icon-moon').src = `${icons['icon-sun']}`;
    }
    if (!darkMode) {
      document.querySelector('.icon-moon').src = `${icons['icon-moon']}`;
    }
  }
}

export default new DarkModeView();

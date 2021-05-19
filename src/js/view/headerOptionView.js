import View from './view';

class HeaderOptionView extends View {
  _filterStatus = document.querySelector('.header__select-title');
  _headerArrow = document.querySelector('.header-arrow');
  _optionInputVal = document.querySelector('.options');

  addFilterHandler(handler) {
    this._filterStatus?.addEventListener('click', e => {
      e.preventDefault();
      this._headerArrow.classList.toggle('transform');
      document.querySelector('.options').classList.toggle('hidden');
      //this._headerArrow.style.transform = 'rotateX(180deg)';
      const radioBtns = [...document.getElementsByName('status')];
      const res = this._clearCheckRadioBtn(radioBtns);
      console.log(res);

      if (res) {
        handler();
      }
    });
  }
  addSelectionOptionHandler(handler) {
    this._optionInputVal?.addEventListener('click', e => {
      const target = e.target.closest('.options__radio-input');
      if (!target) return;
      const value = target.value;

      handler(value);
      //target.checked = false;
    });
  }
  _clearCheckRadioBtn(radioBtns) {
    let res = false;
    radioBtns.forEach(btn => {
      if (btn.checked) {
        btn.checked = false;
        res = true;
      }
    });
    return res;
  }
}

export default new HeaderOptionView();

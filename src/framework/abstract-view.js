import {createElement} from '../render.js';

// https://github.com/htmlacademy-ecmascript/taskmanager-17/blob/master/src/framework/view/abstract-view.js
export default class AbstractView {
  #element = null;

  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  get element() {
    if (this.#element === null) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

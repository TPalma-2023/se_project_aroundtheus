export default class Section {
  constructor({ renderer, items }, container) {
    this._renderer = renderer;
    this._items = items.filter((item) => item !== undefined);
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => {
      const itemEl = this._renderer(item);
      if (itemEl) {
        this._container.append(itemEl);
      }
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

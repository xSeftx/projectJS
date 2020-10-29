'use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;    
    this.newElement = function() {
        let newElem = document.createElement('div');
        if (this.selector[0] === '.'){
            newElem.className = this.selector.slice(1);
        } if (this.selector[0] === '#'){
            newElem.setAttribute('id', this.selector.slice(1));
        }
        newElem.style.cssText = ` height: ${height}; width: ${this.width}; background: ${this.bg}; font-size: ${this.fontSize};`;
        newElem.innerText = prompt('Введите текс');
        document.body.prepend(newElem);
    }
};

const createElem = new DomElement('#new-class', '200px', '200px', 'grey', '32px');

createElem.newElement();


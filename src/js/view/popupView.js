
import {createElement} from '../Utils/DOMConstructor';
import {POPUP_STYLE, POPUP_HTML} from './popup/popup_contents';


const popupView = () => {
  const $popup = createElement('div', {class: 'navigation'});
  const style = createElement('style');

  const render = function () {
    $popup.innerHTML = POPUP_HTML;
    style.innerHTML = POPUP_STYLE;
  };

  const bindPopupEvent = (type, handler) => {
    $popup.addEventListener(type, e => handler(e));
  };

  return {
    render,
    bindPopupEvent,
    $popup,
    style,
  };
};

export default popupView;


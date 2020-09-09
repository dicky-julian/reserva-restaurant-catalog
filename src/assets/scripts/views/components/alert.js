import { checkElement } from '../../utils/element-helper';

const closeAlert = (el) => {
  el.innerHTML = '';
};

const alert = (message, role) => {
  const element = `
        <div class="alert ${role === 'success' ? 'alert__success' : 'alert__danger'}">
            ${message}
            <img src="./images/icon-close.webp" alt="icon close" />
        </div>
    `;

  checkElement('#alert__wrapper').then((el) => {
    el.addEventListener('click', () => closeAlert(el));
    el.innerHTML += element;
  });
};

export {
  alert,
};

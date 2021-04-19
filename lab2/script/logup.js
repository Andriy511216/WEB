'use strict';
const loginLink = document.querySelector('.nav-item-login');

if (+localStorage.getItem('currentUserIndex') !== -1) {
  loginLink.innerHTML = 'LOGOUT';
}

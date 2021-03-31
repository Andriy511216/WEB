'use strict';

//LOGIN CONTACTS
const contactsLoginEmail = document.getElementById('loginEmail');
const contactsLoginPassword = document.getElementById('loginPassword');
const contactsCheckMe = document.querySelector('.login-check-input');
const contactsLoginBtn = document.getElementById('profile-login-btn');

localStorage.setItem('currentUser', -1);
let currentAcc = -1;
let currentAccIndex = -1;
contactsLoginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (contactsCheckMe.checked) {
    currentAcc = profiles.find((acc) => acc.email === contactsLoginEmail.value);
    if (typeof currentAcc === 'undefined') {
      alert("Acc with this email dosen't exist ");
      return;
    } else {
      currentAccIndex = profiles.findIndex((acc) => acc.email === contactsLoginEmail.value);
      if (currentAcc.password === contactsLoginPassword.value) {
        localStorage.setItem('currentUser', currentAccIndex);
        document.location.href = './contacts.html';
      } else {
        alert('Wrong password');
        contactsLoginPassword.value = '';
        return;
      }
    }
  } else {
    alert('Check the box');
  }
});

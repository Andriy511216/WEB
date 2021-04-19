'use strict';
const profileName = document.querySelectorAll('.profile-name');
const profileEmail = document.querySelector('.profile-email');
const profilePhone = document.querySelector('.profile-phone');
const profileBirthdate = document.querySelector('.profile-birthday');
const profileGender = document.querySelector('.profile-gender');
const profileLogger = document.querySelector('.profile-logger');

const CURRENT_PROFILE = localStorage.getItem('currentUserIndex');
const ALL_USERS = JSON.parse(localStorage.getItem('allUsers'));

if (+CURRENT_PROFILE === -1) {
  profileLogger.classList.remove('profile-is-login');
} else {
  profileLogger.classList.add('profile-is-login');

  profileName.forEach((elem) => (elem.innerHTML = ALL_USERS[CURRENT_PROFILE].name));
  profileEmail.innerHTML = ALL_USERS[CURRENT_PROFILE].email;
  profilePhone.innerHTML = ALL_USERS[CURRENT_PROFILE].phone;
  profileBirthdate.innerHTML = ALL_USERS[CURRENT_PROFILE].birthday;
  profileGender.innerHTML = ALL_USERS[CURRENT_PROFILE].gender;
}

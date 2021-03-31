'use strict';

function checkPhone(number) {
  if (!(number.length === 12 && !isNaN(number))) {
    alert('Incorrect phone: length should equal 12');
    return false;
  }
  return true;
}

function checkName(name) {
  if (name.length < 4) {
    alert('Too short name');
    return false;
  }
  return true;
}

function checkPassword(password) {
  if (password.length < 6) {
    alert('Too short password');
    return false;
  }
  return true;
}

const contactsRegisterEmail = document.getElementById('registerEmail');
const contactsRegisterPhone = document.getElementById('registerPhone');
const contactsRegisterPassword = document.getElementById('registerPassword');
const contactsRegisterBirthday = document.getElementById('registerBirthday');
const contactsRegisterMale = document.querySelector('.gender-male-check');
const contactsRegisterFemale = document.querySelector('.gender-female-check');
const contactsRegisterBtn = document.querySelector('.registerBtn');
const newProfile = {};
contactsRegisterBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let gender = contactsRegisterMale.checked || contactsRegisterFemale.checked;

  if (checkPhone(contactsRegisterPhone.value)) {
    if (checkPassword(contactsRegisterPassword.value)) {
      if (contactsRegisterBirthday.value === '') {
        alert('Select your birthday');
        return;
      }
      if (contactsRegisterMale.checked) {
        gender = contactsRegisterMale.id;
      } else if (contactsRegisterFemale.checked) {
        gender = contactsRegisterFemale.id;
      } else {
        alert('Select yours gender');
        return;
      }
      newProfile.email = contactsRegisterEmail.value;
      newProfile.name = 'user';
      newProfile.phone = contactsRegisterPhone.value;
      newProfile.password = contactsRegisterPassword.value;
      newProfile.gender = gender;
      newProfile.birthday = contactsRegisterBirthday.value;
      newProfile.contacts = [];
      document.location.href = './login.html';
    }
  }
  console.log(newProfile);
});

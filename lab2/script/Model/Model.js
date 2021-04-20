let isSortedByName = false;

function contactsSearchRowsHelper(value, profileContacts) {
  let date = [];
  value = value.toLowerCase();
  for (let i = 0; i < profileContacts.length; i++) {
    let name = profileContacts[i].contactsName.toLowerCase();
    if (name.includes(value)) {
      date.push(profileContacts[i]);
    }
  }
  return date;
}
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

class Model {
  constructor() {
    this.currentUserIndex = localStorage.getItem('currentUserIndex');
    this.allUsers = JSON.parse(localStorage.getItem('allUsers'));
  }
  showInfo = () => {
    console.log(this.currentUserIndex);
    console.log(this.allUsers);
  };
  //searchrow
  contactsSearch = () => {
    const contactsSearchInput = document.querySelector('.search-contacts-input');
    return contactsSearchRowsHelper(
      contactsSearchInput.value,
      this.allUsers[this.currentUserIndex].contacts
    );
  };
  //delete --- done
  contactsDelete = (e) => {
    if (!e.target.classList.contains('delete-contacts-btn')) {
      return;
    }
    const btn = e.target;
    btn.closest('tr').remove();

    const indexRemoved = this.allUsers[this.currentUserIndex].contacts.findIndex(
      (elem) => elem.contactsId === +btn.id
    );

    if (indexRemoved !== -1) {
      this.allUsers[this.currentUserIndex].contacts.splice(indexRemoved, 1);
    }
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
  };
  //add --- done
  contactsAdd = (e) => {
    e.preventDefault();

    const contactsInputName = document.querySelector('.contacts-input-name');
    const contactsInputPhone = document.querySelector('.contacts-input-phone');
    if (!checkName(contactsInputName.value)) return;
    if (!checkPhone(contactsInputPhone.value)) return;

    this.allUsers[this.currentUserIndex].contacts.push({
      contactsId:
        this.allUsers[this.currentUserIndex]?.contacts.length - 1 === -1
          ? 1
          : this.allUsers[this.currentUserIndex].contacts[
              this.allUsers[this.currentUserIndex].contacts.length - 1
            ]['contactsId'] + 1,
      contactsName: contactsInputName.value,
      contactsPhone: contactsInputPhone.value,
    });
    const contactsTableBody = document.querySelector('.contacts-main');
    contactsTableBody.innerHTML += `
      <tr>
          <th scope="row">${
            this.allUsers[this.currentUserIndex].contacts[
              this.allUsers[this.currentUserIndex].contacts.length - 1
            ].contactsId
          }</th>
          <td>${
            this.allUsers[this.currentUserIndex].contacts[
              this.allUsers[this.currentUserIndex].contacts.length - 1
            ].contactsName
          }</td>
          <td>+${
            this.allUsers[this.currentUserIndex].contacts[
              this.allUsers[this.currentUserIndex].contacts.length - 1
            ].contactsPhone
          }</td>
          <td>
              <button id = ${
                this.allUsers[this.currentUserIndex].contacts[
                  this.allUsers[this.currentUserIndex].contacts.length - 1
                ].contactsId
              } class="btn btn-danger col-md-3 delete-contacts-btn">
                  &#128465;
              </button>
          </td>
      </tr>
        `;
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
    contactsInputName.value = '';
    contactsInputPhone.value = '';
  };
  //change --- done
  contactsChange = () => {
    const contactsIdToChange = document.querySelector('.contacts-id-change');
    const contactsNameToChange = document.querySelector('.contacts-name-change');
    const contactsPhoneToChange = document.querySelector('.contacts-phone-change');
    if (
      !checkName(contactsNameToChange.value) ||
      !checkPhone(contactsPhoneToChange.value) ||
      contactsIdToChange.value === ''
    ) {
      return;
    }

    let rIndexToChange = -1;
    for (let i = 0; i < this.allUsers[this.currentUserIndex].contacts.length; i++) {
      if (
        +contactsIdToChange.value === this.allUsers[this.currentUserIndex].contacts[i].contactsId
      ) {
        rIndexToChange = i;
      }
    }
    if (rIndexToChange === -1) {
      console.log('sosi1');
      return;
    }
    this.allUsers[this.currentUserIndex].contacts[rIndexToChange].contactsName =
      contactsNameToChange.value;
    this.allUsers[this.currentUserIndex].contacts[rIndexToChange].contactsPhone =
      contactsPhoneToChange.value;
    contactsNameToChange.value = '';
    contactsPhoneToChange.value = '';
    localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
    return this.allUsers[this.currentUserIndex].contacts;
  };
  //sort --- done
  contactsSort = () => {
    const contactsTableBody = document.querySelector('.contacts-main');
    if (isSortedByName) {
      isSortedByName = false;
      contactsTableBody.innerHTML = '';
      return this.allUsers[this.currentUserIndex].contacts;
    }
    isSortedByName = true;
    const arrayToSort = this.allUsers[this.currentUserIndex].contacts.slice().sort((a, b) => {
      return a.contactsName.toLowerCase() > b.contactsName.toLowerCase() ? 1 : -1;
    });
    contactsTableBody.innerHTML = '';
    return arrayToSort;
  };
  //login
  loginProfile = () => {
    let currentAcc = -1;
    let currentAccIndex = -1;
    const contactsLoginEmail = document.getElementById('loginEmail');
    const contactsLoginPassword = document.getElementById('loginPassword');
    const contactsCheckMe = document.querySelector('.login-check-input');
    if (contactsCheckMe.checked) {
      currentAcc = this.allUsers.find((acc) => acc.email === contactsLoginEmail.value);
      if (typeof currentAcc === 'undefined') {
        alert("Acc with this email dosen't exist ");
        return;
      } else {
        currentAccIndex = this.allUsers.findIndex((acc) => acc.email === contactsLoginEmail.value);
        if (currentAcc.password === contactsLoginPassword.value) {
          localStorage.setItem('currentUserIndex', currentAccIndex);
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
  };
  //logout
  logoutProfile = () => {
    const loginLink = document.querySelector('.nav-item-login');
    if (+localStorage.getItem('currentUserIndex') !== -1) {
      loginLink.innerHTML = 'LOGOUT';
    }
  };
  //registration
  registrProfile = () => {
    const contactsRegisterEmail = document.getElementById('registerEmail');
    const contactsRegisterPhone = document.getElementById('registerPhone');
    const contactsRegisterPassword = document.getElementById('registerPassword');
    const contactsRegisterBirthday = document.getElementById('registerBirthday');
    const contactsRegisterMale = document.querySelector('.gender-male-check');
    const contactsRegisterFemale = document.querySelector('.gender-female-check');
    let gender = -1;
    const newProfile = {};
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
        this.allUsers.push(newProfile);
        localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
        document.location.href = './login.html';
      }
    }
  };
}

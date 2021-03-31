'use strict';

let CURRENT_ACCOUNT = localStorage.getItem('currentUser');

const contactsTableBody = document.querySelector('.contacts-main');
const contactsTable = document.querySelector('table');

//ADDING CONTACTS
const contactsAddBtn = document.querySelector('.add-contacts-btn');

const contactsInputName = document.querySelector('.contacts-input-name');
const contactsInputPhone = document.querySelector('.contacts-input-phone');

//SORTING CONTACTS
const contactsSortBtn = document.querySelector('.sort-contacts-btn');

//SWARCHING CONTACTS
const contactsSearchInput = document.querySelector('.search-contacts-input');

//CHANGING CONTACTS
const contactsChangeBtn = document.querySelector('.change-contacts-btn');
const contactsIdToChange = document.querySelector('.contacts-id-change');
const contactsNameToChange = document.querySelector('.contacts-name-change');
const contactsPhoneToChange = document.querySelector('.contacts-phone-change');

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

function showContacts(profileContacts) {
  contactsTableBody.innerHTML = '';
  profileContacts.forEach((item) => {
    contactsTableBody.innerHTML += `
    <tr>
        <th scope="row">${item.contactsId}</th>
        <td>${item.contactsName}</td>
        <td>+${item.contactsPhone}</td>
        <td>
            <button id = ${item.contactsId} class="btn btn-danger col-md-3 delete-contacts-btn">
                &#128465;
            </button>
        </td>
    </tr>
      `;
  });
}

function contactsDeleteRow(e) {
  if (!e.target.classList.contains('delete-contacts-btn')) {
    return;
  }
  const btn = e.target;
  btn.closest('tr').remove();

  const indexRemoved = this.contacts.findIndex((elem) => elem.contactsId === +btn.id);

  if (indexRemoved !== -1) {
    this.contacts.splice(indexRemoved, 1);
  }
}

function contactsAddRow(e) {
  e.preventDefault();

  if (!checkName(contactsInputName.value)) return;
  if (!checkPhone(contactsInputPhone.value)) return;
  this.contacts.push({
    contactsId: this.contacts[this.contacts.length - 1]['contactsId'] + 1,
    contactsName: contactsInputName.value,
    contactsPhone: contactsInputPhone.value,
  });

  contactsTableBody.innerHTML += `
    <tr>
        <th scope="row">${this.contacts[this.contacts.length - 1].contactsId}</th>
        <td>${this.contacts[this.contacts.length - 1].contactsName}</td>
        <td>+${this.contacts[this.contacts.length - 1].contactsPhone}</td>
        <td>
            <button id = ${
              this.contacts[this.contacts.length - 1].contactsId
            } class="btn btn-danger col-md-3 delete-contacts-btn">
                &#128465;
            </button>
        </td>
    </tr>
      `;
  contactsInputName.value = '';
  contactsInputPhone.value = '';
}

function byField(field) {
  // sort contacts array by name
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

let isSortedByName = false;
function contactsSortRow() {
  if (isSortedByName) {
    isSortedByName = false;
    contactsTableBody.innerHTML = '';
    showContacts(this.contacts);
    return;
  }
  isSortedByName = true;
  const arrayToSort = this.contacts.slice().sort(byField('contactsName'));
  contactsTableBody.innerHTML = '';
  showContacts(arrayToSort);
}

function contactsSearchRowsHelper(value, profileContacts) {
  var date = [];
  value = value.toLowerCase();
  for (let i = 0; i < profileContacts.length; i++) {
    let name = profileContacts[i].contactsName.toLowerCase();
    if (name.includes(value)) {
      date.push(profileContacts[i]);
    }
  }
  return date;
}

function contactsSearchRows() {
  showContacts(contactsSearchRowsHelper(contactsSearchInput.value, this.contacts));
}

function contactsChangeRow() {
  if (!checkName(contactsNameToChange.value)) return;
  if (!checkPhone(contactsPhoneToChange.value)) return;
  if (contactsIdToChange.value === '') return;
  let rIndexToChange = -1;
  for (let i = 0; i < this.contacts.length; i++) {
    if (+contactsIdToChange.value === this.contacts[i].contactsId) {
      rIndexToChange = i;
    }
  }
  if (rIndexToChange === -1) return;
  this.contacts[rIndexToChange].contactsName = contactsNameToChange.value;
  this.contacts[rIndexToChange].contactsPhone = contactsPhoneToChange.value;
  contactsNameToChange.value = '';
  contactsPhoneToChange.value = '';
  showContacts(this.contacts);
}

function loginProfile(e) {
  e.preventDefault();
  console.log('clicked');
}

if (CURRENT_ACCOUNT !== -1) {
  contactsAddBtn?.addEventListener('click', contactsAddRow.bind(profiles[CURRENT_ACCOUNT]));
  contactsSearchInput?.addEventListener(
    'keyup',
    contactsSearchRows.bind(profiles[CURRENT_ACCOUNT])
  );
  contactsTableBody?.addEventListener('click', contactsDeleteRow.bind(profiles[CURRENT_ACCOUNT]));
  contactsSortBtn?.addEventListener('click', contactsSortRow.bind(profiles[CURRENT_ACCOUNT]));
  contactsChangeBtn?.addEventListener('click', contactsChangeRow.bind(profiles[CURRENT_ACCOUNT]));

  showContacts(profiles[CURRENT_ACCOUNT].contacts);
}

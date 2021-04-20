class View {
  constructor() {
    this.contactsTableBody = document.querySelector('.contacts-main');
    this.profileName = document.querySelectorAll('.profile-name');
    this.profileEmail = document.querySelector('.profile-email');
    this.profilePhone = document.querySelector('.profile-phone');
    this.profileBirthdate = document.querySelector('.profile-birthday');
    this.profileGender = document.querySelector('.profile-gender');
    this.profileLogger = document.querySelector('.profile-logger');
    this.currentUserIndexView = localStorage.getItem('currentUserIndex');
    this.allUsersView = localStorage.getItem('allUsers');
  }

  //showContacts
  showContacts = (profileContacts) => {
    if (this.contactsTableBody !== null && typeof profileContacts !== 'undefined') {
      this.contactsTableBody.innerHTML = '';
      profileContacts.forEach((item) => {
        this.contactsTableBody.innerHTML += `
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
  };
  //showProfile
  showProfile = (currentUserIndexView, allUsersView) => {
    if (+currentUserIndexView === -1) {
      this.profileLogger.classList.remove('profile-is-login');
    } else {
      this.profileLogger.classList.add('profile-is-login');
      this.profileName.forEach(
        (elem) => (elem.innerHTML = allUsersView[currentUserIndexView].name)
      );
      this.profileEmail.innerHTML = allUsersView[currentUserIndexView].email;
      this.profilePhone.innerHTML = allUsersView[currentUserIndexView].phone;
      this.profileBirthdate.innerHTML = allUsersView[currentUserIndexView].birthday;
      this.profileGender.innerHTML = allUsersView[currentUserIndexView].gender;
    }
  };
}

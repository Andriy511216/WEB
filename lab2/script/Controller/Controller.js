class Controller {
  constructor() {
    this.view = new View();
    this.model = new Model();
  }
  contactsAddHandler = () => {
    if (+this.model.currentUserIndex !== -1) {
      const contactsAddBtn = document.querySelector('.add-contacts-btn');
      contactsAddBtn.addEventListener('click', this.model.contactsAdd);
    }
  };

  contactsDeleteHandler = () => {
    if (+this.model.currentUserIndex !== -1) {
      const contactsTableBody = document.querySelector('.contacts-main');
      contactsTableBody.addEventListener('click', this.model.contactsDelete);
    }
  };

  contactsChangeHandler = () => {
    if (+this.model.currentUserIndex !== -1) {
      const contactsChangeBtn = document.querySelector('.change-contacts-btn');
      contactsChangeBtn.addEventListener('click', () => {
        return this.view.showContacts.call(null, this.model.contactsChange());
      });
    }
  };

  contactsSortHandler = () => {
    if (+this.model.currentUserIndex !== -1) {
      const contactsSortBtn = document.querySelector('.sort-contacts-btn');
      contactsSortBtn.addEventListener('click', () => {
        return this.view.showContacts.call(null, this.model.contactsSort());
      });
    }
  };

  contactsSearchHandler = () => {
    if (+this.model.currentUserIndex !== -1) {
      const contactsSearchInput = document.querySelector('.search-contacts-input');
      contactsSearchInput.addEventListener('keyup', () => {
        return this.view.showContacts.call(null, this.model.contactsSearch());
      });
    }
  };

  firstShowContacts = () => {
    if (+this.model.currentUserIndex !== -1) {
      this.view.showContacts(this.model.allUsers[this.model.currentUserIndex].contacts);
    }
  };

  profileRegisterHandler = () => {
    const contactsRegisterBtn = document.querySelector('.registerBtn');
    contactsRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('here');
      this.model.registrProfile();
    });
  };

  profileLoginHandler = () => {
    const contactsLoginBtn = document.getElementById('profile-login-btn');
    contactsLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.model.loginProfile();
    });
  };

  profileLogoutHandler = () => {
    this.model.logoutProfile();
  };
}

const myApp = new Controller();

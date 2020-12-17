import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }
  
  // din kode her
  updated() {
    var updateForm = this.shadowRoot.querySelector("form");
    
    updateForm.addEventListener('submit', (e) => {
      // Disable default submit event
      e.preventDefault();
      
      // Use custom action
      this.updateUser(updateForm);
    });
  }

  render() {
    return html`
    <form id="uid${this.user.uid}">
      <div>
        <label for="uname">Username</label>
        <input id="uname" name="uname" value="${this.user.uname}">
      </div>
      <div>
        <label for="oldpwd">Password</label>
        <input id="oldpwd" name="oldpwd" type="password">
      </div>
      <div>
        <label for="pwd">New password</label>
        <input id="pwd" name="pwd" type="password">
      </div>
      <div>
        <label for="firstName">First name</label>
        <input id="firstName" name="firstName" value="${this.user.firstName}">
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" value="${this.user.lastName}">
      </div>
      <button type="submit">Apply</button>
    </form>
    `;
  }
  
  updateUser(form) {
    const data = new FormData(form);
    
    data.set('uid', this.user.uid);
    
    fetch('api/updateUser.php', {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == "success") {
        location.reload();
      } else {
        console.warn(data.msg);
      }
    });
  }
}
customElements.define('edit-user', EditUser);

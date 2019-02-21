(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildContactObject = (contactNameParam, contactEmailParam, contactPhoneParam, userIdParam) => {
  return {
    name: contactNameParam,
    email: contactEmailParam,
    phone: contactPhoneParam,
    userId: userIdParam
  };
};

var _default = buildContactObject;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
const apiManager = {
  //gets all contacts from api
  getAllContacts: userId => {
    return fetch(`http://localhost:8088/contacts/?userId=${userId}`).then(contacts => contacts.json());
  },
  //posts new contact to the api
  postNewContact: contactObject => {
    fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactObject)
    }).then(() => {
      (0, _contactList.default)();
    });
  },
  //edits contact
  editContact: (idParam, contactToEdit) => {
    return fetch(`http://localhost:8088/contacts/${idParam}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactToEdit)
    }).then(() => {
      (0, _contactList.default)();
    });
  },
  //deletes contact
  deleteContact: idToDelete => {
    fetch(`http://localhost:8088/contacts/${idToDelete}`, {
      method: "DELETE"
    }).then(() => {
      (0, _contactList.default)();
    });
  },
  //gets a single contact
  getOneContact: contactId => {
    return fetch(`http://localhost:8088/contacts/${contactId}`).then(contact => contact.json());
  },
  //retrieves a user
  getUserByUserName: userName => {
    return fetch(`http://localhost:8088/users?username=${userName}`).then(user => user.json());
  },
  //adds a user
  addNewUser: userObject => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObject)
    }).then(response => response.json());
  }
};
var _default = apiManager;
exports.default = _default;

},{"./contactList":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _editForm = _interopRequireDefault(require("./editForm"));

var _buildContactObject = _interopRequireDefault(require("./buildContactObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
//overall function to create and post the new contact
const contactWizard = () => {
  const contactMaker = document.querySelector("#submitButton").addEventListener("click", () => {
    const nameValue = document.querySelector("#nameInput").value;
    const phoneValue = document.querySelector("#phoneInput").value;
    const emailValue = document.querySelector("#emailInput").value;
    const userIdValue = sessionStorage.getItem("userId");
    console.log(userIdValue);
    const newContact = (0, _buildContactObject.default)(nameValue, emailValue, phoneValue, userIdValue);

    _contactCollection.default.postNewContact(newContact); //HOPEFULLY reprints the page with new contact


    document.querySelector("#contactContainer").innerHTML = "";
  }); //deletes a contact

  const contactDeleter = document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("deleteButton")) {
      let contactId = event.target.id.split("-")[1];

      _contactCollection.default.deleteContact(contactId);
    } //opens edit form
    else if (event.target.classList.contains("editButton")) {
        let contactId = event.target.id.split("-")[1];
        contactId = event.target.id.split("-")[1];

        _contactCollection.default.getOneContact(contactId).then(singleContactInfo => {
          document.querySelector(`#employeeContainer-${contactId}`).innerHTML = "";
          document.querySelector(`#employeeContainer-${contactId}`).innerHTML = (0, _editForm.default)(singleContactInfo);
        });
      } //builds a new object from the edit form
      else if (event.target.classList.contains("saveEditButton")) {
          const itemId = event.target.id.split("-")[1];
          const editedName = document.querySelector(`#nameEditInput-${itemId}`).value;
          const editedEmail = document.querySelector(`#emailEditInput-${itemId}`).value;
          const editedPhone = document.querySelector(`#phoneEditInput-${itemId}`).value;
          const editedUserId = sessionStorage.getItem("userId");
          const editedContact = (0, _buildContactObject.default)(editedName, editedEmail, editedPhone, editedUserId);

          _contactCollection.default.editContact(itemId, editedContact);
        }
  });
}; // --- EVENT LISTENER FOR EDIT SAVE BUTTON --//


var _default = contactWizard;
exports.default = _default;

},{"./buildContactObject":1,"./contactCollection":2,"./editForm":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _singleContact = _interopRequireDefault(require("./singleContact"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
//prints all of a user's contacts
const printAllContacts = () => {
  const userID = sessionStorage.getItem("userId");
  document.querySelector("#contactContainer").innerHTML = "";

  _contactCollection.default.getAllContacts(userID).then(contacts => {
    contacts.forEach(singleContact => {
      document.querySelector("#contactContainer").innerHTML += (0, _singleContact.default)(singleContact);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contactCollection":2,"./singleContact":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildEditForm = singleContact => {
  return `<br>
  <h2>Edit contact</h2>
  <br>
  <form>
      Name: <input id="nameEditInput-${singleContact.id}" name="nameEdit" type="text" value="${singleContact.name}">
      Phone: <input id="phoneEditInput-${singleContact.id}" name="phoneEdit" type="text" value="${singleContact.phone}">
      Email: <input id="emailEditInput-${singleContact.id}" name="emailEdit" type="text" value="${singleContact.email}">
  </form>
  <br>
  <button class="saveEditButton" id="saveEditButton-${singleContact.id}">Save</button>`;
};

var _default = buildEditForm;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList.js"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginUser = () => {
  const userNameValue = document.querySelector("#usernameLogin").value;
  const passwordValue = document.querySelector("#passwordLogin").value;

  _contactCollection.default.getUserByUserName(userNameValue).then(parsedUser => {
    if (passwordValue === parsedUser[0].password) {
      sessionStorage.setItem("userId", parsedUser[0].id);
      console.log("you logged in!");
      (0, _contactList.default)();
    } else {
      console.warn("negative, ghost rider");
    }
  });
};

var _default = loginUser;
exports.default = _default;

},{"./contactCollection":2,"./contactList.js":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const logoutUser = () => {
  sessionStorage.removeItem("userId");
  document.querySelector("#contactContainer").innerHTML = "";
  console.log("You logged out!");
};

var _default = logoutUser;
exports.default = _default;

},{}],8:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _register = _interopRequireDefault(require("./register"));

var _login = _interopRequireDefault(require("./login"));

var _logout = _interopRequireDefault(require("./logout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In main.js, import the ContactList component and the ContactForm component.
// import contactDeleter from "./contactForm"
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
(0, _contactForm.default)();
document.querySelector("#registerButton").addEventListener("click", () => {
  (0, _register.default)();
});
document.querySelector("#loginButton").addEventListener("click", () => {
  (0, _login.default)();
});
document.querySelector("#logoutButton").addEventListener("click", () => {
  (0, _logout.default)();
});

},{"./contactForm":3,"./login":6,"./logout":7,"./register":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerUser = () => {
  const nameValue = document.querySelector("#registerName").value;
  const phoneValue = document.querySelector("#registerPhone").value;
  const emailValue = document.querySelector("#registerEmail").value;
  const usernameValue = document.querySelector("#registerUsername").value;
  const passwordValue = document.querySelector("#registerPassword").value;
  const userObject = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    username: usernameValue,
    password: passwordValue
  };

  _contactCollection.default.addNewUser(userObject).then(parsedUser => {
    console.log("user registered!");
    sessionStorage.setItem("userId", parsedUser.id);
  });
};

var _default = registerUser;
exports.default = _default;

},{"./contactCollection":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A Contact component that displays a person's name, phone number, and address.
const buildSingleContact = singleContact => {
  return `
<div id ="employeeContainer-${singleContact.id}">
                <h2>Name:  ${singleContact.name}</h2>
                <ul>
                    <li>Email:  ${singleContact.email}</li>
                    <li>Phone:  ${singleContact.phone}</li>
                    <br>
                </ul>
                <button class="editButton" id= "editButton-${singleContact.id}">Update</button> <button class="deleteButton" id= "deleteButton-${singleContact.id}">Delete</button>
            </div>
            <hr>`;
};

var _default = buildSingleContact;
exports.default = _default;

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkQ29udGFjdE9iamVjdC5qcyIsIi4uL3NjcmlwdHMvY29udGFjdENvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RGb3JtLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvZWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL2xvZ2luLmpzIiwiLi4vc2NyaXB0cy9sb2dvdXQuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zaW5nbGVDb250YWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxnQkFBRCxFQUFtQixpQkFBbkIsRUFBc0MsaUJBQXRDLEVBQXlELFdBQXpELEtBQXlFO0FBQ2hHLFNBQU87QUFDSCxJQUFBLElBQUksRUFBRSxnQkFESDtBQUVILElBQUEsS0FBSyxFQUFFLGlCQUZKO0FBR0gsSUFBQSxLQUFLLEVBQUUsaUJBSEo7QUFJSCxJQUFBLE1BQU0sRUFBRTtBQUpMLEdBQVA7QUFNSCxDQVBEOztlQVFlLGtCOzs7Ozs7Ozs7OztBQ1JmOzs7O0FBRUE7QUFFQSxNQUFNLFVBQVUsR0FBRztBQUNmO0FBQ0EsRUFBQSxjQUFjLEVBQUcsTUFBRCxJQUFZO0FBQ3hCLFdBQU8sS0FBSyxDQUFFLDBDQUF5QyxNQUFPLEVBQWxELENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBTGM7QUFNZjtBQUNBLEVBQUEsY0FBYyxFQUFFLGFBQWEsSUFBSTtBQUM3QixJQUFBLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUNwQyxNQUFBLE1BQU0sRUFBRSxNQUQ0QjtBQUVwQyxNQUFBLE9BQU8sRUFDUDtBQUNJLHdCQUFnQjtBQURwQixPQUhvQztBQU1wQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLGFBQWY7QUFOOEIsS0FBbkMsQ0FBTCxDQU9HLElBUEgsQ0FPUSxNQUFNO0FBQ1Y7QUFDSCxLQVREO0FBVUgsR0FsQmM7QUFtQmY7QUFDQSxFQUFBLFdBQVcsRUFBRSxDQUFDLE9BQUQsRUFBVSxhQUFWLEtBQTRCO0FBQ3JDLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxPQUFRLEVBQTNDLEVBQThDO0FBQ3RELE1BQUEsTUFBTSxFQUFFLEtBRDhDO0FBRXRELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGNkM7QUFLdEQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxhQUFmO0FBTGdELEtBQTlDLENBQUwsQ0FPRixJQVBFLENBT0csTUFBTTtBQUNSO0FBQ0gsS0FURSxDQUFQO0FBVUgsR0EvQmM7QUFnQ2Y7QUFDQSxFQUFBLGFBQWEsRUFBRyxVQUFELElBQWdCO0FBQzNCLElBQUEsS0FBSyxDQUFFLGtDQUFpQyxVQUFXLEVBQTlDLEVBQWlEO0FBQ2xELE1BQUEsTUFBTSxFQUFFO0FBRDBDLEtBQWpELENBQUwsQ0FHSyxJQUhMLENBR1UsTUFBTTtBQUNSO0FBQ0gsS0FMTDtBQU1ILEdBeENjO0FBeUNmO0FBQ0EsRUFBQSxhQUFhLEVBQUcsU0FBRCxJQUFlO0FBQzFCLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxTQUFVLEVBQTdDLENBQUwsQ0FDRixJQURFLENBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBRGQsQ0FBUDtBQUVILEdBN0NjO0FBOENmO0FBQ0EsRUFBQSxpQkFBaUIsRUFBRyxRQUFELElBQWM7QUFDN0IsV0FBTyxLQUFLLENBQUUsd0NBQXVDLFFBQVMsRUFBbEQsQ0FBTCxDQUNGLElBREUsQ0FDRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUwsRUFEWCxDQUFQO0FBRUgsR0FsRGM7QUFtRGY7QUFDQSxFQUFBLFVBQVUsRUFBRyxVQUFELElBQWdCO0FBQ3hCLFdBQU8sS0FBSyxDQUFDLDZCQUFELEVBQWdDO0FBQ3hDLE1BQUEsTUFBTSxFQUFFLE1BRGdDO0FBRXhDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGK0I7QUFLeEMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxVQUFmO0FBTGtDLEtBQWhDLENBQUwsQ0FPTixJQVBNLENBT0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBUFgsQ0FBUDtBQVFIO0FBN0RjLENBQW5CO2VBZ0VlLFU7Ozs7Ozs7Ozs7O0FDbkVmOztBQUNBOztBQUNBOzs7O0FBSEE7QUFJQTtBQUNBLE1BQU0sYUFBYSxHQUFHLE1BQU07QUFDeEIsUUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsZ0JBQXhDLENBQXlELE9BQXpELEVBQWtFLE1BQU07QUFDekYsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsS0FBdkQ7QUFDQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxLQUF6RDtBQUNBLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXpEO0FBQ0EsVUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBcEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjtBQUNBLFVBQU0sVUFBVSxHQUFHLGlDQUFtQixTQUFuQixFQUE4QixVQUE5QixFQUEwQyxVQUExQyxFQUFzRCxXQUF0RCxDQUFuQjs7QUFDQSwrQkFBVyxjQUFYLENBQTBCLFVBQTFCLEVBUHlGLENBUXpGOzs7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RDtBQUNILEdBVm9CLENBQXJCLENBRHdCLENBWXhCOztBQUNBLFFBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQ2xGLFFBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLGNBQWhDLENBQUosRUFBcUQ7QUFDakQsVUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQWhCOztBQUNBLGlDQUFXLGFBQVgsQ0FBeUIsU0FBekI7QUFDSCxLQUhELENBSUE7QUFKQSxTQUtLLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLFlBQWhDLENBQUosRUFBbUQ7QUFDcEQsWUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQWhCO0FBQ0EsUUFBQSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQVo7O0FBQ0EsbUNBQVcsYUFBWCxDQUF5QixTQUF6QixFQUNLLElBREwsQ0FDVyxpQkFBRCxJQUF1QjtBQUN6QixVQUFBLFFBQVEsQ0FBQyxhQUFULENBQXdCLHNCQUFxQixTQUFVLEVBQXZELEVBQTBELFNBQTFELEdBQXNFLEVBQXRFO0FBQ0EsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixzQkFBcUIsU0FBVSxFQUF2RCxFQUEwRCxTQUExRCxHQUFxRSx1QkFBYyxpQkFBZCxDQUFyRTtBQUNILFNBSkw7QUFLSCxPQVJJLENBU0w7QUFUSyxXQVVBLElBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLGdCQUFoQyxDQUFILEVBQXFEO0FBQ3RELGdCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkIsQ0FBM0IsQ0FBZjtBQUNBLGdCQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixrQkFBaUIsTUFBTyxFQUFoRCxFQUFtRCxLQUF0RTtBQUNBLGdCQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixtQkFBa0IsTUFBTyxFQUFqRCxFQUFvRCxLQUF4RTtBQUNBLGdCQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixtQkFBa0IsTUFBTyxFQUFqRCxFQUFvRCxLQUF4RTtBQUNBLGdCQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFyQjtBQUNBLGdCQUFNLGFBQWEsR0FBRyxpQ0FBbUIsVUFBbkIsRUFBK0IsV0FBL0IsRUFBNEMsV0FBNUMsRUFBeUQsWUFBekQsQ0FBdEI7O0FBQ0EscUNBQVcsV0FBWCxDQUF1QixNQUF2QixFQUErQixhQUEvQjtBQUNEO0FBQ0YsR0F6QmtCLENBQXZCO0FBMEJDLENBdkNMLEMsQ0F3Q0E7OztlQUNlLGE7Ozs7Ozs7Ozs7O0FDN0NmOztBQUNBOzs7O0FBRkE7QUFHQTtBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTTtBQUMzQixRQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFmO0FBQ0EsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7O0FBQ0EsNkJBQVcsY0FBWCxDQUEwQixNQUExQixFQUNDLElBREQsQ0FDTyxRQUFELElBQWM7QUFDaEIsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixhQUFhLElBQUk7QUFDOUIsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsSUFBeUQsNEJBQW1CLGFBQW5CLENBQXpEO0FBQ0gsS0FGRDtBQUdDLEdBTEw7QUFNQyxDQVRMOztlQVdlLGdCOzs7Ozs7Ozs7OztBQ2RmLE1BQU0sYUFBYSxHQUFJLGFBQUQsSUFBbUI7QUFDdkMsU0FBUTs7Ozt1Q0FJNkIsYUFBYSxDQUFDLEVBQUcsd0NBQXVDLGFBQWEsQ0FBQyxJQUFLO3lDQUN6RSxhQUFhLENBQUMsRUFBRyx5Q0FBd0MsYUFBYSxDQUFDLEtBQU07eUNBQzdFLGFBQWEsQ0FBQyxFQUFHLHlDQUF3QyxhQUFhLENBQUMsS0FBTTs7O3NEQUdoRSxhQUFhLENBQUMsRUFBRyxpQkFUckU7QUFVRCxDQVhEOztlQVllLGE7Ozs7Ozs7Ozs7O0FDYmY7O0FBQ0E7Ozs7QUFFQSxNQUFNLFNBQVMsR0FBRyxNQUFNO0FBQ3BCLFFBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUEvRDtBQUNBLFFBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUEvRDs7QUFDQSw2QkFBVyxpQkFBWCxDQUE2QixhQUE3QixFQUNDLElBREQsQ0FDTyxVQUFELElBQWdCO0FBQ3BCLFFBQUcsYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxRQUFuQyxFQUE0QztBQUMxQyxNQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxFQUEvQztBQUNBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBO0FBQ0QsS0FKRCxNQUlPO0FBQ0wsTUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLHVCQUFiO0FBQ0Q7QUFDRixHQVREO0FBVUQsQ0FiSDs7ZUFjaUIsUzs7Ozs7Ozs7Ozs7QUNqQmpCLE1BQU0sVUFBVSxHQUFHLE1BQU07QUFDckIsRUFBQSxjQUFjLENBQUMsVUFBZixDQUEwQixRQUExQjtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELEVBQXhEO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaO0FBQ0QsQ0FKSDs7ZUFNaUIsVTs7Ozs7O0FDTGpCOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSkE7QUFLQTtBQUNBO0FBQ0E7QUFFQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FLE1BQU07QUFDdEU7QUFDRCxDQUZIO0FBSUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFLE1BQU07QUFDckU7QUFDRCxDQUZEO0FBSUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsZ0JBQXhDLENBQXlELE9BQXpELEVBQWtFLE1BQU07QUFDdEU7QUFFRCxDQUhEOzs7Ozs7Ozs7O0FDakJGOzs7O0FBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTTtBQUN2QixRQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxLQUExRDtBQUNBLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUE1RDtBQUNBLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUE1RDtBQUNBLFFBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxLQUFsRTtBQUNBLFFBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxLQUFsRTtBQUNBLFFBQU0sVUFBVSxHQUFHO0FBQ2pCLElBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakIsSUFBQSxLQUFLLEVBQUUsVUFGVTtBQUdqQixJQUFBLEtBQUssRUFBRSxVQUhVO0FBSWpCLElBQUEsUUFBUSxFQUFFLGFBSk87QUFLakIsSUFBQSxRQUFRLEVBQUU7QUFMTyxHQUFuQjs7QUFPQSw2QkFBVyxVQUFYLENBQXNCLFVBQXRCLEVBQ0MsSUFERCxDQUNPLFVBQUQsSUFBZ0I7QUFDbEIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaO0FBQ0YsSUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxVQUFVLENBQUMsRUFBNUM7QUFDRCxHQUpEO0FBS0QsQ0FsQkg7O2VBbUJpQixZOzs7Ozs7Ozs7OztBQ3BCakI7QUFDQSxNQUFNLGtCQUFrQixHQUFJLGFBQUQsSUFBbUI7QUFDMUMsU0FBUTs4QkFDa0IsYUFBYSxDQUFDLEVBQUc7NkJBQ2xCLGFBQWEsQ0FBQyxJQUFLOztrQ0FFZCxhQUFhLENBQUMsS0FBTTtrQ0FDcEIsYUFBYSxDQUFDLEtBQU07Ozs2REFHTyxhQUFhLENBQUMsRUFBRyxvRUFBbUUsYUFBYSxDQUFDLEVBQUc7O2lCQVI5SjtBQVdILENBWkQ7O2VBYWUsa0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBidWlsZENvbnRhY3RPYmplY3QgPSAoY29udGFjdE5hbWVQYXJhbSwgY29udGFjdEVtYWlsUGFyYW0sIGNvbnRhY3RQaG9uZVBhcmFtLCB1c2VySWRQYXJhbSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBjb250YWN0TmFtZVBhcmFtLFxyXG4gICAgICAgIGVtYWlsOiBjb250YWN0RW1haWxQYXJhbSxcclxuICAgICAgICBwaG9uZTogY29udGFjdFBob25lUGFyYW0sXHJcbiAgICAgICAgdXNlcklkOiB1c2VySWRQYXJhbVxyXG4gICAgICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkQ29udGFjdE9iamVjdCIsImltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0XCI7XHJcblxyXG4vLyBBIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXHJcblxyXG5jb25zdCBhcGlNYW5hZ2VyID0ge1xyXG4gICAgLy9nZXRzIGFsbCBjb250YWN0cyBmcm9tIGFwaVxyXG4gICAgZ2V0QWxsQ29udGFjdHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGNvbnRhY3RzID0+IGNvbnRhY3RzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvL3Bvc3RzIG5ldyBjb250YWN0IHRvIHRoZSBhcGlcclxuICAgIHBvc3ROZXdDb250YWN0OiBjb250YWN0T2JqZWN0ID0+IHtcclxuICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RPYmplY3QpXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHByaW50QWxsQ29udGFjdHMoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy9lZGl0cyBjb250YWN0XHJcbiAgICBlZGl0Q29udGFjdDogKGlkUGFyYW0sIGNvbnRhY3RUb0VkaXQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkUGFyYW19YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRBbGxDb250YWN0cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy9kZWxldGVzIGNvbnRhY3RcclxuICAgIGRlbGV0ZUNvbnRhY3Q6IChpZFRvRGVsZXRlKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkVG9EZWxldGV9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRBbGxDb250YWN0cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy9nZXRzIGEgc2luZ2xlIGNvbnRhY3RcclxuICAgIGdldE9uZUNvbnRhY3Q6IChjb250YWN0SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2NvbnRhY3RJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0ID0+IGNvbnRhY3QuanNvbigpKVxyXG4gICAgfSxcclxuICAgIC8vcmV0cmlldmVzIGEgdXNlclxyXG4gICAgZ2V0VXNlckJ5VXNlck5hbWU6ICh1c2VyTmFtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzP3VzZXJuYW1lPSR7dXNlck5hbWV9YClcclxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB1c2VyLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICAvL2FkZHMgYSB1c2VyXHJcbiAgICBhZGROZXdVc2VyOiAodXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaU1hbmFnZXI7IiwiLy8gQSBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxyXG5pbXBvcnQgYnVpbGRFZGl0Rm9ybSBmcm9tIFwiLi9lZGl0Rm9ybVwiXHJcbmltcG9ydCBidWlsZENvbnRhY3RPYmplY3QgZnJvbSBcIi4vYnVpbGRDb250YWN0T2JqZWN0XCJcclxuLy9vdmVyYWxsIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhbmQgcG9zdCB0aGUgbmV3IGNvbnRhY3RcclxuY29uc3QgY29udGFjdFdpemFyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3RNYWtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lSW5wdXRcIikudmFsdWVcclxuICAgICAgICBjb25zdCBwaG9uZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaG9uZUlucHV0XCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgZW1haWxWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxJbnB1dFwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IHVzZXJJZFZhbHVlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJJZFZhbHVlKVxyXG4gICAgICAgIGNvbnN0IG5ld0NvbnRhY3QgPSBidWlsZENvbnRhY3RPYmplY3QobmFtZVZhbHVlLCBlbWFpbFZhbHVlLCBwaG9uZVZhbHVlLCB1c2VySWRWYWx1ZSlcclxuICAgICAgICBhcGlNYW5hZ2VyLnBvc3ROZXdDb250YWN0KG5ld0NvbnRhY3QpXHJcbiAgICAgICAgLy9IT1BFRlVMTFkgcmVwcmludHMgdGhlIHBhZ2Ugd2l0aCBuZXcgY29udGFjdFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdENvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfSk7XHJcbiAgICAvL2RlbGV0ZXMgYSBjb250YWN0XHJcbiAgICBjb25zdCBjb250YWN0RGVsZXRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhY3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZGVsZXRlQ29udGFjdChjb250YWN0SWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vb3BlbnMgZWRpdCBmb3JtXHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhY3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIGNvbnRhY3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZ2V0T25lQ29udGFjdChjb250YWN0SWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlQ29udGFjdEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZW1wbG95ZWVDb250YWluZXItJHtjb250YWN0SWR9YCkuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlbXBsb3llZUNvbnRhaW5lci0ke2NvbnRhY3RJZH1gKS5pbm5lckhUTUw9IGJ1aWxkRWRpdEZvcm0oc2luZ2xlQ29udGFjdEluZm8pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9idWlsZHMgYSBuZXcgb2JqZWN0IGZyb20gdGhlIGVkaXQgZm9ybVxyXG4gICAgICAgIGVsc2UgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFZGl0QnV0dG9uXCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNuYW1lRWRpdElucHV0LSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0ZWRFbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlbWFpbEVkaXRJbnB1dC0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkUGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGhvbmVFZGl0SW5wdXQtJHtpdGVtSWR9YCkudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRlZFVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRlZENvbnRhY3QgPSBidWlsZENvbnRhY3RPYmplY3QoZWRpdGVkTmFtZSwgZWRpdGVkRW1haWwsIGVkaXRlZFBob25lLCBlZGl0ZWRVc2VySWQpO1xyXG4gICAgICAgICAgICBhcGlNYW5hZ2VyLmVkaXRDb250YWN0KGl0ZW1JZCwgZWRpdGVkQ29udGFjdClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuLy8gLS0tIEVWRU5UIExJU1RFTkVSIEZPUiBFRElUIFNBVkUgQlVUVE9OIC0tLy9cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdFdpemFyZFxyXG4iLCIvLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBidWlsZFNpbmdsZUNvbnRhY3QgZnJvbSBcIi4vc2luZ2xlQ29udGFjdFwiO1xyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xyXG4vL3ByaW50cyBhbGwgb2YgYSB1c2VyJ3MgY29udGFjdHNcclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJRCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGFwaU1hbmFnZXIuZ2V0QWxsQ29udGFjdHModXNlcklEKVxyXG4gICAgLnRoZW4oKGNvbnRhY3RzKSA9PiB7XHJcbiAgICAgICAgY29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0ID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0Q29udGFpbmVyXCIpLmlubmVySFRNTCArPSBidWlsZFNpbmdsZUNvbnRhY3Qoc2luZ2xlQ29udGFjdClcclxuICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50QWxsQ29udGFjdHM7IiwiXHJcbmNvbnN0IGJ1aWxkRWRpdEZvcm0gPSAoc2luZ2xlQ29udGFjdCkgPT4ge1xyXG4gIHJldHVybiBgPGJyPlxyXG4gIDxoMj5FZGl0IGNvbnRhY3Q8L2gyPlxyXG4gIDxicj5cclxuICA8Zm9ybT5cclxuICAgICAgTmFtZTogPGlucHV0IGlkPVwibmFtZUVkaXRJbnB1dC0ke3NpbmdsZUNvbnRhY3QuaWR9XCIgbmFtZT1cIm5hbWVFZGl0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7c2luZ2xlQ29udGFjdC5uYW1lfVwiPlxyXG4gICAgICBQaG9uZTogPGlucHV0IGlkPVwicGhvbmVFZGl0SW5wdXQtJHtzaW5nbGVDb250YWN0LmlkfVwiIG5hbWU9XCJwaG9uZUVkaXRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHtzaW5nbGVDb250YWN0LnBob25lfVwiPlxyXG4gICAgICBFbWFpbDogPGlucHV0IGlkPVwiZW1haWxFZGl0SW5wdXQtJHtzaW5nbGVDb250YWN0LmlkfVwiIG5hbWU9XCJlbWFpbEVkaXRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHtzaW5nbGVDb250YWN0LmVtYWlsfVwiPlxyXG4gIDwvZm9ybT5cclxuICA8YnI+XHJcbiAgPGJ1dHRvbiBjbGFzcz1cInNhdmVFZGl0QnV0dG9uXCIgaWQ9XCJzYXZlRWRpdEJ1dHRvbi0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+U2F2ZTwvYnV0dG9uPmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEVkaXRGb3JtO1xyXG4iLCJpbXBvcnQgcHJpbnRBbGxDb250YWN0cyBmcm9tIFwiLi9jb250YWN0TGlzdC5qc1wiO1xyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXHJcblxyXG5jb25zdCBsb2dpblVzZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyTmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZUxvZ2luXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcGFzc3dvcmRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRMb2dpblwiKS52YWx1ZTtcclxuICAgIGFwaU1hbmFnZXIuZ2V0VXNlckJ5VXNlck5hbWUodXNlck5hbWVWYWx1ZSlcclxuICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgIGlmKHBhc3N3b3JkVmFsdWUgPT09IHBhcnNlZFVzZXJbMF0ucGFzc3dvcmQpe1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlclswXS5pZClcclxuICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBsb2dnZWQgaW4hXCIpXHJcbiAgICAgICAgcHJpbnRBbGxDb250YWN0cygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIm5lZ2F0aXZlLCBnaG9zdCByaWRlclwiKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBleHBvcnQgZGVmYXVsdCBsb2dpblVzZXIiLCJjb25zdCBsb2dvdXRVc2VyID0gKCkgPT4ge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGNvbnNvbGUubG9nKFwiWW91IGxvZ2dlZCBvdXQhXCIpXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBsb2dvdXRVc2VyIiwiLy8gSW4gbWFpbi5qcywgaW1wb3J0IHRoZSBDb250YWN0TGlzdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Rm9ybSBjb21wb25lbnQuXHJcbmltcG9ydCBjb250YWN0V2l6YXJkIGZyb20gXCIuL2NvbnRhY3RGb3JtXCI7XHJcbmltcG9ydCByZWdpc3RlclVzZXIgZnJvbSBcIi4vcmVnaXN0ZXJcIjtcclxuaW1wb3J0IGxvZ2luVXNlciBmcm9tIFwiLi9sb2dpblwiO1xyXG5pbXBvcnQgbG9nb3V0VXNlciBmcm9tIFwiLi9sb2dvdXRcIjtcclxuLy8gaW1wb3J0IGNvbnRhY3REZWxldGVyIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcclxuLy8gVGhlIHVzZXIgc2hvdWxkIHNlZSB0aGUgY29udGFjdCBmb3JtIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXcsIGFuZCB0aGUgbGlzdCBvZiBjb250YWN0cyB1bmRlcm5lYXRoIGl0LlxyXG5jb250YWN0V2l6YXJkKClcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHJlZ2lzdGVyVXNlcigpO1xyXG4gIH0pXHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5CdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGxvZ2luVXNlcigpO1xyXG4gIH0pXHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9nb3V0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBsb2dvdXRVc2VyKCk7XHJcblxyXG4gIH0pXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXHJcbmNvbnN0IHJlZ2lzdGVyVXNlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IG5hbWVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJOYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcGhvbmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJQaG9uZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVtYWlsVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyRW1haWxcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VybmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclVzZXJuYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcGFzc3dvcmRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJQYXNzd29yZFwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJPYmplY3QgPSB7XHJcbiAgICAgIG5hbWU6IG5hbWVWYWx1ZSxcclxuICAgICAgcGhvbmU6IHBob25lVmFsdWUsXHJcbiAgICAgIGVtYWlsOiBlbWFpbFZhbHVlLFxyXG4gICAgICB1c2VybmFtZTogdXNlcm5hbWVWYWx1ZSxcclxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkVmFsdWVcclxuICAgIH07XHJcbiAgICBhcGlNYW5hZ2VyLmFkZE5ld1VzZXIodXNlck9iamVjdClcclxuICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyIHJlZ2lzdGVyZWQhXCIpXHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlci5pZClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyVXNlcjsiLCIvLyBBIENvbnRhY3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxyXG5jb25zdCBidWlsZFNpbmdsZUNvbnRhY3QgPSAoc2luZ2xlQ29udGFjdCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuPGRpdiBpZCA9XCJlbXBsb3llZUNvbnRhaW5lci0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+TmFtZTogICR7c2luZ2xlQ29udGFjdC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPkVtYWlsOiAgJHtzaW5nbGVDb250YWN0LmVtYWlsfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlBob25lOiAgJHtzaW5nbGVDb250YWN0LnBob25lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEJ1dHRvbi0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVDb250YWN0LmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGhyPmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUNvbnRhY3Q7Il19

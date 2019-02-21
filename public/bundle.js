(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildContactObject = (contactNameParam, contactEmailParam, contactPhoneParam) => {
  return {
    name: contactNameParam,
    email: contactEmailParam,
    phone: contactPhoneParam
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
  getAllContacts: () => {
    return fetch("http://localhost:8088/contacts").then(contacts => contacts.json());
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
  getOneContact: contactId => {
    return fetch(`http://localhost:8088/contacts/${contactId}`).then(contact => contact.json());
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

var _contactList = _interopRequireDefault(require("./contactList"));

var _editForm = _interopRequireDefault(require("./editForm"));

var _buildContactObject = _interopRequireDefault(require("./buildContactObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
//overall function to create and post the new contact
const contactWizard = () => {
  const contactMaker = document.querySelector("#submitButton").addEventListener("click", () => {
    const nameValue = document.querySelector("#nameInput").value;
    const phoneValue = document.querySelector("#phoneInput").value;
    const emailValue = document.querySelector("#emailInput").value;
    const newContact = (0, _buildContactObject.default)(nameValue, emailValue, phoneValue);

    _contactCollection.default.postNewContact(newContact); //HOPEFULLY reprints the page with new contact


    document.querySelector("#contactContainer").innerHTML = "";
    (0, _contactList.default)();
  });
  const contactDeleter = document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("deleteButton")) {
      let contactId = event.target.id.split("-")[1];

      _contactCollection.default.deleteContact(contactId);
    } else if (event.target.classList.contains("editButton")) {
      let contactId = event.target.id.split("-")[1];
      contactId = event.target.id.split("-")[1];

      _contactCollection.default.getOneContact(contactId).then(singleContactInfo => {
        document.querySelector(`#employeeContainer-${contactId}`).innerHTML = "";
        document.querySelector(`#employeeContainer-${contactId}`).innerHTML = (0, _editForm.default)(singleContactInfo);
      });
    } else if (event.target.classList.contains("saveEditButton")) {
      const itemId = event.target.id.split("-")[1];
      const editedName = document.querySelector(`#nameEditInput-${itemId}`).value;
      const editedEmail = document.querySelector(`#emailEditInput-${itemId}`).value;
      const editedPhone = document.querySelector(`#phoneEditInput-${itemId}`).value;
      const editedContact = (0, _buildContactObject.default)(editedName, editedEmail, editedPhone);

      _contactCollection.default.editContact(itemId, editedContact);
    }
  });
}; // --- EVENT LISTENER FOR EDIT SAVE BUTTON --//


var _default = contactWizard;
exports.default = _default;

},{"./buildContactObject.js":1,"./contactCollection":2,"./contactList":4,"./editForm":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _singleContact = _interopRequireDefault(require("./singleContact"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
const printAllContacts = () => {
  document.querySelector("#contactContainer").innerHTML = "";

  _contactCollection.default.getAllContacts().then(contacts => {
    contacts.forEach(singleContact => {
      document.querySelector("#contactContainer").innerHTML += (0, _singleContact.default)(singleContact);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contactCollection":2,"./singleContact":7}],5:[function(require,module,exports){
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

var _contactList = _interopRequireDefault(require("./contactList"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In main.js, import the ContactList component and the ContactForm component.
// import contactDeleter from "./contactForm"
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
(0, _contactList.default)();
(0, _contactForm.default)();

},{"./contactForm":3,"./contactList":4}],7:[function(require,module,exports){
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

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkQ29udGFjdE9iamVjdC5qcyIsIi4uL3NjcmlwdHMvY29udGFjdENvbGxlY3Rpb24uanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RGb3JtLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0TGlzdC5qcyIsIi4uL3NjcmlwdHMvZWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3NpbmdsZUNvbnRhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLGdCQUFELEVBQW1CLGlCQUFuQixFQUFzQyxpQkFBdEMsS0FBNEQ7QUFDbkYsU0FBTztBQUNILElBQUEsSUFBSSxFQUFFLGdCQURIO0FBRUgsSUFBQSxLQUFLLEVBQUUsaUJBRko7QUFHSCxJQUFBLEtBQUssRUFBRTtBQUhKLEdBQVA7QUFLSCxDQU5EOztlQU9lLGtCOzs7Ozs7Ozs7OztBQ1BmOzs7O0FBRUE7QUFFQSxNQUFNLFVBQVUsR0FBRztBQUNmO0FBQ0EsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUNsQixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUxjO0FBTWY7QUFDQSxFQUFBLGNBQWMsRUFBRSxhQUFhLElBQUk7QUFDN0IsSUFBQSxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDcEMsTUFBQSxNQUFNLEVBQUUsTUFENEI7QUFFcEMsTUFBQSxPQUFPLEVBQ1A7QUFDSSx3QkFBZ0I7QUFEcEIsT0FIb0M7QUFNcEMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxhQUFmO0FBTjhCLEtBQW5DLENBQUwsQ0FPRyxJQVBILENBT1EsTUFBTTtBQUNWO0FBQ0gsS0FURDtBQVVILEdBbEJjO0FBbUJmO0FB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O0FBTUMsQ0FSTDs7ZUFVZSxnQjs7Ozs7Ozs7Ozs7QUNaZixNQUFNLGFBQWEsR0FBSSxhQUFELElBQW1CO0FBQ3ZDLFNBQVE7Ozs7dUNBSTZCLGFBQWEsQ0FBQyxFQUFHLHdDQUF1QyxhQUFhLENBQUMsSUFBSzt5Q0FDekUsYUFBYSxDQUFDLEVBQUcseUNBQXdDLGFBQWEsQ0FBQyxLQUFNO3lDQUM3RSxhQUFhLENBQUMsRUFBRyx5Q0FBd0MsYUFBYSxDQUFDLEtBQU07OztzREFHaEUsYUFBYSxDQUFDLEVBQUcsaUJBVHJFO0FBVUQsQ0FYRDs7ZUFZZSxhOzs7Ozs7QUNaZjs7QUFDQTs7OztBQUZBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNOQTtBQUNBLE1BQU0sa0JBQWtCLEdBQUksYUFBRCxJQUFtQjtBQUMxQyxTQUFROzhCQUNrQixhQUFhLENBQUMsRUFBRzs2QkFDbEIsYUFBYSxDQUFDLElBQUs7O2tDQUVkLGFBQWEsQ0FBQyxLQUFNO2tDQUNwQixhQUFhLENBQUMsS0FBTTs7OzZEQUdPLGFBQWEsQ0FBQyxFQUFHLG9FQUFtRSxhQUFhLENBQUMsRUFBRzs7aUJBUjlKO0FBV0gsQ0FaRDs7ZUFhZSxrQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJ1aWxkQ29udGFjdE9iamVjdCA9IChjb250YWN0TmFtZVBhcmFtLCBjb250YWN0RW1haWxQYXJhbSwgY29udGFjdFBob25lUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogY29udGFjdE5hbWVQYXJhbSxcclxuICAgICAgICBlbWFpbDogY29udGFjdEVtYWlsUGFyYW0sXHJcbiAgICAgICAgcGhvbmU6IGNvbnRhY3RQaG9uZVBhcmFtXHJcbiAgICAgIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDb250YWN0T2JqZWN0IiwiaW1wb3J0IHByaW50QWxsQ29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3RcIjtcclxuXHJcbi8vIEEgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cclxuXHJcbmNvbnN0IGFwaU1hbmFnZXIgPSB7XHJcbiAgICAvL2dldHMgYWxsIGNvbnRhY3RzIGZyb20gYXBpXHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiKVxyXG4gICAgICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy9wb3N0cyBuZXcgY29udGFjdCB0byB0aGUgYXBpXHJcbiAgICBwb3N0TmV3Q29udGFjdDogY29udGFjdE9iamVjdCA9PiB7XHJcbiAgICAgICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0T2JqZWN0KVxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmludEFsbENvbnRhY3RzKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vZWRpdHMgY29udGFjdFxyXG4gICAgZWRpdENvbnRhY3Q6IChpZFBhcmFtLCBjb250YWN0VG9FZGl0KSA9PiB7XHJcbiAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkUGFyYW19YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRhY3RUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHByaW50QWxsQ29udGFjdHMoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy9kZWxldGVzIGNvbnRhY3RcclxuICAgIGRlbGV0ZUNvbnRhY3Q6IChpZFRvRGVsZXRlKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0cy8ke2lkVG9EZWxldGV9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRBbGxDb250YWN0cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0T25lQ29udGFjdDogKGNvbnRhY3RJZCkgPT4ge1xyXG4gICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHMvJHtjb250YWN0SWR9YClcclxuICAgICAgICAgICAgLnRoZW4oY29udGFjdCA9PiBjb250YWN0Lmpzb24oKSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBhcGlNYW5hZ2VyOyIsIi8vIEEgQ29udGFjdEZvcm0gY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBhcGlNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcclxuaW1wb3J0IHByaW50QWxsQ29udGFjdHMgZnJvbSBcIi4vY29udGFjdExpc3RcIjtcclxuaW1wb3J0IGJ1aWxkRWRpdEZvcm0gZnJvbSBcIi4vZWRpdEZvcm1cIlxyXG5pbXBvcnQgYnVpbGRDb250YWN0T2JqZWN0IGZyb20gXCIuL2J1aWxkQ29udGFjdE9iamVjdC5qc1wiXHJcbi8vb3ZlcmFsbCBmdW5jdGlvbiB0byBjcmVhdGUgYW5kIHBvc3QgdGhlIG5ldyBjb250YWN0XHJcbmNvbnN0IGNvbnRhY3RXaXphcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWN0TWFrZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5hbWVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZUlucHV0XCIpLnZhbHVlXHJcbiAgICAgICAgY29uc3QgcGhvbmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmVJbnB1dFwiKS52YWx1ZVxyXG4gICAgICAgIGNvbnN0IGVtYWlsVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsSW5wdXRcIikudmFsdWVcclxuICAgICAgICBjb25zdCBuZXdDb250YWN0ID0gYnVpbGRDb250YWN0T2JqZWN0KG5hbWVWYWx1ZSwgZW1haWxWYWx1ZSwgcGhvbmVWYWx1ZSlcclxuICAgICAgICBhcGlNYW5hZ2VyLnBvc3ROZXdDb250YWN0KG5ld0NvbnRhY3QpXHJcbiAgICAgICAgLy9IT1BFRlVMTFkgcmVwcmludHMgdGhlIHBhZ2Ugd2l0aCBuZXcgY29udGFjdFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdENvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHByaW50QWxsQ29udGFjdHMoKVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjb250YWN0RGVsZXRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhY3RJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZGVsZXRlQ29udGFjdChjb250YWN0SWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0QnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICBjb250YWN0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICBhcGlNYW5hZ2VyLmdldE9uZUNvbnRhY3QoY29udGFjdElkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUNvbnRhY3RJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VtcGxveWVlQ29udGFpbmVyLSR7Y29udGFjdElkfWApLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZW1wbG95ZWVDb250YWluZXItJHtjb250YWN0SWR9YCkuaW5uZXJIVE1MPSBidWlsZEVkaXRGb3JtKHNpbmdsZUNvbnRhY3RJbmZvKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFZGl0QnV0dG9uXCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNuYW1lRWRpdElucHV0LSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0ZWRFbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlbWFpbEVkaXRJbnB1dC0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkUGhvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcGhvbmVFZGl0SW5wdXQtJHtpdGVtSWR9YCkudmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlZGl0ZWRDb250YWN0ID0gYnVpbGRDb250YWN0T2JqZWN0KGVkaXRlZE5hbWUsIGVkaXRlZEVtYWlsLCBlZGl0ZWRQaG9uZSk7XHJcbiAgICAgICAgICAgIGFwaU1hbmFnZXIuZWRpdENvbnRhY3QoaXRlbUlkLCBlZGl0ZWRDb250YWN0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4vLyAtLS0gRVZFTlQgTElTVEVORVIgRk9SIEVESVQgU0FWRSBCVVRUT04gLS0vL1xyXG5leHBvcnQgZGVmYXVsdCBjb250YWN0V2l6YXJkXHJcbiIsIi8vIEEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IGJ1aWxkU2luZ2xlQ29udGFjdCBmcm9tIFwiLi9zaW5nbGVDb250YWN0XCJcclxuaW1wb3J0IGFwaU1hbmFnZXIgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxyXG5jb25zdCBwcmludEFsbENvbnRhY3RzID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBhcGlNYW5hZ2VyLmdldEFsbENvbnRhY3RzKClcclxuICAgIC50aGVuKChjb250YWN0cykgPT4ge1xyXG4gICAgICAgIGNvbnRhY3RzLmZvckVhY2goc2luZ2xlQ29udGFjdCA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFjdENvbnRhaW5lclwiKS5pbm5lckhUTUwgKz0gYnVpbGRTaW5nbGVDb250YWN0KHNpbmdsZUNvbnRhY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludEFsbENvbnRhY3RzOyIsIlxyXG5jb25zdCBidWlsZEVkaXRGb3JtID0gKHNpbmdsZUNvbnRhY3QpID0+IHtcclxuICByZXR1cm4gYDxicj5cclxuICA8aDI+RWRpdCBjb250YWN0PC9oMj5cclxuICA8YnI+XHJcbiAgPGZvcm0+XHJcbiAgICAgIE5hbWU6IDxpbnB1dCBpZD1cIm5hbWVFZGl0SW5wdXQtJHtzaW5nbGVDb250YWN0LmlkfVwiIG5hbWU9XCJuYW1lRWRpdFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3NpbmdsZUNvbnRhY3QubmFtZX1cIj5cclxuICAgICAgUGhvbmU6IDxpbnB1dCBpZD1cInBob25lRWRpdElucHV0LSR7c2luZ2xlQ29udGFjdC5pZH1cIiBuYW1lPVwicGhvbmVFZGl0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7c2luZ2xlQ29udGFjdC5waG9uZX1cIj5cclxuICAgICAgRW1haWw6IDxpbnB1dCBpZD1cImVtYWlsRWRpdElucHV0LSR7c2luZ2xlQ29udGFjdC5pZH1cIiBuYW1lPVwiZW1haWxFZGl0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7c2luZ2xlQ29udGFjdC5lbWFpbH1cIj5cclxuICA8L2Zvcm0+XHJcbiAgPGJyPlxyXG4gIDxidXR0b24gY2xhc3M9XCJzYXZlRWRpdEJ1dHRvblwiIGlkPVwic2F2ZUVkaXRCdXR0b24tJHtzaW5nbGVDb250YWN0LmlkfVwiPlNhdmU8L2J1dHRvbj5gXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFZGl0Rm9ybTtcclxuIiwiLy8gSW4gbWFpbi5qcywgaW1wb3J0IHRoZSBDb250YWN0TGlzdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Rm9ybSBjb21wb25lbnQuXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcclxuaW1wb3J0IGNvbnRhY3RXaXphcmQgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG4vLyBpbXBvcnQgY29udGFjdERlbGV0ZXIgZnJvbSBcIi4vY29udGFjdEZvcm1cIlxyXG4vLyBUaGUgdXNlciBzaG91bGQgc2VlIHRoZSBjb250YWN0IGZvcm0gYXQgdGhlIHRvcCBvZiB0aGUgdmlldywgYW5kIHRoZSBsaXN0IG9mIGNvbnRhY3RzIHVuZGVybmVhdGggaXQuXHJcbnByaW50QWxsQ29udGFjdHMoKVxyXG5jb250YWN0V2l6YXJkKClcclxuXHJcblxyXG5cclxuXHJcbiIsIi8vIEEgQ29udGFjdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXHJcbmNvbnN0IGJ1aWxkU2luZ2xlQ29udGFjdCA9IChzaW5nbGVDb250YWN0KSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG48ZGl2IGlkID1cImVtcGxveWVlQ29udGFpbmVyLSR7c2luZ2xlQ29udGFjdC5pZH1cIj5cclxuICAgICAgICAgICAgICAgIDxoMj5OYW1lOiAgJHtzaW5nbGVDb250YWN0Lm5hbWV9PC9oMj5cclxuICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+RW1haWw6ICAke3NpbmdsZUNvbnRhY3QuZW1haWx9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+UGhvbmU6ICAke3NpbmdsZUNvbnRhY3QucGhvbmV9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRCdXR0b25cIiBpZD0gXCJlZGl0QnV0dG9uLSR7c2luZ2xlQ29udGFjdC5pZH1cIj5VcGRhdGU8L2J1dHRvbj4gPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZUJ1dHRvblwiIGlkPSBcImRlbGV0ZUJ1dHRvbi0ke3NpbmdsZUNvbnRhY3QuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aHI+YFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkU2luZ2xlQ29udGFjdDsiXX0=

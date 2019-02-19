(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
    });
  }
};
var _default = apiManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
//overall function to create and post the new contact
const contactMaker = document.querySelector("#submitButton").addEventListener("click", () => {
  const nameValue = document.querySelector("#nameInput").value;
  const phoneValue = document.querySelector("#phoneInput").value;
  const emailValue = document.querySelector("#emailInput").value;
  const newContact = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue
  };

  _contactCollection.default.postNewContact(newContact); //HOPEFULLY reprints the page with new contact


  document.querySelector("#contactContainer").innerHTML = "";
  (0, _contactList.default)();
});
var _default = contactMaker;
exports.default = _default;

},{"./contactCollection":1,"./contactList":3}],3:[function(require,module,exports){
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
  _contactCollection.default.getAllContacts().then(contacts => {
    contacts.forEach(singleContact => {
      document.querySelector("#contactContainer").innerHTML += (0, _singleContact.default)(singleContact);
    });
  });
};

var _default = printAllContacts;
exports.default = _default;

},{"./contactCollection":1,"./singleContact":5}],4:[function(require,module,exports){
"use strict";

var _contactList = _interopRequireDefault(require("./contactList"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In main.js, import the ContactList component and the ContactForm component.
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
(0, _contactList.default)();

},{"./contactForm":2,"./contactList":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A Contact component that displays a person's name, phone number, and address.
const buildSingleContact = singleContact => {
  return `<div id ="employeeContainer-${singleContact.id}">
                    <h2>Name:  ${singleContact.name}</h2>
                    <ul>
                    <li>Email:  ${singleContact.email}</li>
                    <li>Phone:  ${singleContact.phone}</li>
                    </div>
`;
};

var _default = buildSingleContact;
exports.default = _default;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3NpbmdsZUNvbnRhY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTtBQUVBLE1BQU0sVUFBVSxHQUFHO0FBQ2Y7QUFDQSxFQUFBLGNBQWMsRUFBRSxNQUFNO0FBQ2pCLFdBQU8sS0FBSyxDQUFDLGdDQUFELENBQUwsQ0FDUCxJQURPLENBQ0YsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRFYsQ0FBUDtBQUVKLEdBTGM7QUFNZjtBQUNBLEVBQUEsY0FBYyxFQUFFLGFBQWEsSUFBSTtBQUNqQyxJQUFBLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUN4QyxNQUFBLE1BQU0sRUFBRSxNQURnQztBQUV4QyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRitCO0FBS3hDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUxrQyxLQUFuQyxDQUFMO0FBT0U7QUFmYSxDQUFuQjtlQWlCZSxVOzs7Ozs7Ozs7OztBQ2xCZjs7QUFDQTs7OztBQUZBO0FBR0E7QUFDQSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBbUUsTUFBSztBQUN6RixRQUFNLFNBQVMsR0FBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUF0RDtBQUNBLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXpEO0FBQ0EsUUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBekQ7QUFDSixRQUFNLFVBQVUsR0FBRztBQUNmLElBQUEsSUFBSSxFQUFHLFNBRFE7QUFFZixJQUFBLEtBQUssRUFBRyxVQUZPO0FBR2YsSUFBQSxLQUFLLEVBQUc7QUFITyxHQUFuQjs7QUFLQSw2QkFBVyxjQUFYLENBQTBCLFVBQTFCLEVBVDZGLENBVTdGOzs7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RDtBQUNBO0FBQ0MsQ0Fib0IsQ0FBckI7ZUFlZSxZOzs7Ozs7Ozs7OztBQ2xCZjs7QUFDQTs7OztBQUZBO0FBR0EsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNO0FBQzNCLDZCQUFXLGNBQVgsR0FDQyxJQURELENBQ08sUUFBRCxJQUFjO0FBQ2hCLElBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsYUFBYSxJQUFJO0FBQzlCLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLElBQXlELDRCQUFtQixhQUFuQixDQUF6RDtBQUNILEtBRkQ7QUFHQyxHQUxMO0FBTUMsQ0FQTDs7ZUFTZSxnQjs7Ozs7O0FDWGY7O0FBQ0E7Ozs7QUFGQTtBQUdBO0FBQ0E7Ozs7Ozs7Ozs7QUNKQTtBQUNBLE1BQU0sa0JBQWtCLEdBQUksYUFBRCxJQUFtQjtBQUMxQyxTQUFRLCtCQUE4QixhQUFhLENBQUMsRUFBRztpQ0FDMUIsYUFBYSxDQUFDLElBQUs7O2tDQUVsQixhQUFhLENBQUMsS0FBTTtrQ0FDcEIsYUFBYSxDQUFDLEtBQU07O0NBSmxEO0FBT0gsQ0FSRDs7ZUFTZSxrQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIEEgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50IHRoYXQgbG9hZHMgZXhpc3RpbmcgY29udGFjdHMgZnJvbSBzdG9yYWdlLCBhbmQgc2F2ZXMgbmV3IG9uZXMuIEVhY2ggbmV3IGNvbnRhY3Qgc2hvdWxkIGhhdmUgYW4gYXV0by1nZW5lcmF0ZWQgaWRlbnRpZmllci5cclxuXHJcbmNvbnN0IGFwaU1hbmFnZXIgPSB7XHJcbiAgICAvL2dldHMgYWxsIGNvbnRhY3RzIGZyb20gYXBpXHJcbiAgICBnZXRBbGxDb250YWN0czogKCkgPT4ge1xyXG4gICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIilcclxuICAgICAgICAudGhlbihjb250YWN0cyA9PiBjb250YWN0cy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgLy9wb3N0cyBuZXcgY29udGFjdCB0byB0aGUgYXBpXHJcbiAgICBwb3N0TmV3Q29udGFjdDogY29udGFjdE9iamVjdCA9PiB7XHJcbiAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdE9iamVjdClcclxufSlcclxuICAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYXBpTWFuYWdlcjsiLCIvLyBBIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5pbXBvcnQgYXBpTWFuYWdlciBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0XCI7XHJcbi8vb3ZlcmFsbCBmdW5jdGlvbiB0byBjcmVhdGUgYW5kIHBvc3QgdGhlIG5ldyBjb250YWN0XHJcbmNvbnN0IGNvbnRhY3RNYWtlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiICwgKCkgPT57XHJcbiAgICBjb25zdCBuYW1lVmFsdWUgPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZUlucHV0XCIpLnZhbHVlXHJcbiAgICBjb25zdCBwaG9uZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaG9uZUlucHV0XCIpLnZhbHVlXHJcbiAgICBjb25zdCBlbWFpbFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbElucHV0XCIpLnZhbHVlXHJcbmNvbnN0IG5ld0NvbnRhY3QgPSB7XHJcbiAgICBuYW1lIDogbmFtZVZhbHVlLFxyXG4gICAgcGhvbmUgOiBwaG9uZVZhbHVlLFxyXG4gICAgZW1haWwgOiBlbWFpbFZhbHVlXHJcbiAgICB9XHJcbmFwaU1hbmFnZXIucG9zdE5ld0NvbnRhY3QobmV3Q29udGFjdClcclxuLy9IT1BFRlVMTFkgcmVwcmludHMgdGhlIHBhZ2Ugd2l0aCBuZXcgY29udGFjdFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhY3RDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxucHJpbnRBbGxDb250YWN0cygpXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdE1ha2VyXHJcblxyXG4iLCIvLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBidWlsZFNpbmdsZUNvbnRhY3QgZnJvbSBcIi4vc2luZ2xlQ29udGFjdFwiXHJcbmltcG9ydCBhcGlNYW5hZ2VyIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcclxuY29uc3QgcHJpbnRBbGxDb250YWN0cyA9ICgpID0+IHtcclxuICAgIGFwaU1hbmFnZXIuZ2V0QWxsQ29udGFjdHMoKVxyXG4gICAgLnRoZW4oKGNvbnRhY3RzKSA9PiB7XHJcbiAgICAgICAgY29udGFjdHMuZm9yRWFjaChzaW5nbGVDb250YWN0ID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWN0Q29udGFpbmVyXCIpLmlubmVySFRNTCArPSBidWlsZFNpbmdsZUNvbnRhY3Qoc2luZ2xlQ29udGFjdClcclxuICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50QWxsQ29udGFjdHM7IiwiLy8gSW4gbWFpbi5qcywgaW1wb3J0IHRoZSBDb250YWN0TGlzdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Rm9ybSBjb21wb25lbnQuXHJcbmltcG9ydCBwcmludEFsbENvbnRhY3RzIGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcclxuaW1wb3J0IHBvc3RNYWxvbmUgZnJvbSBcIi4vY29udGFjdEZvcm1cIjtcclxuLy8gVGhlIHVzZXIgc2hvdWxkIHNlZSB0aGUgY29udGFjdCBmb3JtIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXcsIGFuZCB0aGUgbGlzdCBvZiBjb250YWN0cyB1bmRlcm5lYXRoIGl0LlxyXG5wcmludEFsbENvbnRhY3RzKClcclxuXHJcbiIsIi8vIEEgQ29udGFjdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhIHBlcnNvbidzIG5hbWUsIHBob25lIG51bWJlciwgYW5kIGFkZHJlc3MuXHJcbmNvbnN0IGJ1aWxkU2luZ2xlQ29udGFjdCA9IChzaW5nbGVDb250YWN0KSA9PiB7XHJcbiAgICByZXR1cm4gYDxkaXYgaWQgPVwiZW1wbG95ZWVDb250YWluZXItJHtzaW5nbGVDb250YWN0LmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj5OYW1lOiAgJHtzaW5nbGVDb250YWN0Lm5hbWV9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPkVtYWlsOiAgJHtzaW5nbGVDb250YWN0LmVtYWlsfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlBob25lOiAgJHtzaW5nbGVDb250YWN0LnBob25lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUNvbnRhY3Q7Il19

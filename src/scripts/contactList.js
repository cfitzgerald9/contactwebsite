// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
import buildSingleContact from "./singleContact"
import apiManager from "./contactCollection"
const printAllContacts = () => {
    document.querySelector("#contactContainer").innerHTML = "";
    apiManager.getAllContacts()
    .then((contacts) => {
        contacts.forEach(singleContact => {
            document.querySelector("#contactContainer").innerHTML += buildSingleContact(singleContact)
        })
        });
    };

export default printAllContacts;
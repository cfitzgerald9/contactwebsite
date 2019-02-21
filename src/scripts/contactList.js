// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
import buildSingleContact from "./singleContact";
import apiManager from "./contactCollection";
//prints all of a user's contacts
const printAllContacts = () => {
    const userID = sessionStorage.getItem("userId");
    document.querySelector("#contactContainer").innerHTML = "";
    apiManager.getAllContacts(userID)
    .then((contacts) => {
        contacts.forEach(singleContact => {
            document.querySelector("#contactContainer").innerHTML += buildSingleContact(singleContact)
        })
        });
    };

export default printAllContacts;
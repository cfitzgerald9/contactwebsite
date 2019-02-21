// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
import apiManager from "./contactCollection"
import printAllContacts from "./contactList";
import buildEditForm from "./editForm"
import buildContactObject from "./buildContactObject.js"
//overall function to create and post the new contact
const contactWizard = () => {
    const contactMaker = document.querySelector("#submitButton").addEventListener("click", () => {
        const nameValue = document.querySelector("#nameInput").value
        const phoneValue = document.querySelector("#phoneInput").value
        const emailValue = document.querySelector("#emailInput").value
        const newContact = buildContactObject(nameValue, emailValue, phoneValue)
        apiManager.postNewContact(newContact)
        //HOPEFULLY reprints the page with new contact
        document.querySelector("#contactContainer").innerHTML = "";
        printAllContacts()
    });
    const contactDeleter = document.querySelector("body").addEventListener("click", () => {
        if (event.target.classList.contains("deleteButton")) {
            let contactId = event.target.id.split("-")[1];
            apiManager.deleteContact(contactId)
        }
        else if (event.target.classList.contains("editButton")) {
            let contactId = event.target.id.split("-")[1];
            contactId = event.target.id.split("-")[1];
            apiManager.getOneContact(contactId)
                .then((singleContactInfo) => {
                    document.querySelector(`#employeeContainer-${contactId}`).innerHTML = ""
                    document.querySelector(`#employeeContainer-${contactId}`).innerHTML= buildEditForm(singleContactInfo);
                })
        }
        else if(event.target.classList.contains("saveEditButton")){
            const itemId = event.target.id.split("-")[1];
            const editedName = document.querySelector(`#nameEditInput-${itemId}`).value;
            const editedEmail = document.querySelector(`#emailEditInput-${itemId}`).value;
            const editedPhone = document.querySelector(`#phoneEditInput-${itemId}`).value;

            const editedContact = buildContactObject(editedName, editedEmail, editedPhone);
            apiManager.editContact(itemId, editedContact)
          }
        });
    }
// --- EVENT LISTENER FOR EDIT SAVE BUTTON --//
export default contactWizard

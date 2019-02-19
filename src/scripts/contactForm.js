// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
import apiManager from "./contactCollection"
import printAllContacts from "./contactList";
//overall function to create and post the new contact
const contactMaker = document.querySelector("#submitButton").addEventListener("click" , () =>{
    const nameValue =document.querySelector("#nameInput").value
    const phoneValue = document.querySelector("#phoneInput").value
    const emailValue = document.querySelector("#emailInput").value
const newContact = {
    name : nameValue,
    phone : phoneValue,
    email : emailValue
    }
apiManager.postNewContact(newContact)
//HOPEFULLY reprints the page with new contact
document.querySelector("#contactContainer").innerHTML = "";
printAllContacts()
});

export default contactMaker


// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.

const apiManager = {
    //gets all contacts from api
    getAllContacts: () => {
         return fetch("http://localhost:8088/contacts")
        .then(contacts => contacts.json())
    },
    //posts new contact to the api
    postNewContact: contactObject => {
    fetch("http://localhost:8088/contacts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(contactObject)
})
     }
}
export default apiManager;
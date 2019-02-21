import printAllContacts from "./contactList";

// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.

const apiManager = {
    //gets all contacts from api
    getAllContacts: (userId) => {
        return fetch(`http://localhost:8088/contacts/?userId=${userId}`)
            .then(contacts => contacts.json())
    },
    //posts new contact to the api
    postNewContact: contactObject => {
        fetch("http://localhost:8088/contacts", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactObject)
        }).then(() => {
            printAllContacts()
        })
    },
    //edits contact
    editContact: (idParam, contactToEdit) => {
        return fetch(`http://localhost:8088/contacts/${idParam}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactToEdit)
        })
            .then(() => {
                printAllContacts()
            })
    },
    //deletes contact
    deleteContact: (idToDelete) => {
        fetch(`http://localhost:8088/contacts/${idToDelete}`, {
            method: "DELETE",
        })
            .then(() => {
                printAllContacts()
            })
    },
    //gets a single contact
    getOneContact: (contactId) => {
        return fetch(`http://localhost:8088/contacts/${contactId}`)
            .then(contact => contact.json())
    },
    //retrieves a user
    getUserByUserName: (userName) => {
        return fetch(`http://localhost:8088/users?username=${userName}`)
            .then(user => user.json())
    },
    //adds a user
    addNewUser: (userObject) => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
        .then(response => response.json())
    }
}

export default apiManager;
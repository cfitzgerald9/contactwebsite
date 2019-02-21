// A Contact component that displays a person's name, phone number, and address.
const buildSingleContact = (singleContact) => {
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
            <hr>`
}
export default buildSingleContact;
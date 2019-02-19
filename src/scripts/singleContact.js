// A Contact component that displays a person's name, phone number, and address.
const buildSingleContact = (singleContact) => {
    return `<div id ="employeeContainer-${singleContact.id}">
                    <h2>Name:  ${singleContact.name}</h2>
                    <ul>
                    <li>Email:  ${singleContact.email}</li>
                    <li>Phone:  ${singleContact.phone}</li>
                    </div>
`
}
export default buildSingleContact;
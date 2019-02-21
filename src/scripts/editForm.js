
const buildEditForm = (singleContact) => {
  return `<br>
  <h2>Edit contact</h2>
  <br>
  <form>
      Name: <input id="nameEditInput-${singleContact.id}" name="nameEdit" type="text" value="${singleContact.name}">
      Phone: <input id="phoneEditInput-${singleContact.id}" name="phoneEdit" type="text" value="${singleContact.phone}">
      Email: <input id="emailEditInput-${singleContact.id}" name="emailEdit" type="text" value="${singleContact.email}">
  </form>
  <br>
  <button class="saveEditButton" id="saveEditButton-${singleContact.id}">Save</button>`
}
export default buildEditForm;

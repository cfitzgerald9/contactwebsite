import printAllContacts from "./contactList.js";
import apiManager from "./contactCollection"

const loginUser = () => {
    const userNameValue = document.querySelector("#usernameLogin").value;
    const passwordValue = document.querySelector("#passwordLogin").value;
    apiManager.getUserByUserName(userNameValue)
    .then((parsedUser) => {
      if(passwordValue === parsedUser[0].password){
        sessionStorage.setItem("userId", parsedUser[0].id)
        console.log("you logged in!")
        printAllContacts();
      } else {
        console.warn("negative, ghost rider")
      }
    })
  }
  export default loginUser
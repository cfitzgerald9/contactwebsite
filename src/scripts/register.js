import apiManager from "./contactCollection"
const registerUser = () => {
    const nameValue = document.querySelector("#registerName").value;
    const phoneValue = document.querySelector("#registerPhone").value;
    const emailValue = document.querySelector("#registerEmail").value;
    const usernameValue = document.querySelector("#registerUsername").value;
    const passwordValue = document.querySelector("#registerPassword").value;
    const userObject = {
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
      username: usernameValue,
      password: passwordValue
    };
    apiManager.addNewUser(userObject)
    .then((parsedUser) => {
        console.log("user registered!")
      sessionStorage.setItem("userId", parsedUser.id)
    })
  }
  export default registerUser;
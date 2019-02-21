// In main.js, import the ContactList component and the ContactForm component.
import contactWizard from "./contactForm";
import registerUser from "./register";
import loginUser from "./login";
import logoutUser from "./logout";
// import contactDeleter from "./contactForm"
// The user should see the contact form at the top of the view, and the list of contacts underneath it.
contactWizard()

document.querySelector("#registerButton").addEventListener("click", () => {
    registerUser();
  })

  document.querySelector("#loginButton").addEventListener("click", () => {
    loginUser();
  })

  document.querySelector("#logoutButton").addEventListener("click", () => {
    logoutUser();

  })





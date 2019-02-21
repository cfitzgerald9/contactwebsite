const logoutUser = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#contactContainer").innerHTML = ""
    console.log("You logged out!")
  }

  export default logoutUser
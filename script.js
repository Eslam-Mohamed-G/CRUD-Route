import AuthSystem from './assets/AuthSystem.js';
import LocalStorageManager from './assets/StorageManager.js';

// التأكد من وجود البيانات الافتراضية عند البداية
if (!localStorage.getItem(LocalStorageManager.key)) {
    LocalStorageManager.resetToDefault();
}

const headerName = document.querySelector(".navbar").querySelector("h1")
const userLogin = document.querySelector(".userLogin");
const navTabs = document.querySelector(".nav-tabs");
const loginForm = document.querySelector(".loginForm");
const adminScreen = document.querySelector(".admin");
const username = document.getElementById("userInput");
const password = document.getElementById("passwordInput");
const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", () =>{
    const user = AuthSystem.login(username.value, password.value);

    if (!user) {
        password.style.border = "1px solid red";
        console.log("false");
    } else {
        password.style.border = "1px solid transparent";
        if(user.role === "admin"){
            headerName.classList.replace("d-block", "d-none")
            userLogin.classList.replace("d-none", "d-flex")
            navTabs.classList.replace("d-none", "d-flex")
            loginForm.classList.replace("d-block", "d-none")
            adminScreen.classList.replace("d-none", "d-block")
            console.log("admin");
        }else {
            console.log("any");
        }
        // console.log("done");
    }
});

const btnlogout = document.getElementById("logout");
btnlogout.addEventListener("click", () => {

    Swal.fire({
        title: 'Are you sure?',
        text: `admin`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#000',
        confirmButtonText: 'ok',
        cancelButtonText: "Cancle"
    }).then((result) => {
        if (result.isConfirmed) {
            username.value = "";
            password.value = "";
            headerName.classList.replace("d-none", "d-block")
            userLogin.classList.replace("d-flex", "d-none")
            navTabs.classList.replace("d-flex", "d-none")
            loginForm.classList.replace("d-none","d-block")
            adminScreen.classList.replace("d-block", "d-none")
            sessionStorage.removeItem("sessionActive");
        }
    })
});

// add user  add user  add user
const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");
const newRole = document.getElementById("newRole");
const btnAdd = document.getElementById("addUserForm");

btnAdd.addEventListener("click", ()=>{
    
});

window.onload = function() {
    const sessionActive = sessionStorage.getItem("sessionActive");

    if(sessionActive === "true"){
            headerName.classList.replace("d-block", "d-none")
            userLogin.classList.replace("d-none", "d-flex")
            navTabs.classList.replace("d-none", "d-flex")
            loginForm.classList.replace("d-block", "d-none")
            adminScreen.classList.replace("d-none", "d-block")

    }
}
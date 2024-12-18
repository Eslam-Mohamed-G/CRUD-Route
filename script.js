import AuthSystem from './assets/AuthSystem.js';
import LocalStorageManager from './assets/StorageManager.js';

// التأكد من وجود البيانات الافتراضية عند البداية
if (!localStorage.getItem(LocalStorageManager.key)) {
    LocalStorageManager.resetToDefault();
}

const nav = document.querySelector(".nav-tabs");
const loginForm = document.querySelector(".loginForm");
const adminScreen = document.querySelector(".admin");
const username = document.getElementById("userInput");
const password = document.getElementById("passwordInput");
const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", () =>{
    const user = AuthSystem.login(username.value, password.value);

    if (!user) {
        username.style.border = "1px solid red";
        password.style.border = "1px solid red";
        console.log("false");
    } else {
        username.style.border = "1px solid transparent";
        password.style.border = "1px solid transparent";
        if(user.role === "admin"){
            nav.classList.replace("d-none", "d-flex")
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
            nav.classList.replace("d-flex", "d-none")
            loginForm.classList.replace("d-none","d-block")
            adminScreen.classList.replace("d-block", "d-none")
        }
    })
})
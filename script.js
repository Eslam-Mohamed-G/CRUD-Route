import AuthSystem from './assets/AuthSystem.js';
import LocalStorageManager from './assets/StorageManager.js';
import Products from './assets/Products.js'

// التأكد من وجود البيانات الافتراضية عند البداية
if (!localStorage.getItem(LocalStorageManager.key)) {
    LocalStorageManager.resetToDefault();
}

const headerName = document.querySelector(".navbar").querySelector("h1")
const theNameOfUser = document.querySelector(".theNameOfUser");
const userLogin = document.querySelector(".userLogin");
const navTabs = document.querySelector(".nav-tabs");
const loginForm = document.querySelector(".loginForm");
const adminScreen = document.querySelector(".admin");
const username = document.getElementById("userInput");
const password = document.getElementById("passwordInput");
const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", () => {
    const user = AuthSystem.login(username.value, password.value);
    const savedUser = sessionStorage.getItem("sessionUsername");

    if (!user) {
        password.style.border = "1px solid red";
        console.log("false");
    } else {
        password.style.border = "1px solid transparent";
        if (user.role === "admin") {
            theNameOfUser.textContent = `${savedUser}`
            headerName.classList.replace("d-block", "d-none")
            userLogin.classList.replace("d-none", "d-flex")
            navTabs.classList.replace("d-none", "d-flex")
            loginForm.classList.replace("d-block", "d-none")
            adminScreen.classList.replace("d-none", "d-block")
            console.log("admin");
        } else {
            console.log("any");
        }
        // console.log("done");
    }
});

const btnlogout = document.getElementById("logout");
btnlogout.addEventListener("click", () => {
    const savedUser = sessionStorage.getItem("sessionUsername");
    Swal.fire({
        title: 'Are you sure?',
        text: `${savedUser}`,
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
            loginForm.classList.replace("d-none", "d-block")
            adminScreen.classList.replace("d-block", "d-none")
            theNameOfUser.textContent = "";
            sessionStorage.removeItem("sessionActive");
            sessionStorage.removeItem("sessionUsername");
        }
    })
});

// add user  add user  add user
const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");
const newRole = document.getElementById("newRole");
const messageError = document.getElementById("messageError");
const btnAdd = document.getElementById("addUserForm");

btnAdd.addEventListener("click", () => {
    const user = AuthSystem.adduser(newUsername.value, newPassword.value, newRole.value);

    if (user) {
        newUsername.value = "";
        newPassword.value = "";
        messageError.textContent = "";
    }
});

// addproducts   addproducts   addproducts   addproducts 
const productInput = document.getElementById("nameInput");
const codeInput = document.getElementById("codeInput");
const priceInput = document.getElementById("priceInput");
const categoryInput = document.getElementById("categoryInput");
const description = document.getElementById("textarea");
const countInput = document.getElementById("countInput");

const addProductBTN = document.getElementById("addProduct");
addProductBTN.addEventListener("click", () => {
    const product = new Products();
    const newProduct = product.isFormProductValid(productInput.value, codeInput.value, priceInput.value, categoryInput.value, countInput.value)

    if (!newProduct) {
        console.log("noooo");
    } else {
        productInput.value = "";
        codeInput.value = "";
        priceInput.value = "";
        countInput.value = "";
        description.value = "";
    }
})
window.onload = function () {
    const sessionActive = sessionStorage.getItem("sessionActive");
    const savedUser = sessionStorage.getItem("sessionUsername");

    if (sessionActive === "true") {
        theNameOfUser.textContent = `${savedUser}`
        headerName.classList.replace("d-block", "d-none")
        userLogin.classList.replace("d-none", "d-flex")
        navTabs.classList.replace("d-none", "d-flex")
        loginForm.classList.replace("d-block", "d-none")
        adminScreen.classList.replace("d-none", "d-block")
    }
    const product = new Products();
    const productRows = product.productsTable();
    const productContainer = document.getElementById("productTable").querySelector("tbody");
    productRows.forEach(element => {
        productContainer.appendChild(element)
    });
}
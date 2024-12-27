import AuthSystem from './assets/AuthSystem.js';
import LocalStorageManager from './assets/StorageManager.js';
import Products from './assets/Products.js';
import IsValid from "./assets/isValid.js";

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
const codeInput = document.getElementById("codeInput");
const productBTN = document.getElementById("addProduct");
const dateInput = document.getElementById("dateInput");
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
var modeOfProductBTN = false;
var mainIndex;
productBTN.addEventListener("click", () => {
    const product = new Products();
    const existingCode = LocalStorageManager.loadProductData();
    const codeExists = existingCode.find((item) => item.code === codeInput.value)

    if (product.isFormProductValid()) {
        if(codeExists && modeOfProductBTN === false){
            codeInput.style.border = "1px solid red"
        }else {
            codeInput.style.border = "1px solid transparent"
            product.saveProductInLocalStorage(modeOfProductBTN, mainIndex);
            productBTN.textContent = "add";
            modeOfProductBTN = false;
        }
    }
})

// updateBTN   updateBTN   updateBTN   updateBTN
const table = document.getElementById("productTable");
table.addEventListener("click", (event) => {
    if (event.target.classList.contains("update-btn")) {
        const index = Array.from(event.target.closest("tbody").children).indexOf(event.target.closest("tr"));
        modeOfProductBTN = true;
        mainIndex = index
        const products = new Products(index);
        products.updateProduct(index);
    }
});

// search button   search button   search button   search button
const searchBTN = document.getElementById("searchBTN");
const searchNameInput = document.getElementById("searchNameInput");
const dataListOfNames = document.getElementById("dataListOfNames");
searchNameInput.addEventListener("input", ()=>{
    let dataListOption = "";
    const existingProduct = LocalStorageManager.loadProductData();
    for(let i=0; i<existingProduct.length;i++){
        if(existingProduct[i].name.toLowerCase().includes(searchNameInput.value.toLowerCase())){
            dataListOption +=`<option>${existingProduct[i].name}</option>`
        }
    }
    dataListOfNames.innerHTML = dataListOption;
});

searchBTN.addEventListener("click", ()=>{
    const validator = new IsValid();
    const isSearchInputValid = validator.isValidName(searchNameInput.value);
    
    const product = new Products();
    if(isSearchInputValid){
        product.searchProducts(searchNameInput.value)
    }else{
        validator.setInputState(searchNameInput, isSearchInputValid);
    }

});

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

    if (!dateInput.value) {
        dateInput.value = formattedDate;
    }

    const product = new Products();
    product.renderProductsTable();
}
import AuthSystem from './assets/AuthSystem.js';
import LocalStorageManager from './assets/StorageManager.js';
import Products from './assets/Products.js';
import BuyProducts from './assets/BuyProducts.js';
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
const userScreen = document.querySelector(".user");
const username = document.getElementById("userInput");
const password = document.getElementById("passwordInput");
const logInError = document.getElementById("loginError");
const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", () => {
    const user = AuthSystem.login(username.value, password.value);
    const savedUser = sessionStorage.getItem("sessionUsername");

    if (!user) {
        logInError.textContent = "user name or password may be fales";
    } else {
        logInError.textContent = "";
        theNameOfUser.textContent = `${savedUser}`
        headerName.classList.replace("d-block", "d-none")
        loginForm.classList.replace("d-block", "d-none")
        userLogin.classList.replace("d-none", "d-flex")
        if (user.role === "admin") {
            navTabs.classList.replace("d-none", "d-flex")
            adminScreen.classList.replace("d-none", "d-block")
        } else {
            userScreen.classList.replace("d-none", "d-block");
        }
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
            userScreen.classList.replace("d-block", "d-none");
            theNameOfUser.textContent = "";
            sessionStorage.clear();
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
        const index = parseInt(event.target.dataset.index, 10);
        // const index = Array.from(event.target.closest("tbody").children).indexOf(event.target.closest("tr"));
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
const searchCategoryInput = document.getElementById("searchCategoryInput");
searchNameInput.addEventListener("input", ()=>{dataList(searchNameInput.value, dataListOfNames)});

searchBTN.addEventListener("click", ()=>{
    const validator = new IsValid();
    const isSearchInputValid = validator.isValidName(searchNameInput.value);
    const isSearchCategoryInputValid = validator.isValidCategory(searchCategoryInput.value)
    
    const product = new Products();
    if(isSearchInputValid || isSearchCategoryInputValid){
        product.searchProducts(searchNameInput.value)
        validator.setInputState(searchNameInput, isSearchInputValid);
    }else{
        validator.setInputState(searchNameInput, isSearchInputValid);
    }

});


//  user screen   user screen   user screen
var modeOfbuyProductBTN = false;
var billProductIndex;
const buyProductBTN = document.getElementById("buyProductBTN");
const buyProductDate = document.getElementById("buyProductDate");
buyProductBTN.addEventListener("click", ()=>{
    const buyProduct = new BuyProducts();

    if( buyProduct.isFormBuyProductValid() ){
        buyProduct.addProductsInBill(modeOfbuyProductBTN, billProductIndex);
        buyProductBTN.textContent = "add";
        buyProduct.clearForm();
    }
});

// updateBTN   updateBTN   updateBTN   updateBTN
const billTable = document.getElementById("userBillContainer");
billTable.addEventListener("click", (event)=>{
    if(event.target.classList.contains("update-btn")){
        const index = parseInt(event.target.dataset.index, 10);
        modeOfbuyProductBTN = true;
        billProductIndex = index;
    }
});

const buyProductName = document.getElementById("buyProductName");
const dataListOfBuyNames = document.getElementById("dataListOfBuyNames");
buyProductName.addEventListener("input",()=>{ 
    dataList(buyProductName.value, dataListOfBuyNames);
    const buyProduct = new BuyProducts();
    buyProduct.checkIfProductExists();
})
// buyProductName.addEventListener("keydown", (e)=>{
//     if(e.key === "Enter"){
//         const buyProduct = new BuyProducts();
//         buyProduct.checkIfProductExists();
//     }
// })

function dataList(inputValue, dataList){
    let dataListOption = "";
    const existingProduct = LocalStorageManager.loadProductData();
    for(let i=0; i<existingProduct.length;i++){
        if(existingProduct[i].name.toLowerCase().includes(inputValue.toLowerCase())){
            dataListOption +=`<option>${existingProduct[i].name}</option>`
        }
    }
    dataList.innerHTML = dataListOption;
}

const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
window.onload = function () {
    const sessionActive = sessionStorage.getItem("sessionActive");
    const savedUser = sessionStorage.getItem("sessionUsername");
    const roleOfUser = sessionStorage.getItem("sessionRole");
    
    if (sessionActive && savedUser && roleOfUser) {
        theNameOfUser.textContent = `${savedUser}`;
        userLogin.classList.replace("d-none", "d-flex");
        headerName.classList.replace("d-block", "d-none");
        loginForm.classList.replace("d-block", "d-none");
        if(savedUser && roleOfUser === "admin"){
            navTabs.classList.replace("d-none", "d-flex");
            adminScreen.classList.replace("d-none", "d-block");
        }else {
            userScreen.classList.replace("d-none", "d-block");
        }
    }

    if (!dateInput.value) {
        dateInput.value = formattedDate;
    }
    if (!buyProductDate.value) {
        buyProductDate.value = formattedDate;
    }

    const product = new Products();
    product.renderProductsTable();

    const buyProduct = new BuyProducts();
    buyProduct.renderBillTable();
}
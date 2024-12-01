var nameInput = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var category = document.getElementById("category");
var countInput = document.getElementById("count");
var dateInput = document.getElementById("dateInput");
var descripInput =document.getElementById("descripInput");
var submitBTN = document.getElementById("btn");
var searchInput = document.getElementById("searchInput");
var filter = document.getElementById("filter");

var table = document.getElementById("productTable").querySelector("tbody");

var productsArray = [];
if(localStorage.getItem("productsArray") != null){
    productsArray = JSON.parse(localStorage.getItem("productsArray"))
    console.log(productsArray)
}
// localStorage.clear();
function validateName() {
    var messageError = document.getElementById("nameError");
    var name = nameInput.value;
    var nameRegex = /^[a-zA-Z]{3,}.*$/;   //The name starts with at least three letters

    if(!name){
        messageError.textContent = "Name required";
        nameInput.style.border = "1px solid red";
        return false;
    }else {
        if(!nameRegex.test(name)){
            messageError.textContent = "must be valid";
            nameInput.style.border = "1px solid red";
            return false;
        }else{
            messageError.textContent = "";
            nameInput.style.border = "1px solid #ddd"
            return true;
        }
    }

}
nameInput.addEventListener("input",validateName);

function validatePrice() {
    var priceError = document.getElementById("priceError");
    var price = priceInput.value;
    var priceRegex = /^\d+(\.\d+)?$/;

    if(!price){
        priceError.textContent = "price required";
        priceInput.style.border = "1px solid red";
        return false;
    }else {
        if(!priceRegex.test(price)){
            priceInput.style.border = "1px solid red";
            priceError.textContent = "must be valid";
            return false;
        }else{
            priceError.textContent = "";
            priceInput.style.border = "1px solid #ddd"
            return true;
        }
    }
}
priceInput.addEventListener("input", validatePrice);

function validateCategory() {
    var cate = category.value;
    if(!cate){
        category.style.border = "1px solid red";
        return false;
    }else {
        category.style.border = "1px solid #ddd";
        return true;
    }
}

submitBTN.addEventListener("click", addProduct)
function addProduct() {
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: category.value,
        count: countInput.value,
        date: dateInput.value,
        description : descripInput.value,
    }

    if(validateName() &&validatePrice() && validateCategory()){
        productsArray.push(product);
        localStorage.setItem("productsArray", JSON.stringify(productsArray))
        clearForm()
        // console.log(product);
    }
}

function clearForm() {
    nameInput.value="";
    priceInput.value="";
    category.value="";
    countInput.value="";
    dateInput.value="";
}

window.onload = function(){
    clearForm()
}
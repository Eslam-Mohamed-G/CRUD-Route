var nameInput = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var category = document.getElementById("category");
var countInput = document.getElementById("count");
var descripInput =document.getElementById("descripInput");
var submitBTN = document.getElementById("btn");
var searchInput = document.getElementById("searchInput");
var filter = document.getElementById("filter");

var table = document.getElementById("productTable").querySelector("tbody");

function validateName() {
    var messageError = document.getElementById("nameError");
    var name = nameInput.value;
    var nameRegex = /^[a-zA-Z]{3,}$/;   //The name starts with at least three letters

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
nameInput.addEventListener("input",validateName)
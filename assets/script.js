var nameInput = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var category = document.getElementById("category");
var countInput = document.getElementById("count");
var dateInput = document.getElementById("dateInput");
var descripInput =document.getElementById("descripInput");
var submitBTN = document.getElementById("btn");
var searchInput = document.getElementById("searchInput");
var filterInput = document.getElementById("filter");
var totalCount = document.getElementById("totalCount");
var countByFilter = document.getElementById("countByFilter");
let countBefore = document.querySelector(".filterCount");

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
        productToTable()
        clearForm()
        // console.log(product);
    }
}
submitBTN.addEventListener("click", addProduct);

function productToTable(){
    var search = searchInput.value;
    var filter = filterInput.value;
    var productRow = '';
    var allCount = 0;
    var count = 0;

    for(i=0; i<productsArray.length; i++){
        allCount = allCount + parseFloat(productsArray[i].count);
        if(filter ===productsArray[i].category || filter === "all" ){
            if(productsArray[i].name.toLowerCase().includes(search.toLowerCase()) || productsArray[i].price.includes(search)){
                count += parseFloat(productsArray[i].count)
                productRow += 
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${productsArray[i].name}</td>
                    <td>${productsArray[i].price}</td>
                    <td>${productsArray[i].count}</td>
                    <td>${productsArray[i].category}</td>
                    <td>${productsArray[i].description}</td>
                    <td><button class="btn-warning" onclick="update(${i})">Update</button></td>
                    <td><button class="btn-danger" onclick="remov(${i})">Delete</button></td>
                </tr>
                `
            }
        }
    }
    totalCount.innerHTML = allCount;
    countBefore.style.setProperty("--my-content", `${search == "" ? search : 'count'}`)
    countByFilter.innerHTML = count;
    table.innerHTML = productRow;
}
document.body.addEventListener("keydown", function(e){
    switch (e.code) {
        case "Enter":
            productToTable()
        break;
    }
    
});
filterInput.addEventListener("change", productToTable);

function remov(index){
    productsArray.splice(index, 1);
    localStorage.setItem("productsArray", JSON.stringify(productsArray))
    productToTable()
}

function clearForm() {
    nameInput.value="";
    priceInput.value="";
    category.value="";
    countInput.value="";
    dateInput.value="";
    descripInput.value="";
}

window.onload = function(){
    productToTable()
    clearForm()
}
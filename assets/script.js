var nameInput = document.getElementById("nameInput");
var codeInput = document.getElementById("codeInput");
var priceInput = document.getElementById("priceInput");
var category = document.getElementById("category");
var countInput = document.getElementById("count");
var dateInput = document.getElementById("dateInput");
var descripInput =document.getElementById("descripInput");
var submitBTN = document.getElementById("btn");
var searchInput = document.getElementById("searchInput");
var filterInput = document.getElementById("filter");
var totalCount = document.getElementById("totalCount");
var codeOfProduct = document.getElementById("codeOfProduct");
var countBySearch = document.getElementById("countBySearch");
var date = document.getElementById("date");


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
    var nameRegex = /^[a-zA-Z]{1,}.*$/;   //The name starts with at least three letters

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

function validateCode() {
    var code = codeInput.value;
    var codeRegex = /^\d+(\.\d+)?$/;
    if(!code){
        codeInput.style.border = "1px solid red";
        return false;
    }else {
        if(!codeRegex.test(code)){
            codeInput.style.border = "1px solid red";
            return false;
        }else {
            codeInput.style.border = "1px solid #ddd";
            return true
        }
    }
}

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

var mainIndex;
var modeOfSubmitBTN = false;
function addProduct() {
    var product = {
        code: codeInput.value,
        name: nameInput.value,
        price: priceInput.value,
        category: category.value,
        count: countInput.value,
        date: dateInput.value,
        description : descripInput.value,
    }
    
    if(validateName() && validateCode() && validatePrice() && validateCategory()){
        if(!modeOfSubmitBTN){
            productsArray.push(product);
        }else {
            productsArray.splice(mainIndex, 1, product)
            submitBTN.textContent = "add"
            modeOfSubmitBTN = false;
        }
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
    var dateSearch = '';
    var allCount = 0;
    var valueOfcodeOfProduct = '';
    var count = 0;

    for(i=0; i<productsArray.length; i++){
        if(filter ===productsArray[i].category || filter === "all" ){
            allCount = allCount + parseFloat(productsArray[i].count);
            if(productsArray[i].name.toLowerCase().includes(search.toLowerCase()) || productsArray[i].price.includes(search)){
                if(search === ""){
                    dateSearch = '';
                    count = '';
                    valueOfcodeOfProduct = '';
                }else {
                    dateSearch += productsArray[i].date;
                    count += parseFloat(productsArray[i].count)
                    valueOfcodeOfProduct += parseFloat(productsArray[i].code)
                }
                productRow += 
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${productsArray[i].name}</td>
                    <td>${productsArray[i].price}</td>
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
    date.innerHTML = `<h4>Date : ${dateSearch}</h4>`;
    codeOfProduct.innerHTML = `<h4>Code : ${valueOfcodeOfProduct}</h4>`;
    countBySearch.innerHTML = `<h4>Count : ${count}</h4>`;
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
    // var userConfirmed = confirm(`"Delete : ${productsArray[i].name}`);
    // if(userConfirmed){
    //     productsArray.splice(i, 1);
    //     localStorage.setItem("productsArray", JSON.stringify(productsArray))
    //     productToTable()
    // }
    Swal.fire({
        title: 'Are you sure?',
        text: `${productsArray[index].name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#000',
        confirmButtonText: 'Delete',
        cancelButtonText: "Cancle"
    }).then((result) => {
        if (result.isConfirmed) {
            productsArray.splice(index, 1);
            localStorage.setItem("productsArray", JSON.stringify(productsArray)); // تحديث localStorage
            productToTable(); 
            Swal.fire({
                title:'Deleted!',
                text:'The item was deleted successfully.',
                icon:'success',
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
}

function update(index){
    var userConfirmed = confirm(`"Update : ${productsArray[index].name}`);
    if(userConfirmed){
        nameInput.value = productsArray[index].name
        codeInput.value = productsArray[index].code
        priceInput.value = productsArray[index].price
        category.value = productsArray[index].category
        countInput.value = productsArray[index].count
        dateInput.value = productsArray[index].date
        descripInput.value = productsArray[index].description
        submitBTN.textContent = "Update"
        modeOfSubmitBTN = true;
        mainIndex = index;
    }
}

function clearForm() {
    nameInput.value="";
    codeInput.value="";
    priceInput.value="";
    category.value="";
    countInput.value="";
    dateInput.value="";
    descripInput.value="";
}


// system of CRUD
var logout = document.getElementById("logout");
var userName = document.querySelector("h3"); 
var logInName = document.getElementById("logInName");
var logInpassword = document.getElementById("logInPassword");
var logInBTN = document.getElementById("logInBTN");
var adminScreen = document.querySelector(".admin")
var userScreen = document.querySelector(".user")
var logIn = document.querySelector(".logIn")

var userArray = [
    {
        name: "admin",
        password: "123"
    },
    {
        name: "any",
        password: "123"
    }
]

function checkName() {
    var name = logInName.value;
    var existsUser = false;
    for(i=0; i < userArray.length; i++){
        if(name === userArray[i].name){
            existsUser = true;
            break;
        }
    }

    if(!existsUser){
        logInName.style.border = "1px solid red";
        return false;
    }else {
        logInName.style.border = "1px solid #ddd";
        return true;
    }
}

function checkPassword(){
    var name = logInName.value;
    var password = logInpassword.value;
    var existsPassword = false;
    for(i=0; i < userArray.length; i++){
        if(name === userArray[i].name && password === userArray[i].password){
            existsPassword = true;
            break;
        }
    }

    if(!existsPassword){
        logInpassword.style.border = "1px solid red";
        return false;
    }else {
        logInpassword.style.border = "1px solid #ddd";
        return true;
    }
}

// عند تسجيل الدخول
logInBTN.addEventListener("click", function () {
    if (checkName() && checkPassword()) {
        var username = logInName.value;
        
        // تخزين اسم المستخدم في localStorage (يظل محفوظًا)
        localStorage.setItem("username", username);
        
        // تخزين حالة الجلسة في sessionStorage (مؤقت)
        sessionStorage.setItem("sessionActive", "true");

        userName.textContent = username;
        if(username === "admin"){
            logIn.classList.replace("d-block", "d-none");
            logout.classList.replace("d-none","d-block");
            adminScreen.classList.remove("d-none");
        }else {
            logIn.classList.replace("d-block", "d-none");
            logout.classList.replace("d-none","d-block");
            userScreen.classList.replace("d-none","d-block");
            adminScreen.classList.add("d-none");
        }
    }
});

// عند تحميل الصفحة
window.onload = function () {
    // التحقق من اسم المستخدم
    var savedUser = localStorage.getItem("username");
    var sessionActive = sessionStorage.getItem("sessionActive");
    
    if (savedUser && sessionActive === "true") {
        // إذا كانت الجلسة نشطة
        userName.textContent = savedUser;
        if(savedUser === "admin"){
            logIn.classList.replace("d-block", "d-none");
            logout.classList.replace("d-none","d-block");
            adminScreen.classList.remove("d-none");
        }else {
            logIn.classList.replace("d-block", "d-none");
            logout.classList.replace("d-none","d-block");
            userScreen.classList.replace("d-none","d-block");
            adminScreen.classList.add("d-none");
            
        }
    }else {
        // إذا لم تكن الجلسة نشطة
        adminScreen.classList.add("d-none");
        logIn.classList.replace("d-none", "d-block");
    }
    productToTable();
    makeBillTable();
    clearForm();
};

logout.addEventListener("click", function() {
    Swal.fire({
        title: 'Are you sure?',
        text: `${logInName.value}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '#000',
        confirmButtonText: 'ok',
        cancelButtonText: "Cancle"
    }).then((result)=>{
        if(result.isConfirmed){
            userName.textContent = "";
            logInName.value = "";
            logInpassword.value = "";
            sessionStorage.removeItem("sessionActive");
            sessionStorage.removeItem("billArray");
            userScreen.classList.add("d-none");
            adminScreen.classList.add("d-none");
            logIn.classList.replace("d-none", "d-block");
            logout.classList.replace("d-block","d-none");
        }
    })
});



// تحديد العنصر
const userDateInput = document.getElementById('userDate');

// الحصول على تاريخ اليوم بصيغة yyyy-mm-dd
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // الأشهر تبدأ من 0 لذا نضيف 1
const dd = String(today.getDate()).padStart(2, '0');

// تعيين القيمة الافتراضية
userDateInput.value = `${yyyy}-${mm}-${dd}`;


// variables of user Screen
var userNameInput = document.getElementById("userNameInput");
var userCodeInput = document.getElementById("userCodeInput");
var userPriceInput = document.getElementById("userPriceInput");
var userTaxesInput = document.getElementById("taxesInput");
var userCountInput = document.getElementById("userCount");
var userBuyBTN = document.getElementById("buyBTN");
var confirmBillBTN = document.getElementById("billBTN");
var billTable = document.getElementById("billTable").querySelector("tbody")

// function validateUserName() {
//     var sellUserName = userNameInput.value;

//     if(!sellUserName){
//         userNameInput.style.border = "1px solid red";
//         return false
//     }else{
//         validateUserCount()
//         userNameInput.style.border = "1px solid #ddd";
//         return true;
//     }
// }
function validateUserCode() {
    var sellUserCode = userCodeInput.value;

    if(!sellUserCode){
        userCodeInput.style.border = "1px solid red";
        return false
    }else{
        userCodeInput.style.border = "1px solid #ddd";
        return true;
    }
}

userCodeInput.addEventListener("keydown", function(e){
    var priceValue = false
    if(e.key === "Enter"){
        var enteredCode = userCodeInput.value;
        var productPrice = productsArray.find(p => p.code === enteredCode);
        if(productPrice != null){
            priceValue = true;
        }else {
            priceValue = false;
        }
        if(priceValue){
            userPriceInput.value = productPrice.price;
            userNameInput.value = productPrice.name;
            userCodeInput.style.border = "1px solid #ddd";
            console.log(userPriceInput.value)
        }else{
            userCodeInput.style.border = "1px solid red";
            userPriceInput.value = "dosn't exists";
            userNameInput.value = "dosn't exists"
        }
    }

})

function validateUserCount() {
    var sellUserCount = userCountInput.value;

    var countRegex = /^\d+(\.\d+)?$/;
    if(!sellUserCount){
        userCountInput.style.border = "1px solid red"
        return false
    }else {
        if(!countRegex.test(sellUserCount)){
            userCountInput.style.border = "1px solid red";
            return false
        }else {
            userCountInput.style.border = "1px solid #ddd";
            return true;
        }
    }
}
var billArray = [];
if(sessionStorage.getItem("billArray") !=null){
    billArray = JSON.parse(sessionStorage.getItem("billArray"));
    console.log(billArray)
}
function addBill() {
    var sellPrice = parseFloat(userPriceInput.value) + parseFloat(userTaxesInput.value);
    var totalSellPrice = parseFloat(sellPrice) * parseFloat(userCountInput.value);
    var billProduct = {
        code: userCodeInput.value,
        name: userNameInput.value,
        price: sellPrice,
        taxes: userTaxesInput.value,
        count: userCountInput.value,
        date: userDateInput.value,
        totalPrice: totalSellPrice
    }

    if(validateUserCode() && validateUserCount()){
        if(!modeOfBuyBTN){
            billArray.push(billProduct);
        }else{
            billArray.splice(indexProductBill, 1, billProduct);
            userBuyBTN.textContent = "Buy";
            modeOfBuyBTN = false;
        }
        sessionStorage.setItem("billArray", JSON.stringify(billArray))
    }
    makeBillTable();
    clearFormBill();
}
userBuyBTN.addEventListener("click", addBill)

function makeBillTable() {
    var bill = '';
    for(i=0; i<billArray.length; i++){
        bill += 
        `
            <tr>
                <td>${billArray[i].code}</td>
                <td>${billArray[i].name}</td>
                <td>${billArray[i].price}</td>
                <td>${billArray[i].count}</td>
                <td>${billArray[i].date}</td>
                <td>${billArray[i].totalPrice}</td>
                <td><button class="btn-warning update-btn" value="${i}">Update</button></td>
                <td><button class="btn-danger delete-btn" value="${i}">Delete</button></td>
            </tr>
        `;
    }
    billTable.innerHTML = bill;
}

var indexProductBill;
var modeOfBuyBTN = false;
billTable.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete-btn")) {
        var userConfirmed = confirm(`"Delete : ${billArray[e.target.value].name}`);
        if (userConfirmed) {
            billArray.splice(e.target.value, 1);
            sessionStorage.setItem("billArray", JSON.stringify(billArray));
            makeBillTable();
        }
    } else if (e.target && e.target.classList.contains("update-btn")) {
        var userConfirmed = confirm(`"Update : ${billArray[e.target.value].name}`);
        if(userConfirmed){
            userNameInput.value = billArray[e.target.value].name;
            userCodeInput.value = billArray[e.target.value].code;
            userPriceInput.value = billArray[e.target.value].price;
            userTaxesInput.value = billArray[e.target.value].taxes;
            userCountInput.value = billArray[e.target.value].count;
            userBuyBTN.textContent = "Update";
            indexProductBill = e.target.value;
            modeOfBuyBTN = true;
        }
        console.log("update button clicked:", e.target.value)
    }
})


function clearFormBill() {
    userNameInput.value = "";
    userCodeInput.value = "";
    userPriceInput.value = "";
    userTaxesInput.value = "";
    userCountInput.value = "";
}
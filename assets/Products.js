import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor(){
        this.productContainer = document.getElementById("productTable");
        this.productInput = document.getElementById("nameInput");
        this.codeInput = document.getElementById("codeInput");
        this.priceInput = document.getElementById("priceInput");
        this.categoryInput = document.getElementById("categoryInput");
        this.countInput = document.getElementById("countInput");
        this.dateInput = document.getElementById("dateInput");
        this.description = document.getElementById("textarea");
        this.validator = new IsValid();
    }

    isFormProductValid(name, id, price, category, count) {
        const isProductInputValid = this.validator.isValidName(name);
        const isCodeInputValid = this.validator.isValidCode(id);
        const isPriceInputValid = this.validator.isValidPrice(price);
        const isCategoryInputValid = this.validator.isValidCategory(category);
        const isCountInputValid = this.validator.isValidCount(count);

        this.validator.setInputState(this.productInput, isProductInputValid);
        this.validator.setInputState(this.codeInput, isCodeInputValid);
        this.validator.setInputState(this.priceInput, isPriceInputValid);
        this.validator.setInputState(this.categoryInput, isCategoryInputValid);
        this.validator.setInputState(this.countInput, isCountInputValid);

        if(isProductInputValid && isCodeInputValid && isPriceInputValid && isCategoryInputValid && isCountInputValid){
            this.saveProductInLocalStorge()
            return true;
        }else {
            return false;
        }
    }

    saveProductInLocalStorge() {
        const productsArray = StorageManager.loadProductData();
        const product = {
            date: this.dateInput.value,
            code: this.codeInput.value,
            price: this.priceInput.value,
            count: this.countInput.value,
            name: this.productInput.value,
            category: this.categoryInput.value,
            description: this.description.value,
        }
        productsArray.push(product);
        StorageManager.saveProductData(productsArray);
        console.log(product);
    }
}

export default Products;
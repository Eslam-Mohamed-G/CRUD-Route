import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor(){
        this.productContainer = document.getElementById("productTable");
        this.validator = new IsValid();
    }

    addProduct(name, id, price, category, count) {
        const productInput = document.getElementById("nameInput");
        const codeInput = document.getElementById("codeInput");
        const priceInput = document.getElementById("priceInput");
        const categoryInput = document.getElementById("categoryInput");
        const countInput = document.getElementById("countInput");

        const isProductInputValid = this.validator.isValidName(name);
        const isCodeInputValid = this.validator.isValidCode(id);
        const isPriceInputValid = this.validator.isValidPrice(price);
        const isCategoryInputValid = this.validator.isValidCategory(category);
        const isCountInputValid = this.validator.isValidCount(count);

        this.validator.setInputState(productInput, isProductInputValid);
        this.validator.setInputState(codeInput, isCodeInputValid);
        this.validator.setInputState(priceInput, isPriceInputValid);
        this.validator.setInputState(categoryInput, isCategoryInputValid);
        this.validator.setInputState(countInput, isCountInputValid);

        if(isProductInputValid && isCodeInputValid && isPriceInputValid && isCategoryInputValid && isCountInputValid){
            return true;
        }else {
            return false;
        }
    }
}

export default Products;
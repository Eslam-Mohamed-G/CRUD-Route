import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor(){
        this.productInput = document.getElementById("nameInput");
        this.codeInput = document.getElementById("codeInput");
        this.priceInput = document.getElementById("priceInput");
        this.categoryInput = document.getElementById("categoryInput");
        this.countInput = document.getElementById("countInput");
        this.dateInput = document.getElementById("dateInput");
        this.description = document.getElementById("textarea");

        this.deleteBTN = document.querySelector(".fa-trash-can");
        this.updateBTN = document.querySelector(".fa-pen-to-square"); 
        this.validator = new IsValid();
        this.productsArray = StorageManager.loadProductData();
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
        const product = {
            date: this.dateInput.value,
            code: this.codeInput.value,
            price: this.priceInput.value,
            count: this.countInput.value,
            name: this.productInput.value,
            category: this.categoryInput.value,
            description: this.description.value,
        }
        this.productsArray.push(product);
        StorageManager.saveProductData(this.productsArray);
        console.log(product);
    }

    productsTable() {
        const tableRows = [];
        
        for ( let i = 0; i < this.productsArray.length; i++) {
            const productRow = document.createElement("tr");
            productRow.innerHTML = 
            `
                <td>${this.productsArray[i].code}</td>
                <td>${this.productsArray[i].name}</td>
                <td>${this.productsArray[i].price}</td>
                <td>${this.productsArray[i].category}</td>
                <td class="d-none d-sm-block">${this.productsArray[i].description}</td>
                <td>
                    <div
                        class="d-flex flex-row justify-content-between gap-2 align-items-center px-1">
                        <i class="fa-solid fa-pen-to-square d-block" role="button"></i>
                        <i class="fa-solid fa-trash-can d-block" role="button"></i>
                    </div>
                </td>
            `
            tableRows.push(productRow);
        }
        return tableRows;
    }
}

export default Products;
import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor(){
        this.productContainer = document.getElementById("productTable");
        this.validator = new IsValid();
    }

    addproduct(name, id, price, category, count) {
        const productInput = document.getElementById("nameInput");
        const codeInput = document.getElementById("codeInput");
        const priceInput = document.getElementById("priceInput");
        const categoryInput = document.getElementById("categoryInput");
        const countInput = document.getElementById("countInput");
    }
}

export default Products;
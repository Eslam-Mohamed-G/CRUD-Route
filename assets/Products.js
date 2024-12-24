import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor(){
        this.productContainer = document.getElementById("productTable");
        this.validator = new IsValid();
    }

    addproduct(name, id, price, category, count) {

    }
}

export default Products;
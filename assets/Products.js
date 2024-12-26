import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class Products {
    constructor() {
        this.productInput = document.getElementById("nameInput");
        this.codeInput = document.getElementById("codeInput");
        this.priceInput = document.getElementById("priceInput");
        this.categoryInput = document.getElementById("categoryInput");
        this.countInput = document.getElementById("countInput");
        this.dateInput = document.getElementById("dateInput");
        this.description = document.getElementById("textarea");
        this.productBTN = document.getElementById("addProduct");

        this.validator = new IsValid();
        this.productsArray = StorageManager.loadProductData();
    }

    isFormProductValid() {
        const isProductInputValid = this.validator.isValidName(this.productInput.value);
        const isCodeInputValid = this.validator.isValidCode(this.codeInput.value);
        const isPriceInputValid = this.validator.isValidPrice(this.priceInput.value);
        const isCategoryInputValid = this.validator.isValidCategory(this.categoryInput.value);
        const isCountInputValid = this.validator.isValidCount(this.countInput.value);

        this.validator.setInputState(this.productInput, isProductInputValid);
        this.validator.setInputState(this.codeInput, isCodeInputValid);
        this.validator.setInputState(this.priceInput, isPriceInputValid);
        this.validator.setInputState(this.categoryInput, isCategoryInputValid);
        this.validator.setInputState(this.countInput, isCountInputValid);

        return (isProductInputValid && isCodeInputValid && isPriceInputValid && isCategoryInputValid && isCountInputValid);
    }

    saveProductInLocalStorage(mode, index) {
        const product = {
            date: this.dateInput.value,
            code: this.codeInput.value,
            price: this.priceInput.value,
            count: this.countInput.value,
            name: this.productInput.value,
            category: this.categoryInput.value,
            description: this.description.value,
        };

        if (!mode) {
            this.productsArray.push(product);
        } else {
            this.productsArray[index] = product;
            this.productBTN.textContent = "Add";
        }
    
        StorageManager.saveProductData(this.productsArray);
        this.renderProductsTable();
        this.clearForm();
    }

    renderProductsTable() {
        const tableBody = document.getElementById("productTable").querySelector("tbody");
        tableBody.innerHTML = "";

        for (let i = 0; i < this.productsArray.length; i++) {
            const productRow = document.createElement("tr");
            productRow.innerHTML = `
                <td>${this.productsArray[i].code}</td>
                <td>${this.productsArray[i].name}</td>
                <td>${this.productsArray[i].price}</td>
                <td>${this.productsArray[i].category}</td>
                <td class="d-none d-sm-block">${this.productsArray[i].description}</td>
                <td>
                    <div
                        class="d-flex flex-row justify-content-between gap-2 align-items-center px-1">
                        <i class="fa-solid fa-pen-to-square d-block update-btn" role="button"></i>
                        <i class="fa-solid fa-trash-can d-block delete-btn" role="button"></i>
                    </div>
                </td>
            `;
            tableBody.appendChild(productRow);

            productRow.querySelector(".delete-btn").addEventListener("click", () => {
                this.deleteProduct(i);
            });

        }
    }
    

    deleteProduct(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: `${this.productsArray[index].name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#000',
            confirmButtonText: 'Ok',
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                this.productsArray.splice(index, 1);
                StorageManager.saveProductData(this.productsArray);
                this.renderProductsTable();
            }
        })
    }

    updateProduct(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: `${this.productsArray[index].name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#000',
            confirmButtonText: 'OK',
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                this.productBTN.textContent = "Update";

                const product = this.productsArray[index];
                this.dateInput.value = product.date;
                this.codeInput.value = product.code;
                this.priceInput.value = product.price;
                this.countInput.value = product.count;
                this.productInput.value = product.name;
                this.categoryInput.value = product.category;
                this.description.value = product.description;
    
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }    

    clearForm() {
        this.codeInput.value = "";
        this.priceInput.value = "";
        this.countInput.value = "";
        this.productInput.value = "";
        this.categoryInput.value = "";
        this.description.value = "";
    }
    
}

export default Products;
import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";
class BuyProducts {
    constructor() {
        this.nameInput = document.getElementById("buyProductName");
        this.codeInput = document.getElementById("buyProductCode");
        this.taxeInput = document.getElementById("buyProductTaxe");
        this.dateInput = document.getElementById("buyProductDate");
        this.countInput = document.getElementById("buyProductCount");
        this.priceInput = document.getElementById("buyProductPrice");
        this.buyProductBTN = document.getElementById("buyProductBTN");
        this.userBillContainer = document.getElementById("userBillContainer").querySelector("tbody");

        this.validator = new IsValid();
        this.productsArray = StorageManager.loadProductData();

        this.billSessionKey = "billProductsArray";
    };

    findExistingProduct() {
        return this.productsArray.find(ele => ele.name === this.nameInput.value);
    };

    isFormBuyProductValid () {
        const isNameInputValid = this.validator.isValidName(this.nameInput.value);
        const isCodeInputValid = this.validator.isValidCode(this.codeInput.value);
        const isTaxeInputValid = this.validator.isValidPrice(this.taxeInput.value);
        const isCountInputValid = this.validator.isValidCount(this.countInput.value);
        const isPriceInputValid = this.validator.isValidPrice(this.priceInput.value);

        this.validator.setInputState(this.nameInput, isNameInputValid);
        this.validator.setInputState(this.codeInput, isCodeInputValid);
        this.validator.setInputState(this.countInput, isCountInputValid);
        this.validator.setInputState(this.priceInput, isPriceInputValid);

        return (isNameInputValid &&  isCodeInputValid && isCountInputValid && isPriceInputValid)
    };

    checkIfProductExists(){
        const existingProduct = this.findExistingProduct();

        if(!existingProduct){
            this.codeInput.value = "dosn't exists";
            this.priceInput.value = "dosn't exists";
        }else {
            this.codeInput.value = existingProduct.count
            this.priceInput.value = existingProduct.price;
        }
    }

    addProductsInBill(mode, index) {
        const existingProduct = this.findExistingProduct();
        const taxes = parseFloat(this.taxeInput.value) || 0;
        const pricePlusTaxes = parseFloat(this.priceInput.value) + taxes;
        const totalPrice = pricePlusTaxes * parseInt(this.countInput.value);
        const billProduct = {
            name: this.nameInput.value,
            code: existingProduct.code,
            price: parseFloat(this.priceInput.value),
            count: parseInt(this.countInput.value),
            taxes: taxes,
            total: parseFloat(totalPrice.toFixed(2)),
        };

        let billArray = this.loadBillFromSessionStorage();
        if(!mode){
            billArray.push(billProduct);
        }else {
            billArray[index] = billProduct;
        }
        this.saveBillInSessionStorage(billArray);
        this.renderBillTable(billArray);
    };

    saveBillInSessionStorage(data){
        sessionStorage.setItem(this.billSessionKey, JSON.stringify(data));
    };

    loadBillFromSessionStorage() {
        const data = sessionStorage.getItem(this.billSessionKey);
        return data ? JSON.parse(data) : [];
    };

    renderBillTable(){
        this.userBillContainer.innerHTML = '';
        let billArray = this.loadBillFromSessionStorage();
        billArray.forEach((element, index) => {
            const productRow = document.createElement("tr");
            productRow.innerHTML = `
                    <td>${element.name}</td>
                    <td>${element.price}</td>
                    <td>${element.count}</td>
                    <td>${element.taxes}</td>
                    <td>${element.total}</td>
                    <td>
                        <div
                            class="d-flex flex-row justify-content-between gap-2 align-items-center px-1">
                            <i class="fa-solid fa-pen-to-square d-block update-btn" role="button" data-name="${element.name}" data-index="${index}"></i>
                            <i class="fa-solid fa-trash-can d-block delete-btn" role="button"></i>
                        </div>
                    </td>
                `;
            this.userBillContainer.appendChild(productRow);
            productRow.querySelector(".delete-btn").addEventListener("click", () => this.deleteProductFromBill(index, element.name));
            productRow.querySelector(".update-btn").addEventListener("click", () => this.updateProduct(index, element));
        });
    };

    deleteProductFromBill(index, name) {
        Swal.fire({
            title: 'Are you sure?',
            text: `${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#000',
            confirmButtonText: 'Ok',
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                const billArray = this.loadBillFromSessionStorage();
                billArray.splice(index, 1);
                this.saveBillInSessionStorage(billArray);
                this.renderBillTable();
            }
        })
    }

    updateProduct(index, element) {
        Swal.fire({
            title: 'Are you sure?',
            text: `${element.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#000',
            confirmButtonText: 'OK',
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                this.buyProductBTN.textContent = "Update";
                
                this.nameInput.value = element.name;
                this.taxeInput.value = element.taxes;
                this.priceInput.value = element.price;
                this.countInput.value = element.count;
                this.checkIfProductExists();

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    };

    clearForm() {
        this.nameInput.value = "";
        this.codeInput.value = "";
        this.taxeInput.value = "";
        this.priceInput.value = "";
        this.countInput.value = "";
    };
}
export default BuyProducts;
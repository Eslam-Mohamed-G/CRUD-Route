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

        this.validator = new IsValid();
        this.productsArray = new StorageManager();
    }

    isFormBuyProductValid () {
        const isNameInputValid = this.validator.isValidName(this.nameInput.value);
        const isCodeInputValid = this.validator.isValidCode(this.codeInput.value);
        const isTaxeInputValid = this.validator.isValidPrice(this.taxeInput.value);
        const isCountInputValid = this.validator.isValidCount(this.countInput.value);
        const isPriceInputValid = this.validator.isValidPrice(this.priceInput.value);

        this.validator.setInputState(this.nameInput, isNameInputValid);
        this.validator.setInputState(this.codeInput, isCodeInputValid);
        this.validator.setInputState(this.taxeInput, isTaxeInputValid);
        this.validator.setInputState(this.countInput, isCountInputValid);
        this.validator.setInputState(this.priceInput, isPriceInputValid);

        return (isNameInputValid &&  isCodeInputValid && isTaxeInputValid && isCountInputValid && isPriceInputValid)
    };

    addProductsInBill() {
        const taxes = parseFloat(this.taxeInput.value) || 0;
        const pricePlusTaxes = parseFloat(this.priceInput.value) + taxes;
        const billProduct = {
            name: this.nameInput.value,
            code: this.codeInput.value,
            count: this.countInput.value,
            price: this.priceInput.value,
            totalPrice: pricePlusTaxes,
        };

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
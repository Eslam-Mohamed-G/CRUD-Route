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
        const isCodeInputValid = this.validator.isValidName(this.nameInput.value);
        const isTaxeInputValid = this.validator.isValidName(this.nameInput.value);
        const isCountInputValid = this.validator.isValidName(this.nameInput.value);
        const isPriceInputValid = this.validator.isValidName(this.nameInput.value);

        this.validator.setInputState(this.nameInput, isNameInputValid);
        this.validator.setInputState(this.codeInputt, isCodeInputValid);
        this.validator.setInputState(this.taxeInput, isTaxeInputValid);
        this.validator.setInputState(this.countInput, isCountInputValid);
        this.validator.setInputState(this.priceInput, isPriceInputValid);

        return (isNameInputValid &&  isCodeInputValid && isTaxeInputValid && isCountInputValid && isPriceInputValid)
    };
}
export default BuyProducts;
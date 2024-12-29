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

        this.billSessionKey = "billProductsArray";
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

    checkIfProductExists(){
        const enterName = this.nameInput.value;
        const productsArray = StorageManager.loadProductData();
        const existingProduct = productsArray.find(ele => ele.name === enterName);

        if(!existingProduct){
            this.codeInput.value = "dosn't exists";
            this.priceInput.value = "dosn't exists";
        }else {
            this.codeInput.value = existingProduct.count
            this.priceInput.value = existingProduct.price;
        }
    }

    addProductsInBill() {
        const taxes = parseFloat(this.taxeInput.value) || 0;
        const pricePlusTaxes = parseFloat(this.priceInput.value) + taxes;
        const totalPrice = pricePlusTaxes * parseFloat(countInput.value);
        const billProduct = {
            name: this.nameInput.value,
            code: this.codeInput.value,
            count: this.countInput.value,
            price: this.priceInput.value,
            totalPrice: totalPrice,
        };

        let billArray = [];
        if (sessionStorage.getItem("billArray") != null) {
            billArray = JSON.parse(sessionStorage.getItem("billArray"));
            console.log(billArray)
        }
        billArray.push(billProduct);
        sessionStorage.setItem("billArray", JSON.stringify(billArray))
        // if(isFormBuyProductValid()){
        // }
    };

    saveBillInSessionStorage(data){
        sessionStorage.setItem(this.billSessionKey, JSON.stringify(data)); 
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
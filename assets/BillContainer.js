import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";

class BillContainer {
    constructor() {
        this.nameInput = document.getElementById("BillUserNameInput");
        this.dateInput = document.getElementById("billDateInput");

        this.searchNameBTN = document.getElementById("showBillByUserNameInput");
        this.searchDateBTN = document.getElementById("showBillByDateInput");

        this.billArray = StorageManager.loadBillData();
        this.validator = new IsValid();
    };

    isFormBillValid() {
        const isNameInputValid = this.validator.isValidName(nameInput.value);
        const isDateInputValid = this.dateInput.value ? this.dateInput.value : false;

        this.validator.setInputState(nameInput, isNameInputValid);
        this.validator.setInputState(dateInput, isDateInputValid);

        return (isNameInputValid && isDateInputValid);
    };

    showeBillByUserName() {
        const isNameInputValid = this.validator.isValidName(nameInput.value);
        this.validator.setInputState(nameInput, isNameInputValid);

        this.billArray.forEach((element, index) => {
            const billColl = document.createElement("div");
            billColl.classList.add("col");

            billColl.innerHTML =
            `
                <div class="card text-bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Light card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>

            `;
        });

        if (isNameInputValid) {

        }
    };
}
export default BillContainer;
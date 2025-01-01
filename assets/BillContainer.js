import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";

class BillContainer {
    constructor(){
        this.nameInput = document.getElementById("BillUserNameInput");
        this.dateInput = document.getElementById("billDateInput");

        this.searchNameBTN = document.getElementById("showBillByUserNameInput");
        this.searchDateBTN = document.getElementById("showBillByDateInput");

        this.billArray = StorageManager.loadBillData();
        this.validator = new IsValid();
    };
}
export default BillContainer;
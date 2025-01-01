import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";

class BillContainer {
    constructor() {
        this.nameInput = document.getElementById("BillUserNameInput");
        this.dateInput = document.getElementById("billDateInput");

        this.searchNameBTN = document.getElementById("showBillByUserNameInput");
        this.searchDateBTN = document.getElementById("showBillByDateInput");
        this.billContiner = document.getElementById("billContiner");
        this.modal = document.getElementById("staticBackdrop");

        this.billArray = StorageManager.loadBillData();
        this.validator = new IsValid();
    };

    isNameInputValid(){
        const isNameInputValid = this.validator.isValidName(this.nameInput.value);
        this.validator.setInputState(this.nameInput, isNameInputValid);
        return isNameInputValid;

    };

    isDateInputValid() {
        const isDateInputValid = this.dateInput.value ? this.dateInput.value : false;
        this.validator.setInputState(this.dateInput, isDateInputValid);

        return isDateInputValid;
    };

    showBillInContainer(searchValue, trueOrFalse) {
        this.billContiner.innerHTML = "";
        const billByUserName = this.billArray.filter((item) => item.userName === searchValue);
        const billByDateInput = this.billArray.filter((item) => item.date === searchValue);

        // for(let i =0; i<billByUserName.length; i++){
        //     let {userName, date, products} = billByUserName[i];
        //     console.log(products);
        // }
        const typeOfShow = trueOrFalse ? billByUserName : billByDateInput;
        const fragment = document.createDocumentFragment();
        typeOfShow.forEach((element, index) => {
            const billColl = document.createElement("div");
            billColl.classList.add("col-md-4");
            billColl.setAttribute("data-index", index);
            billColl.setAttribute("data-bs-toggle", "modal");
            billColl.setAttribute("data-bs-target", "#staticBackdrop");
            billColl.setAttribute("role", "button");

            billColl.innerHTML =
            `
                <div class="card text-bg-light mb-3">
                    <div class="card-header d-flex justify-content-between"><span>${element.userName}</span> <span>${element.date}</span></div>
                    <div class="card-body">
                        <p class="card-text">number of Products ${element.products.length}</p>
                    </div>
                </div>

            `;
            fragment.appendChild(billColl);
            billColl.addEventListener("click", ()=>{this.showeDetails(index, element.products)})
        });
        this.billContiner.appendChild(fragment);
    };

    showeDetails(index, details){
        console.log(details);
        const modalBody = this.modal.querySelector(".modal-body");
        modalBody.innerHTML = "";
        details.forEach(element =>{
            const detailsModal = document.createElement("div")
            detailsModal.innerHTML= 
            `
                <p>Product Name: ${element.name}</p>
                <p>Price: ${element.price}</p>
                <p>Quantity: ${element.count}</p>
                <hr>
        
            `
            modalBody.appendChild(detailsModal);
        });
    };
}
export default BillContainer;
import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";

class AuthSystem {
    static validator = new IsValid();

    static login(name, password) {
        const username = document.getElementById("userInput");
        const userPassword = document.getElementById("passwordInput");
        const userArray = StorageManager.loadData();

        const isUserNameValid = this.validator.isValidName(name);
        const isUserPasswordValid = this.validator.isValidPassword(password);
        
        this.validator.setInputState(username, isUserNameValid)
        this.validator.setInputState(userPassword, isUserPasswordValid)
        if (isUserNameValid && isUserPasswordValid) {
            sessionStorage.setItem("sessionActive", "true");
            const user = userArray.find(user => user.name === name && user.password === password);
            return user || null;
        }
    }
}

export default AuthSystem;

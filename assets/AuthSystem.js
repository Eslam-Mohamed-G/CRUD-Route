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

    static adduser(name, password, role) {
        const newUsername = document.getElementById("newUsername");
        const newPassword = document.getElementById("newPassword");
        const userArray = StorageManager.loadData();

        const isNewNameValid = this.validator.isValidName(name);
        const isNewPasswordValid = this.validator.isValidPassword(password);
        const isNewRoleValid = this.validator.isValidRole(role);

        this.validator.setInputState(newUsername, isNewNameValid);
        this.validator.setInputState(newPassword, isNewPasswordValid);

        if(isNewNameValid && isNewPasswordValid && isNewRoleValid){
            console.log("eslam")
            return true;
        }
    }
}

export default AuthSystem;

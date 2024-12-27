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
            const user = userArray.find(user => user.name === name && user.password === password) || false;
            sessionStorage.setItem("sessionActive", true);
            sessionStorage.setItem("sessionUsername", name);
            sessionStorage.setItem("sessionRole", user.role)
            return user;
        }
    }

    static adduser(name, password, role) {
        const newUsername = document.getElementById("newUsername");
        const newPassword = document.getElementById("newPassword");
        const newRole = document.getElementById("newRole");
        const messageError = document.getElementById("messageError");

        const newUser = {
            name: newUsername.value,
            password: newPassword.value,
            role: newRole.value,
        }

        const isNewNameValid = this.validator.isValidName(name);
        const isNewPasswordValid = this.validator.isValidPassword(password);
        const isNewRoleValid = this.validator.isValidRole(role);

        this.validator.setInputState(newUsername, isNewNameValid);
        this.validator.setInputState(newPassword, isNewPasswordValid);

        // Fetch the existing data
        const existingUsers = StorageManager.loadData();
        const userExists = existingUsers.some(user => user.name === name)

        if(isNewNameValid && isNewPasswordValid && isNewRoleValid){

            // Add new user to the array and save to localStorage
            if(userExists){
                messageError.textContent = "User already exists!";
                return false;
            }else {  
                existingUsers.push(newUser);
                StorageManager.saveUserData(existingUsers);
                return true;
            }

        }
    }
}

export default AuthSystem;

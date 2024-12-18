import StorageManager from "./StorageManager.js";
import IsValid from "./isValid.js";

class AuthSystem {
    static validator = new IsValid();

    static login(name, password) {
        const userArray = StorageManager.loadData();

        const isUserNameValid = this.validator.isValidName(name);
        const isUserPasswordValid = this.validator.isValidPassword(password);
        
        if (isUserNameValid && isUserPasswordValid) {
            const user = userArray.find(user => user.name === name && user.password === password);
            return user || null;
        }
    }
}

export default AuthSystem;

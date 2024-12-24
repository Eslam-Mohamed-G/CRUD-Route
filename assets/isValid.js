class IsValid {
    isValidName(name) {
        return /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/.test(name);
    }

    isValidPassword(password) {
        return /^\d{3,}$/.test(password); // At least 3 digits
    }

    isValidRole(role){
        return role ? role : "user";
    }

    // addProduct  addProduct  addProduct
    isValidCode(code){
        const codeRegex = /^\d+$/;
        if( !codeRegex.test(code) ){
            return false;
        }else {
            return true;
        }
    }
    
    // for price
    isValidPrice(price){
        return /^\d+(\.\d+)?$/.test(price)
    }

    // for count
    isValidCount(num){
        return /^\d+$/.test(num);
    }

    isValidCategory(category) {
        return category ? category : false;
    }
    // addProduct  addProduct  addProduct
    
    // General function to set input state
    setInputState(input, isValid) {
        if (isValid) {
            input.style.border = "1px solid transparent";
        } else {
            input.style.border = "1px solid red";
        }
    }
}

export default IsValid
class IsValid {
    isValidName(name) {
        return /^[a-zA-Z\s]+$/.test(name);
    }

    isValidPassword(password) {
        return /^\d{3,}$/.test(password); // At least 3 digits
    }

    isValidRole(role){
        return role ? role : "user";
    }

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
import StorageData from "./storageData.js";
class AuthSystem{

    static logIn(name, password) {
        const userArray = StorageData.userArray;
        const user = userArray.find(user => user.name === name && user.password === password);
        return user || null
    }
}

export default  AuthSystem;
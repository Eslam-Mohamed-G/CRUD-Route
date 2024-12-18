

class StorageData {
    static userArray = [
        { name: "admin", password: "123", role: "admin" },
        { name: "any", password: "123", role: "user" }
    ];

    static loadData() {
        const data = localStorage.getItem(this.userArray);
        return data ? JSON.parse(data) : [];
    }

    static saveData(data) {
        localStorage.setItem(this.userArray, JSON.stringify(data));
    }
}

export default StorageData;
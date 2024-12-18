

class StorageData {
    static userArray = [
        { name: "admin", password: "123", role: "admin" },
        { name: "any", password: "123", role: "user" }
    ];

    static loadData() {
        const data = localStorage.getItem(this.userArray);
        return data ? JSON.parse(data) : [];
    }

}

export default StorageData;
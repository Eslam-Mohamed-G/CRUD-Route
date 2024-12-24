class StorageManager {
    static key = "userArray";

    static loadData() {
        const data = localStorage.getItem(this.key);
        console.log(JSON.parse(data));
        return data ? JSON.parse(data) : [];
    }
// saveUserData
    static saveUserData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    static resetToDefault() {
        const defaultData = [
            { name: "admin", password: "123", role: "admin" },
            { name: "user", password: "123", role: "user" },
        ];
        this.saveUserData(defaultData);
    }
}

export default StorageManager;

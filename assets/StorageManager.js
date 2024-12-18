class StorageManager {
    static key = "userArray";

    static loadData() {
        const data = localStorage.getItem(this.key);
        console.log(data);
        return data ? JSON.parse(data) : [];
    }

    static saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    static resetToDefault() {
        const defaultData = [
            { name: "admin", password: "123", role: "admin" },
            { name: "any", password: "123", role: "user" },
            { name: "eslam", password: "147", role: "admin" }
        ];
        this.saveData(defaultData);
    }
}

export default StorageManager;

class StorageManager {
    static key = "userArray";
    static keyProduct = "productsArray";
    static keyBill = "billArray";

    static loadData() {
        const data = localStorage.getItem(this.key);
        // console.log(JSON.parse(data));
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

    static saveProductData(data) {
        localStorage.setItem(this.keyProduct, JSON.stringify(data))
    }

    static loadProductData() {
        try {
            const data = localStorage.getItem(this.keyProduct);
            // console.log(JSON.parse(data));
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Failed to load product data:", error);
            return [];
        };
    };

    static saveBill(data){
        localStorage.setItem(this.keyBill, JSON.stringify(data));
    };

    static loadBillData() {
        try {
            const data = localStorage.getItem(this.keyBill)
            console.log(JSON.parse(data));
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Failed to load bill data:", error);
            return [];
        }
    };
}

export default StorageManager;

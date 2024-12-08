<!-- # CRUD System for Product Management and Sales

## Description

This project is a robust CRUD (Create, Read, Update, Delete) system for managing products and their sales. It features user role differentiation, input validation, and effective session management. Built for streamlined product operations, this system ensures data integrity and an interactive user experience.

---

## Features

### **Validation Logic**
- Comprehensive validation for fields like product name, code, and price.
- Checks for unique product codes to prevent duplication.
- Real-time error handling with visual indicators (e.g., input borders) for better user feedback.

### **CRUD Operations**
- **Create**: Add new products with details stored in `localStorage`.
- **Read**: Dynamically display products in a table using the `productToTable` function.
- **Update**: Modify product details with changes reflected in both the UI and storage.
- **Delete**: Remove products permanently from `localStorage` and the table.

### **Session Management**
- Persistent data stored in `localStorage`.
- Temporary session states managed using `sessionStorage`.

### **User Roles**
- **Admin Users**: Access to all CRUD functionalities with enhanced permissions.
- **Regular Users**: Limited access for simplified interaction.

---

## ⚙️ **Technologies Used:**
- **HTML**: For the basic structure of the application.
- **CSS**: For styling the user interface.
- **JavaScript**: To implement the functionality and interactivity.
- **localStorage and sessionStorage**: To persist and retrieve user data.

## Suggestions for Improvement

1. **Code Duplication**
   - Reduce redundancy in validation and error handling by creating reusable utility functions.

2. **Performance Optimization**
   - Replace linear searches in large arrays with hash maps or objects for quicker lookups.

3. **User Experience**
   - Add success notifications for operations like adding or updating products.
   - Replace `confirm()` with modals for a smoother interface.

4. **Incomplete Logic**
   - Fix unfinished logic in the `addBill` function, particularly around error messages for invalid purchases.

5. **Code Organization**
   - Break the codebase into modular files (e.g., `validation.js`, `crud.js`, `ui.js`) to enhance readability and maintainability.

6. **Edge Cases**
   - Handle scenarios like deleting all products or exceeding stock limits gracefully.

---

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request with detailed notes on your changes.

 -->

 # CRUD System for Product Management and Sales

This project is a feature-rich web application for managing products and their sales, implemented using **HTML**, **CSS**, and **JavaScript**, with data persistence via **localStorage**.

---

## 🛠️ **Features:**

1. **Product Management:**
   - Add new products with a unique code, name, price, and quantity.
   - Update product details dynamically.
   - Delete products, ensuring changes are reflected in **localStorage**.

2. **Sales Management:**
   - Process sales through the "Buy Product" feature.
   - Update product quantities in real-time upon purchase.

3. **Validation:**
   - Comprehensive validation for product data:
     - Name must have at least **3 characters**.
     - Code must be unique and consist only of **alphanumeric characters**.
     - Price and quantity must be valid numeric values.

4. **User Roles:**
   - Separate interfaces for **admin** and **regular users**.
   - Admins can manage the product inventory, while users can purchase products.

5. **Dynamic Table Updates:**
   - Automatically reflects changes in product inventory on the web page.

6. **Session Management:**
   - User sessions managed using **localStorage** for persistent data and **sessionStorage** for temporary session data.

7. **Edge Case Handling:**
   - Prevents duplicate product codes.
   - Handles purchases exceeding available stock.

---

## ⚙️ **Technologies Used:**

- **HTML**: For structuring the web interface.
- **CSS**: For styling the application.
- **JavaScript**: To implement functionality and manage interactivity.
- **localStorage**: For persistent storage of product data.
- **sessionStorage** for temporary session data.

---

## 📂 **Project Files:**

- **index.html**: The main interface for the application.
- **style.css**: Styles the user interface.
- **script.js**: Implements the core logic, including product and sales management.

---

## 📖 **Code Explanation:**

### 1. **Adding Products:**
- Validates product details.
- Ensures the product code is unique.
- Stores the product in **localStorage**.

### 2. **Updating Products:**
- Allows modification of existing product details.
- Dynamically updates the inventory table and **localStorage**.

### 3. **Removing Products:**
- Deletes a product from the inventory and removes it from **localStorage**.
- Automatically updates the displayed table.

### 4. **Processing Sales:**
- Validates purchase quantity against available stock.
- Updates the product quantity in real-time.
- Reflects changes in the displayed table and **localStorage**.

### 5. **Error Handling:**
- Displays error messages for invalid inputs.
- Clears error messages upon successful input.

---

## 📋 **Potential Improvements:**

- **Enhanced UI:** Use **React** or **Tailwind CSS** for a more interactive and modern interface.
- **Performance Optimization:** Replace array-based searches with a map or object for faster lookups.
- **Validation Enhancements:** Add advanced validation for price and quantity.
- **Success Notifications:** Provide user feedback for successful operations.

---

## 📷 **Previews:**

1. **Add Product Interface:**
   ![Add Product Preview](./assets/image/Screenshot%20(93).png)

2. **Inventory Table:**
   ![Inventory Table Preview](./assets/image/Screenshot%20(94).png)

3. **Buy Product Interface:**
   ![Buy Product Preview](./assets/image/Screenshot%20(95).png)


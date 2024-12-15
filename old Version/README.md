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


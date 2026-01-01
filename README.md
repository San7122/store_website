# 👟 ShoeVault - E-commerce Shoe Store

A complete e-commerce shoe store for Nepal and India with admin panel, customer shopping, and analytics.

![ShoeVault](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🛒 Customer Features
- **Advanced Filtering**: Category, Brand, Price Range, Colors, Sizes, Rating
- **Quick Filters**: Trending 🔥, New Arrivals ✨, On Sale 🏷️
- **Product Details**: Images, descriptions, features, size/color selection
- **Reviews System**: Read and write product reviews with star ratings
- **Wishlist**: Save favorite products
- **Shopping Cart**: Full cart management with quantity controls
- **Dual Currency**: Switch between NPR (Nepal) and INR (India)
- **Checkout**: Country-specific payment methods

### 💳 Payment Methods
**Nepal**: eSewa, Khalti, FonePay, Cash on Delivery
**India**: Razorpay, Paytm, PhonePe, Cash on Delivery

### 🔐 Admin Panel (Password: `admin123`)
- **Dashboard**: Revenue, Orders, Customers, Products overview
- **Products Management**: Add, edit, delete products with all details
- **Categories**: Add/remove custom categories with icons
- **Brands**: Manage brand list
- **Orders**: View and update order status
- **Customers**: Complete customer database
- **Store Settings**: 
  - Change store name, logo, tagline
  - Customize theme colors (Primary, Secondary, Accent)
  - Set free shipping threshold
  - Update contact information

## 🚀 Running Locally in VS Code

### Prerequisites
- Node.js 18+ installed
- VS Code installed

### Steps

1. **Extract the ZIP file** to your desired location

2. **Open in VS Code**
   ```bash
   cd shoe-store-app
   code .
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Go to `http://localhost:5173`

## 🤗 Deploying to Hugging Face Spaces

### Method 1: Using Hugging Face Website

1. Go to [huggingface.co/spaces](https://huggingface.co/spaces)
2. Click **"Create new Space"**
3. Choose:
   - **Space name**: `shoe-store` (or your preferred name)
   - **SDK**: Select **"Static"**
   - **Visibility**: Public or Private
4. Click **"Create Space"**
5. Build your project locally:
   ```bash
   npm run build
   ```
6. Upload all files from the `dist` folder to your Space

### Method 2: Using Docker (Recommended)

1. Create a new Space with **Docker** SDK
2. Upload these files to your Space:
   - All project files
   - The `Dockerfile` included in this project
3. Hugging Face will automatically build and deploy

### Method 3: Using Git

1. Create a new Space on Hugging Face
2. Clone your Space:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   ```
3. Copy all project files to the cloned folder
4. Push to Hugging Face:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

## 📁 Project Structure

```
shoe-store-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── Dockerfile           # For Hugging Face deployment
├── README.md            # This file
└── .gitignore           # Git ignore rules
```

## 🎨 Customization

### Changing Theme Colors
1. Login to Admin Panel (password: `admin123`)
2. Go to **Store Settings**
3. Use color pickers to change Primary, Secondary, and Accent colors
4. See live preview and save

### Adding Products
1. Go to Admin Panel → Products
2. Fill in the product form:
   - Name, Brand, Category
   - Price and Original Price (for discount)
   - Image URL
   - Colors (comma separated)
   - Sizes (comma separated)
   - Stock quantity
   - Mark as Featured/Trending/New Arrival
3. Click "Add Product"

### Adding Categories
1. Go to Admin Panel → Categories
2. Enter category name and emoji icon
3. Click "Add"

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **CSS-in-JS** - Inline Styles (no external CSS needed)

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Made with ❤️ for Nepal 🇳🇵 and India 🇮🇳

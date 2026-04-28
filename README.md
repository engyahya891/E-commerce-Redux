# 🌌 NEON NOIR - Elite Digital Showroom

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

> A modern, cutting-edge E-commerce platform built with React & Redux, featuring a sleek cyberpunk/neon aesthetic and seamless REST API integration.
> 
> منصة تجارة إلكترونية متطورة مبنية بأحدث تقنيات React و Redux، تتميز بتصميم "سايبر بانك" نيوني جذاب وربط احترافي مع واجهات برمجة التطبيقات (REST APIs).

---

## 📑 Table of Contents | جدول المحتويات
- [🇬🇧 English Documentation](#-english-documentation)
  - [About The Project](#about-the-project)
  - [Core Features](#core-features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
- [🇸🇦 القسم العربي](#-القسم-العربي)
  - [نبذة عن المشروع](#نبذة-عن-المشروع)
  - [المميزات الأساسية](#المميزات-الأساسية)
  - [التقنيات المستخدمة](#التقنيات-المستخدمة)
  - [خطوات التشغيل](#خطوات-التشغيل)
- [👨‍💻 Author | المطور](#-author)

---

## 🇬🇧 English Documentation

### About The Project
**Neon Noir** is a high-performance Front-end E-commerce architecture designed for digital and elite technological products. It emphasizes an immersive, dark-themed User Interface (UI) coupled with a flawlessly engineered User Experience (UX). The project demonstrates advanced state management, asynchronous data fetching, and complete CRUD operations synced with a backend server.

### Core Features
- **🛡️ Secure Authentication:** Custom login architecture with local state persistence and Protected Routes.
- **🛒 Smart API-Synced Cart:** A highly responsive local shopping cart that automatically synchronizes with the backend server (`POST`, `GET`, `DELETE` APIs) for a flawless checkout protocol.
- **🔍 Server-Side Filtering:** Products and categories are dynamically fetched and filtered directly via REST APIs ensuring real-time data accuracy.
- **🧠 Centralized State Management:** Powered by Redux Toolkit (`createSlice`, `createAsyncThunk`) to manage complex UI states, loading indicators, and error handling globally.
- **📱 Responsive UI:** 100% Mobile-first design perfectly scaled for all devices using Tailwind CSS.

### Tech Stack
- **Framework:** React.js (Bootstrapped with Vite)
- **Routing:** React Router DOM (v6)
- **State Management:** Redux Toolkit (RTK)
- **Styling:** Tailwind CSS & React Icons
- **HTTP Client:** Axios
- **Mock API:** Mockerito

### Project Structure
```text
📦 src
 ┣ 📂 api               # Axios instance and API routes (Auth, Products, Carts)
 ┣ 📂 components        # Reusable UI components (Navbar, CartItem, ProductCard)
 ┣ 📂 pages             # Core application views (Home, Products, Categories, Cart, Login)
 ┣ 📂 Redux             # RTK Slices for global state (authSlice, cartSlice, productsSlice)
 ┣ 📂 utils             # Helper utilities (Currency formatting, Text truncation)
 ┣ 📜 App.jsx           # Application shell & Routing logic
 ┗ 📜 main.jsx          # React DOM Entry point
```

### Getting Started


1. **Navigate to the directory:**
   ```bash
   cd Project-Folder
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🇸🇦 القسم العربي

### نبذة عن المشروع
**Neon Noir** هو هيكل برمجي متقدم لواجهة أمامية (Front-end) لمنصة تجارة إلكترونية. يجمع المشروع بين التصميم المظلم والنيوني الجذاب، والأداء الهندسي العالي. يبرز هذا المشروع المهارات المتقدمة في إدارة الحالة (State Management)، والتعامل غير المتزامن مع البيانات، والربط الكامل مع السيرفر عبر الـ APIs.

### المميزات الأساسية
- **🛡️ نظام مصادقة آمن:** واجهة تسجيل دخول مرتبطة بـ Redux مع حماية للمسارات الخاصة بالمستخدمين (Protected Routes).
- **🛒 سلة تسوق ذكية:** سلة تعمل محلياً بكفاءة عالية، وتقوم بمزامنة بياناتها تلقائياً مع السيرفر (عبر أوامر `POST`, `GET`, `DELETE`) لضمان ديمومة البيانات.
- **🔍 فلترة عبر السيرفر (Server-Side):** جلب التصنيفات والمنتجات بشكل ديناميكي من الخادم، مما يضمن عرض بيانات دقيقة ومحدثة.
- **🧠 إدارة الحالة المركزية:** استخدام Redux Toolkit للتحكم الشامل ببيانات المنتجات، السلة، وحالات التحميل (Loading) والأخطاء (Errors) في التطبيق بأكمله.
- **📱 تصميم متجاوب:** واجهة مستخدم متوافقة مع جميع أحجام الشاشات تم بناؤها باستخدام Tailwind CSS.

### التقنيات المستخدمة
- **إطار العمل:** React.js (عبر بيئة Vite)
- **توجيه المسارات:** React Router DOM
- **إدارة الحالة:** Redux Toolkit (RTK)
- **التصميم:** Tailwind CSS
- **الاتصال بالخادم:** Axios

### خطوات التشغيل


  
1. **الدخول لمجلد المشروع:**
   ```bash
   cd Project-Folder
   ```
2. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```
3. **تشغيل خادم التطوير:**
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Author
**Eng. Yahya Hamsho** *Computer Engineering* *Designed and Developed as a comprehensive graduation capstone project.*
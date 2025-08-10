# booksi.club

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)

## 📝 Description

Booksi.club is a web application built with React, designed to create a social and engaging experience around books. While details are limited, the core functionality centers around providing a web-based platform for book-related activities. Future development could include features such as book reviews, recommendations, virtual book clubs, and author discussions. Booksi.club aims to connect readers and foster a vibrant community centered on their shared love of literature.

## ✨ Features

- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## 📦 Key Dependencies

```
@reduxjs/toolkit: ^2.5.1
@splinetool/react-spline: ^4.0.0
@stripe/react-stripe-js: ^3.3.0
@stripe/stripe-js: ^5.9.2
axios: ^1.7.9
install: ^0.13.0
lucide-react: ^0.477.0
motion: ^12.7.4
npm: ^11.2.0
react: ^18.3.1
react-dom: ^18.3.1
react-hot-toast: ^2.5.2
react-icons: ^5.4.0
react-redux: ^9.2.0
react-router: ^7.1.5
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`


## 📁 Project Structure

```
.
├── Admin
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── bookfav.svg
│   │   ├── favicon.ico
│   │   ├── img1.jpg
│   │   ├── img2.jpg
│   │   ├── img3.jpg
│   │   └── img4.jpg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Layouts
│   │   │   ├── Banner
│   │   │   │   └── img
│   │   │   │       ├── BookBanner1.jpg
│   │   │   │       └── banner2.jpg
│   │   │   ├── Footer
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── img
│   │   │   │       ├── LOGO.png
│   │   │   │       ├── footer-Bg.png
│   │   │   │       └── footerlogo.png
│   │   │   ├── Loder
│   │   │   │   └── Loder.jsx
│   │   │   ├── Navbar
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── img
│   │   │   │       └── LOGO.png
│   │   │   └── Servises
│   │   │       └── Servises.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── BookCard
│   │   │   │   └── BookCart.jsx
│   │   │   ├── Home
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── RecentlyAdded.jsx
│   │   │   │   └── img
│   │   │   │       ├── Kubrick In Futura - Changethethought -.jpg
│   │   │   │       ├── hero.png
│   │   │   │       ├── weareunite.jpg
│   │   │   │       └── 👁Made You Look👁 167 _ Just Be Nice_.jpg
│   │   │   ├── profile
│   │   │   │   ├── MobileNav.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── viewbookDetails
│   │   │       └── ViewBookDetails.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── AddBook.jsx
│   │   │   ├── Allbooks.jsx
│   │   │   ├── AllorderHistory.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Updatebook.jsx
│   │   │   ├── Userdata.jsx
│   │   │   └── img
│   │   │       └── LOGO.png
│   │   └── store
│   │       ├── auth.js
│   │       └── index.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── Backend
│   ├── Conn
│   │   └── conn.js
│   ├── app.js
│   ├── config
│   │   └── cloudinaryConfig.js
│   ├── models
│   │   ├── book.js
│   │   ├── order.js
│   │   └── user.js
│   ├── package.json
│   └── router
│       ├── book.js
│       ├── cart.js
│       ├── fevourite.js
│       ├── order.js
│       ├── paymentRoutes.js
│       ├── stripeWebhook.js
│       ├── user.js
│       └── userAuth.js
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── bookfav.svg
    │   ├── favicon.ico
    │   ├── img1.png
    │   ├── img2.jpg
    │   ├── img3.jpg
    │   └── img4.jpg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Layouts
    │   │   ├── Banner
    │   │   │   └── img
    │   │   │       ├── BookBanner1.jpg
    │   │   │       └── banner2.jpg
    │   │   ├── Footer
    │   │   │   ├── Footer.jsx
    │   │   │   └── img
    │   │   │       ├── LOGO.png
    │   │   │       ├── footer-Bg.png
    │   │   │       └── footerlogo.png
    │   │   ├── Loder
    │   │   │   └── Loder.jsx
    │   │   ├── Navbar
    │   │   │   ├── Navbar.jsx
    │   │   │   └── img
    │   │   │       └── LOGO.png
    │   │   └── Servises
    │   │       └── Servises.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── BookCard
    │   │   │   └── BookCart.jsx
    │   │   ├── Home
    │   │   │   ├── Hero.jsx
    │   │   │   ├── RecentlyAdded.jsx
    │   │   │   └── img
    │   │   │       ├── Kubrick In Futura - Changethethought -.jpg
    │   │   │       ├── hero.png
    │   │   │       ├── weareunite.jpg
    │   │   │       └── 👁Made You Look👁 167 _ Just Be Nice_.jpg
    │   │   ├── profile
    │   │   │   ├── Fev.jsx
    │   │   │   ├── MobileNav.jsx
    │   │   │   ├── Setting.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── UserOrserHistory.jsx
    │   │   └── viewbookDetails
    │   │       └── ViewBookDetails.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── AboutUs.jsx
    │   │   ├── Allbooks.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   ├── SignUp.jsx
    │   │   └── img
    │   │       └── LOGO.png
    │   └── store
    │       ├── auth.js
    │       └── index.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/Soumya0004/booksi.club.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

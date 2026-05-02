# 📱 BBC News App – Mobile Engineer Assessment

A cross-platform mobile news application built with **React Native + TypeScript**, designed to deliver a fast, accessible, and scalable news-reading experience.

---

## 🚀 Overview

This application allows users to:

* Select preferred news domains
* Browse articles from selected sources
* Sort content by **latest** or **most popular**

The focus of this solution is on:

* **Scalable architecture**
* **Strong UX fundamentals**
* **Accessibility-first design**
* **Maintainable, testable code**

---

## ▶️ How to Run

### 1. Clone the repository

git clone https://github.com/jaa38/bbc-assessment.git
cd BBCNewsApp

---

### 2. Install dependencies

npm install

---

### 3. Start Metro bundler

npx react-native start

---

### 4. Run on iOS

npx react-native run-ios

---

### 5. Run on Android

Ensure Android Studio is installed and emulator/device is running

npx react-native run-android

---

## ⚙️ Environment Setup Notes

* Java **17+** required for Gradle
* Android SDK must be configured

Example:

export ANDROID_HOME=$HOME/Library/Android/sdk

If needed:

android/local.properties

sdk.dir=/Users/your-username/Library/Android/sdk

---

## 🧱 Architecture Decisions

The app follows a **modular structure**:

src/
├── components/
├── screens/
├── navigation/
├── services/
├── theme/
├── types/

### Key Decisions

* Separation of concerns (UI / logic / data)
* Reusable components (Button, Chip, Toggle, Card)
* Typed navigation (TypeScript)
* Centralised design system

---

## ⚖️ Trade-offs

* No global state (kept simple with hooks)
* Inline styles for speed (less abstraction)
* No caching (simpler but no offline support)
* No UI library (more control, more effort)

---

## ♿ Accessibility

* Accessibility roles (button, tab, list)
* Screen reader labels
* Selected/disabled states
* Dynamic font scaling
* Minimum touch targets
* Clear visual states

---

## 🧪 Testing

Using:

* Jest
* @testing-library/react-native

### Covered

* Component rendering
* User interaction
* Navigation
* API calls
* Error handling

---

## ✨ Features

### Domain Selection

* Multi-select chips
* Live feedback
* Disabled CTA

### Article Feed

* Latest articles
* Clean UI
* Handles missing data

### Sorting

* Latest / Popular toggle

### States

* Loading
* Error (retry)
* Success

---

## 🔌 API

* NewsAPI integration
* Domain filtering
* Sorting support
* Error handling

---

## 📈 Future Improvements

* Caching
* Pull to refresh
* Bookmarks
* Offline mode
* Analytics
* Dark mode
* E2E tests

---

## 🧠 Reflection

Focus areas:

* Clean architecture
* UX clarity
* Accessibility
* Maintainability

---

## 🙌 Conclusion

This project demonstrates:

* Strong frontend engineering
* Good UX thinking
* Scalable structure

Built to be **production-ready and extendable**.

# 📱 BBC News App – Mobile Engineer Assessment

A cross-platform mobile news application built with **React Native** that allows users to:

* Select preferred news domains
* View the latest articles from selected sources
* Sort articles by latest or most popular

---

## 🚀 Overview

This application focuses on **clarity, performance, and accessibility**, delivering a clean and intuitive news-reading experience.

The goal was to design and build a scalable mobile app that balances:

* User needs (discoverability, readability)
* Business goals (content engagement)
* Technical constraints (performance, maintainability)

---

## ✨ Features

### 🏷️ Domain Selection

* Multi-select domain chips
* Clear selection feedback
* Disabled CTA until selection is made

### 📰 Article Feed

* Displays latest 10 articles per selected domain
* Clean, scannable article cards
* Graceful handling of missing content

### 🔄 Sorting

* Toggle between:

  * **Latest**
  * **Most Popular**
* Instant UI feedback

### ⚠️ States Handling

* Loading (ActivityIndicator)
* Error state with retry
* Empty state messaging

---

## ♿ Accessibility

Accessibility was considered from the ground up:

* Semantic roles (`button`, `tab`, `list`)
* Screen reader support via `accessibilityLabel`
* Minimum touch targets (44px)
* Dynamic text scaling (`allowFontScaling`)
* Clear visual states (selected, disabled)

---

## 🧱 Architecture

The app follows a **modular and scalable structure**:

```
src/
├── components/
├── screens/
├── navigation/
├── services/
├── theme/
├── types/
```

### Key Decisions

* **Separation of concerns**: UI, logic, and data are clearly split
* **Reusable components**: Button, DomainChip, SortToggle, ArticleCard
* **Typed navigation** using React Navigation + TypeScript
* **Centralised design system** (typography, spacing, colors)

---

## 🎨 Design System

A lightweight design system was implemented to ensure consistency:

* Typography scale (H1–Caption)
* 8pt spacing system
* Consistent color tokens
* Reusable UI components

This improves:

* Maintainability
* Developer velocity
* Visual consistency

---

## ⚙️ Tech Stack

* React Native
* TypeScript
* React Navigation (Native Stack)
* Custom design system (no UI library)

---

## 🔌 API Integration

Articles are fetched via a service layer:

```
services/newsService.ts
```

Features:

* Domain filtering
* Sorting support
* Error handling
* Async state management

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/jaa38/bbc-assessment.git
cd BBCNewsApp
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start Metro

```bash
npx react-native start
```

---

### 4. Run on Android

Ensure:

* Android Studio installed
* Emulator running OR device connected

```bash
npx react-native run-android
```

---

## 🛠️ Environment Setup Notes

* Java 17 required for Gradle
* Android SDK configured via:

  * `ANDROID_HOME`
  * `local.properties`

---

## 🧪 Testing Approach

Manual testing was conducted for:

* Domain selection flow
* Navigation between screens
* Sorting behaviour
* Error and loading states

---

## 📈 Future Improvements

Given more time, I would:

* Add caching for offline support
* Implement pull-to-refresh
* Add bookmarking/favorites
* Improve analytics tracking (engagement metrics)
* Add unit and integration tests

---

## 🧠 Reflection

This project focused on:

* Building a clean, scalable architecture
* Delivering strong UX fundamentals
* Ensuring accessibility is not an afterthought

Special attention was given to:

* Reducing friction in user flows
* Maintaining consistent UI patterns
* Writing maintainable and readable code

---

## 🙌 Conclusion

This solution demonstrates a balance of:

* Product thinking
* UX awareness
* Engineering quality

It is designed to be easily extendable and production-ready.

---

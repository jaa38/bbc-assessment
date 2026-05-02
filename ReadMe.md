# 📱 BBC News App – Mobile Engineer Assessment

A cross-platform mobile news application built with **React Native + TypeScript**, designed to deliver a fast, accessible, and scalable news-reading experience.

---

## 🚀 Overview

This application allows users to:

* Select one or more news domains
* View the **10 latest articles** from selected sources
* Sort articles by **latest** or **most popular**

The solution focuses on:

* **Scalable architecture**
* **Strong UX fundamentals**
* **Accessibility-first design**
* **Maintainable, testable code**

---

## ▶️ How to Run

### 1. Clone the repository

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

### 3. Start Metro bundler

```bash
npx react-native start
```

---

### 4. Run on iOS

```bash
npx react-native run-ios
```

---

### 5. Run on Android

Ensure Android Studio is installed and an emulator/device is running:

```bash
npx react-native run-android
```

---

## ⚙️ Environment Setup Notes

* Java **17+** required for Gradle
* Android SDK must be configured

Example:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

If needed, create:

```
android/local.properties
```

```bash
sdk.dir=/Users/your-username/Library/Android/sdk
```

---

## 🧱 Architecture

The app follows a **modular, domain-driven structure**:

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen-level UI
├── navigation/     # Navigation setup
├── services/       # API layer
├── theme/          # Design system (colors, spacing, typography)
├── types/          # Shared TypeScript types
```

### Key Decisions

* **Separation of concerns**: UI, navigation, and data-fetching are decoupled
* **Design system**: Centralised theme ensures consistency and scalability
* **Typed navigation**: Prevents runtime navigation errors
* **Discriminated unions (`FetchState`)**: Ensures safe async state handling
* **Reusable components**: Button, DomainChip, SortToggle, ArticleCard

---

## ⚖️ Trade-offs

* No global state management (kept simple using React hooks)
* Inline styles used in places for speed over strict consistency
* No caching layer (simpler implementation, no offline support)
* Sorting handled partly in UI for clarity over abstraction

---

## ♿ Accessibility

Accessibility was considered throughout:

* Proper roles (`button`, `tab`, `list`)
* Screen reader labels and hints
* Selected/disabled states exposed
* Dynamic font scaling enabled
* Clear visual feedback for interactions

---

## 🧪 Testing

Testing is implemented using:

* **Jest**
* **@testing-library/react-native**

### Covered

* Component rendering (ArticleCard, DomainChip)
* User interactions (selecting domains, toggling sort)
* Navigation flow (Domain → Articles screen)
* API calls (mocked with axios)
* Error handling (network failure scenarios)

### Testing Strategy

This project focuses on unit and component testing as required by the brief.

For production environments, I would extend this with **end-to-end testing (e.g. Detox)** to validate full user flows across devices.

---

## ✨ Features

### Domain Selection

* Multi-select chips
* Real-time selection feedback
* Disabled CTA when no selection

### Article Feed

* Displays latest articles
* Handles missing data safely
* Clean, readable layout

### Sorting

* Toggle between **Latest** and **Popular**

### UI States

* Loading indicator
* Error state with retry
* Success state with list rendering

---

## 🔌 API

* Uses **NewsAPI (Everything endpoint)**
* Filters by selected domains
* Supports sorting
* Handles API and network errors gracefully

---

## ⚠️ Known Limitations

* No caching (articles reload on each visit)
* No pagination (limited to 10 articles)
* No offline support
* Sorting partially handled client-side

---

## ⚡ Performance Considerations

* `FlatList` used for efficient list rendering
* Components structured to support memoization if scaling increases

---

## 📈 Future Improvements

* Caching & offline mode
* Pull-to-refresh
* Bookmarking articles
* Dark mode support
* Pagination / infinite scroll
* Analytics integration
* End-to-end testing (Detox)

---

## 🧠 Reflection

This project focused on:

* Clean and scalable architecture
* Strong user experience fundamentals
* Accessibility and inclusivity
* Maintainable and testable code

---

## 🙌 Conclusion

This application demonstrates:

* Solid React Native engineering principles
* Thoughtful UX and accessibility design
* A scalable and extensible architecture

Built with a focus on **clarity, reliability, and real-world maintainability**.

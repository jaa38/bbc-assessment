# BBC News App

A React Native application that displays the latest news articles from a selection of domains. Built as a technical assessment for BBC Studios.

---

## What it does

- Browse articles from five domains: Apple, BBC, IGN, Google, and YouTube
- Select one or more domains to build a custom news feed
- View the 10 latest articles per selection
- Sort articles by latest or most popular
- Accessible on iOS and Android

---

## Getting started

### Requirements

- Node 18 or higher
- Xcode (for iOS)
- Android Studio (for Android)
- A News API key from [newsapi.org](https://newsapi.org)

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/BBCNewsApp.git
cd BBCNewsApp
```

**2. Install dependencies**

```bash
npm install
```

**3. Add your API key**

```bash
touch .env
```

Create `.env` and add your API key here:

```
NEWS_API_KEY=your_api_key_here
```

Run the following command to clear the cache and restart:

```
npx react-native start --reset-cache
```

**4. Install iOS dependencies**

```bash
cd ios && pod install && cd ..
```

**5. Run the app**

iOS:
```bash
npx react-native run-ios
```

Android:
```bash
npx react-native run-android
```

---

## 🧪 Testing

Testing is implemented using:

* **Jest**
* **@testing-library/react-native**

## Running tests

```bash
npm test
```

### Coverage includes

- `ArticleCard` — rendering and formatting logic
- `DomainSelectorScreen` — selection, UI feedback, navigation
- `newsService` — API requests, sorting, error handling

### Testing Strategy

This project focuses on unit and component testing as required by the brief.

In a production environment, this would be extended with end-to-end testing (e.g. Detox) to validate full user flows.

---

## Architecture decisions

### Feature-based folder structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Full screens
├── services/         # API layer
├── navigation/       # Navigation config
├── theme/            # Design tokens
└── types/            # TypeScript types
```

- Screens handle layout and user flow
- Components are reusable UI primitives
- Services encapsulate API logic
- Components remain independent of API and navigation

### TypeScript throughout

Strict mode is enabled across the project.

A discriminated union (FetchState) is used to model async state:

```typescript
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string }
```

This ensures every state is handled explicitly at compile time, reducing runtime errors.

## 🔌 API

* Uses **NewsAPI (Everything endpoint)**
* Filters by selected domains
* Supports sorting
* Handles API and network errors gracefully

### Axios for API calls

Axios is used for:

- Clearer error handling
- Cleaner request configuration

The `domains` parameter is mapped directly to the API and supports multi-domain selection in a single request.

### Design system

A token-based design system ensures consistency:

- Colours
- Spacing
- Radius
- Typography

All values are centralised and reused across components.

### Accessibility

- `accessibilityRole` on every interactive element
- `accessibilityLabel` on all buttons and chips
- `accessibilityState` on chips to communicate selected state to screen readers
- `accessibilityLiveRegion="polite"` on the selection counter so screen readers announce changes automatically
- `accessibilityLabel` on the loading indicator
- Minimum touch target height of 36–48pt on all interactive elements
- Font scaling enabled

---

### Key Decisions

* **Separation of concerns**: UI, navigation, and data-fetching are decoupled
* **Design system**: Centralised theme ensures consistency and scalability
* **Typed navigation**: Prevents runtime navigation errors
* **Discriminated unions (`FetchState`)**: Ensures safe async state handling
* **Reusable components**: Button, DomainChip, SortToggle, ArticleCard

---

## Trade-offs and limitations

**No pagination** — limited to 10 articles per the task

**No caching** — data fetched on each navigation

**No offline support** — Articles are fetched fresh on every navigation to the Articles screen. Caching was not added as it was not in the requirements.

**Sort resets on back navigation** — When a user returns to the Domain Selector and navigates forward again, sort resets to Latest. This is intentional — a fresh selection should start with the default sort.

**News API free tier** — The free tier allows 100 requests per day and restricts some endpoints. Articles older than 30 days are not available. The `everything` endpoint is used as recommended in the task brief.

**No global state** - kept simple with React hooks

* Inline styles used in places for speed over strict consistency
* No caching layer (simpler implementation, no offline support)
* Sorting handled partly in UI for clarity over abstraction

---

## Known limitations and next steps

**Known limitations**

- The News API free tier limits requests to 100 per day
- Some domains return fewer than 10 articles depending on recent publishing activity
- Article content is truncated (API limitation)

**Next steps with more time**

- Add article detail screen with full content and a link to the original article
- Implement pull-to-refresh on the articles list
- Add skeleton loading screens instead of a spinner
- Persist selected domains between sessions using AsyncStorage
- Add Detox end-to-end tests for the full user journey
- Set up CI with GitHub Actions to run tests on every pull request

---

## Project structure

```
BBCNewsApp/
├── __mocks__/
│   └── env.js                    # Mock API key for tests
├── __tests__/
│   ├── ArticleCard.test.tsx
│   ├── DomainSelectorScreen.test.tsx
│   └── newsService.test.ts
├── src/
│   ├── components/
│   │   ├── AppText.tsx            # Typography component
│   │   ├── ArticleCard.tsx        # Single article display
│   │   ├── Button.tsx             # Primary and secondary button
│   │   ├── DomainChip.tsx         # Selectable domain pill
│   │   └── SortToggle.tsx         # Latest / Popular toggle
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Stack navigator with typed params
│   ├── screens/
│   │   ├── DomainSelectorScreen.tsx
│   │   └── ArticlesScreen.tsx
│   ├── services/
│   │   └── newsService.ts         # Axios API calls
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   ├── radius.ts
│   │   ├── spacing.ts
│   │   ├── textStyles.ts
│   │   └── typography.ts
│   └── types/
│       ├── env.d.ts
│       └── news.ts                # All TypeScript types
├── .env.example
├── App.tsx
├── babel.config.js
└── jest.config.js
```

---

## ⚡ Performance Considerations

* `FlatList` used for efficient list rendering
* Components structured to support memoization if scaling increases


## Feedback on the task

The task was well scoped and engaging. The hint around the News API domains parameter helped guide a clean multi-select implementation. With more time, I would extend the app with a detail screen and end-to-end testing.

---

## 🙌 Conclusion

This application demonstrates:

* Solid React Native engineering principles
* Thoughtful UX and accessibility design
* A scalable and extensible architecture
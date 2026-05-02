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

Copy the example env file and add your key:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
NEWS_API_KEY=your_api_key_here
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

## Running tests

```bash
npm test
```

The test suite covers:

- `ArticleCard` — renders title, source, description, and relative date correctly
- `DomainSelectorScreen` — chip selection, counter updates, navigation on submit
- `newsService` — API call parameters, domain joining, sort mapping

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

All UI logic lives in screens. All data fetching lives in services. Components know nothing about the API or navigation.

### TypeScript throughout

Strict mode is enabled. Every component prop, API response, and navigation param is typed.

The most important type in the app is `FetchState` — a discriminated union that makes every possible state of an API call explicit:

```typescript
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string }
```

The TypeScript compiler forces every state to be handled. Unhandled states are caught before the app runs, not when a user encounters them.

### Axios for API calls

Axios is used instead of `fetch` for cleaner error handling and more readable request configuration. The service layer is kept thin — one function, one responsibility.

The `domains` parameter accepts multiple values joined by comma, which maps directly to the News API's `everything` endpoint and enables multi-domain selection in a single request.

### Design system

A token-based design system covers colours, spacing, radius, and typography. Every value is defined once and referenced throughout. Changing the primary colour updates every component that uses it.

### Accessibility

- `accessibilityRole` on every interactive element
- `accessibilityLabel` on all buttons and chips
- `accessibilityState` on chips to communicate selected state to screen readers
- `accessibilityLiveRegion="polite"` on the selection counter so screen readers announce changes automatically
- `accessibilityLabel` on the loading indicator
- Minimum touch target height of 36–48pt on all interactive elements

---

## Assumptions and trade-offs

**No pagination** — The task specifies 10 articles. Infinite scroll was not implemented to keep the scope focused.

**No offline support** — Articles are fetched fresh on every navigation to the Articles screen. Caching was not added as it was not in the requirements.

**Sort resets on back navigation** — When a user returns to the Domain Selector and navigates forward again, sort resets to Latest. This is intentional — a fresh selection should start with the default sort.

**System font used instead of Inter** — Inter requires manual font linking in bare React Native which adds significant setup complexity. The system font (San Francisco on iOS, Roboto on Android) provides the same clean aesthetic with zero configuration overhead.

**News API free tier** — The free tier allows 100 requests per day and restricts some endpoints. Articles older than 30 days are not available. The `everything` endpoint is used as recommended in the task brief.

---

## Known limitations and next steps

**Known limitations**

- The News API free tier limits requests to 100 per day
- Some domains return fewer than 10 articles depending on recent publishing activity
- Content field from the API is truncated at 200 characters on the free tier

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

## Feedback on the task

The task was well scoped and genuinely interesting to build. The hint about the `domains` parameter in the News API docs was helpful — it pointed toward the multi-select architecture cleanly. The biggest challenge was the bare React Native setup on macOS, particularly the CocoaPods and Ruby version dependencies. Given more time I would add a Detail screen and Detox end-to-end tests.
# BBC News App

A React Native application that displays the latest news articles from a selection of domains. Built as a technical assessment for BBC Studios.

---

## What it does

- Browse articles from five domains: Apple, BBC, IGN, Google, and YouTube
- Select one or more domains to build a custom news feed
- View the 10 latest articles per selection
- Sort articles by latest or most popular
- Tap any article to view full details and open the original source
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
git clone https://github.com/jaa38/bbc-assessment.git
cd BBCNewsApp
```

**2. Install dependencies**

```bash
npm install
```

**3. Add your API key**

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your own key from [newsapi.org](https://newsapi.org):

```
NEWS_API_KEY=your_real_key_here
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

## Testing

Testing is implemented using **Jest** and **@testing-library/react-native**.

```bash
npm test
```

### Coverage

- `ArticleCard` — renders title, source, description, and handles null fields
- `formatDate` — relative time formatting: Just now, hours ago, days ago
- `DomainSelectorScreen` — chip selection, counter updates, navigation with correct params
- `newsService` — API request construction, domain joining, sort mapping, error normalisation

### Testing strategy

Unit and component tests cover all core logic and UI behaviour. The service layer is tested with a mocked axios instance to ensure no real network calls are made during testing.

In a production environment this would be extended with Detox end-to-end tests to validate full user flows on a real device or simulator.

---

## Architecture decisions

### Feature-based folder structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Full screens
├── services/         # API layer
├── navigation/       # Navigation config and types
├── theme/            # Design tokens
└── types/            # TypeScript types
```

Screens handle layout and user flow. Components are reusable UI primitives. Services encapsulate all API logic. Components have no knowledge of the API or navigation.

### TypeScript throughout

Strict mode is enabled. Every component prop, API response, navigation param, and async state is typed.

The most important type is `FetchState` — a discriminated union that models every possible state of an API call explicitly:

```typescript
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string }
```

The TypeScript compiler forces every state to be handled. Unhandled states are caught at compile time, not at runtime when a user encounters them.

### Navigation typing

A shared `AppNavigationProp<T>` generic type is defined once in `navigation/types.ts` and reused across all screens. This prevents runtime navigation errors and enables autocomplete for route names and params.

### Axios for API calls

Axios is used instead of fetch for cleaner error handling and more readable request configuration. The service layer is kept thin — one function, one responsibility.

Errors are normalised at the service boundary so the UI never receives raw API errors:

- `ECONNABORTED` → timeout message
- `401` → invalid API key message
- `429` → rate limit message
- `500+` → server error message
- Fallback → generic user-friendly message

### Design system

A token-based design system covers colours, spacing, radius, and typography. Every value is defined once and referenced throughout. Changing a token updates every component that uses it.

### Accessibility

- `accessibilityRole` on every interactive element including article list items, back buttons, and refresh
- `accessibilityLabel` on all buttons, chips, and icon-based interactions
- `accessibilityState` on chips to communicate selected state to screen readers
- `accessibilityLiveRegion="polite"` on the selection counter so changes are announced automatically
- `hitSlop` on small icon buttons to ensure adequate touch targets
- Font scaling enabled via `allowFontScaling` and `maxFontSizeMultiplier`
- Minimum touch target height of 36–48pt on all interactive elements

---

## Key decisions

**Separation of concerns** — UI, navigation, and data-fetching are fully decoupled.

**Discriminated unions** — FetchState ensures type-safe async state handling with no implicit undefined states.

**Error normalisation** — Raw API errors are caught in the service layer and returned as user-friendly messages. The UI never exposes internal error details.

**Client-side sort** — Articles are sorted client-side after the API response as a belt-and-braces measure. The News API free tier can return inconsistent ordering. For `latest`, articles are sorted by `publishedAt` descending. For `popular`, the API ordering is preserved.

**Defensive API check** — The service validates that `response.data.articles` exists before returning. This prevents runtime crashes if the API returns an unexpected response shape.

**ArticleDetail screen** — Added beyond the brief because without it the app has a dead end. A user sees a headline with no path to the full article. The detail screen shows all available content and provides a direct link to the source via `Linking.openURL`.

---

## Trade-offs and limitations

**No pagination** — The task specifies 10 articles. Infinite scroll was not implemented to keep the scope focused.

**No caching** — Articles are fetched fresh on every navigation to the ArticlesScreen. Caching was not added as it was not in the requirements.

**No offline support** — Requires a network connection. Offline handling would require a local caching layer.

**Sort resets on back navigation** — When a user returns to the Domain Selector and navigates forward again, sort resets to Latest. This is intentional — a fresh domain selection should start with the default sort.

**System font used instead of Inter** — Inter requires manual native font linking which adds build complexity beyond the scope of this assessment. The system font (San Francisco on iOS, Roboto on Android) provides the same clean aesthetic with zero configuration overhead.

**News API free tier** — Limits requests to 100 per day. Articles older than 30 days are not available. Article content is truncated at 200 characters. The `everything` endpoint is used as recommended in the task brief.

---

## Known limitations and next steps

**Known limitations**

- News API free tier: 100 requests per day
- Some domains return fewer than 10 articles depending on recent publishing activity
- Article content truncated at 200 characters (API limitation)

**Next steps with more time**

- Pull-to-refresh on the articles list
- Skeleton loading screens instead of an activity indicator
- Persist selected domains between sessions using AsyncStorage
- Detox end-to-end tests for the full user journey
- CI with GitHub Actions to run tests on every pull request

---

## Project structure

```
BBCNewsApp/
├── __mocks__/
│   └── env.js                        # Mock API key for tests
├── __tests__/
│   ├── ArticleCard.test.tsx
│   ├── DomainSelectorScreen.test.tsx
│   ├── formatDate.test.ts
│   └── newsService.test.ts
├── src/
│   ├── components/
│   │   ├── AppText.tsx               # Typography component
│   │   ├── ArticleCard.tsx           # Article preview card
│   │   ├── Button.tsx                # Primary and secondary button
│   │   ├── DomainChip.tsx            # Selectable domain pill
│   │   └── SortToggle.tsx            # Latest / Popular toggle
│   ├── navigation/
│   │   ├── AppNavigator.tsx          # Stack navigator with typed params
│   │   └── types.ts                  # Shared AppNavigationProp generic
│   ├── screens/
│   │   ├── DomainSelectorScreen.tsx  # Domain selection
│   │   ├── ArticlesScreen.tsx        # Article list
│   │   └── ArticleDetailScreen.tsx   # Article detail with external link
│   ├── services/
│   │   └── newsService.ts            # Axios API calls with error normalisation
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   ├── radius.ts
│   │   ├── spacing.ts
│   │   ├── textStyles.ts
│   │   └── typography.ts
│   └── types/
│       ├── env.d.ts                  # @env module declaration
│       └── news.ts                   # All TypeScript types
├── .env.example
├── App.tsx
├── babel.config.js
└── jest.config.js
```

---

## Performance

- `FlatList` with `keyExtractor` for efficient list rendering
- `useCallback` on `renderItem` to prevent function recreation on every render
- `useCallback` on event handlers passed to memoisation-ready components

---

## Feedback on the task

The task was well scoped and engaging. The hint around the `domains` parameter in the News API docs helped guide a clean multi-domain architecture. The most interesting engineering decision was the error normalisation layer in the service — making sure the UI always receives a meaningful, user-friendly message regardless of what the API returns.
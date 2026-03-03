# Pokédex React Native App

A simple but fully functional Pokédex built with **React Native** and **Expo Router**. This app demonstrates fetching data from the [PokéAPI](https://pokeapi.co/) and displays Pokémon details in a list and detail view. It is designed to be **scalable, clean, and interview-ready** with key best practices implemented.

---

## Features

### 1. Pokémon List (Home Screen)

* Displays a scrollable list of Pokémon with front and back images.
* Color-coded cards based on Pokémon primary type.
* Loading and error states to handle network requests gracefully.
* Pull-to-refresh functionality for real-time updates.
* Client-side search filter:

  * Instant filtering by name without extra API calls.
  * No Pokémon are lost when the search is empty.

### 2. Pokémon Detail Screen

* Fetches full Pokémon data on navigation for performance optimization.
* Displays:

  * Height & Weight
  * All types
  * Stats (HP, Attack, Defense, Speed, etc.) with capitalized names
  * Simple progress bars for stats
* Loading and error handling to ensure smooth UX.

### 3. Architecture Highlights

* Separation of concerns:

  * List screen fetches summary data.
  * Detail screen fetches full resource data.
* Efficient state management with `useState` and `useEffect`.
* Memoized Pokémon cards with `React.memo` to avoid unnecessary re-renders.
* Client-side filtering for better performance.

---

## Tech Stack

* **React Native** (UI & components)
* **Expo Router** (navigation)
* **TypeScript** (static typing & better developer experience)
* **PokéAPI** (data source)

---

## Getting Started

### Prerequisites

* Node.js >= 18
* Expo CLI installed globally:

```bash
npm install -g expo-cli
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pokedex-react-native.git
cd pokedex-react-native
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open the app in the Expo Go app on your device, or in an emulator.

---

## Folder Structure

```
.
├── app/
│   ├── index.tsx          # Home screen with Pokémon list
│   ├── details.tsx        # Pokémon detail screen
│   └── _layout.tsx        # Stack layout with Expo Router
├── assets/                # Images or static assets
├── package.json
└── README.md
```

---

## Usage

* Search for Pokémon using the search input at the top.
* Tap on a Pokémon card to navigate to its detail page.
* Pull down to refresh the Pokémon list.

---

## Next Steps / Future Improvements

* Debounced search input to improve performance on large datasets.
* Pagination or infinite scroll for large Pokémon sets.
* Cache Pokémon details to reduce repeated API calls.
* Add dark mode support.
* Enhance stats with colorful progress bars or charts.

---

## License

MIT License © Sam-Waithaka

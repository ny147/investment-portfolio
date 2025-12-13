# DashboardPage Component Documentation

## Overview

The `DashboardPage` component is the main dashboard view for the Investment Portfolio Dashboard application. It serves as the primary interface for users to track their investment portfolio, monitor performance, and manage holdings over time.

**File Location:** `app/page.js`  
**Type:** Client Component (uses `"use client"` directive)  
**Framework:** Next.js with React

---

## Features

### 1. **Total Portfolio Value Display**
- Shows the current total value of all holdings
- Component: `<TotalValue />`

### 2. **Performance Chart (30-Day History)**
- Displays simulated daily portfolio values for the last 30 days
- Generates random fluctuations to simulate market activity
- Component: `<PerformanceChart />`

### 3. **Asset Allocation Visualization**
- Shows the distribution of portfolio assets
- Component: `<AssetAllocation />`

### 4. **Holdings Management**
- Lists all assets with detailed information
- Allows viewing and managing individual holdings
- Shows simulated daily change percentages
- Component: `<HoldingsList />`

### 5. **Connected Accounts**
- Displays status of linked financial accounts
- Component: `<ConnectedAccounts />`

### 6. **Investment Journal**
- Allows users to log notes for specific dates
- Associates holdings snapshots with journal entries
- Date-based organization

---

## State Management

### Key State Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `journals` | Object | Stores journal entries keyed by date. Each entry contains `note` and `holdings` array. |
| `selectedDate` | String | Currently selected date (YYYY-MM-DD format) for viewing/editing journal entries. |
| `performanceData` | Array | Array of daily portfolio values for the last 30 days with formatted date strings. |

### Derived State

| Variable | Type | Purpose |
|----------|------|---------|
| `currentHoldings` | Array | Holdings snapshot for the currently selected date. |
| `portfolioReturn` | Number | Calculated percentage return based on 30-day performance data. |
| `updatedHoldings` | Array | Holdings with simulated daily change percentages applied. |

---

## Data Structures

### Journal Entry Structure
```javascript
{
  [date]: {
    note: string,           // User's journal note for the date
    holdings: array         // Array of holding objects
  }
}
```

### Holding Object Structure
```javascript
{
  id: number,
  symbol: string,
  name: string,
  quantity: number,
  price: number,
  value: number,           // quantity * price
  changePct: number        // Simulated daily change percentage
}
```

### Performance Data Structure
```javascript
{
  date: string,            // Formatted as "Mon D" (e.g., "Dec 13")
  value: number            // Portfolio value for that day
}
```

---

## Key Functions

### `updateHoldingsForDate(newHoldings)`
**Purpose:** Updates the holdings array for the currently selected date.

**Parameters:**
- `newHoldings` (Array): New array of holding objects

**Behavior:**
- Updates the `journals` state object for `selectedDate`
- Preserves the existing note
- Triggers a recalculation of `performanceData` via the `useEffect` hook

**Example:**
```javascript
updateHoldingsForDate([...newHoldings]);
```

---

### `updateNoteForDate(newNote)`
**Purpose:** Updates the journal note for the currently selected date.

**Parameters:**
- `newNote` (String): New note content

**Behavior:**
- Updates the `journals` state object for `selectedDate`
- Preserves existing holdings
- Ensures holdings array exists (fallback to empty array)

**Example:**
```javascript
updateNoteForDate("Rebalanced portfolio today");
```

---

## Hooks & Effects

### `useEffect` - Performance Data Calculation
**Dependency:** `currentHoldings`

**Behavior:**
1. Calculates total portfolio value from current holdings
2. Generates simulated 30-day historical data
3. Applies random daily returns (±2%)
4. Updates `performanceData` state

**Algorithm:**
```
1. Sum all holding values → totalValue
2. Starting value = totalValue × 0.9
3. For each of last 30 days:
   - Apply random multiplier (0.98 to 1.02)
   - Record date and calculated value
```

---

### `useMemo` - Portfolio Return Calculation
**Dependencies:** `performanceData`

**Behavior:**
- Calculates overall 30-day return percentage
- Formula: `((endValue - startValue) / startValue) × 100`
- Memoized to prevent unnecessary recalculations

---

### `useMemo` - Updated Holdings
**Dependencies:** `currentHoldings`, `portfolioReturn`

**Behavior:**
1. Maps over current holdings
2. Applies simulated daily change percentage to each holding
3. Uses random multiplier (0.8 to 1.2) to vary returns across assets
4. Rounds to 2 decimal places

**Purpose:** Simulates realistic portfolio behavior where different assets perform differently

---

## Layout & Responsive Design

### Mobile (default)
- Single column layout
- Components stack vertically

### Desktop (lg breakpoint)
- Two-column layout for main content
- Performance chart and asset allocation side-by-side
- Holdings and connected accounts side-by-side

**Tailwind Classes Used:**
- `grid grid-cols-1 lg:grid-cols-3 gap-8`
- `lg:col-span-2` for main content areas

---

## Component Props

| Component | Props | Description |
|-----------|-------|-------------|
| `TotalValue` | `holdings` | Array of updated holdings with change percentages |
| `PerformanceChart` | `data` | Array of performance data objects |
| `AssetAllocation` | `holdings` | Array of updated holdings for pie chart data |
| `HoldingsList` | `holdings`, `setHoldings` | Holdings array and update callback function |
| `ConnectedAccounts` | None | Displays account information |
| `InvestmentJournal` | `journals`, `selectedDate`, `setSelectedDate`, `updateNote`, `updateHoldings` | (Not rendered in current version) |

---

## Data Flow

```
Initial State (Today's Date)
         ↓
journals[today] = { note: "", holdings: mockData }
         ↓
selectedDate = today
         ↓
currentHoldings = journals[selectedDate].holdings
         ↓
useEffect recalculates performanceData
         ↓
useMemo calculates portfolioReturn
         ↓
useMemo applies changePct to holdings (updatedHoldings)
         ↓
Components render with calculated data
         ↓
User updates holdings/note
         ↓
State updates trigger recalculation
```

---

## Current Limitations & Notes

1. **Simulated Data**: All performance and change percentages are randomly generated, not real market data
2. **No Backend Integration**: Data is stored only in component state (in-memory)
3. **Mock Data Source**: Initial holdings come from `mockData.js`
4. **Journal Feature**: The `InvestmentJournal` component is imported but not currently rendered in the layout
5. **Persistence**: No data persistence between page refreshes (state is lost)

---

## Future Enhancements

- [ ] Integration with real market data APIs
- [ ] Backend persistence (database integration)
- [ ] Real portfolio calculations based on historical data
- [ ] Add the Investment Journal component to the layout
- [ ] User authentication and multi-user support
- [ ] Portfolio alerts and notifications
- [ ] Export/reporting functionality

---

## Dependencies

### Imports
- `React`: `useState`, `useEffect`, `useMemo`
- `@/components/*`: All UI components
- `@/lib/mockData`: Initial portfolio data

### External Libraries Used
- React (via Next.js)
- Tailwind CSS (for styling)

---

## Related Files

- **Components:**
  - `components/TotalValue.jsx`
  - `components/PerformanceChart.jsx`
  - `components/AssetAllocation.jsx`
  - `components/HoldingsList.jsx`
  - `components/ConnectedAccounts.jsx`
  - `components/InvestmentJournal.jsx`

- **Data:**
  - `lib/mockData.js`

---

## Usage Example

```javascript
// The component is the default export for the root route
// Automatically rendered by Next.js at /

// Accessing the dashboard:
// Visit: http://localhost:3000/
```

---

**Last Updated:** December 13, 2025

# frontend Architecture

## App Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Root Layout (_layout.tsx)               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           ThemeProvider (Light/Dark Mode)            │   │
│  │                                                        │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │        ToastProvider (Notifications)             │ │   │
│  │  │                                                   │ │   │
│  │  │  ┌────────────────────────────────────────────┐ │ │   │
│  │  │  │    Stack Navigator (Route Handler)        │ │ │   │
│  │  │  │                                             │ │ │   │
│  │  │  │  ┌─────────────────────────────────────┐  │ │ │   │
│  │  │  │  │  Tab Navigator (_layout.tsx)        │  │ │ │   │
│  │  │  │  │                                      │  │ │ │   │
│  │  │  │  │  ┌──────────────────────────────┐  │  │ │ │   │
│  │  │  │  │  │  Kitchen Tab                 │  │  │ │ │   │
│  │  │  │  │  │ ├─ Orders List               │  │  │ │ │   │
│  │  │  │  │  │ ├─ Timers                    │  │  │ │ │   │
│  │  │  │  │  │ ├─ Filters                   │  │  │ │ │   │
│  │  │  │  │  │ └─ Actions                   │  │  │ │ │   │
│  │  │  │  │  └──────────────────────────────┘  │  │ │ │   │
│  │  │  │  │                                      │  │ │ │   │
│  │  │  │  │  ┌──────────────────────────────┐  │  │ │ │   │
│  │  │  │  │  │  Manager Tab                 │  │  │ │ │   │
│  │  │  │  │  │ ├─ KPI Cards                 │  │  │ │ │   │
│  │  │  │  │  │ ├─ Sales Chart               │  │  │ │ │   │
│  │  │  │  │  │ ├─ Category Breakdown        │  │  │ │ │   │
│  │  │  │  │  │ └─ Staff Table               │  │  │ │ │   │
│  │  │  │  │  └──────────────────────────────┘  │  │ │ │   │
│  │  │  │  │                                      │  │ │ │   │
│  │  │  │  │  ┌──────────────────────────────┐  │  │ │ │   │
│  │  │  │  │  │  Home Tab                    │  │  │ │ │   │
│  │  │  │  │  └──────────────────────────────┘  │  │ │ │   │
│  │  │  │  │                                      │  │ │ │   │
│  │  │  │  │  ┌──────────────────────────────┐  │  │ │ │   │
│  │  │  │  │  │  About Tab (Explore)         │  │  │ │ │   │
│  │  │  │  │  └──────────────────────────────┘  │  │ │ │   │
│  │  │  │  │                                      │  │ │ │   │
│  │  │  │  └─ Bottom Tab Bar (Navigation)    │  │ │ │   │
│  │  │  │      ├─ Kitchen Icon                   │  │ │ │   │
│  │  │  │      ├─ Manager Icon                   │  │ │ │   │
│  │  │  │      ├─ Home Icon                      │  │ │ │   │
│  │  │  │      └─ About Icon                     │  │ │ │   │
│  │  │  │                                         │  │ │ │   │
│  │  │  └────────────────────────────────────────┘  │ │ │   │
│  │  └─────────────────────────────────────────────┘ │ │   │
│  └──────────────────────────────────────────────────┘ │   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────────────┐
│   Mock Data Layer    │
│ (mockData.ts)        │
│                      │
│ ├─ Orders[]          │
│ ├─ Staff[]           │
│ ├─ WeeklySales[]     │
│ └─ CategoryBreakdown │
└──────────┬───────────┘
           │
           │ Import & Display
           │
      ┌────┴─────┬──────────┐
      │           │          │
      ▼           ▼          ▼
┌─────────────┐  ┌──────────────┐
│Kitchen Tab  │  │ Manager Tab  │
│             │  │              │
│ useState    │  │  useState    │
│ useToast    │  │  (computed)  │
│ useEffect   │  │  useEffect   │
│ useCallback │  │              │
└──────┬──────┘  └──────┬───────┘
       │                │
       │ Event Handler  │
       │                │
       ▼                ▼
  [State Update]  [Computed Values]
       │                │
       │                │
       ▼                ▼
   [Re-render]     [Re-render]
       │                │
       └────────┬───────┘
                │
                ▼
         [UI Update]
           ├─ Orders
           ├─ Charts
           └─ Tables
```

## Component Hierarchy

```
RootLayout
  ├── ThemeProvider
  │   └── ToastProvider
  │       └── Stack.Navigator
  │           └── TabNavigator
  │               ├── Kitchen Screen
  │               │   ├── Header
  │               │   ├── FilterTabs
  │               │   └── ScrollView
  │               │       └── OrderCard[]
  │               │           ├── CardHeader
  │               │           ├── ProgressBar
  │               │           ├── ItemsList
  │               │           │   └── ItemCheckbox[]
  │               │           └── Footer
  │               │               └── ActionButtons[]
  │               │
  │               ├── Manager Screen
  │               │   ├── Header
  │               │   ├── ScrollView
  │               │   │   ├── KPIGrid
  │               │   │   │   └── MetricCard[]
  │               │   │   ├── ChartsSection
  │               │   │   │   ├── SalesChart
  │               │   │   │   └── CategoryChart
  │               │   │   └── StaffSection
  │               │   │       └── StaffTable
  │               │   │           └── StaffRow[]
  │               │   │               └── StatusBadge
  │               │
  │               ├── Home Screen
  │               │   └── Welcome Message
  │               │
  │               └── About Screen
  │                   └── Version Info
```

## Data Model Relationships

```
┌──────────────────────────────────────┐
│           Order Model                │
├──────────────────────────────────────┤
│ id: string                           │
│ tableNumber: number                  │
│ timestamp: number                    │
│ items: OrderItem[] ─────────┐        │
│ status: enum                │        │
│ totalPrice: number          │        │
│ serverName: string          │        │
└──────────────────────────────┼───────┘
                              │
                              ▼
                    ┌──────────────────────────┐
                    │    OrderItem Model       │
                    ├──────────────────────────┤
                    │ id: string               │
                    │ name: string             │
                    │ quantity: number         │
                    │ notes?: string           │
                    │ completed: boolean       │
                    └──────────────────────────┘

┌──────────────────────────────────────┐
│       StaffMember Model              │
├──────────────────────────────────────┤
│ id: string                           │
│ name: string                         │
│ role: string                         │
│ status: enum                         │
│ tablesAssigned: number[]             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│        DailySales Model              │
├──────────────────────────────────────┤
│ day: string                          │
│ sales: number                        │
│ orders: number                       │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    CategoryBreakdown Model           │
├──────────────────────────────────────┤
│ name: string                         │
│ value: number                        │
│ color: string                        │
└──────────────────────────────────────┘
```

## State Management Flow

### Kitchen Screen

```
┌─────────────────────────────────────┐
│ Component State                     │
├─────────────────────────────────────┤
│                                     │
│ orders: Order[]                     │
│    ↓                                │
│    └─→ User clicks item             │
│         └─→ onToggleItem()          │
│              └─→ setState()         │
│                   └─→ Re-render    │
│                                     │
│ filter: FilterTab                   │
│    ↓                                │
│    └─→ User clicks tab              │
│         └─→ setFilter()             │
│              └─→ Re-render         │
│                                     │
│ elapsed: number (per card)          │
│    ↓                                │
│    └─→ useEffect → setInterval()    │
│         └─→ Every 10s update        │
│              └─→ Re-render         │
│                                     │
└─────────────────────────────────────┘
```

### Manager Screen

```
┌─────────────────────────────────────┐
│ Computed State                      │
├─────────────────────────────────────┤
│                                     │
│ totalSales = mockOrders.reduce()    │
│ totalOrders = mockOrders.length     │
│ mostPopular = itemCounts            │
│ avgPrep = activeOrders.reduce()     │
│                                     │
│ (No user state - display only)      │
│                                     │
└─────────────────────────────────────┘
```

## Styling Architecture

```
┌─────────────────────────────────────────┐
│    React Native StyleSheet              │
├─────────────────────────────────────────┤
│                                         │
│ const styles = StyleSheet.create({      │
│   container: {                          │
│     flex: 1,                            │
│     backgroundColor: "#f8f8f8",         │
│     paddingTop: 16,                     │
│   },                                    │
│   // ... more styles                    │
│ });                                     │
│                                         │
│ Applied via: style={styles.container}   │
│                                         │
└─────────────────────────────────────────┘

Color System:
├─ Primary: #3b82f6 (Blue)
├─ Success: #22c55e (Green)
├─ Warning: #eab308 (Yellow)
├─ Danger: #ef4444 (Red)
├─ Background: #f8f8f8
├─ Card: #ffffff
├─ Border: #e5e7eb
└─ Text: #000000 / #ffffff (Dark mode)
```

## Event Handling Flow

```
User Action
    │
    ▼
┌─────────────────────┐
│ TouchableOpacity    │
│ onPress={() => fn}  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Handler Function    │
│ (useCallback)       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ State Update        │
│ setOrders() / ...   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Toast Notification  │
│ toast.show()        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Component Re-render │
│ (with new state)    │
└─────────┬───────────┘
          │
          ▼
     [UI Updated]
```

## File Dependencies

```
app/_layout.tsx
├── app/(tabs)/_layout.tsx
│   ├── app/(tabs)/kitchen.tsx
│   │   └── src/data/mockData.ts
│   │       └── src/lib/utils.ts
│   ├── app/(tabs)/manager.tsx
│   │   └── src/data/mockData.ts
│   ├── app/(tabs)/index.tsx
│   │   └── hooks/use-color-scheme.ts
│   └── app/(tabs)/explore.tsx
│       └── hooks/use-color-scheme.ts
├── hooks/use-color-scheme.ts
├── constants/theme.ts
└── External Dependencies
    ├── lucide-react-native
    ├── react-native-toast-notifications
    ├── @react-navigation/*
    └── expo-router
```

---

This architecture maintains a clean separation of concerns with:

- **Presentational components** (Views, Text, Buttons)
- **Container components** (Kitchen/Manager screens)
- **Data layer** (mockData.ts)
- **Utilities** (lib/utils.ts)
- **Navigation** (Expo Router + React Navigation)
- **Theme & Colors** (constants/theme.ts)

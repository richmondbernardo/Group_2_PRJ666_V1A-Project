export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  completed: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  timestamp: number;
  items: OrderItem[];
  status: "pending" | "in-progress" | "ready" | "completed";
  totalPrice: number;
  serverName: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "active" | "on-break" | "off-duty";
  tablesAssigned: number[];
}

export interface DailySales {
  day: string;
  sales: number;
  orders: number;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  color: string;
}

// Orders mock data
const now = Date.now();

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    tableNumber: 4,
    timestamp: now - 3 * 60 * 1000,
    items: [
      { id: "i1", name: "Grilled Salmon", quantity: 1, completed: false },
      { id: "i2", name: "Caesar Salad", quantity: 2, completed: true },
      { id: "i3", name: "Garlic Bread", quantity: 1, completed: true },
    ],
    status: "in-progress",
    totalPrice: 54.5,
    serverName: "Maria S.",
  },
  {
    id: "ORD-002",
    tableNumber: 7,
    timestamp: now - 8 * 60 * 1000,
    items: [
      { id: "i4", name: "Wagyu Burger", quantity: 2, completed: false },
      { id: "i5", name: "Truffle Fries", quantity: 2, completed: false },
      { id: "i6", name: "Craft IPA", quantity: 2, completed: true },
    ],
    status: "in-progress",
    totalPrice: 78.0,
    serverName: "James T.",
  },
  {
    id: "ORD-003",
    tableNumber: 12,
    timestamp: now - 16 * 60 * 1000,
    items: [
      { id: "i7", name: "Lobster Risotto", quantity: 1, completed: false },
      { id: "i8", name: "Mushroom Soup", quantity: 1, completed: false },
      { id: "i9", name: "Red Wine", quantity: 2, completed: true },
    ],
    status: "pending",
    totalPrice: 92.0,
    serverName: "Sarah K.",
  },
  {
    id: "ORD-004",
    tableNumber: 2,
    timestamp: now - 1 * 60 * 1000,
    items: [
      { id: "i10", name: "Margherita Pizza", quantity: 1, completed: false },
      { id: "i11", name: "Sparkling Water", quantity: 2, completed: false },
    ],
    status: "pending",
    totalPrice: 28.5,
    serverName: "Maria S.",
  },
  {
    id: "ORD-005",
    tableNumber: 9,
    timestamp: now - 22 * 60 * 1000,
    items: [
      { id: "i12", name: "Filet Mignon", quantity: 2, completed: true },
      { id: "i13", name: "Mashed Potatoes", quantity: 2, completed: true },
      { id: "i14", name: "Tiramisu", quantity: 2, completed: true },
    ],
    status: "completed",
    totalPrice: 145.0,
    serverName: "James T.",
  },
  {
    id: "ORD-006",
    tableNumber: 5,
    timestamp: now - 6 * 60 * 1000,
    items: [
      { id: "i15", name: "Pasta Carbonara", quantity: 1, completed: false },
      { id: "i16", name: "Bruschetta", quantity: 1, completed: true },
      { id: "i17", name: "Espresso", quantity: 2, completed: true },
    ],
    status: "in-progress",
    totalPrice: 42.0,
    serverName: "Sarah K.",
  },
  {
    id: "ORD-007",
    tableNumber: 11,
    timestamp: now - 12 * 60 * 1000,
    items: [
      { id: "i18", name: "Seafood Platter", quantity: 1, completed: false },
      { id: "i19", name: "House Salad", quantity: 2, completed: false },
      { id: "i20", name: "White Wine", quantity: 1, completed: true },
    ],
    status: "pending",
    totalPrice: 86.0,
    serverName: "Maria S.",
  },
  {
    id: "ORD-008",
    tableNumber: 3,
    timestamp: now - 25 * 60 * 1000,
    items: [
      { id: "i21", name: "Chicken Wings", quantity: 2, completed: true },
      { id: "i22", name: "Loaded Nachos", quantity: 1, completed: true },
      { id: "i23", name: "Draft Beer", quantity: 3, completed: true },
    ],
    status: "completed",
    totalPrice: 55.0,
    serverName: "James T.",
  },
];

export const mockStaff: StaffMember[] = [
  { id: "s1", name: "Maria Santos", role: "Server", status: "active", tablesAssigned: [2, 4, 11] },
  { id: "s2", name: "James Turner", role: "Server", status: "active", tablesAssigned: [5, 7, 9] },
  { id: "s3", name: "Sarah Kim", role: "Server", status: "active", tablesAssigned: [3, 6, 12] },
  { id: "s4", name: "Chef Marco", role: "Head Chef", status: "active", tablesAssigned: [] },
  { id: "s5", name: "Lisa Chen", role: "Sous Chef", status: "active", tablesAssigned: [] },
  { id: "s6", name: "David Brown", role: "Bartender", status: "on-break", tablesAssigned: [] },
];

export const mockWeeklySales: DailySales[] = [
  { day: "Mon", sales: 2450, orders: 68 },
  { day: "Tue", sales: 1890, orders: 52 },
  { day: "Wed", sales: 3200, orders: 87 },
  { day: "Thu", sales: 2780, orders: 74 },
  { day: "Fri", sales: 4100, orders: 112 },
  { day: "Sat", sales: 4850, orders: 134 },
  { day: "Sun", sales: 3600, orders: 98 },
];

export const mockCategoryBreakdown: CategoryBreakdown[] = [
  { name: "Main Course", value: 42, color: "hsl(25, 95%, 53%)" },
  { name: "Appetizers", value: 18, color: "hsl(173, 58%, 39%)" },
  { name: "Drinks", value: 25, color: "hsl(220, 70%, 50%)" },
  { name: "Desserts", value: 15, color: "hsl(280, 65%, 60%)" },
];

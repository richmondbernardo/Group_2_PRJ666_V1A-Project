export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: "appetizers" | "mains" | "drinks" | "desserts";
  image: string;
  customizations?: {
    label: string;
    options: (string | { name: string; price: number })[];
    multiSelect?: boolean;
  }[];
}

export const menuData: MenuItem[] = [
  // Appetizers
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    description: "Crispy Vietnamese spring rolls served with dipping sauce",
    price: 8.99,
    calories: 250,
    category: "appetizers",
    image:
      "https://images.unsplash.com/photo-1768701544400-dfa8ca509d10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xscyUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NzI1MTYyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Dipping Sauce",
        options: ["Sweet Chili", "Soy Sauce", "Peanut Sauce"],
      },
    ],
  },
  {
    id: "bruschetta",
    name: "Bruschetta",
    description: "Toasted bread topped with fresh tomatoes, garlic, and basil",
    price: 9.99,
    calories: 180,
    category: "appetizers",
    image:
      "https://images.unsplash.com/photo-1536739782508-c2388552aad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzY2hldHRhJTIwYXBwZXRpemVyfGVufDF8fHx8MTc3MjUxMjczMHww&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Add Extra",
        options: [
          { name: "Extra Garlic", price: 0.5 },
          { name: "Balsamic Glaze", price: 1.5 },
          { name: "Parmesan", price: 2.0 },
        ],
        multiSelect: true,
      },
    ],
  },
  {
    id: "buffalo-wings",
    name: "Buffalo Wings",
    description: "Spicy chicken wings served with celery and blue cheese",
    price: 12.99,
    calories: 520,
    category: "appetizers",
    image:
      "https://images.unsplash.com/photo-1571162437205-8889ff2fee26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWZmYWxvJTIwd2luZ3MlMjBwbGF0ZXxlbnwxfHx8fDE3NzI2MDQ2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Heat Level",
        options: ["Mild", "Medium", "Hot", "Extra Hot"],
      },
    ],
  },
  {
    id: "calamari",
    name: "Calamari",
    description: "Lightly breaded calamari rings with marinara sauce",
    price: 11.99,
    calories: 310,
    category: "appetizers",
    image:
      "https://images.unsplash.com/photo-1682264895449-f75b342cbab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNhbGFtYXJpfGVufDF8fHx8MTc3MjYwNDY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  // Mains
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon grilled to perfection with seasonal vegetables",
    price: 24.99,
    calories: 450,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1580959375944-abd7e991f971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwZGlubmVyfGVufDF8fHx8MTc3MjU5Mzk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Cooking Preference",
        options: ["Medium", "Well Done"],
      },
      {
        label: "Side Dish",
        options: [
          "Roasted Vegetables",
          "Mashed Potatoes",
          "Rice Pilaf",
          "Salad",
        ],
      },
    ],
  },
  {
    id: "ribeye-steak",
    name: "Ribeye Steak",
    description: "Premium 12oz ribeye steak with herb butter",
    price: 32.99,
    calories: 780,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1619719015339-133a130520f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWJleWUlMjBzdGVhayUyMHBsYXRlfGVufDF8fHx8MTc3MjYwNDY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Temperature",
        options: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
      },
      {
        label: "Add Extra",
        options: [
          { name: "Mushrooms", price: 3.0 },
          { name: "Onions", price: 2.0 },
          { name: "Blue Cheese", price: 3.5 },
        ],
        multiSelect: true,
      },
    ],
  },
  {
    id: "chicken-parmesan",
    name: "Chicken Parmesan",
    description:
      "Breaded chicken breast with marinara sauce and melted mozzarella",
    price: 19.99,
    calories: 650,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1544378730-8b5104b18790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGFybWVzYW4lMjBwYXN0YXxlbnwxfHx8fDE3NzI2MDQ2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Pasta Type",
        options: ["Spaghetti", "Penne", "Fettuccine"],
      },
    ],
  },
  {
    id: "vegetable-stir-fry",
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables wok-tossed in a savory sauce",
    price: 16.99,
    calories: 380,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc3MjU1NDAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Add Protein",
        options: [
          "None",
          { name: "Tofu", price: 3.0 },
          { name: "Chicken", price: 4.5 },
          { name: "Shrimp", price: 5.5 },
        ],
      },
      {
        label: "Spice Level",
        options: ["Mild", "Medium", "Spicy"],
      },
    ],
  },
  // Drinks
  {
    id: "fresh-lemonade",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with mint",
    price: 4.99,
    calories: 120,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1586161714062-3e0d1815f4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxlbW9uYWRlJTIwZ2xhc3N8ZW58MXx8fHwxNzcyNjA0NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Sweetness",
        options: ["Regular", "Less Sweet", "Extra Sweet"],
      },
    ],
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice",
    price: 5.49,
    calories: 80,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNjA0NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Add",
        options: ["None", "Milk", "Cream", "Sugar", "Vanilla Syrup"],
        multiSelect: true,
      },
    ],
  },
  {
    id: "berry-smoothie",
    name: "Berry Smoothie",
    description: "Mixed berries blended with yogurt and honey",
    price: 6.99,
    calories: 210,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1766232584434-caccfb0fcf14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJyeSUyMHNtb290aGllJTIwZ2xhc3N8ZW58MXx8fHwxNzcyNjA0NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Add Boost",
        options: ["None", "Protein Powder", "Chia Seeds", "Spinach"],
      },
    ],
  },
  {
    id: "craft-beer",
    name: "Craft Beer",
    description: "Rotating selection of local craft beers",
    price: 7.99,
    calories: 180,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1643307282439-08cb542c6edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBnbGFzc3xlbnwxfHx8fDE3NzI2MDM3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  // Desserts
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 8.99,
    calories: 540,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBsYXZhJTIwY2FrZXxlbnwxfHx8fDE3NzI1NDUyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Add Extra",
        options: [
          "None",
          { name: "Whipped Cream", price: 1.0 },
          { name: "Caramel Sauce", price: 1.5 },
          { name: "Extra Ice Cream", price: 2.5 },
        ],
      },
    ],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description:
      "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
    price: 7.99,
    calories: 450,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzcyNTA4Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "new-york-cheesecake",
    name: "New York Cheesecake",
    description: "Rich and creamy cheesecake on graham cracker crust",
    price: 8.49,
    calories: 480,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1611497438246-dcbb383de3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2hlZXNlY2FrZXxlbnwxfHx8fDE3NzI2MDQ2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Topping",
        options: ["Strawberry", "Blueberry", "Chocolate", "Caramel"],
      },
    ],
  },
  {
    id: "ice-cream-sundae",
    name: "Ice Cream Sundae",
    description: "Three scoops of ice cream with toppings and whipped cream",
    price: 6.99,
    calories: 620,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHN1bmRhZXxlbnwxfHx8fDE3NzI1Mjk3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customizations: [
      {
        label: "Flavors",
        options: ["Vanilla", "Chocolate", "Strawberry"],
        multiSelect: true,
      },
    ],
  },
];


import { Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    imageUrl: "https://picsum.photos/seed/pizzapalace/600/400",
    menu: [
      { name: "Margherita Pizza", price: 12.99, description: "Classic cheese and tomato pizza." },
      { name: "Pepperoni Pizza", price: 14.99, description: "Pizza with pepperoni slices." },
      { name: "Garlic Bread", price: 5.99, description: "Toasted bread with garlic butter." },
      { name: "Coke", price: 2.50, description: "Classic Coca-Cola." },
    ]
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.2,
    imageUrl: "https://picsum.photos/seed/burgerbarn/600/400",
    menu: [
      { name: "Classic Burger", price: 9.99, description: "Beef patty with lettuce, tomato, and cheese." },
      { name: "Bacon Cheeseburger", price: 11.99, description: "Classic burger with added bacon." },
      { name: "Fries", price: 3.99, description: "Crispy golden fries." },
      { name: "Milkshake", price: 6.50, description: "Vanilla, chocolate, or strawberry." },
    ]
  },
  {
    id: 3,
    name: "Sushi Spot",
    cuisine: "Japanese",
    rating: 4.8,
    imageUrl: "https://picsum.photos/seed/sushispot/600/400",
    menu: [
      { name: "California Roll", price: 8.99, description: "Crab, avocado, and cucumber." },
      { name: "Spicy Tuna Roll", price: 10.99, description: "Tuna with spicy mayo." },
      { name: "Miso Soup", price: 3.50, description: "Traditional Japanese soup." },
      { name: "Edamame", price: 4.99, description: "Steamed soybeans." },
    ]
  },
    {
    id: 4,
    name: "Taco Town",
    cuisine: "Mexican",
    rating: 4.6,
    imageUrl: "https://picsum.photos/seed/tacotown/600/400",
    menu: [
      { name: "Carne Asada Taco", price: 3.50, description: "Grilled steak taco." },
      { name: "Al Pastor Taco", price: 3.50, description: "Marinated pork taco." },
      { name: "Chips and Guac", price: 7.99, description: "Freshly made guacamole with tortilla chips." },
      { name: "Horchata", price: 3.00, description: "Sweet rice milk drink." },
    ]
  }
];

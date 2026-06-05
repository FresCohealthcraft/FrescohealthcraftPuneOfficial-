import { MenuItem, PromoCoupon } from "./types";

export const MENU_CATEGORIES = [
   "All",
  "Fruit Juices",
  "Green Vitality Juice",
  "Protein Power Fruit Cup",
  "Super Food Sprouts Bowl",
  "Fresco Power Juices",
  "Shakes",
  "Specials"
];

export const MENU_ITEMS: MenuItem[] = [
 // Fruit Juices

   {
    id: "Watermelon-Juice",
    name: "Watermelon Juice",
    description: "Composed of about 92% water, it is a highly effective way to maintain daily hydration levels and replenish fluids.",
    price: 60,
    icon: "🍉",
    category: "Fruit Juices",
    
  },

  {
    id: "Mosambi-Juice",
    name: "Mosambi Juice",
    description: "Rich in Vitamin C, it strengthens your natural defenses, helping your body fight off common infections like colds and the flu.",
    price: 70,
    icon: "🍊",
    category: "Fruit juices",
   
  },

{
    id: "Pineapple-Juice",
    name: "Pineapple Juice",
    description: "High concentrations of Vitamin C and antioxidants help neutralize free radicals and protect the body against infections.",
    price: 70,
    icon: "🍍",
    category: "Fruit juices",
    
  },

  {
    id: "Mango-Juice",
    name: "Mango Juice",
    description: "Rich in Vitamin C and over 25 different types of carotenoids, it actively helps protect the body from infections and strengthens immune function.",
    price: 80,
    icon: "🥭",
    category: "Fruit juices",
  
  },

  {
    id: "Apple-Juice",
    name: "Apple Juice",
    description: "provides quick hydration and delivers essential nutrients like Vitamin C and beneficial plant compounds (polyphenols).",
    price: 80,
    icon: " 🍎",
    category: "Fruit juices",
   
  },

  {
    id: "Orange-Juice",
    name: "Orange Juice",
    description: "Rich in Vitamin C, it enhances white blood cell production, helping your body ward off infections and recover from colds more effectively.",
    price: 80,
    icon: "🍊",
    category: "Fruit juices",
    
  },
  {
    id: "Ganga-Juice",
    name: "Ganga Jamuna Juice",
    description: "Mosambi+ Pineapple Both fruits are packed with Vitamin C, which strengthens your immune system and helps your body fight off infections..",
    price: 80,
    icon: "🍇",
    category: "Fruit juices",
    
  },
  {
    id: "Pomegranate-Juice",
    name: "Pomegranate Juice",
    description: "promoting heart health, reducing inflammation, and offering excellent antioxidant protection to combat oxidative stress.",
    price: 140,
    icon: "石榴",
    category: "Fruit juices",
    
  },
  {
    id: "Nimbu-Pani-Juice",
    name: "Nimbu Pani Juice",
    description: "promotes hydration, provides a natural dose of Vitamin C, and aids in digestion.",
    price: 40,
    icon: "🍋",
    category: "Fruit juices",
   
  },

  // Green Vitality Juice
 {
    id: "Tomato-Juice",
    name: "Tomato Juice",
    description: "Boost heart health, reduce oxidative stress, and support your immune system and skin",
    price: 59,
    icon: "🍅",
    category: "Green Vitality Juice",
    
  },
  {
    id: "Cucumber-Juice",
    name: "Cucumber Juice",
    description: "Supports glowing skin, regulates blood pressure, and aids digestion by reducing bloating and preventing constipation",
    price:50,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },
  {
    id: "Lauki-Juice",
    name: "Lauki Juice",
    description: "Being virtually fat-free and low in calories, it keeps you full while providing essential fiber, making it an excellent addition to calorie-restricted diets",
    price: 59,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },
  {
    id: "Palak-Juice",
    name: "Palak Juice",
    description: "High in nitrates, palak juice improves blood circulation and helps lower blood pressure. The fiber and potassium also help manage bad cholesterol.",
    price: 59,

    icon: "🥬",
    category: "Green Vitality Juice",
    
  },

  {
    id: "Karela-Juice",
    name: "Karela Juice",
    description: "regulate blood sugar, aid weight loss, and detoxify the liver. It is rich in vitamins A and C, and contains active compounds that mimic insulin to promote overall metabolic health",
    price: 69,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

  {
    id: "Beetroot-Juice",
    name: "Beetroot Juice",
    description: "Lower blood pressure, boost athletic stamina, and support overall cardiovascular and liver health",
    price: 69,
    icon: " Beetroot",
    category: "Green Vitality Juice",
  
  },

  {
    id: "Carrot-Juice",
    name: "Carrot Juice",
    description: "Promotes radiant skin, boosts immune function, supports eye health, and provides powerful antioxidants that reduce cellular damage",
    price: 60,
    icon: " 🍐",
    category: "Green Vitality Juice",
   
  },

   {
    id: "Ash-Gourd-Juice",
    name: "Ash Gourd Juice",
    description: "Aids digestion, supports weight loss, and flushes out toxins",
    price: 60,
    icon: "🍈",
    category: "Green Vitality Juice",
    
  },

  // Protein Power Fruit Cup

{
  id: "Protein-Power-Cup",
  name: "Protein Power Cup",
  description: "High-protein healthy cup packed with nutrition to support energy, muscle recovery, and overall wellness.",
  price: 119,
  icon: "🥤",
  category: "Protein Power Fruit Cup",

},

  {
  id: "Classic-Delight-Cup",
  name: "Classic Delight Cup",
  description: "Mix of 8–9 fresh seasonal fruits.",
  price: 79,
  icon: "🥤",
  category: "Protein Power Fruit Cup",
 
},
{
  id: "Exotic-Delight-Cup",
  name: "Exotic Delight Cup",
  description:
    "Luxury mix of 13–14 premium exotic fruits, freshly cut and beautifully curated for a rich, refreshing, and healthy experience.",
  price: 99,
  icon: "🥤",
  category: "Protein Power Fruit Cup",
 
},


  // Super Food Sprouts Bowl
 {
  id: "Sprouts-Bowl",
  name: "Sprouts Bowl",
  description: "Supports weight management, helps lower cholesterol, boosts immunity, and promotes better gut health.",
  price: 79,
  icon: "🥬",
  category: "Super Food Sprouts Bowl",

},
  {
  id: "Paneer-Sprouts-Bowl",
  name: "Paneer Sprouts Bowl",
  description: "Protein-rich paneer with healthy sprouts to support immunity, energy, and overall wellness.",
  price: 99,
  icon: "🥬",
  category: "Super Food Sprouts Bowl",

},
  

  
// Fresco Power Juices
{
  id: "ABC-Drink",
  name: "ABC Drink",
  description: "Apple, beetroot, and carrot juice packed with essential vitamins and antioxidants.",
  price: 99,
  icon: "🍎",
  category: "Fresco Power Juices",
 
},

{
  id: "Immunity-Booster",
  name: "Immunity Booster",
  description: "Orange, pineapple, and ginger juice to naturally strengthen immunity and energy.",
  price: 99,
  icon: "🍊",
  category: "Fresco Power Juices",
 
},

{
  id: "Super-Women",
  name: "Super Women",
  description: "Orange, amla, and pomegranate juice rich in antioxidants and iron support.",
  price: 99,
  icon: "石榴",
  category: "Fresco Power Juices",
},

{
  id: "Vital-Energy-Drink",
  name: "Vital Energy Drink",
  description: "Refreshing coconut water with lemon and honey for natural hydration and energy.",
  price: 99,
  icon: "🥥",
  category: "Fresco Power Juices",
  
},

{
  id: "Stress-Relief",
  name: "Stress Relief",
  description: "Pomegranate and beet blend to refresh the body and help reduce fatigue.",
  price: 99,
  icon: "石榴",
  category: "Fresco Power Juices",
},

{
  id: "Iron-Rich",
  name: "Iron Rich",
  description: "Cucumber, apple, and spinach juice loaded with iron and essential nutrients.",
  price: 99,
  icon: "🥒",
  category: "Fresco Power Juices",
},

{
  id: "Skin-Glow-up",
  name: "Skin Glow-up",
  description: "Carrot, orange, and apple juice for naturally glowing and healthy skin.",
  price: 89,
  icon: " 🍐",
  category: "Fresco Power Juices",
 
},

{
  id: "Liver-Cleanser",
  name: "Liver Cleanser",
  description: "Aloe vera, cucumber, and amla juice for refreshing detox and cleansing support.",
  price: 89,
  icon: " 🍐",
  category: "Fresco Power Juices",
},

{
  id: "Heart-Care",
  name: "Heart Care",
  description: "Beetroot, carrot, and tomato juice rich in heart-friendly nutrients.",
  price: 89,
  icon: " 🍅",
  category: "Fresco Power Juices",
},

{
  id: "Fat-Burner",
  name: "Fat Burner",
  description: "Lauki, spinach, and ginger juice crafted to support healthy metabolism.",
  price: 79,
  icon: "🥒",
  category: "Fresco Power Juices",

},

{
  id: "Detox-Body",
  name: "Detox Body",
  description: "Cucumber, mint, and amla juice for refreshing hydration and detox support.",
  price: 79,
  icon: "🥒",
  category: "Fresco Power Juices",
 
},

{
  id: "Gut-Reset",
  name: "Gut Reset",
  description: "Lauki, tomato, and ginger juice to support digestion and gut wellness.",
  price: 79,
  icon: "🥒",
  category: "Fresco Power Juices",
},

{
  id: "Clear-Vision",
  name: "Clear Vision",
  description: "Carrot, tomato, and ginger juice rich in nutrients that support eye health.",
  price: 79,
  icon: " 🍐",
  category: "Fresco Power Juices",
},

{
  id: "Make-Your-Own-(Any-5)",
  name: "Make Your Own (Any 5)",
  description: "Create your own custom power juice blend with any 5 fresh ingredients.",
  price: 111,
  icon: " 🍐",
  category: "Fresco Power Juices",
 
},

// Shakes

{
  id: "Banana-Shake",
  name: "Banana Shake",
  description: "Creamy banana shake packed with natural energy and rich flavor.",
  price: 119,
  icon: "🍌",
  category: "Shakes",
  
},

{
  id: "Apple-Shake",
  name: "Apple Shake",
  description: "Refreshing apple shake blended for a smooth and naturally sweet taste.",
  price: 129,
  icon: "🍎",
  category: "Shakes",

},

{
  id: "Muskmelon-Shake",
  name: "Muskmelon Shake",
  description: "Cool and refreshing muskmelon shake perfect for summer hydration.",
  price: 149,
  icon: "🍈",
  category: "Shakes",
 

},

{
  id: "Mango-Shake",
  name: "Mango Shake",
  description: "Rich and creamy mango shake made with fresh juicy mangoes.",
  price: 179,
  icon: "🥭",
  category: "Shakes",

},

{
  id: "Energy-Boost-Shake",
  name: "Energy Boost Shake",
  description: "Nutritious power-packed shake crafted to keep you energized and refreshed.",
  price: 139,
  icon: "🥤",
  category: "Shakes",
  
},


// Specials

{
  id: "Coconut-Caramel",
  name: "Coconut Caramel",
  description: "Toasted coconut flakes with rich creamy caramel delight.",
  price: 69,
  icon: "🥥",
  category: "Specials",
  
},

{
  id: "White-Sprinkle",
  name: "White Sprinkle",
  description: "Classic crunchy treat topped with smooth milky drizzle.",
  price: 79,
  icon: "🍦",
  category: "Specials",
 
},

{
  id: "Peanut-Caramel",
  name: "Peanut Caramel",
  description: "Roasted peanuts blended with delicious golden caramel flavor.",
  price: 89,
  icon: "🥜",
  category: "Specials",
 
},

{
  id: "Oreo-White",
  name: "Oreo White",
  description: "Crunchy Oreo cookies topped with creamy white chocolate drizzle.",
  price: 99,
  icon: "🍦",
  category: "Specials",

},

{
  id: "Biscoff-Crunch",
  name: "Biscoff Crunch",
  description: "Loaded with Biscoff crumbles and rich Biscoff drizzle.",
  price: 119,
  icon: "🍦",
  category: "Specials",

},

{
  id: "Dubai-Kunafa-Pistachio",
  name: "Dubai Kunafa Pistachio",
  description: "Crunchy kunafa layered with rich pistachio flavor and drizzle.",
  price: 149,
  icon: "🍦",
  category: "Specials",
 
},

{
  id: "Apple-Chocofrost",
  name: "Apple Chocofrost Candy",
  description: "Frozen apple treat coated with rich and creamy chocolate flavor.",
  price: 49,
  icon: "🍦",
  category: "Specials",
},

{
  id: "Grapes-Chocofrost",
  name: "Grapes Chocofrost Candy",
  description: "Frozen grapes coated with smooth chocolate for a refreshing bite.",
  price: 39,
  icon: "🍦",
  category: "Specials",
 
},

{
  id: "Mango-Chocofrost",
  name: "Mango Chocofrost Candy",
  description: "Frozen mango delight blended with rich chocolate goodness.",
  price: 49,
  icon: "🍦",
  category: "Specials",
},

];

export const PROMO_COUPONS: PromoCoupon[] = [
   {
    id: "promo_combo",
    code: "COMBO20",
    label: "Protein Energy Combo",
    discountPercentage: 10,
    description: "Buy Protein Power Cup + Any Fruit Juice 10% OFF on your overall order cart total.",
    tag: "10% OFF"
  },
  {
    id: "promo_happy",
    code: "HAPPY15",
    label: "Happy Hours",
    discountPercentage: 10,
    description: "Order fresh between 7 PM - 9 PM to enjoy wonderful discount savings.",
    tag: "15% OFF"
  },
  {
    id: "promo_welcome",
    code: "WELCOME25",
    label: "First Order Special",
    discountPercentage: 10,
    description: "New customer wellness boost? Get an impressive 10% OFF on your very first order.",
    tag: "10% OFF"
  },
  {
    id: "promo_weekly",
    code: "WEEKLY30",
    label: "Weekly Subscription",
    discountPercentage: 10,
    description: "Subscribe for standard daily juice delivery (7 Days) and save huge 10% discount.",
    tag: "10% OFF"
  }
];


import { MenuItem, PromoCoupon } from "./types";
// @ts-ignore
import watermelonJuiceImg from "./assets/images/watermelon-juice.png";
// @ts-ignore
import MosambiJuiceImg from "./assets/images/Mosambi_Juice.png";
// @ts-ignore
import pineappleJuiceImg from "./assets/images/Pineapple-Juice.png";
// @ts-ignore
import MangoJuiceImg from "./assets/images/Mango-Juice.png";
// @ts-ignore
import AppleJuiceImg from "./assets/images/Apple-Juice.png";
// @ts-ignore
import OrangeJuiceImg from "./assets/images/Orange-Juice.png";
// @ts-ignore
import GangaJuiceImg from "./assets/images/Ganga-Juic.png";
// @ts-ignore
import PomegranateJuiceImg from "./assets/images/Pomegranate-Juice.png";
// @ts-ignore
import papayaJuiceImg from "./assets/images/papaya-Juice.png";
// @ts-ignore
import MuskmelonJuiceImg from "./assets/images/Muskmelon-Juice.png";
// @ts-ignore
import NimbuPaniJuiceImg from "./assets/images/Nimbu-Pani-Juice.png";
// @ts-ignore
import TomatoJuiceImg from "./assets/images/Tomato-Juice.png";
// @ts-ignore
import CucumberJuiceImg from "./assets/images/Cucumber-Juice.png";
// @ts-ignore
import LaukijuiceImg from "./assets/images/Lauki-Juice.png";
// @ts-ignore
import PalakJuiceImg from "./assets/images/Palak-Juice.png";
// @ts-ignore
import KarelaJuiceImg from "./assets/images/Karela-Juice.png";

// @ts-ignore
import BeetrootJuiceImg from "./assets/images/Beetroot-Juice.png";
// @ts-ignore
import CarrotJuiceImg from "./assets/images/Carrot-Juice.png";
// @ts-ignore
import AshGourdJuiceImg from "./assets/images/Ash-Gourd-Juice.png";
// @ts-ignore
import ProteinPowerCupImg from "./assets/images/Protein-Cup.png";
// @ts-ignore
import ClassicDelightCupImg from "./assets/images/Classic-Delight-Cup.png";


// @ts-ignore
import ExoticDelightCupImg from "./assets/images/Exotic-Delight-Cup.png";
// @ts-ignore
import SproutsBowlImg from "./assets/images/Sprouts-Bowl.png";
// @ts-ignore
import PaneerPowerBowlImg from "./assets/images/Paneer-Power-Bowl.png";
// @ts-ignore
import ABCDrinkImg from "./assets/images/ABC-Drink.png";
// @ts-ignore
import ImmunityBoosterImg from "./assets/images/Immunity-Booster.png";
// @ts-ignore
import SuperWomenImg from "./assets/images/Super-Women.png";
// @ts-ignore
import VitalEnergyDrinkImg from "./assets/images/Vital-Energy-Drink.png";
// @ts-ignore
import StressReliefImg from "./assets/images/Stress-Relief.png";
// @ts-ignore
import IronRichImg from "./assets/images/Iron-Rich.png";
// @ts-ignore
import SkinGlowupImg from "./assets/images/Skin-Glow-up.png";
// @ts-ignore
import LiverCleanserImg from "./assets/images/Liver-Cleanser.png";
// @ts-ignore
import HeartCareImg from "./assets/images/Heart-Care.png";
// @ts-ignore
import FatBurnerImg from "./assets/images/Fat-Burner.png";
// @ts-ignore
import DetoxBodyImg from "./assets/images/Detox-Body.png";
// @ts-ignore
import GutResetImg from "./assets/images/Gut-Reset.png";
// @ts-ignore
import ClearVisionImg from "./assets/images/Clear-Vision.png";
// @ts-ignore
import MakeYourOwnImg from "./assets/images/Make-Your-Own.png";
// @ts-ignore
import BananaShakeImg from "./assets/images/Banana-Shake.png";
// @ts-ignore
import AppleShakeImg from "./assets/images/Apple-Shake.png";
// @ts-ignore
import MuskmelonShakeImg from "./assets/images/Muskmelon-Shake.png";
// @ts-ignore
import MangoShakeImg from "./assets/images/Mango-Shake.png";
// @ts-ignore
import OreoshakeImg from "./assets/images/Oreo-Shake.png";
// @ts-ignore
import EnergyBoostShakeImg from "./assets/images/Energy-Boost-Shake.png";
// @ts-ignore
import CoconutCaramelImg from "./assets/images/Coconut-Caramel.png";
// @ts-ignore
import WhiteSprinkleImg from "./assets/images/White-Sprinkle.png";
// @ts-ignore
import PeanutCaramelImg from "./assets/images/Peanut-Caramel.png";
// @ts-ignore
import OreoWhiteImg from "./assets/images/Oreo-White.png";
// @ts-ignore
import BiscoffCrunchImg from "./assets/images/Biscoff-Crunch.png";
// @ts-ignore
import DubaiKunafaPistachioImg from "./assets/images/Dubai-Kunafa-Pistachio.png";
// @ts-ignore
import AppleChocofrostImg from "./assets/images/Apple-Chocofrost.png";
// @ts-ignore
import GrapesChocofrostImg from "./assets/images/Grapes-Chocofrost.png";
// @ts-ignore
import MangoChocofrostImg from "./assets/images/Mango-Chocofrost.png";
// @ts-ignore
import chickenPowerBowlImg from "./assets/images/Chicken-Power-Bowl.png";

// @ts-ignore
import ABCWellnessComboImg from "../assets/images/ABC_Wellness_Combo.png";

// @ts-ignore
import ImmunityShieldSpecialImg from "../assets/images/Immunity_Shield_Special.png";

// @ts-ignore
import GoldenGlowSpecialImg from "../assets/images/Golden_Glow_Special.png";

// @ts-ignore
import MuscleRefillSpecialImg from "../assets/images/Muscle_Refill_Special.png";

export const MENU_CATEGORIES = [
  "Fruit Juices",
  "Power Cups",
  "High Protein Meals",
  "Green Vitality Juice",
  "Super Food Sprouts Bowls",
  "Fresco Power Juices",
  "Shakes",
  "Specials"
];

export const MENU_ITEMS: MenuItem[] = [
 // Fruit Juices

  {
    id: "Watermelon-Juice",
    name: "Watermelon Juice",
    description: "Keeps You Hydrated • Supports Heart Health • Rich in Antioxidants",
    price: 59,
    image: watermelonJuiceImg,
    icon: "🍉",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Mosambi-Juice",
    name: "Mosambi Juice",
    description: " Vitamin C immunity booster • Supporting digestion • Everyday energy.",
    price: 69,
    image: MosambiJuiceImg,
    icon: "🍊",
    category: "Fruit Juices",
   popular: true,
  },


{
    id: "Pineapple-Juice",
    name: "Pineapple Juice",
    description: "Bromelain-rich refreshing juice supporting digestion, joint health, and daily energy.",
    price: 69,
    image: pineappleJuiceImg,
    icon: "🍍",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Mango-Juice",
    name: "Mango Juice",
    description: "Rich, luscious juice bursting with tropical mango sweetness and vital vitamins.",
    price: 79,
    image: MangoJuiceImg,
    icon: "🥭",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Apple-Juice",
    name: "Apple Juice",
    description: "Crisp and refreshing cold-pressed sweet apple juice for immunity and daily hydration.",
    price: 79,
    image: AppleJuiceImg,
    icon: " 🍎",
    category: "Fruit Juices",
  
  },

  {
    id: "Orange-Juice",
    name: "Orange Juice",
    description: "Freshly squeezed sweet orange extract, extremely rich in Vitamin C and immunity support.",
    price: 79,
    image: OrangeJuiceImg,
    icon: "🍊",
    category: "Fruit Juices",
    popular: true,
  },
  {
    id: "Ganga-Juice",
    name: "Ganga Jamuna Juice",
    description: "A delicious combination of sweet lime (mosambi) and pineapple juice for double the immunity.",
    price: 79,
    image: GangaJuiceImg,
    icon: "🍇",
    category: "Fruit Juices",
   
  },
  {
    id: "Pomegranate-Juice",
    name: "Pomegranate Juice",
    description: "Pure pomegranate extract rich in polyphenols, antioxidants, and heart-healthy nutrients.",
    price: 149,
    image: PomegranateJuiceImg,
    icon: "❤️",
    category: "Fruit Juices",
   
  },
   {
    id: "papaya-Juice",
    name: "Papaya Juice",
    description: "Thick, soothing papaya extract loaded with digestive enzymes and essential folate.",
    price: 59,
    image: papayaJuiceImg,
    icon: "🧡",
    category: "Fruit Juices",
  },

  {
    id: "Muskmelon-Juice",
    name: "Muskmelon Juice",
    description: "Cooling and hydrating muskmelon juice perfect for refreshing summer wellness.",
    price: 69,
    image: MuskmelonJuiceImg,
    icon: "🍈",
    category: "Fruit Juices",
    
  },
  
  {
    id: "Nimbu-Pani-Juice",
    name: "Nimbu Pani Juice",
    description: "Traditional sweet and sour lemon cooler designed to hydrate and refresh instantly.",
    price: 39,
    image: NimbuPaniJuiceImg,
    icon: "🍋",
    category: "Fruit Juices",
   
  },

  // Green Vitality Juice

    {
    id: "Beetroot-Juice",
    name: "Beetroot Juice",
    description: "Earthy, nutrient-dense beetroot extract supporting healthy circulation, stamina, and active detox.",
    price: 69,
    image: BeetrootJuiceImg,
    icon: "❤️",
    category: "Green Vitality Juice",
  popular: true,
  },
  
    {
    id: "Cucumber-Juice",
    name: "Cucumber Juice",
    description: "Pure refreshing cucumber extract for deep cellular hydration, skin repair, and cooling.",
    price: 69,
    image: CucumberJuiceImg,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

 {
    id: "Tomato-Juice",
    name: "Tomato Juice",
    description: "Antioxidant-rich tomato extract packed with lycopene for heart care and skin nutrition.",
    price: 69,
    image: TomatoJuiceImg,
    icon: "🍅",
    category: "Green Vitality Juice",
    
  },

    {
    id: "Karela-Juice",
    name: "Karela Juice",
    description: "Traditional bitter gourd juice crafted to support blood sugar regulation and liver detox.",
    price: 69,
    image: KarelaJuiceImg,
    icon: "🌿",
    category: "Green Vitality Juice",
   
  },

  {
    id: "Carrot-Juice",
    name: "Carrot Juice",
    description: "Rich beta-carotene juice to nourish vision, promote glowing skin, and support vitality.",
    price: 69,
    image: CarrotJuiceImg,
    icon: "🥕",
    category: "Green Vitality Juice",
   popular: true,
  },

    {
    id: "Palak-Juice",
    name: "Palak Juice",
    description: "A super nutrient-dense spinach extraction loaded with iron, calcium, and chlorophyll.",
    price: 69,
    image: PalakJuiceImg,
    icon: "🥬",
    category: "Green Vitality Juice",
    
  },
  


  {
    id: "Lauki-Juice",
    name: "Lauki Juice",
    description: "Low-calorie bottle gourd juice formulated to support digestion and assist weight management.",
    price: 69,
    image: LaukijuiceImg,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

   {
    id: "Ash-Gourd-Juice",
    name: "Ash Gourd Juice",
    description: "Pure ash gourd juice, an ultimate cooling drink to detoxify the gut and enhance mental clarity.",
    price: 69,
    image: AshGourdJuiceImg,
    icon: "🍈",
    category: "Green Vitality Juice",
    popular: true,
  },

  // Protein Power Fruit Cup

  {
    id: "Protein-Power-Cup",
    name: "Power Packed Cup",
    description: "Small Cup. Big Nutrition. Fresh Greek Yogurt, Milk, Chia Seeds, Peanut Butter, Apple, Banana, Pomegranate, Flax, Sunflower & Pumpkin Seeds with a touch of Honey.",
    price: 119,
    image: ProteinPowerCupImg,
    icon: "💪",
    category: "Power Cups",
    popular: true,
    benefits: [
      "💪 18–20 g Protein*",
      "🌾 High in Fiber",
      "❤️ Healthy Fats & Omega-3",
      "⚡ Long-Lasting Energy",
      "🥜 Rich in Super Seeds",
      "🍎 Made with Fresh Fruits"
    ]
  },

  {
    id: "Classic-Delight-Cup",
    name: "Classic Delight Cup",
    description: "Fresh Fruits. Daily Goodness. A refreshing blend of 8–9 seasonal fruits, naturally rich in vitamins, antioxidants, and fiber for a healthy energy boost.",
    price: 79,
    image: ClassicDelightCupImg,
    icon: "🍓",
    category: "Power Cups",
     benefits: [
      "🍎 Rich in Essential Vitamins",
      "🌿 High in Natural Fiber",
      "⚡ Refreshing & Energizing",
      "🍊 Packed with Fresh Seasonal Fruits",
      "💚 Supports Everyday Wellness"
    ]
  },
{
  id: "Exotic-Delight-Cup",
  name: "Exotic Delight Cup",
  description: "Premium Cup. Exotic Flavors. Ultimate Freshness. A luxurious mix of 13–14 premium fruits packed with antioxidants, vitamins, and tropical goodness in every bite..",
  price: 99,
  image: ExoticDelightCupImg,
  icon: "✨",
  category: "Power Cups",
 popular: true,
 benefits: [
     "🥭 Loaded with Premium Fruits",
     "💪 Rich in Vitamins & Antioxidants",
     "🍍 Naturally Refreshing & Hydrating",
     "❤️ Supports Immunity & Wellness",
     "✨ Bursting with Tropical Goodness"
    ]
},


  // High Protein Meals
 {
  id: "Chicken-Power-Bowl",
  name: "35g Protein Chicken Bowl",
  description: "Lean Protein. Fresh Veggies. Complete Nutrition. Premium tossed chicken served with crisp vegetables and creamy Greek yogurt Paneer dressing for a wholesome, protein-rich meal.",
  price: 219,
  image: chickenPowerBowlImg,
  icon: "🍗",
  category: "High Protein Meals",
  popular: true,
  benefits: [
    "💪 35g High-Quality Protein",
    "🥗 Rich in Fiber & Fresh Veggies",
    "⚡ Long-Lasting Energy",
    "❤️ Supports Muscle Growth & Recovery",
    "🌿 Made with Clean Ingredients"  
  ]
},

 {
  id: "Paneer-Power-Bowl",
  name: "30G Protein Paneer Bowl",
  description: "High Protein. Fresh Paneer. Balanced Nutrition. Tossed paneer paired with colorful vegetables and creamy Greek yogurt dressing for a delicious, wholesome meal.",
  price: 199,
  image: PaneerPowerBowlImg,
  icon: "🧀",
  category: "High Protein Meals",
  popular: true,
  benefits: [
    "💪 30g High-Quality Protein",
    "🥬 Rich in Fiber & Vitamins",
    "⚡ Balanced & Filling Meal",
    "❤️ Supports Muscle Health",
    "🌱 Fresh Farm Ingredients"
  ]

},

  // Super Food Sprouts Bowl
 {
  id: "Sprouts-Bowl",
  name: "Super food sprouts bowl",
  description: "Fresh Sprouts. Natural Nutrition. Everyday Wellness. A refreshing mix of protein-rich sprouts, fresh vegetables, herbs, and spices for a light yet satisfying meal.",
  price: 79,
  image: SproutsBowlImg,
  icon: "🌱",
  category: "High Protein Meals",
  popular: true,
  benefits: [
    "🌱 Rich in Plant Protein",
    "🥗 High in Fiber & Antioxidants",
    "💚 Supports Digestion & Immunity",
    "⚡ Naturally Energizing",
    "🌿 Freshly Prepared Daily"
  ]
},
 
  

  
// Fresco Power Juices
{
  id: "ABC-Drink",
  name: "ABC Drink",
  description: "Apple, beetroot, and carrot juice packed with essential vitamins and antioxidants.",
  price: 99,
  image: ABCDrinkImg,
  icon: "🍎",
  category: "Fresco Power Juices",
 popular: true,
},

{
  id: "Immunity-Booster",
  name: "Immunity Booster",
  description: "Orange, pineapple, and ginger juice to naturally strengthen immunity and energy.",
  price: 99,
  image: ImmunityBoosterImg,
  icon: "🛡️",
  category: "Fresco Power Juices",
 popular: true,
},

{
  id: "Super-Women",
  name: "Super Women",
  description: "Orange, amla, and pomegranate juice rich in antioxidants and iron support.",
  price: 99,
  image: SuperWomenImg,
  icon: "🌸",
  category: "Fresco Power Juices",
  popular: true,
},


{
  id: "Detox-Body",
  name: "Detox Body",
  description: "Cucumber, Pudina, and amla juice for refreshing hydration and detox support.",
  price: 99,
  image: DetoxBodyImg,
  icon: "🌿",
  category: "Fresco Power Juices",
 popular: true,
},


{
  id: "Stress-Relief",
  name: "Stress Relief",
  description: "A refreshing blend of pomegranate and beetroot, rich in antioxidants and natural goodness.",
  price: 99,
  image: StressReliefImg,
  icon: "😌",
  category: "Fresco Power Juices",
},

{
  id: "Iron-Rich",
  name: "Iron Rich",
  description: "Cucumber, apple, and palak juice loaded with iron and essential nutrients.",
  price: 99,
  image: IronRichImg,
  icon: "🩸",
  category: "Fresco Power Juices",
},

{
  id: "Skin-Glow-up",
  name: "Skin Glow-up",
  description: "Carrot, orange, and apple juice for naturally glowing and healthy skin.",
  price: 99,
  image: SkinGlowupImg,
  icon: "✨",
  category: "Fresco Power Juices",
 popular: true,
},

{
  id: "Liver-Cleanser",
  name: "Liver Cleanser",
  description: "Aloe vera, cucumber, and amla juice for refreshing detox and cleansing support.",
  price: 99,
  image: LiverCleanserImg,
  icon: "🍃",
  category: "Fresco Power Juices",
},

{
  id: "Heart-Care",
  name: "Heart Care",
  description: "Beetroot, carrot, and tomato juice rich in heart-friendly nutrients.",
  price: 99,
  image: HeartCareImg,
  icon: "❤️",
  category: "Fresco Power Juices",
},

{
  id: "Fat-Burner",
  name: "Fat Burner",
  description: "Lauki, spinach, and ginger juice crafted to support healthy metabolism.",
  price: 99,
  image: FatBurnerImg,
  icon: "🔥",
  category: "Fresco Power Juices",
popular: true,
},

{
  id: "Vital-Energy-Drink",
  name: "Vital Energy Drink",
  description: "Refreshing coconut water with lemon and honey for natural hydration and energy.",
  price: 99,
  image: VitalEnergyDrinkImg,
  icon: "⚡",
  category: "Fresco Power Juices",
  
},


{
  id: "Gut-Reset",
  name: "Gut Reset",
  description: "Lauki, tomato, and ginger juice to support digestion and gut wellness.",
  price: 99,
  image: GutResetImg,
  icon: "💚",
  category: "Fresco Power Juices",
},

{
  id: "Clear-Vision",
  name: "Clear Vision",
  description: "Carrot, tomato, and ginger juice rich in nutrients that support eye health.",
  price: 99,
  image: ClearVisionImg,
  icon: "👁️",
  category: "Fresco Power Juices",
},

{
  id: "Make-Your-Own-(Any-5)",
  name: "Make Your Own (Any 5)",
  description: "Create your own custom power juice blend with any 5 fresh ingredients.",
  price: 119,
  image: MakeYourOwnImg,
  icon: "🧑‍🍳",
  category: "Fresco Power Juices",
 
},

// Shakes

{
  id: "Banana-Shake",
  name: "Banana Shake",
  description: "Creamy banana shake packed with natural energy and rich flavor.",
  price: 119,
  image: BananaShakeImg,
  icon: "🍌",
  category: "Shakes",
  
},

{
  id: "Apple-Shake",
  name: "Apple Shake",
  description: "Refreshing apple shake blended for a smooth and naturally sweet taste.",
  price: 129,
  image: AppleShakeImg,
  icon: "🍎",
  category: "Shakes",

},

{
  id: "Muskmelon-Shake",
  name: "Muskmelon Shake",
  description: "Cool and refreshing muskmelon shake perfect for summer hydration.",
  price: 149,
  image: MuskmelonShakeImg,
  icon: "🍈",
  category: "Shakes",
 popular: true,

},

{
  id: "Mango-Shake",
  name: "Mango Shake",
  description: "Rich and creamy mango shake made with fresh juicy mangoes.",
  price: 199,
  image: MangoShakeImg,
  icon: "🥭",
  category: "Shakes",
popular: true,
},

{
  id: "oreo-shake",
  name: "Oreo Shake",
  description: "Creamy, chocolaty, and loaded with the irresistible taste of Oreo cookies.",  
  price: 99,
  image: OreoshakeImg,
  icon: "🍪",
  category: "Shakes",
  popular: true
},

{
  id: "Energy-Boost-Shake",
  name: "Energy Boost Shake",
  description: "Nutritious power-packed shake crafted to keep you energized and refreshed.",
  price: 159,
  image: EnergyBoostShakeImg,
  icon: "⚡",
  category: "Shakes",
  popular: true,
},


// Specials

{
  id: "Coconut-Caramel",
  name: "Coconut Caramel Frozen Banana",
  description: "Toasted coconut flakes with rich creamy caramel delight.",
  price: 69,
  image: CoconutCaramelImg,
  icon: "🥥",
  category: "Specials",
  
},

{
  id: "White-Sprinkle",
  name: "White Sprinkle Frozen Banana",
  description: "Classic crunchy treat topped with smooth milky drizzle.",
  price: 79,
  image: WhiteSprinkleImg,  
  icon: "🤍",
  category: "Specials",
 popular: true,
},

{
  id: "Peanut-Caramel",
  name: "Peanut Caramel Frozen Banana",
  description: "Roasted peanuts blended with delicious golden caramel flavor.",
  price: 89,
  image: PeanutCaramelImg,
  icon: "🥜",
  category: "Specials",
 popular: true,
},

{
  id: "Oreo-White",
  name: "Oreo White Frozen Banana",
  description: "Crunchy Oreo cookies topped with creamy white chocolate drizzle.",
  price: 99,
  image: OreoWhiteImg,
  icon: "🍪",
  category: "Specials",
popular: true,
},

{
  id: "Biscoff-Crunch",
  name: "Biscoff Crunch Frozen Banana",
  description: "Loaded with Biscoff crumbles and rich Biscoff drizzle.",
  price: 119,
  image: BiscoffCrunchImg,
  icon: "🍯", 
  category: "Specials",
popular: true,
},

{
  id: "Dubai-Kunafa-Pistachio",
  name: "Dubai Kunafa Pistachio Frozen Banana",
  description: "Crunchy kunafa layered with rich pistachio flavor and drizzle.",
  price: 149,
  image: DubaiKunafaPistachioImg,
  icon: "💚",
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
    description: "Order fresh between 7 am - 10 am to enjoy wonderful discount savings.",
    tag: "10% OFF"
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

export const PUNE_LOCATIONS = [
  "Hadapsar (Magarpatta), Pune",
  "Amanora Park Town, Pune",
];

export const SAMPLE_TESTIMONIALS = [
  {
    id: "t1",
    name: "Rahul Kulkarni",
    location: "Kothrud, Pune",
    rating: 5,
    comment: "The Green Detox pure is incredible! It tastes so natural and raw, with no synthetic sugars. It has truly helped my skin wellness in just 2 weeks of regular morning orders.",
    date: "A week ago"
  },
  {
    id: "t2",
    name: "Anjali Deshmukh",
    location: "Kalyani Nagar, Pune",
    rating: 5,
    comment: "My go-to place for clean smoothies. The Avocado Cream Green smoothie feels super luxurious yet incredibly light. Also, ordering via WhatsApp is seamless and they delivery fast!",
    date: "2 days ago"
  },
  {
    id: "t3",
    name: "Vikram Joshi",
    location: "Shivaji Nagar, Pune",
    rating: 5,
    comment: "Excellent range of Ayurvedic mixes. The Amla Weight Master and Wheatgrass shots are of exceptional quality, prepared fresh. Hard-working delivery crew in Pune!",
    date: "Yesterday"
  }
];



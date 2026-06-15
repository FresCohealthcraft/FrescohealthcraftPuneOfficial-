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
import ProteinPowerCupImg from "./assets/images/Protein-Power-Cup.png";
// @ts-ignore
import ClassicDelightCupImg from "./assets/images/Classic-Delight-Cup.png";

// @ts-ignore
import ExoticDelightCupImg from "./assets/images/Exotic-Delight-Cup.png";
// @ts-ignore
import SproutsBowlImg from "./assets/images/Sprouts-Bowl.png";
// @ts-ignore
import PaneerSproutsBowlImg from "./assets/images/Paneer-Sprouts-Bowl.png";
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
import OreoshakeImg from "./assets/images/oreo-shake.png";
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

export const MENU_CATEGORIES = [
  "Fruit Juices",
  "Power Cups",
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
    description: "Fresh watermelon blended into a naturally sweet juice.",
    price: 59,
    image: watermelonJuiceImg,
    icon: "🍉",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Mosambi-Juice",
    name: "Mosambi Juice",
    description: "Rich in Vitamin C, naturally refreshing and immunity.",
    price: 69,
    image: MosambiJuiceImg,
    icon: "🍊",
    category: "Fruit Juices",
   
  },

{
    id: "Pineapple-Juice",
    name: "Pineapple Juice",
    description: "Sweet, refreshing, and naturally rich in Vitamin C.",
    price: 69,
    image: pineappleJuiceImg,
    icon: "🍍",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Mango-Juice",
    name: "Mango Juice",
    description: "Fresh mango that keeps you energized.",
    price: 79,
    image: MangoJuiceImg,
    icon: "🥭",
    category: "Fruit Juices",
  popular: true,
  },

  {
    id: "Apple-Juice",
    name: "Apple Juice",
    description: "Provides hydration and essential nutrients.",
    price: 79,
    image: AppleJuiceImg,
    icon: " 🍎",
    category: "Fruit Juices",
   popular: true,
  },

  {
    id: "Orange-Juice",
    name: "Orange Juice",
    description: "Helping support immunity and overall wellness.",
    price: 79,
    image: OrangeJuiceImg,
    icon: "🍊",
    category: "Fruit Juices",
    
  },
  {
    id: "Ganga-Juice",
    name: "Ganga Jamuna Juice",
    description: "Mosambi + pineapple, packed with Vitamin C.",
    price: 79,
    image: GangaJuiceImg,
    icon: "🍇",
    category: "Fruit Juices",
    popular: true,
  },
  {
    id: "Pomegranate-Juice",
    name: "Pomegranate Juice",
    description: "A nutrient-rich juice loaded with natural antioxidants.",
    price: 139,
    image: PomegranateJuiceImg,
    icon: "石榴",
    category: "Fruit Juices",
    popular: true,
  },
   {
    id: "papaya-Juice",
    name: "Papaya Juice",
    description: "Rich in digestive enzymes and nutrients.",
    price: 59,
    image: papayaJuiceImg,
    icon: "石榴",
    category: "Fruit Juices",
    popular: true,
  },

  {
    id: "Muskmelon-Juice",
    name: "Muskmelon Juice",
    description: "Water-rich that supports hydration and wellness.",
    price: 69,
    image: MuskmelonJuiceImg,
    icon: "石榴",
    category: "Fruit Juices",
    popular: true,
  },
  
  {
    id: "Nimbu-Pani-Juice",
    name: "Nimbu Pani Juice",
    description: "Refreshing, and naturally rich in Vitamin C.",
    price: 59,
    image: NimbuPaniJuiceImg,
    icon: "🍋",
    category: "Fruit Juices",
   
  },

  // Green Vitality Juice

    {
    id: "Beetroot-Juice",
    name: "Beetroot Juice",
    description: "Lower blood pressure, boost athletic stamina and liver health",
    price: 69,
    image: BeetrootJuiceImg,
    icon: " Beetroot",
    category: "Green Vitality Juice",
  popular: true,
  },
  
    {
    id: "Cucumber-Juice",
    name: "Cucumber Juice",
    description: "Light, refreshing, and naturally hydrating for everyday wellness.",
    price: 49,
    image: CucumberJuiceImg,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

 {
    id: "Tomato-Juice",
    name: "Tomato Juice",
    description: "Boost heart health and support your immune system and skin",
    price: 59,
    image: TomatoJuiceImg,
    icon: "🍅",
    category: "Green Vitality Juice",
    
  },

    {
    id: "Karela-Juice",
    name: "Karela Juice",
    description: "A nutrient-rich juice that helps support healthy blood sugar balance.",
    price: 69,
    image: KarelaJuiceImg,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

  {
    id: "Carrot-Juice",
    name: "Carrot Juice",
    description: "Loaded with Vitamin A to help support eye health and vitality.",
    price: 59,
    image: CarrotJuiceImg,
    icon: " 🍐",
    category: "Green Vitality Juice",
   
  },

    {
    id: "Palak-Juice",
    name: "Palak Juice",
    description: "Loaded with vitamins and minerals for everyday wellness.",
    price: 59,
    image: PalakJuiceImg,
    icon: "🥬",
    category: "Green Vitality Juice",
    
  },
  


  {
    id: "Lauki-Juice",
    name: "Lauki Juice",
    description: "Naturally low in calories and packed with nutrients for everyday wellness.",
    price: 59,
    image: LaukijuiceImg,
    icon: "🥒",
    category: "Green Vitality Juice",
   
  },

   {
    id: "Ash-Gourd-Juice",
    name: "Ash Gourd Juice",
    description: "Aids digestion, supports weight loss, and flushes out toxins",
    price: 59,
    image: AshGourdJuiceImg,
    icon: "🍈",
    category: "Green Vitality Juice",
    popular: true,
  },

  // Protein Power Fruit Cup

{
  id: "Protein-Power-Cup",
  name: "Power packed Cups",
  description: "A wholesome blend of fresh fruits and Protein, fiber- rich goodness.",
  price: 119,
  image: ProteinPowerCupImg,
  icon: "🥤",
  category: "Power Cups",
  popular: true,
},

  {
  id: "Classic-Delight-Cup",
  name: "Classic Delight Cup",
  description: "A colorful blend of 8–9 fresh fruits, packed with natural vitamins, antioxidants, and refreshing goodness.",
  price: 79,
  image: ClassicDelightCupImg,
  icon: "🥤",
  category: "Power Cups",
 
},
{
  id: "Exotic-Delight-Cup",
  name: "Exotic Delight Cup",
  description: "A luxurious mix of 13–14 premium fruits bursting with freshness and natural goodness.",
  price: 99,
  image: ExoticDelightCupImg,
  icon: "🥤",
  category: "Power Cups",
 popular: true,
},


  // Super Food Sprouts Bowl
 {
  id: "Sprouts-Bowl",
  name: "Super food sprouts bowl",
  description: "A refreshing mix of sprouts, veggies, and spices for everyday wellness.",
  price: 79,
  image: SproutsBowlImg,
  icon: "🥬",
  category: "Super Food Sprouts Bowls",
  popular: true,
},
  {
  id: "Paneer-Sprouts-Bowl",
  name: "Super food Paneer sprouts bowl",
  description: "Protein-rich paneer with healthy sprouts to support immunity and overall wellness.",
  price: 99,
  image: PaneerSproutsBowlImg,
  icon: "🥬",
  category: "Super Food Sprouts Bowls",
popular: true,
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
  icon: "🍊",
  category: "Fresco Power Juices",
 popular: true,
},

{
  id: "Super-Women",
  name: "Super Women",
  description: "Orange, amla, and pomegranate juice rich in antioxidants and iron support.",
  price: 99,
  image: SuperWomenImg,
  icon: "石榴",
  category: "Fresco Power Juices",
},


{
  id: "Detox-Body",
  name: "Detox Body",
  description: "Cucumber, Pudina, and amla juice for refreshing hydration and detox support.",
  price: 79,
  image: DetoxBodyImg,
  icon: "🥒",
  category: "Fresco Power Juices",
 
},


{
  id: "Stress-Relief",
  name: "Stress Relief",
  description: "A refreshing blend of pomegranate and beetroot, rich in antioxidants and natural goodness.",
  price: 99,
  image: StressReliefImg,
  icon: "石榴",
  category: "Fresco Power Juices",
},

{
  id: "Iron-Rich",
  name: "Iron Rich",
  description: "Cucumber, apple, and palak juice loaded with iron and essential nutrients.",
  price: 99,
  image: IronRichImg,
  icon: "🥒",
  category: "Fresco Power Juices",
},

{
  id: "Skin-Glow-up",
  name: "Skin Glow-up",
  description: "Carrot, orange, and apple juice for naturally glowing and healthy skin.",
  price: 89,
  image: SkinGlowupImg,
  icon: " 🍐",
  category: "Fresco Power Juices",
 popular: true,
},

{
  id: "Liver-Cleanser",
  name: "Liver Cleanser",
  description: "Aloe vera, cucumber, and amla juice for refreshing detox and cleansing support.",
  price: 89,
  image: LiverCleanserImg,
  icon: " 🍐",
  category: "Fresco Power Juices",
},

{
  id: "Heart-Care",
  name: "Heart Care",
  description: "Beetroot, carrot, and tomato juice rich in heart-friendly nutrients.",
  price: 89,
  image: HeartCareImg,
  icon: " 🍅",
  category: "Fresco Power Juices",
},

{
  id: "Fat-Burner",
  name: "Fat Burner",
  description: "Lauki, spinach, and ginger juice crafted to support healthy metabolism.",
  price: 79,
  image: FatBurnerImg,
  icon: "🥒",
  category: "Fresco Power Juices",
popular: true,
},

{
  id: "Vital-Energy-Drink",
  name: "Vital Energy Drink",
  description: "Refreshing coconut water with lemon and honey for natural hydration and energy.",
  price: 99,
  image: VitalEnergyDrinkImg,
  icon: "🥥",
  category: "Fresco Power Juices",
  
},


{
  id: "Gut-Reset",
  name: "Gut Reset",
  description: "Lauki, tomato, and ginger juice to support digestion and gut wellness.",
  price: 79,
  image: GutResetImg,
  icon: "🥒",
  category: "Fresco Power Juices",
},

{
  id: "Clear-Vision",
  name: "Clear Vision",
  description: "Carrot, tomato, and ginger juice rich in nutrients that support eye health.",
  price: 79,
  image: ClearVisionImg,
  icon: " 🍐",
  category: "Fresco Power Juices",
},

{
  id: "Make-Your-Own-(Any-5)",
  name: "Make Your Own (Any 5)",
  description: "Create your own custom power juice blend with any 5 fresh ingredients.",
  price: 119,
  image: MakeYourOwnImg,
  icon: " 🍐",
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
  price: 139,
  image: EnergyBoostShakeImg,
  icon: "🥤",
  category: "Shakes",
  
},


// Specials

{
  id: "Coconut-Caramel",
  name: "Coconut Caramel",
  description: "Toasted coconut flakes with rich creamy caramel delight.",
  price: 69,
  image: CoconutCaramelImg,
  icon: "🥥",
  category: "Specials",
  
},

{
  id: "White-Sprinkle",
  name: "White Sprinkle",
  description: "Classic crunchy treat topped with smooth milky drizzle.",
  price: 79,
  image: WhiteSprinkleImg,  
  icon: "🍦",
  category: "Specials",
 popular: true,
},

{
  id: "Peanut-Caramel",
  name: "Peanut Caramel",
  description: "Roasted peanuts blended with delicious golden caramel flavor.",
  price: 89,
  image: PeanutCaramelImg,
  icon: "🥜",
  category: "Specials",
 
},

{
  id: "Oreo-White",
  name: "Oreo White",
  description: "Crunchy Oreo cookies topped with creamy white chocolate drizzle.",
  price: 99,
  image: OreoWhiteImg,
  icon: "🍦",
  category: "Specials",
popular: true,
},

{
  id: "Biscoff-Crunch",
  name: "Biscoff Crunch",
  description: "Loaded with Biscoff crumbles and rich Biscoff drizzle.",
  price: 119,
  image: BiscoffCrunchImg,
  icon: "🍦", 
  category: "Specials",
popular: true,
},

{
  id: "Dubai-Kunafa-Pistachio",
  name: "Dubai Kunafa Pistachio",
  description: "Crunchy kunafa layered with rich pistachio flavor and drizzle.",
  price: 149,
  image: DubaiKunafaPistachioImg,
  icon: "🍦",
  category: "Specials",
 popular: true,
},

{
  id: "Apple-Chocofrost",
  name: "Apple Chocofrost Candy",
  description: "Frozen apple treat coated with rich and creamy chocolate flavor.",
  price: 49,
  image: AppleChocofrostImg,
  icon: "🍦",
  category: "Specials",
},

{
  id: "Grapes-Chocofrost",
  name: "Grapes Chocofrost Candy",
  description: "Frozen grapes coated with smooth chocolate for a refreshing bite.",
  price: 39,
  image: GrapesChocofrostImg,
  icon: "🍦",
  category: "Specials",
 
},

{
  id: "Mango-Chocofrost",
  name: "Mango Chocofrost Candy",
  description: "Frozen mango delight blended with rich chocolate goodness.",
  price: 49,
  image: MangoChocofrostImg,
  icon: "🍦",
  category: "Specials",
  popular: true,
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


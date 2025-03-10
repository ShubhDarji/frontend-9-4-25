import refrigeratorImage01 from "../Images/lg01.png";
import refrigeratorImage02 from "../Images/Adobe Express - file (3).png";
import refrigeratorImage03 from "../Images/31jiBNco+0L._SY445_SX342_.png";

import acImage01 from "../Images/ac01.png";
import acImage02 from "../Images/ac02.png";
import acImage03 from "../Images/ac03.png";
import acImage04 from "../Images/ac04.png";
import img1234 from "../Images/ac04.png";

import  washingMachineImage01 from "../Images/31+y4WrV9wL._SX342_SY445_.jpg";
import  washingMachineImage02 from "../Images/51FQa0hdP0L._SX466_.jpg";
import  washingMachineImage03 from "../Images/61+a0T7rpFL._AC_UY218_.jpg";
import  washingMachineImage04 from "../Images/71eL4y-4BOL._AC_UY218_.jpg";
import  washingMachineImage05 from "../Images/712G-LLV+NL._AC_UY218_.jpg";

import coolerImage01 from "../Images/ac05.png";
import coolerImage02 from "../Images/51xSeqHG8NL._AC_UY218_.jpg";
import coolerImage03 from "../Images/71PB4DerlcL._AC_UY218_.jpg";
import coolerImage04 from "../Images/61uGikFOzHL._AC_UY218_.jpg";
import coolerImage05 from "../Images/51S14uEdI3L._AC_UY218_.jpg";
import coolerImage06 from "../Images/51z24EH5Q5L._AC_UY218_.jpg";



import tvImage01 from "../Images/71zFdS29uFL._AC_UY218_.jpg";
/* import watch02 from "../Images/watch-02.jpg"; */
/* import watch03 from "../Images/watch-03.jpg";
import watch04 from "../Images/watch-04.jpg"; */

import microwaveImage01 from "../Images/61tCpuACSIL._AC_UY218_.jpg";
/* import wireless02 from "../Images/wireless-02.png";
import wireless03 from "../Images/wireless-03.png";
import wireless04 from "../Images/wireless-04.png"; */

import refrigeratorImage from "../Images/GettyImages-1217419940-800x500.jpg";
import airConditionerImage from "../Images/TMF_PF_1440x344.jpg";
import washingMachineImage from "../Images/1440x344_WT85B4200GD_TL.png";// need to replace

export const SliderData = [
  {
    id: 1,
    title: "50% Off on Refrigerators",
    desc: "Keep your food fresh and your drinks ice-cold with our top-rated refrigerators.",
    cover: refrigeratorImage, // Replace with actual image import
  },
  {
    id: 2,
    title: "Stay Cool and Comfortable",
    desc: "Beat the heat with our energy-efficient air conditioners.",
    cover: airConditionerImage, // Replace with actual image import
  },
  {
    id: 3,
    title: "Smart Laundry Solutions",
    desc: "Simplify your laundry routine with our advanced washing machines.",
    cover: washingMachineImage, // Replace with actual image import
  },
];

export const serviceData = [
  {
    icon: <ion-icon name="car"></ion-icon>,
    title: "F Delivery",
    subtitle: "Enjoy hassle-free delivery to your doorstep.",
    bg: "#fdefe6",
  },
  {
    icon: <ion-icon name="card"></ion-icon>,
    title: "Secure Payment",
    subtitle: "Shop with confidence using our secure payment gateway.",
    bg: "#ceebe9",
  },
  {
    icon: <ion-icon name="shield-half-outline"></ion-icon>,
    title: "Easy Returns",
    subtitle: "Return products effortlessly within the specified period.",
    bg: "#e2f2b2",
  },
  {
    icon: <ion-icon name="headset"></ion-icon>,
    title: "24/7 Support",
    subtitle: "Get assistance anytime, day or night, from our dedicated support team.",
    bg: "#d6e5fb",
  },
];

export const newdata =[
    {
      id: "04",
      
      productName: "Voltas 1.5 Ton 5 Star Inverter Split AC",
      companyName: "Voltas",
      price: 42990,
      originalPrice:50000,
      shortDesc: "Energy-efficient split AC with inverter technology for optimal cooling.",
      description: "Stay cool and comfortable all year round with this Voltas Inverter Split AC. Its 1.5-ton capacity is suitable for medium-sized rooms, and the 5-star energy rating ensures lower electricity bills.",
      reviews: [
        {
          rating: 4.9,
          text: "Cools my room quickly and efficiently. The inverter technology saves a lot of energy.",
        },
        {
          rating: 4.7,
          text: "Very happy with the performance. It's quiet and keeps the room at the perfect temperature.",
        },
        {
          rating: 5,
          text: "Excellent AC for the price. Highly recommend it for its cooling capacity and energy efficiency.",
        },
      ],

  },{
    id: "01",
    productName: "Samsung 678L Side-by-Side Refrigerator",
    companyName: "Samsung",
    price: 89990, 
    originalPrice:50000,
    shortDesc: "Spacious and feature-rich refrigerator for large families.",
    description: "This Samsung Side-by-Side Refrigerator boasts a generous 678L capacity, providing ample space for all your groceries. It features advanced cooling technology, an ice and water dispenser, and a sleek design that complements modern kitchens.",
    reviews: [
      {
        rating: 4.7,
        text: "Excellent refrigerator! Keeps everything fresh and organized. Highly recommend it.",
      },
      {
        rating: 5,
        text: "Love the ice and water dispenser. Very convenient and the refrigerator looks stunning.",
      },
      {
        rating: 4.5,
        text: "Good value for the price. Plenty of storage space and the cooling is efficient.",
      },
    ],
    avgRating: 4.7,
    imgUrl: refrigeratorImage01, // Replace with actual image import
  },{
    id: "09",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice:50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage02, // Replace with actual image import
  },
]
export const discoutProducts =[
  
  {
    id: "01",
    category:"Fridge",
    productName: "Samsung 678L Side-by-Side Refrigerator",
    companyName: "Samsung",
    price: 89990, 
    originalPrice:100000,
    shortDesc: "Spacious and feature-rich refrigerator for large families.",
    description: "This Samsung Side-by-Side Refrigerator boasts a generous 678L capacity, providing ample space for all your groceries. It features advanced cooling technology, an ice and water dispenser, and a sleek design that complements modern kitchens.",
    reviews: [
      {
        rating: 4.7,
        text: "Excellent refrigerator! Keeps everything fresh and organized. Highly recommend it.",
      },
      {
        rating: 5,
        text: "Love the ice and water dispenser. Very convenient and the refrigerator looks stunning.",
      },
      {
        rating: 4.5,
        text: "Good value for the price. Plenty of storage space and the cooling is efficient.",
      },
    ],
    avgRating: 4.7,
    imgUrl: refrigeratorImage01, // Replace with actual image import
  },{
    id: "11",
    category:'washing-machine',
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice:50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage04, // Replace with actual image import
  },{
    id: "09",
    category:"Fridge",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice:50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage02, // Replace with actual image import
  },
  {
    id: "06",
    category:'ac',
    productName: "Blue Star 1.0 Ton 3 Star Inverter Split AC",
    companyName: "Blue Star",
    price: 28990, 
    originalPrice:50000,
    shortDesc: "Affordable and efficient split AC with inverter technology.",
    description: "Experience optimal cooling performance with this Blue Star Inverter Split AC. Its 1.0-ton capacity is perfect for small to medium-sized rooms, and the inverter compressor ensures consistent cooling and energy savings.",
    reviews: [
      {
        rating: 4.5,
        text: "Blue Star is a reliable brand, and this AC offers great value. It's reasonably quiet, efficient, and cools effectively.",
      },
      {
        rating: 4.3,
        text: "Installation was straightforward. The cooling is quick and effective, even during hot days.",
      },
      {
        rating: 4.4,
        text: "Excellent value for the money. The 3-star energy rating is decent, and the AC functions well.",
      },
    ],
    avgRating: 4.4,
    imgUrl: acImage03, // Replace with actual image import 
  },

  
]
export const salebest=[
  
  {
    id: "04",

    productName: "Voltas 1.5 Ton 5 Star Inverter Split AC",
    companyName: "Voltas",
    price: 42990,
    originalPrice:50000,
    shortDesc: "Energy-efficient split AC with inverter technology for optimal cooling.",
    description: "Stay cool and comfortable all year round with this Voltas Inverter Split AC. Its 1.5-ton capacity is suitable for medium-sized rooms, and the 5-star energy rating ensures lower electricity bills.",
    reviews: [
      {
        rating: 4.9,
        text: "Cools my room quickly and efficiently. The inverter technology saves a lot of energy.",
      },
      {
        rating: 4.7,
        text: "Very happy with the performance. It's quiet and keeps the room at the perfect temperature.",
      },
      {
        rating: 5,
        text: "Excellent AC for the price. Highly recommend it for its cooling capacity and energy efficiency.",
      },
    ],

},{
  id: "01",
  productName: "Samsung 678L Side-by-Side Refrigerator",
  companyName: "Samsung",
  price: 89990, 
  originalPrice:100000,
  shortDesc: "Spacious and feature-rich refrigerator for large families.",
  description: "This Samsung Side-by-Side Refrigerator boasts a generous 678L capacity, providing ample space for all your groceries. It features advanced cooling technology, an ice and water dispenser, and a sleek design that complements modern kitchens.",
  reviews: [
    {
      rating: 4.7,
      text: "Excellent refrigerator! Keeps everything fresh and organized. Highly recommend it.",
    },
    {
      rating: 5,
      text: "Love the ice and water dispenser. Very convenient and the refrigerator looks stunning.",
    },
    {
      rating: 4.5,
      text: "Good value for the price. Plenty of storage space and the cooling is efficient.",
    },
  ],
  avgRating: 4.7,
  imgUrl: refrigeratorImage01, // Replace with actual image import
},{
  id: "09",
  productName: "LG 7kg Fully Automatic Front Load Washing Machine",
  companyName: "LG",
  price: 39990,
  originalPrice:50000,
  shortDesc: "Advanced front-load washing machine with multiple wash programs.",
  description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
  reviews: [
    {
      rating: 4.7,
      text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
    },
    {
      rating: 4.9,
      text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
    },
    {
      rating: 4.8,
      text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
    },
  ],
  avgRating: 4.8,
  imgUrl: washingMachineImage02, // Replace with actual image import
},


]


export const products = [
  // Refrigerators
  {
    id: "01",
    category: "Fridge",
    productName: "Samsung 678L Side-by-Side Refrigerator",
    companyName: "Samsung",
    price: 89990,
    originalPrice: 100000,
    shortDesc: "Spacious and feature-rich refrigerator for large families.",
    description: "This Samsung Side-by-Side Refrigerator boasts a generous 678L capacity, providing ample space for all your groceries. It features advanced cooling technology, an ice and water dispenser, and a sleek design that complements modern kitchens.",
    reviews: [
      {
        rating: 4.7,
        text: "Excellent refrigerator! Keeps everything fresh and organized. Highly recommend it.",
      },
      {
        rating: 5,
        text: "Love the ice and water dispenser. Very convenient and the refrigerator looks stunning.",
      },
      {
        rating: 4.5,
        text: "Good value for the price. Plenty of storage space and the cooling is efficient.",
      },
    ],
    avgRating: 4.7,
    imgUrl: refrigeratorImage01,
    featured: true,
    specifications: [
      "Capacity: 678L",
      "Energy Rating: 5 Star",
      "Cooling Technology: Advanced",
      "Dispenser: Ice and Water",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "02",
    category: "Fridge",
    productName: "LG 710L Frost Free Refrigerator",
    companyName: "LG",
    price: 74990,
    originalPrice: 80000,
    shortDesc: "Advanced frost-free refrigerator with smart inverter technology.",
    description: "Experience the convenience of frost-free technology with this LG refrigerator. Its smart inverter compressor ensures optimal cooling and energy efficiency. With a spacious 710L capacity, it can accommodate the needs of a large household.",
    reviews: [
      {
        rating: 4.8,
        text: "Very spacious and keeps food fresh for a long time. The smart inverter compressor is a great feature.",
      },
      {
        rating: 4.6,
        text: "Happy with the performance so far. The frost-free feature is a lifesaver.",
      },
      {
        rating: 5,
        text: "Great refrigerator for the price. Highly recommend it for its features and reliability.",
      },
    ],
    avgRating: 4.8,
    imgUrl: refrigeratorImage02,
    specifications: [
      "Capacity: 710L",
      "Energy Rating: 4 Star",
      "Cooling Technology: Frost Free",
      "Compressor: Smart Inverter",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "03",
    category: "Fridge",
    productName: "Whirlpool 265L Frost Free Double Door Refrigerator",
    companyName: "Whirlpool",
    price: 32990,
    originalPrice: 50000,
    shortDesc: "Stylish and efficient double-door refrigerator with frost-free technology.",
    description: "This Whirlpool refrigerator combines style and functionality. Its frost-free design prevents ice buildup, ensuring efficient cooling. With a 265L capacity, it's perfect for small to medium-sized families.",
    reviews: [
      {
        rating: 4.6,
        text: "Great value for the money. Keeps food cold and looks good in my kitchen.",
      },
      {
        rating: 4.8,
        text: "The frost-free feature is amazing. No more defrosting the freezer!",
      },
      {
        rating: 4.7,
        text: "Perfect size for my family. We're very happy with this purchase.",
      },
    ],
    avgRating: 4.7,
    imgUrl: refrigeratorImage03,
    specifications: [
      "Capacity: 265L",
      "Energy Rating: 3 Star",
      "Cooling Technology: Frost Free",
      "Design: Double Door",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  // Air Conditioners
  {
    id: "04",
    category: "ac",
    productName: "Voltas 1.5 Ton 5 Star Inverter Split AC",
    companyName: "Voltas",
    price: 42990,
    originalPrice: 50000,
    shortDesc: "Energy-efficient split AC with inverter technology for optimal cooling.",
    description: "Stay cool and comfortable all year round with this Voltas Inverter Split AC. Its 1.5-ton capacity is suitable for medium-sized rooms, and the 5-star energy rating ensures lower electricity bills.",
    reviews: [
      {
        rating: 4.9,
        text: "Cools my room quickly and efficiently. The inverter technology saves a lot of energy.",
      },
      {
        rating: 4.7,
        text: "Very happy with the performance. It's quiet and keeps the room at the perfect temperature.",
      },
      {
        rating: 5,
        text: "Excellent AC for the price. Highly recommend it for its cooling capacity and energy efficiency.",
      },
    ],
    avgRating: 4.9,
    imgUrl: acImage01,
    featured: true,
    specifications: [
      "Capacity: 1.5 Ton",
      "Energy Rating: 5 Star",
      "Technology: Inverter",
      "Cooling: Optimal",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "05",
    category: "ac",
    productName: "Daikin 1.0 Ton 3 Star Inverter Split AC",
    companyName: "Daikin",
    price: 36990,
    originalPrice: 50000,
    shortDesc: "Reliable and efficient split AC with inverter technology.",
    description: "Experience superior cooling performance with this Daikin Inverter Split AC. Its 1.0-ton capacity is ideal for small to medium-sized rooms, and the inverter compressor ensures consistent cooling and energy savings.",
    reviews: [
      {
        rating: 4.8,
        text: "Daikin is a trusted brand, and this AC lives up to its reputation. It's quiet, efficient, and cools well.",
      },
      {
        rating: 4.6,
        text: "Easy to install and use. The cooling is quick and effective, even in hot weather.",
      },
      {
        rating: 4.7,
        text: "Good value for the price. The 3-star energy rating is decent, and the AC works flawlessly.",
      },
    ],
    avgRating: 4.7,
    imgUrl: acImage02,
    specifications: [
      "Capacity: 1.0 Ton",
      "Energy Rating: 3 Star",
      "Technology: Inverter",
      "Cooling: Superior",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "06",
    category: "ac",
    productName: "Blue Star 1.0 Ton 3 Star Inverter Split AC",
    companyName: "Blue Star",
    price: 28990,
    originalPrice: 50000,
    shortDesc: "Affordable and efficient split AC with inverter technology.",
    description: "Experience optimal cooling performance with this Blue Star Inverter Split AC. Its 1.0-ton capacity is perfect for small to medium-sized rooms, and the inverter compressor ensures consistent cooling and energy savings.",
    reviews: [
      {
        rating: 4.5,
        text: "Blue Star is a reliable brand, and this AC offers great value. It's reasonably quiet, efficient, and cools effectively.",
      },
      {
        rating: 4.3,
        text: "Installation was straightforward. The cooling is quick and effective, even during hot days.",
      },
      {
        rating: 4.4,
        text: "Excellent value for the money. The 3-star energy rating is decent, and the AC functions well.",
      },
    ],
    avgRating: 4.4,
    imgUrl: acImage03,
    specifications: [
      "Capacity: 1.0 Ton",
      "Energy Rating: 3 Star",
      "Technology: Inverter",
      "Cooling: Optimal",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "07",
    category: "ac",
    productName: "Daikin 1.0 Ton 3 Star Inverter Split AC",
    companyName: "Daikin",
    price: 36990,
    originalPrice: 50000,
    shortDesc: "Reliable and efficient split AC with inverter technology.",
    description: "Experience superior cooling performance with this Daikin Inverter Split AC. Its 1.0-ton capacity is ideal for small to medium-sized rooms, and the inverter compressor ensures consistent cooling and energy savings.",
    reviews: [
      {
        rating: 4.8,
        text: "Daikin is a trusted brand, and this AC lives up to its reputation. It's quiet, efficient, and cools well.",
      },
      {
        rating: 4.6,
        text: "Easy to install and use. The cooling is quick and effective, even in hot weather.",
      },
      {
        rating: 4.7,
        text: "Good value for the price. The 3-star energy rating is decent, and the AC works flawlessly.",
      },
    ],
    avgRating: 4.7,
    imgUrl: acImage04,
    specifications: [
      "Capacity: 1.0 Ton",
      "Energy Rating: 3 Star",
      "Technology: Inverter",
      "Cooling: Superior",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  // Washing Machines
  {
    id: "08",
    category: "washing-machine",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage01,
    specifications: [
      "Capacity: 7kg",
      "Type: Front Load",
      "Programs: Multiple Wash Programs",
      "Efficiency: Energy Efficient",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "09",
    category: "washing-machine",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice: 50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage02,
    specifications: [
      "Capacity: 7kg",
      "Type: Front Load",
      "Programs: Multiple Wash Programs",
      "Efficiency: Energy Efficient",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "10",
    category: "washing-machine",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice: 50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage03,
    specifications: [
      "Capacity: 7kg",
      "Type: Front Load",
      "Programs: Multiple Wash Programs",
      "Efficiency: Energy Efficient",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "11",
    category: "washing-machine",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice: 50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage04,
    specifications: [
      "Capacity: 7kg",
      "Type: Front Load",
      "Programs: Multiple Wash Programs",
      "Efficiency: Energy Efficient",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  {
    id: "12",
    category: "washing-machine",
    productName: "LG 7kg Fully Automatic Front Load Washing Machine",
    companyName: "LG",
    price: 39990,
    originalPrice: 50000,
    shortDesc: "Advanced front-load washing machine with multiple wash programs.",
    description: "This LG Fully Automatic Front Load Washing Machine makes laundry day a breeze. With a 7kg capacity, it's suitable for small to medium-sized families. It features multiple wash programs, a sleek design, and energy-efficient operation.",
    reviews: [
      {
        rating: 4.7,
        text: "Cleans clothes thoroughly and gently. The multiple wash programs are very convenient.",
      },
      {
        rating: 4.9,
        text: "Love the front-load design. It's space-saving and the washing performance is excellent.",
      },
      {
        rating: 4.8,
        text: "Great washing machine for the price. Highly recommend it for its features and efficiency.",
      },
    ],
    avgRating: 4.8,
    imgUrl: washingMachineImage05,
    specifications: [
      "Capacity: 7kg",
      "Type: Front Load",
      "Programs: Multiple Wash Programs",
      "Efficiency: Energy Efficient",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      img1234,
      img1234,
      img1234,
      img1234
    ],
  },
  // Coolers
  {
    id: "13",
    category: "cooler",
    productName: "Symphony Diet 12T Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
  {
    id: "14",
    category: "cooler",
    productName: "Symphony Diet 12T Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1.jpg", // Add actual image URLs here
      "image2.jpg",
      "image3.jpg",
      "image4.jpg"
    ],
  },
  {
    id: "15",
    category: "cooler",
    productName: "Symphony Diet Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
  {
    id: "16",
    category: "cooler",
    productName: "Symphony Diet 12T Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
  {
    id: "17",
    category: "cooler",
    productName: "Symphony Diet 12T Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
    
  },
  {
    id: "18",
    category: "cooler",
    productName: "Symphony Diet 12T Personal Air Cooler",
    companyName: "Symphony",
    price: 6490,
    originalPrice: 10000,
    shortDesc: "Compact and portable air cooler for personal cooling.",
    description: "Beat the heat with this Symphony Diet 12T Personal Air Cooler. Its compact size makes it perfect for small rooms and personal spaces. It features a 12-liter water tank, three-speed control, and low power consumption.",
    reviews: [
      {
        rating: 4.6,
        text: "Perfect for my small room. Cools effectively and the water tank lasts for a long time.",
      },
      {
        rating: 4.8,
        text: "Very affordable and efficient. A great alternative to an AC for personal cooling.",
      },
      {
        rating: 4.7,
        text: "Happy with the purchase. It's lightweight, portable, and does a good job of cooling.",
      },
    ],
    avgRating: 4.7,
    imgUrl: img1234,
    specifications: [
      "Capacity: 12L",
      "Power Consumption: Low",
      "Speed Control: 3",
      "Portable: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
  // Televisions
  {
    id: "30",
    category: "tv",
    productName: "Samsung 138 cm (55 inches) Crystal 4K Series Ultra HD Smart LED TV",
    companyName: "Samsung",
    price: 52990,
    originalPrice: 70000,
    shortDesc: "Immersive 4K Ultra HD Smart LED TV with crystal-clear picture quality.",
    description: "Experience stunning visuals with this Samsung Crystal 4K Series Ultra HD Smart LED TV. Its 55-inch display delivers vibrant colors and sharp details. Enjoy your favorite content with smart features and a sleek design.",
    reviews: [
      {
        rating: 4.9,
        text: "The picture quality is amazing! The colors are vibrant and the details are crystal clear.",
      },
      {
        rating: 4.8,
        text: "Love the smart features. It's easy to navigate and access streaming services.",
      },
      {
        rating: 5,
        text: "Great TV for the price. Highly recommend it for its picture quality and features.",
      },
    ],
    avgRating: 4.9,
    imgUrl: img1234,
    featured: true,
    specifications: [
      "Display: 55 inches",
      "Resolution: 4K Ultra HD",
      "Technology: Crystal",
      "Smart Features: Yes",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
  // Microwave Oven (Added category)
  {
    id: "25",
    category: "Oven",
    productName: "IFB 30 L Convection Microwave Oven",
    companyName: "IFB",
    price: 18990,
    originalPrice: 20000,
    shortDesc: "Versatile convection microwave oven for baking, grilling, and reheating.",
    description: "This IFB Convection Microwave Oven is a kitchen essential. With a 30-liter capacity, it's suitable for families of all sizes. Bake delicious cakes, grill meat to perfection, or reheat leftovers with ease.",
    reviews: [
      {
        rating: 4.7,
        text: "Love the convection feature. It bakes evenly and the grilling function is fantastic.",
      },
      {
        rating: 4.9,
        text: "Very easy to use and clean. The microwave is spacious and heats food quickly.",
      },
      {
        rating: 4.8,
        text: "Great microwave for the price. It's versatile and has all the features I need.",
      },
    ],
    avgRating: 4.8,
    imgUrl: microwaveImage01,
    specifications: [
      "Capacity: 30L",
      "Type: Convection",
      "Functions: Baking, Grilling, Reheating",
      "Ease of Use: High",
    ],
    returnPolicy: "30-day return policy. Product must be in original condition.",
    additionalImages: [
      "image1", // Add actual image URLs here
      "image2",
      "image3",
      "image4"
    ],
  },
];
import { Destination } from '../types';

export const IMAGES = {
  heroLake: "/998ad918-016b-47fa-b81f-c4b22e00d24a.jpg",
  goa: "/goa.png",
  kerala: "/kerala.png",
  kolkata: "/kolkata.png",
  mussoorie: "/mussoorie.png",
  mumbai: "/mumbai.png",
  foodLocal: "/4850d186-be61-4188-be46-379c78aced34.jpg",
  foodStreet: "/120bcd39-8958-4b38-9556-43e1c3314097.jpg",
  foodFine: "/3c80af2d-99f5-4a04-ac8f-a5530426226d.jpg",
  trek: "/e365dde7-9421-491f-8a47-2dd786585015.jpg",
  culture: "/95534c07-263b-4244-9d9b-ff0e594d8322.jpg",
  kyoto: "/64884a2b-e055-4153-9bdb-2ac3542f3ae6.jpg",
  santorini: "/abb44cca-7476-456b-987c-0e76a111e3ff.jpg",
  bali: "/ac2e119f-65ca-4e4f-997a-ec102d01a2ae.jpg",
  manali: "/7081e96c-9d41-4635-ba0d-9316c4886606.jpg",
  jaipur: "/f58d8a15-524b-44fd-8c02-18e4f4f3db05.jpg",
  dubai: "/7c8cc87c-7d11-4e98-aa4b-266f7ff43db2.jpg",
  swissAlps: "/b6de9981-f5f1-41f6-bde5-3be277e6375e.jpg"
};

export const destinations: Destination[] = [
{
  id: 'kerala',
  name: 'Kerala',
  country: 'India',
  image: IMAGES.kerala,
  rating: 4.8,
  reviews: 22400,
  budgetFrom: 21000,
  bestSeason: 'Sep – Mar',
  durationDays: 6,
  description: 'Backwater cruises, tea hills and ayurveda retreats along the Malabar coast.',
  categories: ['Nature', 'Beaches', 'Food'],
  insight: 'Travellers rate overnight houseboats in Alleppey as the single best experience.',
  highlights: ['Calm pace', 'Great vegetarian food', 'Elder friendly'],
  concerns: ['Humidity', 'Long transfer times']
},
{
  id: 'kolkata',
  name: 'Kolkata',
  country: 'India',
  image: IMAGES.kolkata,
  rating: 4.7,
  reviews: 19800,
  budgetFrom: 12000,
  bestSeason: 'Oct – Mar',
  durationDays: 3,
  description: 'Historical architecture, vibrant culture, and the famous street food of the City of Joy.',
  categories: ['Culture', 'Cities', 'Food'],
  insight: 'Community reports suggest visiting during Durga Puja for an unparalleled cultural experience.',
  highlights: ['Victoria Memorial', 'Rich heritage', 'Incredible food'],
  concerns: ['High humidity in summer', 'Heavy traffic']
},
{
  id: 'mussoorie',
  name: 'Mussoorie',
  country: 'India',
  image: IMAGES.mussoorie,
  rating: 4.6,
  reviews: 15300,
  budgetFrom: 14000,
  bestSeason: 'Mar – Jun',
  durationDays: 4,
  description: 'The Queen of Hills, offering majestic views of the Shivalik range and Doon Valley.',
  categories: ['Mountains', 'Nature', 'Cities'],
  insight: 'Take a walk on the Camel Back Road for beautiful and peaceful sunset views.',
  highlights: ['Mall Road strolls', 'Scenic waterfalls', 'Pleasant climate'],
  concerns: ['Crowded in peak summer', 'Cold in winter']
},
{
  id: 'goa',
  name: 'Goa',
  country: 'India',
  image: IMAGES.goa,
  rating: 4.6,
  reviews: 42130,
  budgetFrom: 18500,
  bestSeason: 'Nov – Feb',
  durationDays: 4,
  description: 'Beach shacks, Portuguese heritage lanes and India’s most relaxed coastline.',
  categories: ['Beaches', 'Food', 'Culture'],
  insight: 'Travellers frequently mention South Goa for quiet beaches and authentic local seafood.',
  highlights: ['Budget friendly', 'Great nightlife', 'Easy scooter travel'],
  concerns: ['Monsoon closures', 'Crowded North Goa in December']
},
{
  id: 'mumbai',
  name: 'Mumbai',
  country: 'India',
  image: IMAGES.mumbai,
  rating: 4.9,
  reviews: 45200,
  budgetFrom: 25000,
  bestSeason: 'Nov – Feb',
  durationDays: 3,
  description: 'The city of dreams, home to historic monuments, a fast-paced lifestyle, and coastal views.',
  categories: ['Cities', 'Culture', 'Food'],
  insight: 'Marine Drive at night is highly recommended for a relaxing evening by the sea.',
  highlights: ['Gateway of India', 'Vibrant nightlife', 'Iconic street food'],
  concerns: ['Heavy traffic', 'Expensive accommodation']
}
];


export const popularSearches = ['Kerala', 'Goa', 'Mumbai', 'Kolkata', 'Mussoorie'];

export const categoryPills: string[] = [
'All',
'Mountains',
'Beaches',
'Cities',
'Culture',
'Adventure',
'Nature',
'Food'];


export function findDestination(id: string) {
  return destinations.find((d) => d.id === id);
}
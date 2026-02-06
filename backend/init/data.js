const sampleListings = [
  {
    title: "Beachfront Paradise Villa",
    description: "Stunning beachfront villa with private access to pristine white sand beaches. Wake up to ocean views, enjoy water sports, and relax in luxury.",
    image: {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      filename: "beachfront_villa"
    },
    price: 15000,
    location: "Goa, India",
    country: "India",
    category: "Beachfront",
    amenities: ["WiFi", "Pool", "Beach access", "Kitchen", "AC", "TV"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.2993]
    }
  },
  {
    title: "Arctic Aurora Cabin",
    description: "Cozy cabin in the Arctic region perfect for witnessing the Northern Lights. Heated interior, sauna, and windows perfect for aurora hunting.",
    image: {
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
      filename: "arctic_cabin"
    },
    price: 12000,
    location: "Tromsø, Norway",
    country: "Norway",
    category: "Arctic",
    amenities: ["Heating", "Sauna", "WiFi", "Kitchen", "Telescope"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 5,
    geometry: {
      type: "Point",
      coordinates: [18.9553, 69.6492]
    }
  },
  {
    title: "Iconic Bell Tower Suite",
    description: "Historic bell tower converted into a luxury studio with 360-degree city views. Located in the heart of Europe's most charming historic district.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      filename: "bell_tower"
    },
    price: 8500,
    location: "Prague, Czech Republic",
    country: "Czech Republic",
    category: "Trending",
    amenities: ["WiFi", "City view", "Kitchen", "Washing machine", "Heating"],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    geometry: {
      type: "Point",
      coordinates: [14.4071, 50.0755]
    }
  },
  {
    title: "Luxury Mountain Mansion",
    description: "Sprawling mountain mansion with panoramic views, infinity pool, and premium amenities. Perfect for family getaways or celebrations.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      filename: "mountain_mansion"
    },
    price: 18000,
    location: "Manali, Himachal Pradesh, India",
    country: "India",
    category: "Mansions",
    amenities: ["Pool", "WiFi", "Kitchen", "Heating", "TV", "Gym", "Library"],
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 15,
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2396]
    }
  },
  {
    title: "Riverside Cabin with Amazing Views",
    description: "Secluded cabin nestled by a river with breathtaking valley views. Perfect for nature lovers seeking peace and tranquility.",
    image: {
      url: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800&h=600&fit=crop",
      filename: "riverside_cabin"
    },
    price: 6500,
    location: "Rishikesh, Uttarakhand, India",
    country: "India",
    category: "Amazing views",
    amenities: ["River view", "Kitchen", "WiFi", "Bathroom", "Garden"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0889]
    }
  },
  {
    title: "Traditional Island Farm House",
    description: "Working farm on a small island with organic vegetables, chickens, and traditional lifestyle. Learn farm activities while enjoying island life.",
    image: {
      url: "https://images.unsplash.com/photo-1516455207990-7a41904c5119?w=800&h=600&fit=crop",
      filename: "island_farm"
    },
    price: 4500,
    location: "Maldives",
    country: "Maldives",
    category: "Islands",
    amenities: ["Farm activities", "WiFi", "Kitchen", "Garden", "Organic food"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    geometry: {
      type: "Point",
      coordinates: [73.5081, 4.1694]
    }
  },
  {
    title: "Lakeside Castle Manor",
    description: "Stunning 18th-century castle overlooking a pristine lake. With period furnishings, modern amenities, and fairytale charm.",
    image: {
      url: "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800&h=600&fit=crop",
      filename: "lakeside_castle"
    },
    price: 16000,
    location: "Interlaken, Switzerland",
    country: "Switzerland",
    category: "Castles",
    amenities: ["Lake view", "Kitchen", "Dining room", "WiFi", "Gym", "Library"],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 12,
    geometry: {
      type: "Point",
      coordinates: [8.2275, 46.6437]
    }
  },
  {
    title: "Desert Dome Luxury Glamping",
    description: "Unique white dome tent in the middle of Rajasthan desert. Experience desert stargazing with all modern luxuries.",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
      filename: "desert_dome"
    },
    price: 7500,
    location: "Jaisalmer, Rajasthan, India",
    country: "India",
    category: "Domes",
    amenities: ["AC", "Desert view", "Hot water", "WiFi", "Restaurant access"],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    geometry: {
      type: "Point",
      coordinates: [70.9121, 26.9124]
    }
  },
  {
    title: "Cozy Ski Lodge Cabin",
    description: "Perfect ski-in, ski-out lodge in the Swiss Alps. After a day of skiing, warm up by the fireplace with hot chocolate.",
    image: {
      url: "https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=800&h=600&fit=crop",
      filename: "ski_lodge"
    },
    price: 13000,
    location: "Zermatt, Switzerland",
    country: "Switzerland",
    category: "Skiing",
    amenities: ["Ski access", "Fireplace", "Kitchen", "Hot tub", "WiFi", "Sauna"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    geometry: {
      type: "Point",
      coordinates: [7.7491, 46.0207]
    }
  },
  {
    title: "Tiny Minimalist House",
    description: "Charming 280 sq ft tiny home with all essentials. Perfect for couples or solo travelers who appreciate minimalist design.",
    image: {
      url: "https://images.unsplash.com/photo-1533907523868-9dcc6b47b46b?w=800&h=600&fit=crop",
      filename: "tiny_house"
    },
    price: 3500,
    location: "Portland, Oregon, USA",
    country: "USA",
    category: "Tiny homes",
    amenities: ["WiFi", "Kitchen", "Bathroom", "Heating", "Smart design"],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    geometry: {
      type: "Point",
      coordinates: [-122.6762, 45.5152]
    }
  }
];

module.exports = sampleListings;

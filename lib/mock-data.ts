export interface Model3D {
  id: string
  name: string
  author: string
  likes: number
  downloads: number
  image: string
  description: string
  publishedDate: string
  tags: string[]
}

export const mockModels: Model3D[] = [
  {
    id: "1",
    name: "Articulated Dragon",
    author: "PrintMaster3D",
    likes: 2847,
    downloads: 15234,
    image: "/articulated-dragon-3d-model.jpg",
    description:
      "A fully articulated dragon model with movable joints. Perfect for display or as a fidget toy. No supports needed! Print-in-place design with excellent articulation.",
    publishedDate: "2024-01-15",
    tags: ["dragon", "articulated", "toy", "print-in-place"],
  },
  {
    id: "2",
    name: "Modular Planter Set",
    author: "GreenThumb3D",
    likes: 1923,
    downloads: 8456,
    image: "/modular-geometric-planter-3d-model.jpg",
    description:
      "A set of modular planters with geometric designs. Stack them, arrange them, or use them individually. Drainage holes included for proper plant care.",
    publishedDate: "2024-01-20",
    tags: ["planter", "modular", "home-decor", "functional"],
  },
  {
    id: "3",
    name: "Mechanical Gear Clock",
    author: "ClockworkDesigns",
    likes: 3421,
    downloads: 12890,
    image: "/mechanical-gear-clock-3d-model.jpg",
    description:
      "A stunning mechanical clock with visible gears. Requires assembly and a clock mechanism (not included). Makes a great desk decoration and conversation piece.",
    publishedDate: "2024-01-10",
    tags: ["clock", "mechanical", "gears", "functional"],
  },
  {
    id: "4",
    name: "Miniature House",
    author: "ArchitectPrints",
    likes: 1567,
    downloads: 6234,
    image: "/miniature-house-architecture-3d-model.jpg",
    description:
      "Detailed miniature house with removable roof. Perfect for dioramas, model railways, or as a standalone display piece. Includes interior details.",
    publishedDate: "2024-01-25",
    tags: ["house", "architecture", "miniature", "diorama"],
  },
  {
    id: "5",
    name: "Flexi Rex",
    author: "DinoDesigner",
    likes: 4123,
    downloads: 18567,
    image: "/flexible-t-rex-dinosaur-3d-model.jpg",
    description:
      "A flexible T-Rex that can be posed in various positions. Print-in-place design with no assembly required. Great for kids and dinosaur enthusiasts!",
    publishedDate: "2024-01-05",
    tags: ["dinosaur", "flexible", "toy", "print-in-place"],
  },
  {
    id: "6",
    name: "Desk Organizer Pro",
    author: "OfficeHelper",
    likes: 2156,
    downloads: 9876,
    image: "/modern-desk-organizer-3d-model.jpg",
    description:
      "Professional desk organizer with compartments for pens, paper clips, and small items. Sleek modern design that fits any workspace aesthetic.",
    publishedDate: "2024-01-18",
    tags: ["organizer", "desk", "functional", "office"],
  },
  {
    id: "7",
    name: "Crystal Vase",
    author: "VaseArtisan",
    likes: 1834,
    downloads: 5432,
    image: "/geometric-crystal-vase-3d-model.jpg",
    description:
      "Elegant geometric vase with crystal-like facets. Waterproof when printed with the right settings. Perfect for fresh or artificial flowers.",
    publishedDate: "2024-01-22",
    tags: ["vase", "geometric", "home-decor", "functional"],
  },
  {
    id: "8",
    name: "Phone Stand Deluxe",
    author: "TechAccessories",
    likes: 2945,
    downloads: 14567,
    image: "/adjustable-phone-stand-3d-model.jpg",
    description:
      "Adjustable phone stand with cable management. Works with most phone sizes and cases. Non-slip base keeps your device secure.",
    publishedDate: "2024-01-12",
    tags: ["phone-stand", "tech", "functional", "adjustable"],
  },
  {
    id: "9",
    name: "Fantasy Chess Set",
    author: "ChessMaster3D",
    likes: 3678,
    downloads: 11234,
    image: "/fantasy-chess-pieces-3d-model.jpg",
    description:
      "Complete fantasy-themed chess set with dragons, wizards, and knights. Includes all 32 pieces plus a printable board. Highly detailed sculpts.",
    publishedDate: "2024-01-08",
    tags: ["chess", "fantasy", "game", "detailed"],
  },
  {
    id: "10",
    name: "Cable Management Box",
    author: "TidyTech",
    likes: 1678,
    downloads: 7890,
    image: "/cable-management-box-3d-model.jpg",
    description:
      "Hide messy cables with this sleek cable management box. Multiple entry points for different cable sizes. Keeps your workspace clean and organized.",
    publishedDate: "2024-01-28",
    tags: ["cable-management", "tech", "functional", "organizer"],
  },
  {
    id: "11",
    name: "Succulent Pot Collection",
    author: "PlantLover3D",
    likes: 2234,
    downloads: 8901,
    image: "/small-succulent-pots-3d-model.jpg",
    description:
      "Collection of 5 different small pots perfect for succulents. Each has a unique geometric pattern. Drainage holes included.",
    publishedDate: "2024-01-14",
    tags: ["planter", "succulent", "collection", "home-decor"],
  },
  {
    id: "12",
    name: "Headphone Stand Elite",
    author: "AudioGear3D",
    likes: 2567,
    downloads: 10234,
    image: "/modern-headphone-stand-3d-model.jpg",
    description:
      "Premium headphone stand with weighted base. Fits all headphone sizes. Includes cable holder to keep your desk tidy.",
    publishedDate: "2024-01-16",
    tags: ["headphone-stand", "tech", "functional", "audio"],
  },
]

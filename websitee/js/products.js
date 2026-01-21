// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        category: "smartphones",
        price: 1099.99,
        image: "📱",
        description: "Latest iPhone with advanced camera system and A16 Bionic chip.",
        fullDescription: "The iPhone 14 Pro Max features the most advanced iPhone camera system ever, powered by the A16 Bionic chip. Experience incredible low-light photography, 4K video recording, and all-day battery life in a stunning titanium design.",
        specs: {
            "Display": "6.7-inch Super Retina XDR",
            "Chip": "A16 Bionic",
            "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
            "Battery": "Up to 29 hours video playback",
            "Storage": "128GB, 256GB, 512GB, 1TB",
            "Colors": "Deep Purple, Gold, Silver, Space Black"
        },
        featured: true
    },
    {
        id: 2,
        name: "MacBook Pro 14-inch",
        category: "laptops",
        price: 1999.99,
        image: "💻",
        description: "Powerful laptop with M2 Pro chip for professional workflows.",
        fullDescription: "The MacBook Pro 14-inch with M2 Pro chip delivers exceptional performance for demanding workflows. Features a stunning Liquid Retina XDR display, advanced camera and audio, and all the ports you need.",
        specs: {
            "Chip": "Apple M2 Pro",
            "Display": "14.2-inch Liquid Retina XDR",
            "Memory": "16GB unified memory",
            "Storage": "512GB SSD",
            "Battery": "Up to 18 hours",
            "Ports": "3x Thunderbolt 4, HDMI, MagSafe 3"
        },
        featured: true
    },
    {
        id: 3,
        name: "iPad Air",
        category: "tablets",
        price: 599.99,
        image: "📲",
        description: "Versatile tablet with M1 chip and support for Apple Pencil.",
        fullDescription: "iPad Air with M1 chip delivers incredible performance in a gorgeous, ultra-portable design. Perfect for creative work, gaming, and productivity with support for Apple Pencil and Magic Keyboard.",
        specs: {
            "Chip": "Apple M1",
            "Display": "10.9-inch Liquid Retina",
            "Storage": "64GB, 256GB",
            "Camera": "12MP Wide, 12MP Ultra Wide front",
            "Connectivity": "Wi-Fi 6, 5G available",
            "Colors": "Space Gray, Starlight, Pink, Purple, Blue"
        },
        featured: true
    },
    {
        id: 4,
        name: "AirPods Pro (2nd gen)",
        category: "accessories",
        price: 249.99,
        image: "🎧",
        description: "Premium wireless earbuds with active noise cancellation.",
        fullDescription: "AirPods Pro (2nd generation) feature the Apple H2 chip for smarter noise cancellation and three-dimensional sound. Includes up to 6 hours of listening time and up to 30 hours with the charging case.",
        specs: {
            "Chip": "Apple H2",
            "Audio": "Adaptive Transparency, Active Noise Cancellation",
            "Battery": "Up to 6 hours listening time",
            "Case": "MagSafe Charging Case",
            "Water Resistance": "IPX4",
            "Controls": "Touch control, Siri"
        },
        featured: false
    },
    {
        id: 5,
        name: "Samsung Galaxy S23 Ultra",
        category: "smartphones",
        price: 1199.99,
        image: "📱",
        description: "Android flagship with S Pen and advanced camera system.",
        fullDescription: "Samsung Galaxy S23 Ultra combines the power of a smartphone with the functionality of a computer and the creativity of a camera. Features built-in S Pen, 200MP camera, and all-day battery life.",
        specs: {
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 2",
            "Camera": "200MP Wide, 10MP Telephoto, 10MP Periscope Telephoto, 12MP Ultrawide",
            "RAM": "8GB, 12GB",
            "Storage": "256GB, 512GB, 1TB",
            "S Pen": "Built-in S Pen"
        },
        featured: true
    },
    {
        id: 6,
        name: "Dell XPS 13",
        category: "laptops",
        price: 1299.99,
        image: "💻",
        description: "Ultra-portable laptop with InfinityEdge display.",
        fullDescription: "Dell XPS 13 features a stunning InfinityEdge display and premium materials in an incredibly compact form factor. Perfect for professionals who need power and portability.",
        specs: {
            "Processor": "12th Gen Intel Core i7",
            "Display": "13.4-inch FHD+ InfinityEdge",
            "RAM": "16GB LPDDR5",
            "Storage": "512GB PCIe SSD",
            "Graphics": "Intel Iris Xe",
            "Battery": "Up to 12 hours"
        },
        featured: false
    },
    {
        id: 7,
        name: "Surface Pro 9",
        category: "tablets",
        price: 999.99,
        image: "📲",
        description: "2-in-1 laptop and tablet with Windows 11.",
        fullDescription: "Surface Pro 9 is the most powerful Pro ever, with laptop-class performance in an ultra-portable tablet design. Perfect for work, creativity, and entertainment with the versatility of Windows 11.",
        specs: {
            "Processor": "12th Gen Intel Core i5/i7",
            "Display": "13-inch PixelSense Flow",
            "RAM": "8GB, 16GB, 32GB",
            "Storage": "128GB, 256GB, 512GB, 1TB SSD",
            "Battery": "Up to 15.5 hours",
            "Connectivity": "Wi-Fi 6E, Bluetooth 5.1"
        },
        featured: false
    },
    {
        id: 8,
        name: "Sony WH-1000XM5",
        category: "accessories",
        price: 399.99,
        image: "🎧",
        description: "Premium over-ear headphones with industry-leading noise cancellation.",
        fullDescription: "Sony WH-1000XM5 wireless headphones offer industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life. Perfect for travel, work, and everyday listening.",
        specs: {
            "Driver": "30mm",
            "Noise Cancellation": "Industry-leading with V1 + V2 processors",
            "Battery": "Up to 30 hours with ANC",
            "Connectivity": "Bluetooth 5.2, NFC, 3.5mm",
            "Weight": "250g",
            "Controls": "Touch sensor, voice assistant"
        },
        featured: true
    }
];

// Make products available globally
window.products = products;
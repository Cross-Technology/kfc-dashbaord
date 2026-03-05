import { Menu } from "@/types/menu";

export const datas: Menu[] = [
    {
        id: "kfc-01",
        name: "7-Up Liquid",
        description: "ភេសជ្ជៈហ្គាសរសជាតិក្រូចឆ្មារ ស្រស់ស្រាយខ្លាំង។",
        basePrice: 1.10,
        categoryId: "cat-drinks",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s1", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s2", name: "Large", additionalPrice: 0.40 }
        ],
        addons: [{ id: "a1", name: "Extra Ice", additionalPrice: 0.10 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-02",
        name: "BBQ Drumsticks (2 Pcs)",
        description: "មាន់បំពងស្រោចទឹកជ្រលក់ BBQ ឈ្ងុយឆ្ងាញ់។",
        basePrice: 3.80,
        categoryId: "cat-chicken",
        image: "/images/products/test-image.jpg",
        status: "hot_item",
        sizes: [
            { id: "s3", name: "Standard", additionalPrice: 0, isDefault: true },
            { id: "s4", name: "Up-size to 3 Pcs", additionalPrice: 1.50 }
        ],
        addons: [{ id: "a2", name: "Extra BBQ Sauce", additionalPrice: 0.30 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-03",
        name: "Caffé Latte",
        description: "កាហ្វេឡាតេ ក្ដៅឬត្រជាក់ តាមជម្រើសរបស់អ្នក។",
        basePrice: 2.20,
        categoryId: "cat-drinks",
        image: "/images/products/test-image.jpg",
        status: "new_arrival",
        sizes: [
            { id: "s5", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s6", name: "Large", additionalPrice: 0.60 }
        ],
        addons: [{ id: "a3", name: "Caramel Syrup", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-04",
        name: "Chicken AM Muffin",
        description: "មូហ្វហ្វីនសាច់មាន់សម្រាប់អាហារពេលព្រឹក។",
        basePrice: 2.50,
        categoryId: "cat-breakfast",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s7", name: "Single Muffin", additionalPrice: 0, isDefault: true },
            { id: "s8", name: "Double Patty", additionalPrice: 1.20 }
        ],
        addons: [{ id: "a4", name: "Add Egg", additionalPrice: 0.60 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-05",
        name: "Chicken Nuggets",
        description: "សាច់មាន់ដុំតូចៗបំពងស្រួយ ញ៉ាំងាយស្រួល។",
        basePrice: 2.50,
        categoryId: "cat-sides",
        image: "/images/products/test-image.jpg",
        status: "on_sale",
        sizes: [
            { id: "s9", name: "6 Pcs", additionalPrice: 0, isDefault: true },
            { id: "s10", name: "9 Pcs", additionalPrice: 1.00 }
        ],
        addons: [{ id: "a5", name: "Cheese Dip", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-06",
        name: "Chicken Porridge Box",
        description: "បបរមាន់ក្តៅៗ បែបអាស៊ី។",
        basePrice: 2.00,
        categoryId: "cat-breakfast",
        image: "/images/products/test-image.jpg",
        status: "new_arrival",
        sizes: [
            { id: "s11", name: "Regular Bowl", additionalPrice: 0, isDefault: true },
            { id: "s12", name: "Large Bowl", additionalPrice: 0.70 }
        ],
        addons: [{ id: "a6", name: "Extra Fried Bread", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-07",
        name: "Coleslaw Salad",
        description: "សាលាត់ស្ពៃក្តោបស្រស់ លាយជាមួយគ្រីមម៉ាយ៉ូណេស។",
        basePrice: 1.50,
        categoryId: "cat-sides",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s13", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s14", name: "Large", additionalPrice: 0.80 }
        ],
        addons: [{ id: "a7", name: "Extra Dressing", additionalPrice: 0.30 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-08",
        name: "Colonel Burger",
        description: "ហាំប៊ឺហ្គ័រសាច់មាន់បំពងទន់ល្មម រសជាតិខ្លាស៊ីក។",
        basePrice: 3.20,
        categoryId: "cat-burgers",
        image: "/images/products/test-image.jpg",
        status: "on_sale",
        sizes: [
            { id: "s15", name: "A La Carte", additionalPrice: 0, isDefault: true },
            { id: "s16", name: "Combo Set", additionalPrice: 1.80 }
        ],
        addons: [{ id: "a8", name: "Cheese Slice", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-09",
        name: "Egg Tart Box",
        description: "នំអ៊ុតតាតស្រួយសំបក ផ្អែមឈ្ងុយស្នូល។",
        basePrice: 0.90,
        categoryId: "cat-desserts",
        image: "/images/products/test-image.jpg",
        status: "hot_item",
        sizes: [
            { id: "s17", name: "1 Pc", additionalPrice: 0, isDefault: true },
            { id: "s18", name: "Box of 6", additionalPrice: 4.10 }
        ],
        addons: [{ id: "a9", name: "Extra Sweetener", additionalPrice: 0.20 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-10",
        name: "French Fries Gold",
        description: "ដំឡូងបំពងពណ៌មាស ស្រួយក្រៅទន់ក្នុង។",
        basePrice: 1.25,
        categoryId: "cat-sides",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s19", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s20", name: "Large", additionalPrice: 0.65 }
        ],
        addons: [{ id: "a10", name: "Cheese Sauce", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-11",
        name: "Hot & Spicy Chicken",
        description: "មាន់បំពងរសជាតិហឹរស្រួយ ក្ដៅស្រើបដល់ចិត្ត។",
        basePrice: 1.90,
        categoryId: "cat-chicken",
        image: "/images/products/test-image.jpg",
        status: "hot_item",
        sizes: [
            { id: "s21", name: "1 Pc", additionalPrice: 0, isDefault: true },
            { id: "s22", name: "2 Pcs", additionalPrice: 1.80 }
        ],
        addons: [{ id: "a11", name: "Spicy Powder", additionalPrice: 0.20 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-12",
        name: "Iced Lemon Tea",
        description: "តែក្រូចឆ្មារត្រជាក់ កាត់ជាតិខ្លាញ់បានយ៉ាងល្អ។",
        basePrice: 1.50,
        categoryId: "cat-drinks",
        image: "/images/products/test-image.jpg",
        status: "new_arrival",
        sizes: [
            { id: "s23", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s24", name: "Large", additionalPrice: 0.50 }
        ],
        addons: [{ id: "a12", name: "Fresh Lemon Slice", additionalPrice: 0.30 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-13",
        name: "KFC Rice Box",
        description: "បាយសាច់មាន់បំពងជាមួយទឹកជ្រលក់ហ្គ្រេវី។",
        basePrice: 2.80,
        categoryId: "cat-rice",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s25", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s26", name: "Double Rice", additionalPrice: 0.50 }
        ],
        addons: [{ id: "a13", name: "Fried Egg", additionalPrice: 0.60 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-14",
        name: "Original Recipe Chicken",
        description: "មាន់បំពងរូបមន្តដើម ១១ មុខគ្រឿងទេស។",
        basePrice: 1.90,
        categoryId: "cat-chicken",
        image: "/images/products/test-image.jpg",
        status: "hot_item",
        sizes: [
            { id: "s27", name: "1 Pc", additionalPrice: 0, isDefault: true },
            { id: "s28", name: "2 Pcs", additionalPrice: 1.80 }
        ],
        addons: [{ id: "a14", name: "Honey Mustard Dip", additionalPrice: 0.40 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-15",
        name: "Pepsi Cola",
        description: "ភេសជ្ជៈហ្គាសត្រជាក់ចិត្ត ញ៉ាំជាមួយម្ហូបបំពង។",
        basePrice: 1.10,
        categoryId: "cat-drinks",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s29", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s30", name: "Large", additionalPrice: 0.40 }
        ],
        addons: [{ id: "a15", name: "Extra Lemon", additionalPrice: 0.20 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-16",
        name: "Popcorn Chicken Large",
        description: "សាច់មាន់ដុំតូចៗបំពងស្រួយ ញ៉ាំជក់មាត់។",
        basePrice: 2.50,
        categoryId: "cat-sides",
        image: "/images/products/test-image.jpg",
        status: "new_arrival",
        sizes: [
            { id: "s31", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s32", name: "Family Size", additionalPrice: 1.50 }
        ],
        addons: [{ id: "a16", name: "BBQ Powder", additionalPrice: 0.30 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-17",
        name: "Spicy Rice Bowl",
        description: "បាយសាច់មាន់ហឹរដិតដល់ចិត្ត។",
        basePrice: 2.50,
        categoryId: "cat-rice",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s33", name: "Regular Bowl", additionalPrice: 0, isDefault: true },
            { id: "s34", name: "Giant Bowl", additionalPrice: 1.20 }
        ],
        addons: [{ id: "a17", name: "Extra Spicy Sauce", additionalPrice: 0.25 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-18",
        name: "Whipped Potato Gravy",
        description: "ដំឡូងបារាំងកិនម៉ត់ ជាមួយទឹកជ្រលក់ពិសេស។",
        basePrice: 1.50,
        categoryId: "cat-sides",
        image: "/images/products/test-image.jpg",
        status: "available",
        sizes: [
            { id: "s35", name: "Regular", additionalPrice: 0, isDefault: true },
            { id: "s36", name: "Large", additionalPrice: 0.80 }
        ],
        addons: [{ id: "a18", name: "Extra Gravy", additionalPrice: 0.40 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-19",
        name: "Zinger Burger Hot",
        description: "ហាំប៊ឺហ្គ័រសាច់មាន់ហឹរ ស្រួយឆ្ងាញ់។",
        basePrice: 3.50,
        categoryId: "cat-burgers",
        image: "/images/products/test-image.jpg",
        status: "hot_item",
        sizes: [
            { id: "s37", name: "A La Carte", additionalPrice: 0, isDefault: true },
            { id: "s38", name: "Combo with Drink", additionalPrice: 1.50 }
        ],
        addons: [{ id: "a19", name: "Extra Cheese Slice", additionalPrice: 0.50 }],
        createdAt: new Date(), updatedAt: new Date()
    },
    {
        id: "kfc-20",
        name: "Zinger Twister Wrap",
        description: "សាច់មាន់ Zinger រុំជាមួយបន្ទះនំ Tortilla។",
        basePrice: 3.30,
        categoryId: "cat-burgers",
        image: "/images/products/test-image.jpg",
        status: "new_arrival",
        sizes: [
            { id: "s39", name: "Single Wrap", additionalPrice: 0, isDefault: true },
            { id: "s40", name: "Double Wrap", additionalPrice: 2.00 }
        ],
        addons: [{ id: "a20", name: "Cheese Sauce Inside", additionalPrice: 0.40 }],
        createdAt: new Date(), updatedAt: new Date()
    }
];
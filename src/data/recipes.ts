import { Recipe } from '../types/recipe';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'tuscan-garlic-chicken',
    title: 'Creamy Tuscan Garlic Chicken',
    subtitle: 'Golden seared chicken breasts in a rich garlic, sun-dried tomato, and spinach cream sauce.',
    description: 'An elegant restaurant-quality dinner made in just 30 minutes in a single skillet. Tender chicken bathed in a velvety parmesan cream sauce flavored with fragrant garlic, sweet sun-dried tomatoes, and tender baby spinach.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    baseServings: 4,
    dietaryTags: ['Keto', 'High-Protein', 'Gluten-Free', 'Quick (<30m)'],
    moodTags: ['Comfort Food', 'Date Night', 'One-Pot Wonder', 'High Protein'],
    nutrition: {
      calories: 480,
      protein: 42,
      carbs: 8,
      fat: 32,
      fiber: 2
    },
    ingredients: [
      { item: 'Chicken Breast', amount: 4, unit: 'fillets', metricAmount: 650, metricUnit: 'g', notes: 'boneless, skinless', category: 'Meat' },
      { item: 'Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Butter', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'g', category: 'Dairy' },
      { item: 'Garlic', amount: 5, unit: 'cloves', metricAmount: 5, metricUnit: 'cloves', notes: 'finely minced', category: 'Produce' },
      { item: 'Heavy Cream', amount: 1, unit: 'cup', metricAmount: 240, metricUnit: 'ml', category: 'Dairy' },
      { item: 'Chicken Broth', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Sun-Dried Tomatoes', amount: 0.5, unit: 'cup', metricAmount: 80, metricUnit: 'g', notes: 'drained and sliced', category: 'Pantry' },
      { item: 'Baby Spinach', amount: 3, unit: 'cups', metricAmount: 100, metricUnit: 'g', notes: 'fresh', category: 'Produce' },
      { item: 'Parmesan Cheese', amount: 0.75, unit: 'cup', metricAmount: 75, metricUnit: 'g', notes: 'freshly grated', category: 'Dairy' },
      { item: 'Italian Herb Seasoning', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Salt & Black Pepper', amount: 1, unit: 'pinch', metricAmount: 2, metricUnit: 'g', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Season the Chicken',
        instruction: 'Pat the chicken breasts dry with paper towels. Season both sides generously with salt, freshly cracked black pepper, and Italian seasoning.',
        ingredientsUsed: ['Chicken Breast', 'Italian Herb Seasoning', 'Salt & Black Pepper'],
        tip: 'Drying the chicken first ensures a deep golden-brown sear instead of steaming.'
      },
      {
        stepNumber: 2,
        title: 'Sear Chicken to Golden Perfection',
        instruction: 'Heat 1 tbsp olive oil and 1 tbsp butter in a large heavy skillet over medium-high heat. Add chicken and sear undisturbed for 5-6 minutes per side until golden brown and internal temperature reaches 165°F (74°C). Transfer chicken to a plate and cover loosely with foil.',
        timerSeconds: 360,
        ingredientsUsed: ['Chicken Breast', 'Olive Oil', 'Butter'],
        tip: 'Do not crowd the skillet so each piece caramelizes evenly.'
      },
      {
        stepNumber: 3,
        title: 'Sauté the Aromatics',
        instruction: 'In the same skillet over medium heat, melt the remaining 1 tbsp butter. Add minced garlic and drained sun-dried tomatoes. Sauté for about 1 minute until fragrant.',
        timerSeconds: 60,
        ingredientsUsed: ['Garlic', 'Sun-Dried Tomatoes', 'Butter'],
        tip: 'Keep garlic moving so it does not scorch and turn bitter.'
      },
      {
        stepNumber: 4,
        title: 'Simmer the Velvety Cream Sauce',
        instruction: 'Pour in the chicken broth and heavy cream. Scrape up any browned bits stuck to the bottom of the pan with a wooden spatula. Bring to a gentle simmer for 3 minutes until slightly thickened. Stir in the grated parmesan cheese until completely melted and smooth.',
        timerSeconds: 180,
        ingredientsUsed: ['Chicken Broth', 'Heavy Cream', 'Parmesan Cheese']
      },
      {
        stepNumber: 5,
        title: 'Wilt Spinach & Return Chicken',
        instruction: 'Add the fresh baby spinach to the simmering sauce. Stir until the spinach wilts down (about 2 minutes). Return the rested chicken along with any accumulated plate juices back into the skillet. Spoon sauce over the chicken and simmer for 1 final minute.',
        timerSeconds: 120,
        ingredientsUsed: ['Baby Spinach', 'Chicken Breast'],
        tip: 'Serve with crusty rustic bread, over fettuccine, or with steamed vegetables for a low-carb feast!'
      }
    ],
    rating: 4.9,
    reviewCount: 342,
    author: 'Chef Lorenzo'
  },
  {
    id: 'sesame-garlic-ramen',
    title: '15-Minute Sesame Garlic Chili Ramen',
    subtitle: 'Ultra-quick savory noodles in a rich chili sesame oil broth with soft eggs and scallions.',
    description: 'Elevate instant ramen noodles into an addictive, gourmet Japanese street food experience in just 15 minutes with garlic, toasted sesame, soy sauce, and a crispy runny fried egg.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Asian',
    mealType: 'Lunch',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    baseServings: 2,
    dietaryTags: ['Vegetarian', 'Quick (<30m)'],
    moodTags: ['Quick & Easy', 'Comfort Food', 'One-Pot Wonder'],
    nutrition: {
      calories: 420,
      protein: 16,
      carbs: 54,
      fat: 17,
      fiber: 3
    },
    ingredients: [
      { item: 'Ramen Noodles', amount: 2, unit: 'packs', metricAmount: 180, metricUnit: 'g', notes: 'discard seasoning packets', category: 'Pantry' },
      { item: 'Garlic', amount: 4, unit: 'cloves', metricAmount: 4, metricUnit: 'cloves', notes: 'grated', category: 'Produce' },
      { item: 'Soy Sauce', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Toasted Sesame Oil', amount: 1.5, unit: 'tbsp', metricAmount: 22, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Chili Crisp / Sriracha', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Brown Sugar / Honey', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Pantry' },
      { item: 'Eggs', amount: 2, unit: 'large', metricAmount: 2, metricUnit: 'items', category: 'Dairy' },
      { item: 'Green Onions (Scallions)', amount: 3, unit: 'stalks', metricAmount: 30, metricUnit: 'g', notes: 'finely sliced', category: 'Produce' },
      { item: 'Toasted Sesame Seeds', amount: 1, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Boil Noodles',
        instruction: 'Bring a pot of water to a rolling boil. Drop in the ramen noodle bricks and cook for 3 minutes until tender but still springy (al dente). Reserve 1/4 cup of starchy cooking water, then drain noodles.',
        timerSeconds: 180,
        ingredientsUsed: ['Ramen Noodles'],
        tip: 'Rinse briefly with cool water to halt cooking if your sauce is not ready yet.'
      },
      {
        stepNumber: 2,
        title: 'Whisk the Flavor Base',
        instruction: 'In a serving bowl, whisk together the grated garlic, soy sauce, toasted sesame oil, chili crisp, brown sugar, and 2 tbsp of the hot reserved noodle water until glossy and combined.',
        ingredientsUsed: ['Garlic', 'Soy Sauce', 'Toasted Sesame Oil', 'Chili Crisp / Sriracha', 'Brown Sugar / Honey']
      },
      {
        stepNumber: 3,
        title: 'Crispy Fried Egg',
        instruction: 'Heat a drizzle of sesame oil in a small nonstick pan over medium-high heat. Crack the eggs and fry for 2-3 minutes until the whites are golden-crisp around the edges with warm runny yolks.',
        timerSeconds: 150,
        ingredientsUsed: ['Eggs', 'Toasted Sesame Oil']
      },
      {
        stepNumber: 4,
        title: 'Toss and Garnish',
        instruction: 'Toss the warm drained noodles thoroughly in the garlic-sesame sauce so every strand is coated. Top with the crispy fried eggs, heaps of sliced scallions, and toasted sesame seeds.',
        ingredientsUsed: ['Green Onions (Scallions)', 'Toasted Sesame Seeds', 'Eggs']
      }
    ],
    rating: 4.8,
    reviewCount: 520,
    author: 'Chef Kenji'
  },
  {
    id: 'mediterranean-lemon-salmon',
    title: 'Pan-Seared Lemon Herb Salmon',
    subtitle: 'Crispy-skin wild salmon fillets basted with garlic butter, fresh dill, and tangy lemon juice.',
    description: 'A heart-healthy Mediterranean dinner bursting with vibrant citrus, rich omega-3s, and aromatic fresh herbs. Ready in 20 minutes from pan to plate.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    baseServings: 2,
    dietaryTags: ['Gluten-Free', 'Keto', 'High-Protein', 'Low-Carb', 'Quick (<30m)'],
    moodTags: ['Light & Fresh', 'High Protein', 'Date Night', 'Quick & Easy'],
    nutrition: {
      calories: 410,
      protein: 38,
      carbs: 3,
      fat: 28,
      fiber: 1
    },
    ingredients: [
      { item: 'Salmon Fillets', amount: 2, unit: 'fillets', metricAmount: 380, metricUnit: 'g', notes: 'skin-on, center-cut', category: 'Meat' },
      { item: 'Olive Oil', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Butter', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'g', category: 'Dairy' },
      { item: 'Garlic', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', notes: 'smashed', category: 'Produce' },
      { item: 'Lemon', amount: 1, unit: 'whole', metricAmount: 1, metricUnit: 'items', notes: 'juiced + half sliced', category: 'Produce' },
      { item: 'Fresh Dill', amount: 2, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', notes: 'chopped', category: 'Produce' },
      { item: 'Salt & Black Pepper', amount: 1, unit: 'pinch', metricAmount: 2, metricUnit: 'g', category: 'Spices' },
      { item: 'Capers', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'g', notes: 'optional', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Prep the Salmon',
        instruction: 'Pat salmon skin completely dry. Score the skin lightly with a sharp knife and season both sides with sea salt and black pepper.',
        ingredientsUsed: ['Salmon Fillets', 'Salt & Black Pepper'],
        tip: 'Dry skin is the secret to shatteringly crisp salmon skin.'
      },
      {
        stepNumber: 2,
        title: 'Crisp the Skin',
        instruction: 'Heat olive oil in a stainless steel or cast-iron skillet over medium-high heat until shimmering. Place salmon skin-side down. Press gently with a spatula for 10 seconds. Sear without moving for 5 minutes until skin is golden and crispy.',
        timerSeconds: 300,
        ingredientsUsed: ['Salmon Fillets', 'Olive Oil']
      },
      {
        stepNumber: 3,
        title: 'Butter Baste and Finish',
        instruction: 'Flip salmon. Reduce heat to medium. Drop in butter, smashed garlic, lemon slices, and capers. As the butter foams, tilt the skillet and continuously spoon the melted garlic-lemon butter over the salmon for 3 minutes.',
        timerSeconds: 180,
        ingredientsUsed: ['Butter', 'Garlic', 'Lemon', 'Capers']
      },
      {
        stepNumber: 4,
        title: 'Finish with Herbs',
        instruction: 'Squeeze fresh lemon juice over the fish and scatter chopped fresh dill. Serve immediately with the pan juices spooned generously over top.',
        ingredientsUsed: ['Fresh Dill', 'Lemon']
      }
    ],
    rating: 4.9,
    reviewCount: 288,
    author: 'Chef Elena'
  },
  {
    id: 'chicken-tikka-masala',
    title: 'Classic Rich Butter Chicken',
    subtitle: 'Tender tandoori-marinated chicken bites simmered in a silky tomato, butter, and cashew cream sauce.',
    description: 'An iconic Indian culinary masterpiece. Succulent chicken pieces bathed in a luscious, aromatic gravy perfumed with garam masala, fenugreek, and sweet cream.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    mealType: 'Dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    baseServings: 4,
    dietaryTags: ['Gluten-Free', 'High-Protein'],
    moodTags: ['Comfort Food', 'Date Night'],
    nutrition: {
      calories: 560,
      protein: 44,
      carbs: 14,
      fat: 36,
      fiber: 3
    },
    ingredients: [
      { item: 'Chicken Thighs', amount: 1.5, unit: 'lbs', metricAmount: 700, metricUnit: 'g', notes: 'boneless, cut into bite-sized pieces', category: 'Meat' },
      { item: 'Greek Yogurt', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'g', category: 'Dairy' },
      { item: 'Garlic & Ginger Paste', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'g', category: 'Produce' },
      { item: 'Garam Masala', amount: 2, unit: 'tsp', metricAmount: 10, metricUnit: 'g', category: 'Spices' },
      { item: 'Kashmiri Chili Powder', amount: 1.5, unit: 'tsp', metricAmount: 8, metricUnit: 'g', category: 'Spices' },
      { item: 'Butter', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', category: 'Dairy' },
      { item: 'Tomato Puree', amount: 1.5, unit: 'cups', metricAmount: 360, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Heavy Cream', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml', category: 'Dairy' },
      { item: 'Kasuri Methi (Dried Fenugreek)', amount: 1, unit: 'tbsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Sugar / Honey', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate Chicken',
        instruction: 'In a bowl, combine chicken pieces with yogurt, 1 tbsp ginger-garlic paste, 1 tsp garam masala, 1 tsp chili powder, and 1 tsp salt. Marinate for at least 15 minutes (or overnight).',
        timerSeconds: 900,
        ingredientsUsed: ['Chicken Thighs', 'Greek Yogurt', 'Garlic & Ginger Paste', 'Garam Masala', 'Kashmiri Chili Powder']
      },
      {
        stepNumber: 2,
        title: 'Sear Chicken Pieces',
        instruction: 'Melt 1 tbsp butter in a large skillet over high heat. Add marinated chicken in a single layer and sear for 3-4 minutes per side until charred on the edges. Remove chicken to a plate (does not need to be fully cooked inside yet).',
        timerSeconds: 420,
        ingredientsUsed: ['Chicken Thighs', 'Butter']
      },
      {
        stepNumber: 3,
        title: 'Simmer the Tomato Gravy',
        instruction: 'Melt remaining butter in the same pan over medium heat. Add remaining ginger-garlic paste and sauté for 1 minute. Pour in tomato puree, remaining spices, and sugar. Simmer covered for 10 minutes until oil starts separating from the sauce.',
        timerSeconds: 600,
        ingredientsUsed: ['Butter', 'Garlic & Ginger Paste', 'Tomato Puree', 'Sugar / Honey']
      },
      {
        stepNumber: 4,
        title: 'Blend and Finish with Cream',
        instruction: 'Stir in heavy cream and kasuri methi (rubbed between palms to release aroma). Return seared chicken pieces and simmer gently for 5 minutes until chicken is cooked through and sauce is velvety.',
        timerSeconds: 300,
        ingredientsUsed: ['Heavy Cream', 'Kasuri Methi (Dried Fenugreek)', 'Chicken Thighs'],
        tip: 'Serve with warm garlic butter naan or basmati rice.'
      }
    ],
    rating: 4.95,
    reviewCount: 610,
    author: 'Chef Ananya'
  },
  {
    id: 'shakshuka-feta',
    title: 'North African Shakshuka with Feta',
    subtitle: 'Gently poached eggs in a smoky, spicy tomato and bell pepper sauce topped with creamy sheep feta.',
    description: 'A vibrant one-skillet breakfast or brunch sensation. Fresh bell peppers, sweet onions, cumin, and smoked paprika stewed with ripe crushed tomatoes, finished with runny golden yolks and fresh cilantro.',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Middle Eastern',
    mealType: 'Breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    baseServings: 3,
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Keto', 'Quick (<30m)'],
    moodTags: ['Comfort Food', 'One-Pot Wonder', 'Light & Fresh'],
    nutrition: {
      calories: 310,
      protein: 17,
      carbs: 18,
      fat: 20,
      fiber: 4
    },
    ingredients: [
      { item: 'Eggs', amount: 5, unit: 'large', metricAmount: 5, metricUnit: 'items', category: 'Dairy' },
      { item: 'Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Yellow Onion', amount: 1, unit: 'medium', metricAmount: 150, metricUnit: 'g', notes: 'diced', category: 'Produce' },
      { item: 'Red Bell Pepper', amount: 1, unit: 'large', metricAmount: 180, metricUnit: 'g', notes: 'chopped', category: 'Produce' },
      { item: 'Garlic', amount: 4, unit: 'cloves', metricAmount: 4, metricUnit: 'cloves', notes: 'minced', category: 'Produce' },
      { item: 'Ground Cumin', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Smoked Paprika', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Crushed Tomatoes', amount: 1, unit: 'can (14oz)', metricAmount: 400, metricUnit: 'g', category: 'Pantry' },
      { item: 'Feta Cheese', amount: 0.5, unit: 'cup', metricAmount: 80, metricUnit: 'g', notes: 'crumbled', category: 'Dairy' },
      { item: 'Fresh Cilantro / Parsley', amount: 2, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soften the Peppers and Onions',
        instruction: 'Heat olive oil in a deep 10-inch skillet over medium heat. Add chopped onions and bell peppers. Cook for 5-7 minutes until soft and lightly golden.',
        timerSeconds: 360,
        ingredientsUsed: ['Olive Oil', 'Yellow Onion', 'Red Bell Pepper']
      },
      {
        stepNumber: 2,
        title: 'Toast the Spices & Add Tomatoes',
        instruction: 'Stir in minced garlic, cumin, smoked paprika, and 1/2 tsp salt. Cook for 1 minute until fragrant. Pour in the crushed tomatoes and simmer on low for 10 minutes until sauce thickens.',
        timerSeconds: 600,
        ingredientsUsed: ['Garlic', 'Ground Cumin', 'Smoked Paprika', 'Crushed Tomatoes']
      },
      {
        stepNumber: 3,
        title: 'Poach the Eggs',
        instruction: 'Use the back of a spoon to create 5 small wells in the tomato sauce. Crack an egg directly into each well. Cover skillet with a lid and cook on low for 5-7 minutes until egg whites are set and yolks remain soft.',
        timerSeconds: 360,
        ingredientsUsed: ['Eggs']
      },
      {
        stepNumber: 4,
        title: 'Garnish & Serve',
        instruction: 'Remove lid, scatter crumbled feta cheese and chopped fresh cilantro over the hot skillet. Serve immediately with warm pita or sourdough bread for dipping.',
        ingredientsUsed: ['Feta Cheese', 'Fresh Cilantro / Parsley'],
        tip: 'Dip warm crusty bread directly into the runny yolks!'
      }
    ],
    rating: 4.88,
    reviewCount: 412,
    author: 'Chef Youssef'
  },
  {
    id: 'avocado-toast-chili-crisp',
    title: 'Gourmet Avocado Toast with Crispy Fried Egg',
    subtitle: 'Thick sourdough toast topped with mashed lime avocado, runny egg, flaky sea salt, and spicy chili crunch.',
    description: 'The supreme café-style breakfast made in 10 minutes. Creamy hass avocado meets tangy lime, crisp toasted artisan sourdough, and a sizzling chili-oil fried egg.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    mealType: 'Breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 5,
    baseServings: 1,
    dietaryTags: ['Vegetarian', 'Quick (<30m)', 'High-Protein'],
    moodTags: ['Quick & Easy', 'Light & Fresh'],
    nutrition: {
      calories: 380,
      protein: 15,
      carbs: 32,
      fat: 23,
      fiber: 8
    },
    ingredients: [
      { item: 'Sourdough Bread', amount: 2, unit: 'thick slices', metricAmount: 100, metricUnit: 'g', category: 'Pantry' },
      { item: 'Ripe Avocado', amount: 1, unit: 'large', metricAmount: 180, metricUnit: 'g', category: 'Produce' },
      { item: 'Eggs', amount: 2, unit: 'large', metricAmount: 2, metricUnit: 'items', category: 'Dairy' },
      { item: 'Chili Crisp Oil', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Lime Juice', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Produce' },
      { item: 'Flaky Sea Salt & Pepper', amount: 1, unit: 'pinch', metricAmount: 2, metricUnit: 'g', category: 'Spices' },
      { item: 'Microgreens / Herbs', amount: 1, unit: 'handful', metricAmount: 15, metricUnit: 'g', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Toast the Bread',
        instruction: 'Toast the sourdough slices until deeply golden and crunchy on the outside, yet soft in the middle.',
        timerSeconds: 150,
        ingredientsUsed: ['Sourdough Bread']
      },
      {
        stepNumber: 2,
        title: 'Mash Avocado',
        instruction: 'Scoop avocado flesh into a bowl. Mash coarsely with a fork along with fresh lime juice, flaky sea salt, and black pepper. Keep some texture.',
        ingredientsUsed: ['Ripe Avocado', 'Lime Juice', 'Flaky Sea Salt & Pepper']
      },
      {
        stepNumber: 3,
        title: 'Fry Eggs in Chili Crisp',
        instruction: 'Heat chili crisp oil in a non-stick skillet over medium-high heat. Crack in the eggs. Fry for 2 minutes until whites are crispy and bubbly around the edges with golden runny yolks.',
        timerSeconds: 120,
        ingredientsUsed: ['Eggs', 'Chili Crisp Oil']
      },
      {
        stepNumber: 4,
        title: 'Assemble & Serve',
        instruction: 'Spread the mashed avocado generously over both toasts. Slide a chili-fried egg on top of each slice. Garnish with microgreens and an extra drizzle of spicy chili crunch.',
        ingredientsUsed: ['Microgreens / Herbs', 'Chili Crisp Oil']
      }
    ],
    rating: 4.85,
    reviewCount: 390,
    author: 'Chef Chloe'
  },
  {
    id: 'mexican-street-tacos',
    title: 'Authentic Street-Style Chicken Tacos',
    subtitle: 'Juicy spiced chicken in warm corn tortillas with diced white onion, fresh cilantro, salsa verde, and lime.',
    description: 'Crispy-edged, smokey lime-marinated chicken thighs loaded into doubled warm corn tortillas with chopped onions, fresh cilantro, cotija cheese, and fresh salsa verde.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mexican',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    baseServings: 4,
    dietaryTags: ['Gluten-Free', 'High-Protein', 'Quick (<30m)'],
    moodTags: ['Quick & Easy', 'Comfort Food', 'High Protein'],
    nutrition: {
      calories: 440,
      protein: 36,
      carbs: 34,
      fat: 18,
      fiber: 5
    },
    ingredients: [
      { item: 'Chicken Thighs', amount: 1.5, unit: 'lbs', metricAmount: 700, metricUnit: 'g', notes: 'boneless, skinless', category: 'Meat' },
      { item: 'Corn Tortillas', amount: 8, unit: 'small', metricAmount: 8, metricUnit: 'items', category: 'Pantry' },
      { item: 'White Onion', amount: 0.5, unit: 'medium', metricAmount: 80, metricUnit: 'g', notes: 'finely diced', category: 'Produce' },
      { item: 'Fresh Cilantro', amount: 0.5, unit: 'cup', metricAmount: 25, metricUnit: 'g', notes: 'chopped', category: 'Produce' },
      { item: 'Lime', amount: 2, unit: 'whole', metricAmount: 2, metricUnit: 'items', notes: 'cut into wedges', category: 'Produce' },
      { item: 'Chili Powder', amount: 1, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', category: 'Spices' },
      { item: 'Ground Cumin', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Garlic Powder', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Spices' },
      { item: 'Olive Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Cotija Cheese', amount: 0.25, unit: 'cup', metricAmount: 40, metricUnit: 'g', notes: 'crumbled', category: 'Dairy' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate Chicken',
        instruction: 'Toss chicken thighs with olive oil, juice of 1 lime, chili powder, cumin, garlic powder, and 1 tsp salt.',
        ingredientsUsed: ['Chicken Thighs', 'Olive Oil', 'Lime', 'Chili Powder', 'Ground Cumin', 'Garlic Powder']
      },
      {
        stepNumber: 2,
        title: 'Grill or Pan-Sear',
        instruction: 'Heat a heavy skillet or grill pan on high heat. Cook chicken thighs undisturbed for 5-6 minutes per side until charred on the outside and cooked to 165°F (74°C). Rest on a cutting board for 5 minutes, then chop into bite-sized pieces.',
        timerSeconds: 360,
        ingredientsUsed: ['Chicken Thighs']
      },
      {
        stepNumber: 3,
        title: 'Warm the Tortillas',
        instruction: 'Char corn tortillas in a dry skillet over medium-high heat for 30 seconds on each side until blistered and pliable.',
        timerSeconds: 60,
        ingredientsUsed: ['Corn Tortillas']
      },
      {
        stepNumber: 4,
        title: 'Assemble Street Tacos',
        instruction: 'Layer warm tortillas (double up for authentic street style). Fill generously with chopped charred chicken. Top with diced white onion, heaps of cilantro, cotija cheese, and fresh lime wedges.',
        ingredientsUsed: ['White Onion', 'Fresh Cilantro', 'Cotija Cheese', 'Lime']
      }
    ],
    rating: 4.92,
    reviewCount: 470,
    author: 'Chef Mateo'
  },
  {
    id: 'mushroom-parmesan-risotto',
    title: 'Creamy Wild Mushroom & Thyme Risotto',
    subtitle: 'Slow-simmered Arborio rice with caramelized wild mushrooms, white wine, garlic, and aged parmesan.',
    description: 'The ultimate comforting Italian classic. Plump arborio rice slowly absorbs rich vegetable broth, releasing velvety starch that marries sautéed cremini and shiitake mushrooms, fresh thyme, and melted Parmigiano-Reggiano.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    mealType: 'Dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    baseServings: 4,
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Comfort Food', 'Date Night'],
    nutrition: {
      calories: 450,
      protein: 12,
      carbs: 62,
      fat: 16,
      fiber: 4
    },
    ingredients: [
      { item: 'Arborio Rice', amount: 1.5, unit: 'cups', metricAmount: 300, metricUnit: 'g', category: 'Pantry' },
      { item: 'Mixed Mushrooms', amount: 12, unit: 'oz', metricAmount: 350, metricUnit: 'g', notes: 'cremini and shiitake, sliced', category: 'Produce' },
      { item: 'Vegetable Broth', amount: 5, unit: 'cups', metricAmount: 1200, metricUnit: 'ml', notes: 'kept warm', category: 'Pantry' },
      { item: 'Dry White Wine', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Shallots', amount: 2, unit: 'medium', metricAmount: 60, metricUnit: 'g', notes: 'minced', category: 'Produce' },
      { item: 'Garlic', amount: 3, unit: 'cloves', metricAmount: 3, metricUnit: 'cloves', notes: 'minced', category: 'Produce' },
      { item: 'Butter', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', category: 'Dairy' },
      { item: 'Parmesan Cheese', amount: 0.75, unit: 'cup', metricAmount: 75, metricUnit: 'g', notes: 'grated', category: 'Dairy' },
      { item: 'Fresh Thyme', amount: 1, unit: 'tbsp', metricAmount: 5, metricUnit: 'g', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Caramelize the Mushrooms',
        instruction: 'Melt 1 tbsp butter with 1 tbsp olive oil in a wide Dutch oven over high heat. Add sliced mushrooms and fresh thyme. Sear undisturbed for 4 minutes until deeply browned and golden. Season with salt and transfer half to a bowl for topping.',
        timerSeconds: 240,
        ingredientsUsed: ['Mixed Mushrooms', 'Butter', 'Fresh Thyme']
      },
      {
        stepNumber: 2,
        title: 'Toast the Arborio Rice',
        instruction: 'Reduce heat to medium. Add 1 tbsp butter to the pan along with minced shallots and garlic. Cook for 2 minutes. Add dry Arborio rice and toast for 2 minutes, stirring continuously until the rice edges turn translucent.',
        timerSeconds: 120,
        ingredientsUsed: ['Butter', 'Shallots', 'Garlic', 'Arborio Rice']
      },
      {
        stepNumber: 3,
        title: 'Deglaze with White Wine',
        instruction: 'Pour in dry white wine, scraping up all flavorful brown bits from the bottom. Let the wine simmer until completely absorbed by the rice (about 2 minutes).',
        timerSeconds: 120,
        ingredientsUsed: ['Dry White Wine']
      },
      {
        stepNumber: 4,
        title: 'Slowly Add Broth',
        instruction: 'Begin adding warm vegetable broth one ladle at a time (about 3/4 cup), stirring frequently. Allow liquid to absorb almost completely before adding the next ladle. Continue for 18-20 minutes until rice is al dente and creamy.',
        timerSeconds: 1200,
        ingredientsUsed: ['Vegetable Broth'],
        tip: 'Gentle stirring releases starch from arborio grains without breaking them.'
      },
      {
        stepNumber: 5,
        title: 'Mantecatura (Enrich with Butter & Cheese)',
        instruction: 'Remove pot from heat. Vigorously stir in the remaining 1 tbsp cold butter and grated parmesan cheese. Cover for 2 minutes. Spoon into warm shallow bowls and crown with the reserved caramelized mushrooms.',
        timerSeconds: 120,
        ingredientsUsed: ['Butter', 'Parmesan Cheese', 'Mixed Mushrooms']
      }
    ],
    rating: 4.91,
    reviewCount: 315,
    author: 'Chef Marco'
  },
  {
    id: 'thai-basil-chicken-pad-krapow',
    title: 'Thai Holy Basil Chicken (Pad Krapow Gai)',
    subtitle: 'Fiery minced chicken stir-fried with Thai chilis, garlic, savory soy sauce, and fragrant sweet basil.',
    description: 'Thailand\'s most beloved street food dish. Intense heat, savory oyster sauce, fragrant garlic, and handfuls of sweet Thai basil served over jasmine rice with a crispy fried egg.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Asian',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    baseServings: 2,
    dietaryTags: ['Dairy-Free', 'High-Protein', 'Quick (<30m)'],
    moodTags: ['Quick & Easy', 'High Protein', 'One-Pot Wonder'],
    nutrition: {
      calories: 430,
      protein: 38,
      carbs: 18,
      fat: 22,
      fiber: 1
    },
    ingredients: [
      { item: 'Ground Chicken or Turkey', amount: 1, unit: 'lb', metricAmount: 450, metricUnit: 'g', category: 'Meat' },
      { item: 'Thai Birdseye Chilis', amount: 3, unit: 'chilis', metricAmount: 3, metricUnit: 'items', notes: 'sliced (adjust to heat preference)', category: 'Produce' },
      { item: 'Garlic', amount: 6, unit: 'cloves', metricAmount: 6, metricUnit: 'cloves', notes: 'coarsely pounded', category: 'Produce' },
      { item: 'Oyster Sauce', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Soy Sauce', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Fish Sauce', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Brown Sugar', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'g', category: 'Pantry' },
      { item: 'Fresh Thai Basil', amount: 1.5, unit: 'cups', metricAmount: 40, metricUnit: 'g', notes: 'leaves picked', category: 'Produce' },
      { item: 'Vegetable Oil', amount: 2, unit: 'tbsp', metricAmount: 30, metricUnit: 'ml', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mix Stir-Fry Sauce',
        instruction: 'In a small bowl, mix oyster sauce, soy sauce, fish sauce, brown sugar, and 1 tbsp water until sugar is dissolved.',
        ingredientsUsed: ['Oyster Sauce', 'Soy Sauce', 'Fish Sauce', 'Brown Sugar']
      },
      {
        stepNumber: 2,
        title: 'Wok Fry Aromatics',
        instruction: 'Heat vegetable oil in a wok or large heavy skillet over high heat until smoking hot. Add pounded garlic and Thai chilis. Stir-fry rapidly for 30 seconds until intensely aromatic.',
        timerSeconds: 30,
        ingredientsUsed: ['Vegetable Oil', 'Garlic', 'Thai Birdseye Chilis']
      },
      {
        stepNumber: 3,
        title: 'Sear the Chicken',
        instruction: 'Add ground chicken, breaking it apart with a wooden spatula. Stir-fry over maximum heat for 3-4 minutes until chicken is cooked through with caramelized edges.',
        timerSeconds: 240,
        ingredientsUsed: ['Ground Chicken or Turkey']
      },
      {
        stepNumber: 4,
        title: 'Sauce and Basil Finish',
        instruction: 'Pour in the sauce mixture and toss vigorously for 1 minute until sauce glazes the meat. Turn off the heat. Immediately toss in the fresh Thai basil leaves. Let residual heat wilt the leaves for 30 seconds. Serve immediately over hot jasmine rice.',
        timerSeconds: 60,
        ingredientsUsed: ['Fresh Thai Basil']
      }
    ],
    rating: 4.93,
    reviewCount: 388,
    author: 'Chef Somchai'
  },
  {
    id: 'blueberry-buttermilk-pancakes',
    title: 'Cloud-Fluffy Blueberry Buttermilk Pancakes',
    subtitle: 'Extra-thick, golden diner-style pancakes bursting with sweet blueberries, maple syrup, and melted butter.',
    description: 'The breakfast that transforms mornings. Wholesome buttermilk creates velvety tender cakes packed with juicy popping blueberries, stacked tall with pure Canadian maple syrup.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    mealType: 'Breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    baseServings: 4,
    dietaryTags: ['Vegetarian'],
    moodTags: ['Sweet Tooth', 'Comfort Food'],
    nutrition: {
      calories: 390,
      protein: 10,
      carbs: 58,
      fat: 14,
      fiber: 3
    },
    ingredients: [
      { item: 'All-Purpose Flour', amount: 2, unit: 'cups', metricAmount: 250, metricUnit: 'g', category: 'Pantry' },
      { item: 'Baking Powder', amount: 2, unit: 'tsp', metricAmount: 10, metricUnit: 'g', category: 'Pantry' },
      { item: 'Baking Soda', amount: 0.5, unit: 'tsp', metricAmount: 3, metricUnit: 'g', category: 'Pantry' },
      { item: 'Granulated Sugar', amount: 2, unit: 'tbsp', metricAmount: 25, metricUnit: 'g', category: 'Pantry' },
      { item: 'Salt', amount: 0.5, unit: 'tsp', metricAmount: 3, metricUnit: 'g', category: 'Spices' },
      { item: 'Buttermilk', amount: 1.75, unit: 'cups', metricAmount: 420, metricUnit: 'ml', category: 'Dairy' },
      { item: 'Eggs', amount: 2, unit: 'large', metricAmount: 2, metricUnit: 'items', category: 'Dairy' },
      { item: 'Melted Butter', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'g', category: 'Dairy' },
      { item: 'Vanilla Extract', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Fresh Blueberries', amount: 1.5, unit: 'cups', metricAmount: 200, metricUnit: 'g', category: 'Produce' },
      { item: 'Pure Maple Syrup', amount: 0.5, unit: 'cup', metricAmount: 120, metricUnit: 'ml', notes: 'for serving', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk Dry and Wet Ingredients',
        instruction: 'In a large bowl, whisk flour, baking powder, baking soda, sugar, and salt. In a separate bowl, whisk buttermilk, eggs, melted butter, and vanilla. Pour wet ingredients into dry ingredients.',
        ingredientsUsed: ['All-Purpose Flour', 'Baking Powder', 'Baking Soda', 'Granulated Sugar', 'Salt', 'Buttermilk', 'Eggs', 'Melted Butter', 'Vanilla Extract']
      },
      {
        stepNumber: 2,
        title: 'Gently Mix Batter',
        instruction: 'Fold gently with a spatula just until combined. Small lumps are completely fine! Let batter rest on the counter for 5-10 minutes to allow the leaveners to activate.',
        timerSeconds: 300,
        tip: 'Overmixing develops gluten and makes pancakes rubbery instead of fluffy.'
      },
      {
        stepNumber: 3,
        title: 'Griddle the Pancakes',
        instruction: 'Heat a nonstick skillet or griddle over medium heat. Lightly butter the surface. Pour 1/3 cup of batter per pancake. Scatter 1-2 tbsp fresh blueberries directly on top of each batter circle. Cook for 2-3 minutes until bubbles form and pop on the surface and edges look set.',
        timerSeconds: 180,
        ingredientsUsed: ['Fresh Blueberries']
      },
      {
        stepNumber: 4,
        title: 'Flip to Golden Brown',
        instruction: 'Carefully flip and cook for another 1-2 minutes until bottom is golden and pancake is puffed up. Stack tall with salted butter and warm maple syrup.',
        timerSeconds: 120,
        ingredientsUsed: ['Pure Maple Syrup']
      }
    ],
    rating: 4.94,
    reviewCount: 512,
    author: 'Chef Sarah'
  },
  {
    id: 'molten-chocolate-lava-cake',
    title: 'Decadent Warm Chocolate Lava Cake',
    subtitle: 'Gooey molten dark chocolate center encased in a delicate sponge, dusted with powdered sugar.',
    description: 'The ultimate luxury dessert made shockingly simple in just 20 minutes. Rich bittersweet chocolate and butter bake into individual cakes that erupt with warm liquid ganache at first spoon.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French',
    mealType: 'Dessert',
    difficulty: 'Medium',
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    baseServings: 2,
    dietaryTags: ['Vegetarian'],
    moodTags: ['Sweet Tooth', 'Date Night', 'Comfort Food'],
    nutrition: {
      calories: 460,
      protein: 7,
      carbs: 45,
      fat: 30,
      fiber: 4
    },
    ingredients: [
      { item: 'Dark Bittersweet Chocolate (70%)', amount: 4, unit: 'oz', metricAmount: 115, metricUnit: 'g', notes: 'chopped', category: 'Pantry' },
      { item: 'Unsalted Butter', amount: 0.5, unit: 'cup', metricAmount: 115, metricUnit: 'g', category: 'Dairy' },
      { item: 'Powdered Sugar', amount: 0.5, unit: 'cup', metricAmount: 60, metricUnit: 'g', category: 'Pantry' },
      { item: 'Eggs', amount: 2, unit: 'whole', metricAmount: 2, metricUnit: 'items', category: 'Dairy' },
      { item: 'Egg Yolks', amount: 2, unit: 'yolks', metricAmount: 2, metricUnit: 'items', category: 'Dairy' },
      { item: 'All-Purpose Flour', amount: 3, unit: 'tbsp', metricAmount: 25, metricUnit: 'g', category: 'Pantry' },
      { item: 'Vanilla Extract', amount: 1, unit: 'tsp', metricAmount: 5, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Cocoa Powder', amount: 1, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', notes: 'for dusting ramekins', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preheat Oven & Prep Ramekins',
        instruction: 'Preheat oven to 425°F (220°C). Generously butter two 6-ounce ramekins and dust the insides with cocoa powder, tapping out any excess.',
        ingredientsUsed: ['Unsalted Butter', 'Cocoa Powder']
      },
      {
        stepNumber: 2,
        title: 'Melt Chocolate and Butter',
        instruction: 'In a heatproof bowl set over a pot of barely simmering water (or in short 20-second microwave bursts), melt chocolate and butter together until silky and smooth. Let cool slightly.',
        timerSeconds: 120,
        ingredientsUsed: ['Dark Bittersweet Chocolate (70%)', 'Unsalted Butter']
      },
      {
        stepNumber: 3,
        title: 'Whisk Eggs and Sugar',
        instruction: 'In a medium bowl, whisk together whole eggs, egg yolks, powdered sugar, and vanilla until pale and slightly thick. Gently fold in the melted chocolate mixture, followed by the flour until just incorporated.',
        ingredientsUsed: ['Eggs', 'Egg Yolks', 'Powdered Sugar', 'Vanilla Extract', 'All-Purpose Flour']
      },
      {
        stepNumber: 4,
        title: 'Bake to Molten Perfection',
        instruction: 'Divide batter between ramekins. Bake at 425°F (220°C) for exactly 12 minutes until edges are firm and set, but the center has a gentle, soft wobble. Cool for 1 minute, invert onto dessert plates, dust with powdered sugar, and serve with vanilla bean ice cream.',
        timerSeconds: 720,
        tip: 'Do not overbake! The liquid center depends on precise timing.'
      }
    ],
    rating: 4.98,
    reviewCount: 740,
    author: 'Chef Pierre'
  },
  {
    id: 'garlic-butter-pasta-aglio-e-olio',
    title: 'Traditional Spaghetti Aglio e Olio',
    subtitle: 'Classic Roman spaghetti tossed in fragrant garlic-infused extra virgin olive oil, red pepper flakes, and parsley.',
    description: 'The golden standard of minimalist Italian cooking. Just 5 humble pantry ingredients combine in 15 minutes to create an emulsified, mouthwatering gloss that coats every ribbon of pasta.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    baseServings: 2,
    dietaryTags: ['Vegetarian', 'Quick (<30m)', 'Dairy-Free'],
    moodTags: ['Quick & Easy', 'Comfort Food', 'One-Pot Wonder'],
    nutrition: {
      calories: 440,
      protein: 13,
      carbs: 68,
      fat: 14,
      fiber: 4
    },
    ingredients: [
      { item: 'Spaghetti', amount: 0.5, unit: 'lb', metricAmount: 225, metricUnit: 'g', category: 'Pantry' },
      { item: 'Extra Virgin Olive Oil', amount: 0.33, unit: 'cup', metricAmount: 80, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Garlic', amount: 6, unit: 'cloves', metricAmount: 6, metricUnit: 'cloves', notes: 'thinly sliced', category: 'Produce' },
      { item: 'Red Pepper Chili Flakes', amount: 0.75, unit: 'tsp', metricAmount: 3, metricUnit: 'g', category: 'Spices' },
      { item: 'Fresh Flat-Leaf Parsley', amount: 0.5, unit: 'cup', metricAmount: 20, metricUnit: 'g', notes: 'finely chopped', category: 'Produce' },
      { item: 'Parmigiano-Reggiano', amount: 0.5, unit: 'cup', metricAmount: 50, metricUnit: 'g', notes: 'freshly grated (optional)', category: 'Dairy' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cook Spaghetti Al Dente',
        instruction: 'Bring a large pot of well-salted water to a rolling boil. Drop in spaghetti and cook for 8 minutes until slightly under al dente. CRUCIAL: Reserve 1 full cup of starchy pasta water before draining.',
        timerSeconds: 480,
        ingredientsUsed: ['Spaghetti'],
        tip: 'Starchy pasta cooking water is the secret emulsion binder for authentic Italian pasta sauces.'
      },
      {
        stepNumber: 2,
        title: 'Gently Golden the Garlic',
        instruction: 'In a wide skillet over medium-low heat, heat the olive oil. Add sliced garlic and red pepper flakes. Cook very gently for 2-3 minutes until garlic turns pale golden (do not let it brown or burn).',
        timerSeconds: 150,
        ingredientsUsed: ['Extra Virgin Olive Oil', 'Garlic', 'Red Pepper Chili Flakes']
      },
      {
        stepNumber: 3,
        title: 'Emulsify the Sauce',
        instruction: 'Pour 1/2 cup of reserved starchy pasta water into the skillet. Increase heat to medium-high and swirl vigorously with tongs to create a silky, emulsified sauce.',
        timerSeconds: 60
      },
      {
        stepNumber: 4,
        title: 'Toss and Coat',
        instruction: 'Add drained spaghetti directly into the pan. Toss continuously with tongs for 1-2 minutes until sauce clings to the noodles. Fold in chopped parsley and parmesan. Serve immediately.',
        timerSeconds: 90,
        ingredientsUsed: ['Spaghetti', 'Fresh Flat-Leaf Parsley', 'Parmigiano-Reggiano']
      }
    ],
    rating: 4.87,
    reviewCount: 430,
    author: 'Chef Giovanni'
  },
  {
    id: 'crispy-greek-salad-feta',
    title: 'Crisp Greek Village Salad (Horiatiki)',
    subtitle: 'Ripe vine tomatoes, Persian cucumbers, Kalamata olives, and a slab of Greek feta drenched in oregano olive oil.',
    description: 'No lettuce, no fluff—just peak Mediterranean sunshine. Crisp cucumbers, ruby ripe tomatoes, sharp red onions, briny kalamata olives, and authentic Greek sheep feta.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    mealType: 'Lunch',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    baseServings: 2,
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Keto', 'Low-Carb', 'Quick (<30m)'],
    moodTags: ['Light & Fresh', 'Quick & Easy'],
    nutrition: {
      calories: 290,
      protein: 10,
      carbs: 12,
      fat: 24,
      fiber: 4
    },
    ingredients: [
      { item: 'Ripe Vine Tomatoes', amount: 3, unit: 'large', metricAmount: 400, metricUnit: 'g', notes: 'cut into wedges', category: 'Produce' },
      { item: 'Cucumbers', amount: 2, unit: 'medium', metricAmount: 250, metricUnit: 'g', notes: 'thickly sliced', category: 'Produce' },
      { item: 'Red Onion', amount: 0.5, unit: 'medium', metricAmount: 70, metricUnit: 'g', notes: 'thinly sliced into half-moons', category: 'Produce' },
      { item: 'Kalamata Olives', amount: 0.5, unit: 'cup', metricAmount: 80, metricUnit: 'g', notes: 'pitted', category: 'Pantry' },
      { item: 'Block Feta Cheese', amount: 1, unit: 'block (7oz)', metricAmount: 200, metricUnit: 'g', category: 'Dairy' },
      { item: 'Extra Virgin Olive Oil', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Red Wine Vinegar', amount: 1, unit: 'tbsp', metricAmount: 15, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Dried Oregano', amount: 1, unit: 'tsp', metricAmount: 3, metricUnit: 'g', category: 'Spices' },
      { item: 'Sea Salt', amount: 1, unit: 'pinch', metricAmount: 2, metricUnit: 'g', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Chop Fresh Vegetables',
        instruction: 'Cut tomatoes into juicy wedges, slice cucumbers into thick rounds, and slice red onion thinly.',
        ingredientsUsed: ['Ripe Vine Tomatoes', 'Cucumbers', 'Red Onion']
      },
      {
        stepNumber: 2,
        title: 'Combine in Bowl',
        instruction: 'Place tomatoes, cucumbers, onion, and kalamata olives into a wide serving bowl. Season with sea salt.',
        ingredientsUsed: ['Kalamata Olives', 'Sea Salt']
      },
      {
        stepNumber: 3,
        title: 'Dress and Crown with Feta',
        instruction: 'Drizzle extra virgin olive oil and red wine vinegar over the salad. Place the slab of feta cheese right on top (or break into chunky bites). Rub dried oregano generously over the feta with your fingers. Toss gently just before enjoying.',
        ingredientsUsed: ['Block Feta Cheese', 'Extra Virgin Olive Oil', 'Red Wine Vinegar', 'Dried Oregano'],
        tip: 'Authentic Greek salads use a single slab of feta on top rather than crumbled bits.'
      }
    ],
    rating: 4.89,
    reviewCount: 290,
    author: 'Chef Maria'
  },
  {
    id: 'korean-beef-bulgogi-bowl',
    title: 'Korean Sizzling Beef Bulgogi Rice Bowl',
    subtitle: 'Tender marinated sliced beef with sweet pear soy glaze, kimchi, steamed rice, and sesame seeds.',
    description: 'Sweet, savory, and umami-packed Korean comfort food. Thinly shaved ribeye caramelized in a hot skillet with soy sauce, grated pear, garlic, and toasted sesame oil over warm rice.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Asian',
    mealType: 'Dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    baseServings: 3,
    dietaryTags: ['High-Protein', 'Quick (<30m)', 'Dairy-Free'],
    moodTags: ['Quick & Easy', 'Comfort Food', 'High Protein'],
    nutrition: {
      calories: 520,
      protein: 41,
      carbs: 48,
      fat: 20,
      fiber: 2
    },
    ingredients: [
      { item: 'Beef Ribeye or Sirloin', amount: 1, unit: 'lb', metricAmount: 450, metricUnit: 'g', notes: 'shaved thin', category: 'Meat' },
      { item: 'Soy Sauce', amount: 3, unit: 'tbsp', metricAmount: 45, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Brown Sugar', amount: 1.5, unit: 'tbsp', metricAmount: 20, metricUnit: 'g', category: 'Pantry' },
      { item: 'Sesame Oil', amount: 1.5, unit: 'tbsp', metricAmount: 22, metricUnit: 'ml', category: 'Pantry' },
      { item: 'Asian Pear or Apple', amount: 0.5, unit: 'medium', metricAmount: 80, metricUnit: 'g', notes: 'grated', category: 'Produce' },
      { item: 'Garlic', amount: 4, unit: 'cloves', metricAmount: 4, metricUnit: 'cloves', notes: 'minced', category: 'Produce' },
      { item: 'Cooked Jasmine or Short-Grain Rice', amount: 3, unit: 'cups', metricAmount: 450, metricUnit: 'g', category: 'Pantry' },
      { item: 'Kimchi', amount: 0.5, unit: 'cup', metricAmount: 100, metricUnit: 'g', category: 'Pantry' },
      { item: 'Green Onions', amount: 2, unit: 'stalks', metricAmount: 20, metricUnit: 'g', notes: 'sliced', category: 'Produce' },
      { item: 'Toasted Sesame Seeds', amount: 1, unit: 'tbsp', metricAmount: 10, metricUnit: 'g', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate Shaved Beef',
        instruction: 'Whisk soy sauce, brown sugar, sesame oil, grated pear, minced garlic, and black pepper. Toss shaved beef in marinade for 10-15 minutes.',
        timerSeconds: 600,
        ingredientsUsed: ['Beef Ribeye or Sirloin', 'Soy Sauce', 'Brown Sugar', 'Sesame Oil', 'Asian Pear or Apple', 'Garlic']
      },
      {
        stepNumber: 2,
        title: 'Sizzle the Beef on High Heat',
        instruction: 'Heat a heavy skillet or wok over highest heat with a splash of oil. Spread marinated beef in an even layer. Sear without moving for 2 minutes to get deeply charred caramelized edges, then flip and cook for 1 more minute.',
        timerSeconds: 180,
        ingredientsUsed: ['Beef Ribeye or Sirloin'],
        tip: 'Cook in batches if needed so the meat sears instead of boiling in its juices.'
      },
      {
        stepNumber: 3,
        title: 'Assemble the Bulgogi Bowl',
        instruction: 'Scoop warm steamed rice into bowls. Heap the sizzling caramelized beef on top. Serve with chilled spicy kimchi, sliced green onions, and toasted sesame seeds.',
        ingredientsUsed: ['Cooked Jasmine or Short-Grain Rice', 'Kimchi', 'Green Onions', 'Toasted Sesame Seeds']
      }
    ],
    rating: 4.96,
    reviewCount: 620,
    author: 'Chef Min-ho'
  }
];

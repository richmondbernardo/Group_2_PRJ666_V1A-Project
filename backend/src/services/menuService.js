import MenuCategory from "../models/menuCategory.js";
import MenuItem from "../models/menuItem.js";

export async function getFullMenu() {
  // 1. Fetch categories sorted
  const categories = await MenuCategory.find().sort({ sortOrder: 1 });

  // 2. Fetch items sorted
  const items = await MenuItem.find().sort({ sortOrder: 1 });

  // 3. Build final grouped structure
  const result = categories.map(cat => {
    const catItems = items.filter(item =>
      item.category?.toString() === cat._id.toString()
    );

    return {
      category: {
        id: cat.categoryID,
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder
      },
      items: catItems.map(i => ({
        id: i.itemID,
        name: i.name,
        description: i.description,
        price: i.price,
        imageURL: i.imageURL,
        isAvailable: i.isAvailable,
        sortOrder: i.sortOrder
      }))
    };
  });

  return result;
}

import dayjs from "dayjs";
import mongoose from "mongoose";

//* ingredients Sub-Schema ::
export const ingredientSchema = new mongoose.Schema({
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit: {
    type: String,
    enum: ["gm", "ml", "pc"], //unit types
    required: true,
  },
});

//* Define the menuItems Schema::
const menuItemsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a item name"],
      unique: true,
      trim: true,
    },
    itemCode: {
      type: String,
      required: [true, "Must provide a menu-item code"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Must Provide a price of an Item"],
      minValue: 1,
    },
    images: {
      type: Array,
      defaultValue: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    ingredients: [ingredientSchema],
  },
  {
    timestamps: true,
    strictPopulate: false
  }
);




//* Create the menuItems model using the menuItemsSchema
const MenuItems =
  mongoose.models.MenuItems || mongoose.model("MenuItems", menuItemsSchema);

// Export the menuItems model
export default MenuItems;

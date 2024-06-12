import mongoose from "mongoose";
import MenuItems, { ingredientSchema } from "./menuItems.model";
import Ingredient from "./ingredients.model";
import dayjs from "dayjs";

// orderItems Sub-schema::
const orderItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must Provide the Food Item's Name."],
  },
  itemCode: {
    type: String,
    required: [true, "Must Provide the Food Item's Code."],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  foodItemUID: {
    type: mongoose.Schema.ObjectId,
    ref: "MenuItems",
    required: true,
  },
  ingredients: [ingredientSchema],
});

const foodOrderSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      unique: true,
      required: [true,'Custom Order ID is required!']
    },
    orderType: {
      type: String,
      lowercase: true,
      default: "by restaurant",
      enum: {
        values: ["by restaurant", "by customer", "by waiter"],
        message: "{VALUE} is not supported !",
      },
    },
    orderStatus: {
      type: String,
      lowercase: true,
      default: "pending",
      enum: {
        values: ["pending", "preparing", "served", "canceled", "paid"],
        message: "{VALUE} is not supported !",
      },
    },
    tableCode: {
      type: String,
      trim: true,
    },
    numberOfGuest: {
      type: Number,
      required: [true, "Must Provide Number of Guest"],
      default: 1,
      minValue: 1,
    },
    subTotalPrice: {
      type: Number,
      required: [true, "Must Provide totalPrice"],
      minValue: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    vat: {
      type: Number,
      default: 0,
    },
    payableAmount: {
      type: Number,
      required: [true, "Must be a Positive  Number"],
      minValue: 1,
    },
    orderItems: [orderItemsSchema], // sub schema added ::
    OrderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    recipientsName: {
      type: String,
      required: false,
    },
    recipientsNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validate Food items from DB - (if they exist with exact price,item code & title.)
const validateOrderItems = async (orderItems) => {
  const MenuItem = mongoose.models.MenuItems;
  // loop to see if  item exists:
  for (const orderItem of orderItems) {
    const menuItem = await MenuItem.findOne({
      _id: orderItem.foodItemUID,
      price: orderItem.price,
      itemCode: orderItem.itemCode,
      title: orderItem.title,
    });
    // If any input is not correct throw an error::
    if (!menuItem) {
      throw new Error(
        `Food item with ID "${orderItem.foodItemUID}" not found !`
      );
    }
  }
};

foodOrderSchema.pre("save", async function (next) {
  try {
    await validateOrderItems(this.orderItems);
    next();
  } catch (error) {
    next(error);
  }
});

foodOrderSchema.pre("findOneAndUpdate", async function (next) {
  // console.log(this)
  try {
    // Access the updated document using `this._update`
    const updatedOrderItems = this._update.orderItems;
    await validateOrderItems(updatedOrderItems);
    next();
  } catch (error) {
    next(error);
  }
});

// method to calculate profit from paid orders:⚓
foodOrderSchema.statics.calculateProfit = async function () {
  try {
    const paidOrders = await this.find({ orderStatus: "paid" }).exec();

    let totalProfit = 0;
    paidOrders.forEach((order) => {
      totalProfit += order.payableAmount;
    });
    return totalProfit;
  } catch (error) {
    throw new Error(`Error calculating profit: ${error.message}`);
  }
};

foodOrderSchema.statics.getTopUsersWithOrderCount = async function (limit = 5) {
  try {
    const topUsersWithOrderCount = await this.aggregate([
      // Match orders with a specific status
      {
        $match: { orderStatus: "paid" },
      },
      // Group by the user ID and count the number of orders for each user
      {
        $group: {
          _id: "$OrderedBy", // Group by user ID
          orderCount: { $sum: 1 }, // Count the number of orders
        },
      },
      // Sort in descending order based on the order count
      {
        $sort: { orderCount: -1 },
      },
      // Limit to the specified number of users
      {
        $limit: limit,
      },
      // Optionally, lookup user details based on the user ID
      {
        $lookup: {
          from: "users", // Replace with the actual collection name for users
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      // Optionally, unwind the user details array
      {
        $unwind: "$userDetails",
      },
      // Optionally, project the fields you want to retrieve
      {
        $project: {
          _id: 0, // Exclude the default _id field
          userId: "$_id",
          fullName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
          orderCount: 1,
        },
      },
    ]);

    return topUsersWithOrderCount;
  } catch (error) {
    throw new Error(
      `Error fetching top users with order count: ${error.message}`
    );
  }
};

foodOrderSchema.statics.getTopUsersWithCanceledOrderCount = async function (
  limit = 5
) {
  try {
    const topUsersWithCanceledOrderCount = await this.aggregate([
      // Match orders with a specific status (e.g., 'canceled')
      {
        $match: { orderStatus: "canceled" },
      },
      // Group by the user ID and count the number of canceled orders for each user
      {
        $group: {
          _id: "$OrderedBy", // Group by user ID
          canceledOrderCount: { $sum: 1 }, // Count the number of canceled orders
        },
      },
      // Sort in descending order based on the canceled order count
      {
        $sort: { canceledOrderCount: -1 },
      },
      // Limit to the specified number of users
      {
        $limit: limit,
      },
      // Optionally, lookup user details based on the user ID
      {
        $lookup: {
          from: "users", // Replace with the actual collection name for users
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      // Optionally, unwind the user details array
      {
        $unwind: "$userDetails",
      },
      // Optionally, project the fields you want to retrieve
      {
        $project: {
          _id: 0, // Exclude the default _id field
          userId: "$_id",
          fullName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          }, // Concatenate firstName and lastName fields
          canceledOrderCount: 1,
        },
      },
    ]);

    return topUsersWithCanceledOrderCount;
  } catch (error) {
    throw new Error(
      `Error fetching top users with canceled order count: ${error.message}`
    );
  }
};

/*
 *GET Sales Analytics date wise:: default is Last 30 days:
 * @param {*} menuItemID
 * @param {*} daysAgo
 * @returns
 */
foodOrderSchema.statics.getDateWiseSalesAnalyticsByMenuItemsId =
  async function (menuItemID, daysAgo) {
    try {
      // Get the date based on the dynamic number of days ago
      const startDate = dayjs()
        .subtract(daysAgo, "day")
        .startOf("day")
        .toDate();

      // Find orders within the specified number of days that include the specified menuItemId
      const salesData = await this.aggregate([
        {
          $match: {
            date: { $gte: startDate },
            "orderItems.foodItemUID": new mongoose.Types.ObjectId(menuItemID),
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" },
            },
            saleCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      const formattedSalesData = salesData.map((item) => ({
        date: item._id,
        saleCount: item.saleCount,
      }));

      return formattedSalesData;
    } catch (error) {
      throw new Error(
        `Error fetching sales analytics with id: ${error.message}`
      );
    }
  };

// Create a Model with The order Schema ::
const Order = mongoose.models.Order || mongoose.model("Order", foodOrderSchema);

export default Order;

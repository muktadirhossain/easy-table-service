import mongoose from "mongoose";

// Define the User Schema::
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Custom validation function to check if either email or phoneNumber is provided
          return this.email || this.phoneNumber;
        },
        message: "Email or Phone Number is required",
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Custom validation function to check if either phoneNumber or email is provided
          return this.phoneNumber || this.email;
        },
        message: "Email or Phone Number is required",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
      maxLength: 255,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: "string",
      lowercase: true,
      default: "customer",
      enum: {
        values: ["admin", "manager", "waiter", "chef", "customer"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Custom method to get user role by _id
userSchema.statics.getUserRoleById = async function (userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return user.role;
  } catch (error) {
    throw error;
  }
};

// Create the User model using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export the User model
export default User;

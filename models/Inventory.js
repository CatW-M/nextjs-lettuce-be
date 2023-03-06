import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inventoryItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String, required: true },
        dateAdded: { type: Date, required: true },
        optimalHold: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Inventory =
  mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
export default Inventory;

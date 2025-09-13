import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/finance-tracking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true }, 
  date: { type: Date, default: Date.now },
});
const Transaction = mongoose.model("Transaction", transactionSchema);


router.post("/add", async (req, res) => {
   try {
    const { title, amount, date, category, type } = req.body;

    const transaction = new Transaction({
      title,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount), // subtract for expense
      date,
      category,
      type,
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1 });
    return res.json(txs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    return res.json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, amount, date, category, type } = req.body;

    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      { title, amount, date, category, type }, // ✅ include type
      { new: true, runValidators: true }
    );

    if (!tx) return res.status(404).json({ error: "Not found" });

    return res.json(tx);
  } catch (err) {
    console.error("Error updating transaction:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});


app.use("/api/transactions", router);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

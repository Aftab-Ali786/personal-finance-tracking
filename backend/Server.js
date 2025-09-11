import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/finance-tracking', {
    useNewUrlParser: true,
    useUnifiedTopology: true, })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

    // schema
    const transactionSchema = new mongoose.Schema({
        title:{ type: String, required: true},
        amount:{ type: Number, required: true},
        category:{ type: String, required: true},
        date:{ type: Date, default: Date.now }
    });

    const Transaction = mongoose.model('Transaction', transactionSchema);

   // to add a transaction
   router.post("/add", async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    const tx = new Transaction({ title, amount, date, category });
    await tx.save();
    return res.status(201).json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// to get all transactions
router.get("/", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1 });
    return res.json(txs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// to get a single transaction
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

// to update the transaction
router.put("/:id/edit", async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      { title, amount, date, category },
      { new: true, runValidators: true }
    );
    if (!tx) return res.status(404).json({ error: "Not found" });
    return res.json(tx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// to delete the transaction
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
    

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
   

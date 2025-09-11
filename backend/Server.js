import mongoose from "mongoose";
import express from "express";
import cors from "cors";

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

   
    app.post('/api/transactions', async (req, res) => {

    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
   

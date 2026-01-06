import express from "express";
import callback from "./callback.js";
import { stkPush } from "./stk.js";

const app = express();
app.use(express.json());
app.use(callback);

app.post("/pay", async (req, res) => {
  const { phone, amount, reference } = req.body;
  try {
    const result = await stkPush(phone, amount, reference);
    res.json(result.data);
  } catch(e){
    res.status(500).json({error:e.message});
  }
});

app.listen(3000, ()=>console.log("MPESA LIVE SERVER RUNNING"));

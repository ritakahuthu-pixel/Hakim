import express from "express";
const router = express.Router();

router.post("/api/mpesa/stk-callback", (req, res) => {
  const stk = req.body.Body.stkCallback;
  console.log(stk);
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

export default router;

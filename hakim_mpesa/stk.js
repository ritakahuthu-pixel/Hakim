import axios from "axios";
import { getAccessToken, generatePassword } from "./mpesa.js";

export async function stkPush(phone, amount, reference) {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0,14);
  const password = generatePassword(timestamp);
  const token = await getAccessToken();

  return axios.post(
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: reference,
      TransactionDesc: "Payment"
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

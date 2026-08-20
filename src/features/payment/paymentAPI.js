import API from "../../api/axios";

export const createPaymentOrderAPI = async () => {
  const res = await API.post("/api/payment/create-order");

  return res.data;
};

export const verifyPaymentAPI = async (paymentData) => {
  const res = await API.post("/api/payment/verify", paymentData);

  return res.data;
};
const verifyPayment = async (response: any) => {
  const result = await fetch('/api/verify-payment', {
    method: 'POST',
    body: JSON.stringify(response)
  });
  return result.json();
};

const handleSubscribe = async () => {
  const response = await fetch('/api/create-subscription', {
    method: 'POST'
  });
  
  const { order_id } = await response.json();
  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    amount: "29900", // ₹299
    currency: "INR",
    handler: async (response) => {
      await verifyPayment(response);
    }
  };
  
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}; 
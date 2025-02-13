
const OrderSummary = () => {
  // Manually defined shipping address details
  const shippingAddress = {
    label: 'Home',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'Mumbai',
    state: 'MH',
    zipCode: '400001',
  };

  // Manually defined product and billing details
  const product = {
    id: 1,
    image: 'https://via.placeholder.com/150',
    name: 'Sample Product',
    price: 1000,
    color: 'Red',
    size: 'M',
  };

  const coupon = 'SAVE50';
  const discount = 50; // ₹50 discount
  const finalPrice = product.price - discount;
  const savedAmount = discount;
  const selectedPayment = 'Card'; // Hardcoded payment method for now

  const initiatePayment = () => {
    // Simulate payment initiation (integrate Razorpay as needed)
    alert(`Finalizing payment of ₹${finalPrice} via ${selectedPayment}`);
  };

  return (
    <div className="px-20 py-10">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      {/* Shipping Address Section */}
      <div className="border p-6 rounded mb-6">
        <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
        <p className="font-semibold">{shippingAddress.label}</p>
        <p>{shippingAddress.addressLine1}, {shippingAddress.addressLine2}</p>
        <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zipCode}</p>
      </div>

      {/* Billing & Product Details Section */}
      <div className="border p-6 rounded mb-6">
        <h3 className="text-xl font-bold mb-4">Billing Details</h3>
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-24 h-24 object-cover" 
          />
          <div>
            <p className="font-semibold text-lg">{product.name}</p>
            <p>Color: {product.color} | Size: {product.size}</p>
          </div>
        </div>
        <div className="mb-4">
          <p>
            Actual Price: <span className="font-semibold">₹{product.price}</span>
          </p>
          <p>
            Coupon Applied: <span className="font-semibold">{coupon}</span>
          </p>
          <p>
            Discount: <span className="font-semibold">₹{discount}</span>
          </p>
          <p className="text-xl font-bold">
            Checkout Price: ₹{finalPrice}
          </p>
          <p className="text-green-500">
            You saved ₹{savedAmount}
          </p>
        </div>
        <div>
          <p>
            Payment Method: <span className="font-semibold">{selectedPayment}</span>
          </p>
        </div>
      </div>

      {/* Final Payment Button */}
      <button 
        onClick={initiatePayment} 
        className="bg-secondary_2 text-white px-6 py-3 rounded"
      >
        Final Pay
      </button>
    </div>
  );
};

export default OrderSummary;

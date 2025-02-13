/* eslint-disable react/prop-types */
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const OrderSummary = ({ selectedAddress }) => {
  // Manually defined shipping address details

  const shippingAddress = {
    label: selectedAddress.label,
    firstname: selectedAddress.firstname,
    lastname: selectedAddress.lastname,
    house: selectedAddress.house,
    locality: selectedAddress.locality,
    landmark: selectedAddress.landmark,
    city: selectedAddress.city,
    state: selectedAddress.state,
    pincode: selectedAddress.pincode,
  };
  console.log(shippingAddress);

  // Manually defined product and billing details
  const product = {
    id: 1,
    image: "/images/categories/new_york_green_font_tshirt.webp",
    name: "Sample Product",
    price: 1000,
    color: "Red",
    size: "M",
  };

  const coupon = "SAVE50";
  const discount = 50; // ₹50 discount
  const finalPrice = product.price - discount;
  const savedAmount = discount;
  const selectedPayment = "Card"; // Hardcoded payment method for now

  return (
    <div className="py-5">
      <h2 className="flex items-center gap-2 justify-center text-2xl font-bold mb-10 uppercase">
        <p>Order Summary</p>
        <div>
          <LocalShippingIcon />
        </div>
      </h2>

      {/* Shipping Address Section */}
      <div className="flex items-start gap-5">
        <div className="border border-secondary_2 p-6 rounded mb-6 w-[40%]">
          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
          <p>
            {shippingAddress.firstname} {shippingAddress.lastname}
          </p>
          <p>
            {shippingAddress.house}, <br /> {shippingAddress.locality} <br />{" "}
            {shippingAddress.landmark} <br />
            {shippingAddress.city}, {shippingAddress.state} <br />{" "}
            {shippingAddress.pincode}
          </p>
        </div>

        {/* Billing & Product Details Section */}
        <div className="border border-secondary_2 p-6 rounded mb-6 w-[50%]">
          <h3 className="text-xl font-bold mb-4">Product Details</h3>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover"
            />
            <div>
              <p className="font-semibold text-lg">{product.name}</p>
              <p>
                Color: {product.color} | Size: {product.size}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p>
              Actual Price:{" "}
              <span className="font-semibold">₹{product.price}</span>
            </p>
            <p>
              Coupon Applied: <span className="font-semibold">{coupon}</span>
            </p>
            <p>
              Discount: <span className="font-semibold">₹{discount}</span>
            </p>
            <p className="text-xl font-bold">Checkout Price: ₹{finalPrice}</p>
            <p className="text-green-500">You saved ₹{savedAmount}</p>
          </div>
          <div>
            <p>
              Payment Method:{" "}
              <span className="font-semibold">{selectedPayment}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

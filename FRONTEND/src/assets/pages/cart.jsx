import Shop from "../components/shop";
import items from "../utils/catalog";
const Cart = () => {
  return (
    <section>
      <div>
        {items && items.length > 0 ? (
          <Shop
            itemArray={items}
            heading="My Cart"
            image="/images/just_launched/mythical-dragon-oversized-t-shirt-521913-removebg-preview.webp"
          />
        ) : (
          <p className="text-gray-500 text-center py-4">
            No top deals available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Cart;

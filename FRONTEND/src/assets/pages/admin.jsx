/* eslint-disable no-unused-vars */
import { useState } from "react";
import Nav from "../components/nav2";
import axios from "axios";

const Admin = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
  });

  const [product, setProduct] = useState([]);
  const [roomImgs, setRoomImgs] = useState({});
  const [uploaded, setUploaded] = useState(null);
  const [showStatus, setShowStatus] = useState(null);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const { name, files } = e.target;
    setRoomImgs((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(roomImgs).forEach(
      (key) => roomImgs[key] && data.append(key, roomImgs[key])
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/add-product",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploaded(true);
      setShowStatus(true);
      setProduct((prevProducts) => [...prevProducts, response.data.product]);
      setFormData({
        product_name: "",
        description: "",
        price: "",
        rating: "",
        category: "",
      });
      setRoomImgs({});
    } catch (err) {
      console.error("Error uploading product:", err);
      setUploaded(false);
      setShowStatus(false);
    }
  }

  return (
    <section className="bg-primary h-screen">
      <Nav />
      <section className="bg-primary px-20 py-10">
        <div className="border border-slate-950 w-[45rem] px-10 py-5 rounded-md">
          <h1 className="text-3xl font-semibold mb-2">Add Product</h1>
          <span className="text-red-600">
            All Fields are Required except image2 and image3
          </span>
          <form onSubmit={handleSubmit} className="w-full">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type={key === "price" ? "number" : "text"}
                name={key}
                required
                className="font-itim text-xl border py-1 px-4 bg-transparent border-slate-950 mt-2 w-[80%]"
                placeholder={key.replace("_", " ")}
                value={formData[key]}
                onChange={handleInputChange}
              />
            ))}
            {["image1", "image2", "image3"].map((imgKey, index) => (
              <div key={imgKey}>
                <label className="font-itim opacity-70 text-xl">
                  Product Image - {index + 1}
                  {imgKey === "image1" && (
                    <span className="text-red-600">*</span>
                  )}
                  :
                </label>
                <input
                  type="file"
                  name={imgKey}
                  required={imgKey === "image1"}
                  className="my-2 ml-2"
                  onChange={handleFileChange}
                />
                {roomImgs[imgKey] && (
                  <img
                    src={URL.createObjectURL(roomImgs[imgKey])}
                    alt="Preview"
                    className="w-20 h-20 mt-2"
                  />
                )}
              </div>
            ))}
            {showStatus && (
              <p className={uploaded ? "text-green-500" : "text-red-500"}>
                {uploaded
                  ? "Product added to inventory"
                  : "Failed to add Product! Try again"}
              </p>
            )}
            <button
              type="submit"
              className="text-xl border border-slate-950 px-3 py-1 mt-4 rounded-md hover:shadow-md hover:bg-black hover:text-primary"
            >
              Add Product to Inventory
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Admin;

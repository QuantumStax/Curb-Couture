/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = () => {
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
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSleeve, setSelectedSleeve] = useState("");
  const [description_1, setDescription_1] = useState("");
  const [description_2, setDescription_2] = useState("");

  console.log("selectedFabric : ", selectedFabric);
  console.log("selectedOccasion : ", selectedOccasion);
  console.log("selectedType : ", selectedType);
  console.log("selectedSleeve : ", selectedSleeve);
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChoice = (e) => {
    const { name, checked } = e.target;
    setSizes((prevSizes) =>
      checked ? [...prevSizes, name] : prevSizes.filter((size) => size !== name)
    );
  };

  const handleDesc_1_Change = (e) => {
    setDescription_1(e.target.value)
  }

  const handleDesc_2_Change = (e) => {
    setDescription_2(e.target.value)
  }

  const handleColorChoice = (e) => {
    const { name, checked } = e.target;
    setSelectedColors((prevColors) =>
      checked
        ? [...prevColors, name]
        : prevColors.filter((color) => color !== name)
    );
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setRoomImgs((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleDropdownChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Fetch color options
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-column-names");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setColors(data.columns);
      } catch (err) {
        console.error("Error fetching columns:", err);
      }
    };
    fetchColumns();
  }, []);

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("sizes", JSON.stringify(sizes));
    data.append("colors", JSON.stringify(selectedColors));
    data.append("fabric", selectedFabric);
    data.append("occasion", selectedOccasion);
    data.append("type", selectedType);
    data.append("sleeve", selectedSleeve);
    data.append("desc_1", description_1);
    data.append("desc_2", description_2);

    Object.keys(roomImgs).forEach((key) => {
      if (roomImgs[key]) data.append(key, roomImgs[key]);
    });

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
      setProduct((prev) => [...prev, response.data.product]);

      // Reset form
      setFormData({
        product_name: "",
        description: "",
        price: "",
        rating: "",
        category: "",
      });
      setRoomImgs({});
      setSizes([]);
      setSelectedColors([]);
      setSelectedFabric("");
      setSelectedOccasion("");
      setSelectedType("");
      setSelectedSleeve("");
      setDescription_1("")
      setDescription_2("")
    } catch (err) {
      console.error("Error uploading product:", err);
      setUploaded(false);
      setShowStatus(false);
    }
  };

  return (
    <div className="border border-slate-950 w-[45rem] px-10 py-5 rounded-md">
      <h1 className="text-3xl font-semibold mb-2">Add Product</h1>
      <span className="text-red-600">
        All Fields are Required except image2 and image3
      </span>
      <form onSubmit={handleSubmit} className="w-full">
        {/* Basic product details */}
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key === "price" || key === "rating" ? "number" : "text"}
            name={key}
            required
            className="font-itim text-xl border py-1 px-4 bg-transparent border-slate-950 mt-2 w-[80%]"
            placeholder={key.replace("_", " ")}
            value={formData[key]}
            onChange={handleInputChange}
          />
        ))}

        {/* Size variants */}
        <div className="my-4 font-itim">
          <h1 className="uppercase">Choose Size Variants:</h1>
          <div className="flex items-center gap-4 my-4">
            {["s", "m", "l", "xl", "xxl"].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  name={size}
                  className="h-5 w-5"
                  onChange={handleSizeChoice}
                  checked={sizes.includes(size)}
                />
                <span className="uppercase ml-2 text-lg">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color variants */}
        <div className="my-4 font-itim">
          <h1 className="uppercase">Choose Color Variants:</h1>
          <div className="flex items-center gap-4 my-4 flex-wrap w-[35rem]">
            {colors.map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  name={color}
                  className="h-5 w-5"
                  onChange={handleColorChoice}
                  checked={selectedColors.includes(color)}
                />
                <span className="uppercase ml-2 text-lg">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image uploads */}
        <div className="my-4 font-itim">
          <h1 className="uppercase">Choose Product Images:</h1>
          {["image1", "image2", "image3"].map((imgKey, index) => (
            <div key={imgKey} className="my-2">
              <label className="font-itim opacity-70 text-xl">
                Product Image - {index + 1}
                {imgKey === "image1" && <span className="text-red-600">*</span>}
                :
              </label>
              <input
                type="file"
                name={imgKey}
                required={imgKey === "image1"}
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
        </div>

        {/* Additional product info */}
        <div className="my-4 font-itim">
          <h1 className="uppercase">Provide Product Info</h1>
          <textarea
            name="desc_1"
            cols="50"
            rows="5"
            placeholder="Input the product description here"
            className="block my-2 border border-slate-950 p-2 bg-transparent"
            onChange={handleDesc_1_Change}
          />
          <textarea
            name="desc_2"
            cols="50"
            rows="5"
            placeholder="Extra info to be entered here"
            className="block my-2 border border-slate-950 p-2 bg-transparent"
            onChange={handleDesc_2_Change}
          />
        </div>

        {/* Dropdowns */}
        {[
          {
            label: "Fabric",
            value: selectedFabric,
            setter: setSelectedFabric,
            options: ["Pure Cotton", "Cotton", "Polyester", "Satin", "Other"],
          },
          {
            label: "Occasion",
            value: selectedOccasion,
            setter: setSelectedOccasion,
            options: [
              "Casual",
              "Adventure",
              "Urban Style",
              "Night Out",
              "Work",
              "Loungewear",
              "Seasonal",
            ],
          },
          {
            label: "Type",
            value: selectedType,
            setter: setSelectedType,
            options: [
              "Solid Colors",
              "Graphic Prints",
              "Floral Prints",
              "Tie-Dye",
              "Abstract",
            ],
          },
          {
            label: "Sleeve",
            value: selectedSleeve,
            setter: setSelectedSleeve,
            options: [
              "Short Sleeve",
              "Long Sleeve",
              "Sleeveless",
              "Cap Sleeve",
            ],
          },
        ].map(({ label, value, setter, options }) => (
          <div key={label} className="my-2">
            <label htmlFor={label.toLowerCase()} className="font-itim opacity-70 text-xl uppercase">{`Choose ${label}`}</label>
            <select
              name={label.toLowerCase()}
              value={value}
              onChange={handleDropdownChange(setter)}
              className="block border border-slate-950 p-2 mt-1 focus:outline-none bg-transparent w-[20rem]"
            >
              <option value="">{`-- Select ${label} --`}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="mt-5 py-2 px-4 bg-transparent border border-slate-950 w-[15rem] rounded-lg hover:bg-black hover:text-primary uppercase font-semibold"
        >
          Add Product
        </button>
      </form>

      {showStatus && (
        <div className={`mt-4 p-2 ${uploaded ? "bg-green-300" : "bg-red-300"}`}>
          {uploaded
            ? "Product uploaded successfully!"
            : "Failed to upload product."}
        </div>
      )}
    </div>
  );
};

export default AddProduct;

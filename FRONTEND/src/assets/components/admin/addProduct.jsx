/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";

// Memoized dropdown component
const Dropdown = React.memo(({ label, value, options, onChange }) => (
  <div className="my-2">
    <label
      htmlFor={label.toLowerCase()}
      className="font-itim opacity-70 text-xl uppercase"
    >{`Choose ${label}`}</label>
    <select
      id={label.toLowerCase()}
      value={value}
      onChange={onChange}
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
));

// Memoized size picker component
const SizePicker = React.memo(({ sizes, handleSizeChoice }) => (
  <div className="my-4 font-itim">
    <h1 className="uppercase">Choose Size Variants:</h1>
    <div className="flex items-center gap-4 my-4">
      {["s", "m", "l", "xl", "xxl"].map((size) => (
        <label key={size} className="flex items-center">
          <input
            type="checkbox"
            id={`size-${size}`}
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
));

// Memoized color picker component
const ColorPicker = React.memo(
  ({ colors, selectedColors, handleColorChoice }) => (
    <div className="my-4 font-itim">
      <h1 className="uppercase">Choose Color Variants:</h1>
      <div className="flex items-center gap-4 my-4 flex-wrap w-[35rem]">
        {colors.map((color) => (
          <label key={color} className="flex items-center">
            <input
              type="checkbox"
              id={`color-${color}`}
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
  )
);

// Static options for dropdowns
const DROPDOWN_OPTIONS = {
  fabric: ["Pure Cotton", "Cotton", "Polyester", "Satin", "Other"],
  occasion: [
    "Casual",
    "Adventure",
    "Urban Style",
    "Night Out",
    "Work",
    "Loungewear",
    "Seasonal",
  ],
  type: [
    "Solid Colors",
    "Graphic Prints",
    "Floral Prints",
    "Tie-Dye",
    "Abstract",
  ],
  sleeve: ["Short Sleeve", "Long Sleeve", "Sleeveless", "Cap Sleeve"],
};

const AddProduct = () => {
  // State variables (same as before)
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

  const timeoutRef = useRef();
  const prevUrls = useRef([]);

  // Handle input changes with useCallback
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Memoized event handlers
  const handleSizeChoice = useCallback((e) => {
    const { name, checked } = e.target;
    setSizes((prevSizes) =>
      checked ? [...prevSizes, name] : prevSizes.filter((size) => size !== name)
    );
  }, []);

  const handleColorChoice = useCallback((e) => {
    const { name, checked } = e.target;
    setSelectedColors((prevColors) =>
      checked
        ? [...prevColors, name]
        : prevColors.filter((color) => color !== name)
    );
  }, []);

  const handleDropdownChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value);
    },
    []
  );

  // Image URL cleanup
  useEffect(() => {
    return () => {
      prevUrls.current.forEach((url) => URL.revokeObjectURL(url));
      prevUrls.current = [];
    };
  }, []);

  // Fetch colors with abort controller
  useEffect(() => {
    const abortController = new AbortController();
    const fetchColumns = async () => {
      try {
        const res = await fetch("http://localhost:3000/get-column-names", {
          signal: abortController.signal,
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setColors(data.columns);
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Error fetching columns:", err);
      }
    };
    fetchColumns();
    return () => abortController.abort();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Existing form data handling
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
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // State updates and reset
      setUploaded(true);
      setShowStatus(true);
      setProduct((prev) => [...prev, response.data.product]);
      setDescription_1("");
      setDescription_2("");
      setSelectedFabric("");
      setSelectedOccasion("");
      setSelectedSleeve("");
      setSelectedType("");
      // Clear status message after 5 seconds
      timeoutRef.current = setTimeout(() => setShowStatus(false), 5000);

    } catch (err) {
      console.error("Error uploading product:", err);
      setUploaded(false);
      setShowStatus(true);
      timeoutRef.current = setTimeout(() => setShowStatus(false), 5000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Memoize image preview URLs
  const imagePreviews = useMemo(() => {
    return Object.keys(roomImgs).reduce((acc, key) => {
      if (roomImgs[key]) {
        const url = URL.createObjectURL(roomImgs[key]);
        prevUrls.current.push(url);
        acc[key] = url;
      }
      return acc;
    }, {});
  }, [roomImgs]);

  return (
    <div className="border border-slate-950 w-[45rem] px-10 py-5 rounded-md">
      <h1 className="text-3xl font-semibold mb-2">Add Product</h1>
      <span className="text-red-600">
        All Fields are Required except image2 and image3
      </span>
      <form onSubmit={handleSubmit} className="w-full">
        {/* Accessible form inputs */}
        {Object.keys(formData).map((key) => (
          <div key={key}>
            {/* <label htmlFor={key} className="font-itim opacity-70 text-xl">
              {key.replace("_", " ")}
            </label> */}
            <input
              id={key}
              type={key === "price" || key === "rating" ? "number" : "text"}
              name={key}
              required
              className="font-itim text-xl border py-1 px-4 bg-transparent border-slate-950 mt-2 w-[80%]"
              placeholder={key.replace("_", " ")}
              value={formData[key]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <SizePicker sizes={sizes} handleSizeChoice={handleSizeChoice} />
        <ColorPicker
          colors={colors}
          selectedColors={selectedColors}
          handleColorChoice={handleColorChoice}
        />

        {/* Image uploads with accessible labels */}
        <div className="my-4 font-itim">
          <h1 className="uppercase">Choose Product Images:</h1>
          {["image1", "image2", "image3"].map((imgKey, index) => (
            <div key={imgKey} className="my-2">
              <label
                htmlFor={imgKey}
                className="font-itim opacity-70 text-xl mr-2"
              >
                Product Image - {index + 1}
                {imgKey === "image1" && <span className="text-red-600">*</span>}
                :{" "}
              </label>
              <input
                id={imgKey}
                type="file"
                name={imgKey}
                required={imgKey === "image1"}
                onChange={(e) => {
                  const { name, files } = e.target;
                  setRoomImgs((prev) => ({ ...prev, [name]: files[0] }));
                }}
              />
              {imagePreviews[imgKey] && (
                <img
                  src={imagePreviews[imgKey]}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 mt-2"
                />
              )}
            </div>
          ))}
        </div>

        {/* Accessible textareas */}
        <div className="my-4 font-itim">
          <label htmlFor="desc_1" className="uppercase">
            Product Description
          </label>
          <textarea
            id="desc_1"
            name="desc_1"
            cols="50"
            rows="5"
            placeholder="Input the product description here"
            className="block my-2 border border-slate-950 p-2 bg-transparent"
            value={description_1}
            onChange={(e) => setDescription_1(e.target.value)}
          />
          <label htmlFor="desc_2" className="uppercase">
            Additional Information
          </label>
          <textarea
            id="desc_2"
            name="desc_2"
            cols="50"
            rows="5"
            placeholder="Extra info to be entered here"
            className="block my-2 border border-slate-950 p-2 bg-transparent"
            value={description_2}
            onChange={(e) => setDescription_2(e.target.value)}
          />
        </div>

        {/* Memoized dropdowns */}
        {Object.entries(DROPDOWN_OPTIONS).map(([key, options]) => (
          <Dropdown
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={
              {
                fabric: selectedFabric,
                occasion: selectedOccasion,
                type: selectedType,
                sleeve: selectedSleeve,
              }[key]
            }
            options={options}
            onChange={handleDropdownChange(
              {
                fabric: setSelectedFabric,
                occasion: setSelectedOccasion,
                type: setSelectedType,
                sleeve: setSelectedSleeve,
              }[key]
            )}
          />
        ))}

        <button
          type="submit"
          className="mt-5 py-2 px-4 bg-transparent border border-slate-950 w-[15rem] rounded-lg hover:bg-black hover:text-primary uppercase font-semibold"
        >
          Add Product
        </button>
      </form>

      {showStatus && (
        <div
          aria-live="polite"
          className={`mt-4 p-2 ${uploaded ? "bg-green-300" : "bg-red-300"}`}
        >
          {uploaded
            ? "Product uploaded successfully!"
            : "Failed to upload product."}
        </div>
      )}
    </div>
  );
};

export default AddProduct;

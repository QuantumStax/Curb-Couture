/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import gsap from "gsap";

const AddressModal = ({
  isOpen,
  onClose,
  addressData,
  onSubmit,
  onChange,
  isEditing,
}) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      {/* Modal backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div
        ref={modalContentRef}
        className="bg-secondary_2 text-secondary_2 p-6 rounded shadow-lg z-10 max-w-[50rem]"
      >
        <h3 className="text-xl font-bold mb-4 text-primary_2">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="label"
              placeholder="Label (e.g., Home, Office)"
              value={addressData.label}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="country"
              disabled
              placeholder="India"
              value="India"
              onChange={onChange}
              className="w-full border p-2 rounded text-primary_2"
              required
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={addressData.firstname}
                onChange={onChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={addressData.lastname}
                onChange={onChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <input
              type="text"
              name="house"
              placeholder="House Number / Flat Number / Building Name"
              value={addressData.house}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="locality"
              placeholder="Street Name / Locality / Area"
              value={addressData.locality}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={addressData.landmark}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="city"
                placeholder="City / Town / Village"
                value={addressData.city}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State / Union Territory"
                value={addressData.state}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <input
              type="text"
              name="pincode"
              placeholder="PIN Code (Postal Code) 6-digit"
              value={addressData.pincode}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-primary_2 text-secondary_2 font-semibold uppercase px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-banner_2 text-secondary_2 font-semibold uppercase px-4 py-2 rounded"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddressManager = ({ selectedAddress, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      firstname: "Gopikrishnan",
      lastname: "S",
      house: "Green Bay Appartments",
      locality: "Church Street",
      landmark: "Near Apollo Hospital",
      city: "Koramangala",
      state: "Karnataka",
      pincode: "554433",
    },
    {
      id: 2,
      label: "Office",
      firstname: "Gopikrishnan",
      lastname: "S",
      house: "Green Bay Appartments",
      locality: "Church Street",
      landmark: "Near Apollo Hospital",
      city: "Koramangala",
      state: "Karnataka",
      pincode: "554433",
    },
  ]);

  const [editingAddress, setEditingAddress] = useState(null);
  const [modalAddress, setModalAddress] = useState({
    label: "",
    firstname: "",
    lastname: "",
    house: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [showModal, setShowModal] = useState(false);

  const addressesContainerRef = useRef(null);

  useEffect(() => {
    if (addressesContainerRef.current) {
      gsap.fromTo(
        addressesContainerRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [addresses]);

  const openModalForAdd = () => {
    setModalAddress({
      label: "",
      firstname: "",
      lastname: "",
      house: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    });
    setEditingAddress(null);
    setShowModal(true);
  };

  const openModalForEdit = (addr) => {
    setModalAddress(addr);
    setEditingAddress(addr);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalAddress({ ...modalAddress, [name]: value });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id ? modalAddress : addr
      );
      setAddresses(updatedAddresses);
    } else {
      const nextId = addresses.length
        ? Math.max(...addresses.map((a) => a.id)) + 1
        : 1;
      const newAddr = { ...modalAddress, id: nextId };
      setAddresses([...addresses, newAddr]);
    }
    closeModal();
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
    if (selectedAddress && selectedAddress.id === addressId) {
      onSelectAddress(null);
    }
  };

  return (
    <div className="py-5">
      <h2 className="flex items-center gap-2 justify-center text-2xl font-bold mb-10 uppercase">
        <p>Shipping</p>
        <div>
          <LocalShippingIcon />
        </div>
      </h2>
      <div ref={addressesContainerRef} className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            id={`address-${addr.id}`}
            className={`p-4 border rounded flex justify-between items-center ${
              selectedAddress && selectedAddress.id === addr.id
                ? "border-2 border-primary_2"
                : "border-gray-500"
            }`}
            onMouseEnter={() =>
              gsap.to(`#address-${addr.id}`, { scale: 1.02, duration: 0.2 })
            }
            onMouseLeave={() =>
              gsap.to(`#address-${addr.id}`, { scale: 1, duration: 0.2 })
            }
          >
            <div
              onClick={() => onSelectAddress(addr)}
              className="cursor-pointer w-[85%]"
            >
              <p className="font-semibold">{addr.label}</p>
              <p>
                {addr.firstname} {addr.lastname}
              </p>
              <p>
                {addr.house}, <br /> {addr.locality} <br /> {addr.landmark}{" "}
                <br />
                {addr.city}, {addr.state} <br /> {addr.pincode}
              </p>
            </div>
            <div className="space-x-10">
              <button
                className="text-primary_2 border border-primary_2 py-1 px-4 hover:bg-primary_2 hover:text-secondary_2 font-semibold uppercase"
                onClick={() => openModalForEdit(addr)}
              >
                Edit
              </button>
              <button
                className="text-primary_2 hover:text-red-600"
                onClick={() => handleDeleteAddress(addr.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-primary_2 text-secondary_2 px-4 py-2 rounded"
        onClick={openModalForAdd}
      >
        Add New Address
      </button>

      <AddressModal
        isOpen={showModal}
        onClose={closeModal}
        addressData={modalAddress}
        onChange={handleModalChange}
        onSubmit={handleModalSubmit}
        isEditing={!!editingAddress}
      />
    </div>
  );
};

export default AddressManager;

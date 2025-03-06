/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import gsap from "gsap";
import React from "react";
import axios from "axios";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

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
      try {
        gsap.fromTo(
          modalContentRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      } catch (error) {
        console.error("Modal animation error:", error);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      {/* Modal backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => {
          try {
            onClose();
          } catch (error) {
            console.error("Backdrop onClose error:", error);
          }
        }}
      ></div>
      {/* Modal content */}
      <div
        ref={modalContentRef}
        className="bg-secondary_2 text-secondary_2 p-6 rounded shadow-lg z-10 max-w-[50rem]"
      >
        <h3 className="text-xl font-bold mb-4 text-primary_2">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h3>
        <form
          onSubmit={(e) => {
            try {
              onSubmit(e);
            } catch (error) {
              console.error("Form submission error:", error);
            }
          }}
        >
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
            <div className="flex gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={addressData.firstname}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={addressData.lastname}
                onChange={onChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <input
              type="text"
              name="country"
              disabled
              placeholder="Country"
              value="India"
              className="w-full border p-2 rounded text-primary_2"
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
            <input
              type="text"
              name="district"
              placeholder="District"
              value={addressData.district}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality / Area"
              value={addressData.locality}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="PIN Code (6-digit)"
              value={addressData.pincode}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                try {
                  onClose();
                } catch (error) {
                  console.error("Cancel button error:", error);
                }
              }}
              className="bg-primary_2 text-secondary_2 font-semibold uppercase px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-banner_2 text-primary_2 font-semibold uppercase px-4 py-2 rounded"
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
  const [addresses, setAddresses] = useState([]);
  console.log("Addresses : ", addresses);
  const [editingAddress, setEditingAddress] = useState(null);
  const [modalAddress, setModalAddress] = useState({
    label: "",
    firstname: "",
    lastname: "",
    state: "",
    district: "",
    locality: "",
    pincode: "",
  });
  const [showModal, setShowModal] = useState(false);
  const addressesContainerRef = useRef(null);

  // FIX: Update the endpoint to target the backend server with absolute URL and include credentials.
  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/addresses", {
        withCredentials: true,
      });
      console.log("Response : ", response.data);
      if (Array.isArray(response.data)) {
        setAddresses(response.data);
      } else {
        console.error("Unexpected response data:", response.data);
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addressesContainerRef.current) {
      try {
        gsap.fromTo(
          addressesContainerRef.current.children,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
        );
      } catch (error) {
        console.error("Addresses animation error:", error);
      }
    }
  }, [addresses]);

  const openModalForAdd = () => {
    try {
      setModalAddress({
        label: "",
        firstname: "",
        lastname: "",
        state: "",
        district: "",
        locality: "",
        pincode: "",
      });
      setEditingAddress(null);
      setShowModal(true);
    } catch (error) {
      console.error("Error opening add modal:", error);
    }
  };

  const openModalForEdit = (addr) => {
    try {
      setModalAddress(addr);
      setEditingAddress(addr);
      setShowModal(true);
    } catch (error) {
      console.error("Error opening edit modal:", error);
    }
  };

  const closeModal = () => {
    try {
      setShowModal(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  const handleModalChange = (e) => {
    try {
      const { name, value } = e.target;
      setModalAddress((prev) => ({ ...prev, [name]: value }));
    } catch (error) {
      console.error("Error updating modal state:", error);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const addressPayload = {
        label: modalAddress.label,
        firstname: modalAddress.firstname,
        lastname: modalAddress.lastname,
        country: "India",
        state: modalAddress.state,
        district: modalAddress.district,
        locality: modalAddress.locality,
        pincode: modalAddress.pincode,
      };

      if (editingAddress) {
        await axios.put(
          `http://localhost:3000/edit-address/${editingAddress.addR_id}`,
          addressPayload,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/add-address", addressPayload, {
          withCredentials: true,
        });
      }
      closeModal();
      fetchAddresses();
    } catch (error) {
      console.error("Error handling modal submit:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-address/${addressId}`, {
        withCredentials: true,
      });
      setAddresses(addresses.filter((addr) => addr.addR_id !== addressId));
      if (selectedAddress && selectedAddress.addR_id === addressId) {
        onSelectAddress(null);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <ErrorBoundary>
      <div className="mt-[-2rem] min-h-[60vh]">
        <h2 className="flex items-center gap-2 justify-center text-2xl font-robert-regular mb-10 uppercase">
          <p className="font-semibold">Shipping</p>
          <div>
            <LocalShippingIcon />
          </div>
        </h2>
        <div ref={addressesContainerRef} className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.addR_id}
              id={`address-${addr.addR_id}`}
              className={`p-4 border rounded flex justify-between items-center ${
                selectedAddress && selectedAddress.addR_id === addr.addR_id
                  ? "border-2 border-primary_2"
                  : "border-gray-500"
              }`}
              onMouseEnter={() => {
                try {
                  gsap.to(`#address-${addr.addR_id}`, {
                    scale: 1.02,
                    duration: 0.2,
                  });
                } catch (error) {
                  console.error("Address hover error:", error);
                }
              }}
              onMouseLeave={() => {
                try {
                  gsap.to(`#address-${addr.addR_id}`, {
                    scale: 1,
                    duration: 0.2,
                  });
                } catch (error) {
                  console.error("Address hover error:", error);
                }
              }}
            >
              <div
                onClick={() => {
                  try {
                    onSelectAddress(addr);
                  } catch (error) {
                    console.error("Error selecting address:", error);
                  }
                }}
                className="cursor-pointer w-[85%]"
              >
                <p className="font-bold text-xl mb-2">{addr.label}</p>
                <p>
                  {addr.firstname} {addr.lastname}
                </p>
                <p>
                  {addr.locality}, {addr.district} <br /> {addr.state},{" "}
                  {addr.pincode}
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
                  onClick={() => handleDeleteAddress(addr.addR_id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`mt-6 bg-primary_2 text-secondary_2 px-4 py-2 rounded transition-all duration-200 ${
            addresses.length === 0
              ? "absolute top-[50%] left-[50%] translate-x-[-50%]"
              : ""
          }`}
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
    </ErrorBoundary>
  );
};

export default AddressManager;

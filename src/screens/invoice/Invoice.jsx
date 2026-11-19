import React, { useRef, useState } from "react";
import {
  CreateInvoiceService,
  GetInvoiceService,
} from "../../services/postService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InvoiceCard from "../../components/InvoiceCard";

const Invoice = () => {
  const dispatch = useDispatch();
  const { allInvoice } = useSelector((state) => state.posts);

  const userNameRef = useRef(null);
  const vehicleModelRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({ name: "", price: "" });
  const [saving, setSaving] = useState(false);

  const handleAddItem = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const price = parseFloat(priceRef.current.value);

    if (!name || isNaN(price)) return;

    setItems((prev) => [...prev, { name, price }]);

    nameRef.current.value = "";
    priceRef.current.value = "";
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({ ...items[index] });
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updated = [...items];
    updated[editIndex] = { ...editItem, price: parseFloat(editItem.price) };
    setItems(updated);
    setEditIndex(null);
    setEditItem({ name: "", price: "" });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditItem({ name: "", price: "" });
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  const handleSaveInvoice = async () => {
    const userName = userNameRef.current.value.trim();
    const vehicleModel = vehicleModelRef.current.value.trim();

    if (!userName || !vehicleModel || items.length === 0) {
      alert(
        "Please fill in user name, vehicle model and add at least one item."
      );
      return;
    }

    const payload = {
      userName,
      vehicleModel,
      items,
      total,
      date: new Date().toISOString(),
    };

    try {
      setSaving(true);
      await dispatch(CreateInvoiceService(payload));
      userNameRef.current.value = "";
      vehicleModelRef.current.value = "";
      setItems([]);
      dispatch(GetInvoiceService());
      toast.success("Invoice Saved Successfully");
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col border-2">
      <div className="p-4  mx-auto border-sky-100">
        <h1 className="text-2xl font-bold mb-4">🧾 Price List Calculator</h1>
        <div className="mb-4 space-y-2">
          <input
            ref={userNameRef}
            type="text"
            placeholder="User Name"
            className="border p-2 w-full rounded"
          />
          <input
            ref={vehicleModelRef}
            type="text"
            placeholder="Vehicle Model"
            className="border p-2 w-full rounded"
          />
        </div>
        <form onSubmit={handleAddItem} className="mb-4 space-y-2">
          <input
            ref={nameRef}
            type="text"
            placeholder="Item name"
            className="border p-2 w-full rounded"
          />
          <input
            ref={priceRef}
            type="number"
            placeholder="Price"
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </form>
        <ul className="mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {editIndex === index ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border p-1 w-28 rounded"
                  />
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={(e) =>
                      setEditItem((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="border p-1 w-20 rounded"
                  />
                  <button onClick={handleSave} className="text-green-600">
                    Save
                  </button>
                  <button onClick={handleCancel} className="text-gray-500">
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span>₹{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold">Total: ₹{total.toFixed(2)}</h2>
        <button
          onClick={handleSaveInvoice}
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Saving Invoice..." : "Save Invoice"}
        </button>
      </div>

      {allInvoice && <InvoiceCard data={allInvoice} />}
    </div>
  );
};

export default Invoice;

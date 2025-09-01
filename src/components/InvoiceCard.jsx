import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const toMillis = (timestamp) => {
  if (!timestamp) return 0;
  return (
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1_000_000)
  );
};

const InvoiceCard = ({ data }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredInvoices = useMemo(() => {
    return [...data]
      .filter(
        (inv) =>
          inv.userName?.toLowerCase().includes(search.toLowerCase()) ||
          inv.vehicle?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
  }, [data, search]);
  return (
    <div>
      {filteredInvoices.length > 0 && (
        <input
          type="text"
          placeholder="Search by user or vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
      )}
      <ul className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <p className="text-red-500 text-center justify-center">
            ! No invoices found.
          </p>
        ) : (
          filteredInvoices.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-100 shadow-md rounded-xl p-4 hover:bg-gray-200 transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {item.userName}
                </p>
                <p className="text-sm text-gray-500">{item.vehicle}</p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate(`/invoice/${item.id}`)}
              >
                View
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default InvoiceCard;

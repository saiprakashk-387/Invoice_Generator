import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ReactComponent as Arrow } from "../../assets/icons/BlackBackArrow.svg";

const ViewInvoice = () => {
  const contentRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { allInvoice } = useSelector((state) => state.posts);
  const invoice = allInvoice.find((item) => item.id === id);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `Invoice-${invoice.userName}`,
  });
  const date = new Date(invoice.createdAt.seconds * 1000);

  return (
    <div className="max-w-2xl h-100vh mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <div className="flex text-center mb-4">
        <Arrow
          className="shrink-0 text-black w-20 h-30"
          onClick={() => navigate(-1)}
        />
        <button
          type="button"
          onClick={reactToPrintFn}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Save PDF
        </button>
      </div>
      <div
        ref={contentRef}
        className="border rounded-lg shadow-lg bg-white p-6"
      >
        <div className="text-center mb-6 border-b pb-4 bg-blue-800 text-white">
          <h1 className="text-3xl font-bold">SLV Bike point</h1>
          <p className="text-sm">
            Paradarami-Chittoor Main Road,Near Kanikapuram Checkpost,Tamil nadu
          </p>
          <p className="text-sm">Mobile: +91 9844614249</p>
        </div>
        <h1 className="text-2xl font-semibold text-center mb-4 text-red-400">
          Invoice
        </h1>

        <div className="mb-4">
          <p>
            <strong className="text-blue-600">Invoice ID:</strong> {invoice.id}
          </p>
          <p>
            <strong className="text-blue-600">Customer:</strong>{" "}
            {invoice.userName}
          </p>
          <p>
            <strong className="text-blue-600">Vehicle:</strong>{" "}
            {invoice.vehicle}
          </p>
          <p>
            <strong className="text-blue-600">Date:</strong>{" "}
            {date.toLocaleDateString()}
          </p>
        </div>

        <table className="w-full border-collapse border mb-4">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice.invoiceDetails.map((detail, idx) => (
              <tr key={idx}>
                <td className="border p-2">{detail.name}</td>
                <td className="border p-2 text-right">₹{detail.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right font-bold text-lg text-blue-600">
          Total: ₹{invoice.totalPrice}
        </div>
        <div className="mt-6 text-center text-sm text-gray-600 border-t pt-3">
          Thank you for visiting! <br />
          Please come again
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;

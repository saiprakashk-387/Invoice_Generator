import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetInvoiceService } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/icons/BlackBackArrow.svg";
import InvoiceCard from "../components/InvoiceCard";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allInvoice } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(GetInvoiceService());
  }, [dispatch]);

  console.log("allInvoice", allInvoice);
  return (
    <div className="max-w-2xl mx-auto mt-6 p-2">
      <div className="flex text-center">
        <Arrow
          className="shrink-0 text-black w-20 h-30"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-bold mb-4 text-gray-800">Invoices List</h2>
      </div>
      <InvoiceCard data={allInvoice} />
    </div>
  );
};

export default InvoiceList;

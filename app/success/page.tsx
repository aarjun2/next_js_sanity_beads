"use client";

import React, { useEffect } from 'react';
import Link from "next/dist/client/link";

const SuccessPage = () => {
  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div>
      <h1>Order Successful!</h1>
      <Link href="/landing">
      <button className="w-full py-2 mt-4 text-white bg-green-500 
      rounded hover:bg-green-600 transition"
      >
        Go to Home
      </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
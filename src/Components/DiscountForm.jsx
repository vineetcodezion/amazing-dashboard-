// src/components/CouponForm.js

import React, { useState } from 'react';

function CouponForm({ addCoupon }) {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [productId, setProductId] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCoupon = { code, discount, productId, expirationDate };

    try {
      const response = await fetch(
        'http://localhost:8081/api/v1/discount/create-discount',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCoupon),
        }
      );
      const data = await response.json();
      addCoupon(data.coupon);
      setCode('');
      setDiscount('');
      setProductId('');
      setExpirationDate('');
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Coupon
      </button>
    </form>
  );
}

export default CouponForm;

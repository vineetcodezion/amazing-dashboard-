import React, { useEffect, useState } from 'react';
import CouponForm from '../Components/DiscountForm';
import CouponTable from '../Components/DiscountTable';

const CouponPage = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(
        'http://localhost:8081/api/v1/discount/get-discount'
      );
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const addCoupon = (newCoupon) => {
    setCoupons([...coupons, newCoupon]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Coupons
        </h1>
        <CouponForm addCoupon={addCoupon} />
        <CouponTable coupons={coupons} />
      </div>
    </div>
  );
};

export default CouponPage;

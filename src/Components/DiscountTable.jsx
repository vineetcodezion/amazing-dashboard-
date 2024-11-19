function CouponTable({ coupons }) {
  console.log(coupons);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-6 text-left">Code</th>
            <th className="py-3 px-6 text-left">Discount (%)</th>
            <th className="py-3 px-6 text-left">Product ID</th>
            <th className="py-3 px-6 text-left">Expiration Date</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {coupons &&
            coupons.map((coupon) => (
              <tr key={coupon._id} className="border-b">
                <td className="py-3 px-6">{coupon.code}</td>
                <td className="py-3 px-6">{coupon.discount}</td>
                <td className="py-3 px-6">{coupon.productId}</td>
                <td className="py-3 px-6">
                  {new Date(coupon.expirationDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  {new Date(coupon.expirationDate) > new Date()
                    ? 'Active'
                    : 'Expired'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CouponTable;

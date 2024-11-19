import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceSettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gstNumber: '',
    registrationNumber: '',
    website: '',
  });

  const [gstEnabled, setGstEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8081/api/v1/invoice/company-info'
        );
        setCompanyInfo(data);
        setGstEnabled(data.gstEnabled);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8081/api/v1/invoice/company-info', {
        companyInfo,
        gstEnabled,
      });
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      {isLoaded ? (
        <div className="bg-white shadow-xl rounded-xl w-full max-w-6xl p-8 grid gap-8 lg:grid-cols-3">
          {/* Image Section */}
          <div className="col-span-1">
            <img
              src="https://img.freepik.com/premium-vector/gst-good-services-tax-concept_1162612-4419.jpg?w=1380"
              alt="Company illustration"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Form Section */}
          <div className="col-span-2">
            {/* Display Company Info in a Card */}
            <div className="p-6 rounded-lg shadow-lg bg-blue-50 mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Company Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Name:</strong> {companyInfo.name}
                </p>
                <p>
                  <strong>Email:</strong> {companyInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {companyInfo.phone}
                </p>
                <p>
                  <strong>Website:</strong> {companyInfo.website}
                </p>
                <p>
                  <strong>Address:</strong> {companyInfo.address}
                </p>
                <p>
                  <strong>Registration No.:</strong>{' '}
                  {companyInfo.registrationNumber}
                </p>
                {gstEnabled && (
                  <p>
                    <strong>GST Number:</strong> {companyInfo.gstNumber}
                  </p>
                )}
              </div>
            </div>

            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
              Invoice Settings
            </h1>

            {/* GST Toggle */}
            <div className="flex justify-between items-center mb-6">
              <label
                htmlFor="gst-toggle"
                className="text-lg font-medium text-gray-700"
              >
                Enable GST Billing
              </label>
              <input
                type="checkbox"
                id="gst-toggle"
                checked={gstEnabled}
                onChange={(e) => setGstEnabled(e.target.checked)}
                className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-all cursor-pointer relative"
              />
            </div>

            {/* Company Info Inputs */}
            <div className="border-t pt-6 grid grid-cols-2 gap-4">
              {Object.keys(companyInfo).map((field) => (
                <div className="mb-4" key={field}>
                  <label className="text-gray-700 font-medium" htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={companyInfo[field]}
                    onChange={handleInputChange}
                    className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Save Settings
              </button>
              <button
                onClick={() =>
                  setCompanyInfo({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    gstNumber: '',
                    registrationNumber: '',
                    website: '',
                  })
                }
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all"
              >
                Clear Fields
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default InvoiceSettings;

import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "On Hold" },
    { id: 1, label: "Ready to Ship" },
    { id: 2, label: "Pending" },
    { id: 3, label: "Shipped" },
    { id: 4, label: "Cancelled" },
  ];

  return (
    <div className="px-5 py-5">
      <div className="flex space-x-4 border-b border-transparent">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-sm focus:outline-none ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-600 font-semibold hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

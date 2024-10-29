import React, { useState } from "react";

const InventoryTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Active" },
    { id: 1, label: "Activation Pending" },
    { id: 2, label: "Inactive" },
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

export default InventoryTabs;

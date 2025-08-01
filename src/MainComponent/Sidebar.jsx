import React, { useState } from 'react';
import { MdMenu } from "react-icons/md";

const Sidebar = ({ tabs, activeTab, onTabClick, opensidebar, setopensidebar }) => {
  const [expanded, setExpanded] = useState(null); // For dropdown toggle

  const handleParentClick = (tab) => {
    if (tab.children) {
      // Toggle dropdown for children
      setExpanded((prev) => (prev === tab.label ? null : tab.label));
      onTabClick(tab.label); // Show parent tab content as well
    } else {
      onTabClick(tab.label); // Just switch tab
    }
  };

  return (
    <nav className={`h-screen text-white bg-gray-800 p-1 shadow-md duration-500 fixed top-0 left-0 z-50 ${opensidebar ? "w-60" : "w-12"} 
    md:relative md:block`}
      style={{ zIndex: 1000 }}
    >
      {/* Sidebar Header */}
      <div className='flex justify-between'>
        <h2 className={`text-2xl font-bold mb-6 transition-all duration-500 overflow-hidden whitespace-nowrap ${opensidebar ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
          SideBar
        </h2>
        <MdMenu size={30} className="cursor-pointer mr-2" onClick={() => setopensidebar(!opensidebar)} />
      </div>

      {/* Tab List */}
      <ul className="space-y-3">
        {tabs.map((tab) => (
          <div key={tab.label}>
            {/* Parent tab */}
            <li
              onClick={() => handleParentClick(tab)}
              className={`flex items-center gap-2 mr-4 px-0.5 py-1 my-2 rounded-md cursor-pointer
                ${activeTab === tab.label ? 'bg-gray-600' : 'hover:bg-gray-700'}
              `}
            >
              <span className="text-2xl p-1">{tab.icon}</span>
              <span className={`transition-all duration-500 overflow-hidden whitespace-nowrap ${opensidebar ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 ml-0'}`}>
                {tab.label}
              </span>
            </li>

            {/* Children of dropdown tab */}
            {tab.children && expanded === tab.label && (
              <ul className="ml-8">
                {tab.children.map((child) => (
                  <li
                    key={child.label}
                    onClick={() => onTabClick(child.label)}
                    className={`flex items-center gap-2 px-2 py-1 my-1 rounded-md cursor-pointer text-sm
                      ${activeTab === child.label ? 'bg-gray-500' : 'hover:bg-gray-600'}
                    `}
                  >
                    <span className="text-xl">{child.icon}</span>
                    <span className={`${opensidebar ? 'inline' : 'hidden'} ml-1`}>
                      {child.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

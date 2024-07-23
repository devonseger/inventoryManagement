import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../util/auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(location.pathname);
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false);

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  const handleSelectChange = (event) => {
    const selectedPath = event.target.value;
    setSelectedTab(selectedPath);
    navigate(selectedPath); // Navigate to the selected path
    if (selectedPath === "/inventory") {
      setShowInventoryDropdown(true);
    } else {
      setShowInventoryDropdown(false);
    }
  };

  const handleTabMouseOver = (path) => {
    setSelectedTab(path);
    if (path === "/inventory") {
      setShowInventoryDropdown(true);
    } else {
      setShowInventoryDropdown(false);
    }
  };

  const handleMouseLeave = () => {
    setShowInventoryDropdown(false);
  };

  const tabs = [
    { name: "Home", path: "/" },
    !isAuthenticated() ? { name: "Register", path: "/register" } : null,
    isAuthenticated() ? {
      name: "Inventory", path: "/inventory", subOptions: [
        { name: "View Inventory", path: "/inventory" },
        { name: "Add Item", path: "/inventory/add" },
        { name: "Delete Item", path: "/inventory/delete" },
      ]
    } : null,
    { name: "About", path: "/about" },
    isAuthenticated() ? { name: "Logout", path: "/logout" } : { name: "Login", path: "/login" },
  ].filter(tab => tab !== null); // Filter out null values

  return (
    <div className="bg-gray-900 text-white pl-8">
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select
          id="Tab"
          className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={selectedTab}
          onChange={handleSelectChange}
        >
          {tabs.map((tab) => (
            <option key={tab.path} value={tab.path}>
              {tab.name}
            </option>
          ))}
        </select>

        {showInventoryDropdown && (
          <select
            id="InventoryDropdown"
            className="w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white mt-2"
            value={selectedTab}
            onChange={handleSelectChange}
          >
            {tabs.find(tab => tab.path === "/inventory").subOptions.map(subOption => (
              <option key={subOption.path} value={subOption.path}>
                {subOption.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="hidden sm:block">
        <div className="">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <div 
                key={tab.path} 
                className="relative" 
                onMouseOver={() => handleTabMouseOver(tab.path)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={tab.path}
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                    selectedTab === tab.path
                      ? "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-red-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-white dark:text-white dark:hover:border-gray-600 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.name}
                </Link>
                {tab.subOptions && showInventoryDropdown && selectedTab === "/inventory" && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {tab.subOptions.map((subOption) => (
                        <Link
                          key={subOption.path}
                          to={subOption.path}
                          className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                          onClick={() => handleTabMouseOver(subOption.path)}
                        >
                          {subOption.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

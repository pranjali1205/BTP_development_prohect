import React, { useState } from 'react';

function Sidebar({ onSearchChange }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
    onSearchChange(newText); // Notify parent component about search text change
  };

  return (
    <div className="col-3">
      <div className="p-4 border bg-light">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="form-control mb-3"
        />
        {/* You can add additional search-related content here */}
      </div>
    </div>
  );
}

export default Sidebar;

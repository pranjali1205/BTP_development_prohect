import React, { useState } from 'react';

function Sidebar({ onSearchChange, onSourceChange, onDestinationChange }) {
  const [searchText, setSearchText] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearchChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
  };

  const handleSourceChange = (event) => {
    const newSource = event.target.value;
    setSource(newSource);
  };

  const handleDestinationChange = (event) => {
    const newDestination = event.target.value;
    setDestination(newDestination);
  };

  const handleSearchSubmit = () => {
    onSearchChange(searchText);
  };

  const handleSourceSubmit = () => {
    onSourceChange(source);
  };

  const handleDestinationSubmit = () => {
    onDestinationChange(destination);
  };

  return (
    <div className="col-3">
      <div className="p-4 border bg-light bg-danger">
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">Search</label>
          <div className="input-group">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              id="searchInput"
              className="form-control"
              placeholder="Search..."
            />
            <button onClick={handleSearchSubmit} className="btn btn-primary">Submit</button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="sourceInput" className="form-label">Source</label>
          <div className="input-group">
            <input
              type="text"
              value={source}
              onChange={handleSourceChange}
              id="sourceInput"
              className="form-control"
              placeholder="Enter source location"
            />
            <button onClick={handleSourceSubmit} className="btn btn-primary">Set</button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="destinationInput" className="form-label">Destination</label>
          <div className="input-group">
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              id="destinationInput"
              className="form-control"
              placeholder="Enter destination location"
            />
            <button onClick={handleDestinationSubmit} className="btn btn-primary">Set</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

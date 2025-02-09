import React, { useState } from "react";

const RestaurantDetails = ({ onNext }) => {
  const [details, setDetails] = useState({ name: "", address: "" });

  const handleSubmit = () => {
    if (details.name && details.address) onNext();
  };

  return (
    <div>
      <h2>Restaurant Details</h2>
      <input
        type="text"
        placeholder="Restaurant Name"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={details.address}
        onChange={(e) => setDetails({ ...details, address: e.target.value })}
      />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default RestaurantDetails;
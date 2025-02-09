import React, { useState } from "react";

const PersonalDetails = ({ onNext }) => {
  const [details, setDetails] = useState({ name: "", email: "" });

  const handleSubmit = () => {
    if (details.name && details.email) onNext();
  };

  return (
    <div>
      <h2>Personal Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default PersonalDetails;
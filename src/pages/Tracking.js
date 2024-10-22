import React from 'react';
const Tracking = () => {
  return (
    <div>
      <h1>Track Your Package</h1>
      <form>
        <label htmlFor="trackingNumber">Tracking Number:</label>
        <input type="text" id="trackingNumber" name="trackingNumber" />
        <button type="submit">Track</button>
      </form>
    </div>
  );
};

export default Tracking;
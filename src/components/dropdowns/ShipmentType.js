import { useState } from "react";

const options = [
  { value: "standard", label: "Standard - $Free" },
  { value: "express", label: "Express - $2" },
  { value: "overnight", label: "Overnight - $5" },
  { value: "priority", label: "Priority - $1" }
];

const ShipmentType = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected Value:', selectedValue);
    onSelect(selectedValue);
  };

  return (
    <>
    <div>
      <label htmlFor="shipmentType">Choose Shipment Type</label>
      <select id="shipmentType" value={selectedOption} onChange={handleChange}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    </>
  );
};

export default ShipmentType;
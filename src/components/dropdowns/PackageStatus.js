import { useState } from "react";
import "../../css/Dropdown.css";

const options = [
  { value: "processing", label: "Processing" },
  { value: "received", label: "Recieved" },
  { value: "in transit", label: "In Transit" },
  { value: "out for delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "on hold", label: "On Hold" }
];

const PackageStatus = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected Value:', selectedValue);
    onSelect(selectedValue); 
  };

  return (
    <>
    <div className="dropdown-container">
      <label htmlFor="packageDropdown">Choose Package Status</label>
      <select id="packageDropdown" value={selectedOption} onChange={handleChange}>
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

export default PackageStatus;
import { useState } from "react"

const options = [
  { value: "10x5x1", label: "10x5x1 - $1" },
  { value: "10x5x5", label: "10x5x5  - $4"},
  { value: "15x15x5", label: "15x15x5 - $8" },
  { value: '15x15x10', label: '15x15x10 - $12' },
  { value: '25x25x5', label: '25x25x5 - $15' },
  { value: '25x25x10', label: '25x25x10 - $18' }
];

const PackageDropdown = ({ onSelect }) => {
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
      <label htmlFor="packageDropdown">Choose Pacakge Size</label>
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

export default PackageDropdown; 
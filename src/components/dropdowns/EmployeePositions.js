import { useState } from 'react';

const options = [
  { value: 'Manager', label: 'Branch Manager' },
  { value: 'Inventory', label: 'Inventory Specialist' },
  { value: 'Accountant', label: 'Accountant' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Front Desk', label: 'Front Desk' }
];

const EmployeePositionsDropdown = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected Value:', selectedValue);
    onSelect(selectedValue);
  };

  return (
    <>
    <label htmlFor="employeePositionDropdown">Choose Employee Position</label>
    <select id="employeePositionDropdown" value={selectedOption} onChange={handleChange}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    </>
  );
};

export default EmployeePositionsDropdown;
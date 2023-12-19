import React, { useState } from 'react';
import '../../styles/Dropdown.css';
import { Link } from 'react-router-dom';

interface Option{
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (selectedValue: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    if (onSelect) {
      onSelect(option.value); 
    } 
  };

  const handleAllClick = () => {
    setSelectedOption(null); 
    setIsDropdownOpen(false);
    if (onSelect) {
      onSelect('all'); 
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'All'}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-list">
          <Link
            to="/products"
            className="dropdown-option"
            onClick={handleAllClick}
          >
            All
          </Link>
          {options.map((option) => (
            <Link
              to={`/products/${option.label}`}
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

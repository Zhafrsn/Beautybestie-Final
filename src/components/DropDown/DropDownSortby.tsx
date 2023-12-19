import React, { useEffect, useState } from 'react';
import '../../styles/Dropdown.css';

interface Option{
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (selectedValue: string) => void;
}

export const DropdownSortBy: React.FC<DropdownProps> = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [cardData, setCardData] = useState<string[]>([]);
    const [originalOrder, setOriginalOrder] = useState<string[]>([]);

    const fetchOriginalOrder = () => {
        setOriginalOrder([...cardData]);
      };
    
      useEffect(() => {
        fetchOriginalOrder();
      }, []);

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
          setCardData([...originalOrder]);
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
          <div
            className="dropdown-option"
            onClick={handleAllClick}
          >
            All
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


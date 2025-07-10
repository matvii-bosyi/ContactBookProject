import React, { useState } from 'react';

export type SortDirection = 'asc' | 'desc';
export type SortType = 'date' | 'name';

interface SortButtonsProps {
  onSortChange: (sortType: SortType, direction: SortDirection) => void;
  currentSort?: SortType;
  currentDirection?: SortDirection;
}

const SortButtons: React.FC<SortButtonsProps> = ({ 
  onSortChange, 
  currentSort = 'date',
  currentDirection = 'desc'
}) => {
  const [activeSort, setActiveSort] = useState<SortType>(currentSort);
  const [sortDirection, setSortDirection] = useState<SortDirection>(currentDirection);

  const handleSortClick = (sortType: SortType) => {
    let newDirection: SortDirection;
    
    if (activeSort === sortType) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      newDirection = sortType === 'date' ? 'desc' : 'asc';
    }
    
    setActiveSort(sortType);
    setSortDirection(newDirection);
    onSortChange(sortType, newDirection);
  };

  const getArrowIcon = (sortType: SortType) => {
    if (activeSort !== sortType) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const getButtonStyles = (sortType: SortType) => {
    const isActive = activeSort === sortType;
    const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    if (isActive) {
      return `${baseClasses} bg-blue-100 text-blue-700 border-2 border-blue-300 shadow-sm`;
    }
    
    return `${baseClasses} bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm`;
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleSortClick('date')}
        className={getButtonStyles('date')}
        title={`Sort by date ${activeSort === 'date' ? (sortDirection === 'asc' ? '(oldest first)' : '(newest first)') : ''}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Date</span>
        {getArrowIcon('date')}
      </button>

      <button
        onClick={() => handleSortClick('name')}
        className={getButtonStyles('name')}
        title={`Sort by name ${activeSort === 'name' ? (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)') : ''}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span>Name</span>
        {getArrowIcon('name')}
      </button>
    </div>
  );
};

export default SortButtons;
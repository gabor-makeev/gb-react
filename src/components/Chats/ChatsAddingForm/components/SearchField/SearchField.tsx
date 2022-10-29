import React, { FC, useEffect, useRef } from 'react';
import style from './SearchField.module.scss';

interface SearchFieldProps {
  inputValue: string;
  handleInputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField: FC<SearchFieldProps> = ({
  inputValue,
  handleInputValueChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <label className={style['search-field']}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder={'Enter the name of the user'}
        onChange={(e) => handleInputValueChange(e)}
        value={inputValue}
        ref={inputRef}
      />
    </label>
  );
};

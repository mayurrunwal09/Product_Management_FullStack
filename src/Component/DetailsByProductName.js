import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <TextField
      label=""
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
  );
};

export default SearchBar;

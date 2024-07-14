
import React, { useState, useEffect } from 'react';

const MonacoEditor = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Send the initial value to the parent
    onValueChange(value);
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    // Send the updated value to the parent
    onValueChange(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default MonacoEditor;

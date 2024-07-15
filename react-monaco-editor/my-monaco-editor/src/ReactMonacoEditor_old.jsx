import React, { useState, useEffect, ChangeEvent } from 'react';

interface ReactMonacoEditorProps {
  initialValue: string;
  onValueChange: (value: string) => void;
}

const ReactMonacoEditor: React.FC<ReactMonacoEditorProps> = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    // Send the initial value to the parent
    onValueChange(value);
  }, [value, onValueChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

export default ReactMonacoEditor;
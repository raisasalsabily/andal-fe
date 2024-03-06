import React from 'react';

function InputLabel({ labelFor, content, className }) {
  return (
    <label for={labelFor} className={`block mb-1 text-b-md ${className}`}>
      {content}
    </label>
  );
}

export default InputLabel;

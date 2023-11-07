import React from 'react';
import Option from './Option';

const OptionsContainer = ({ options }) => {
  return (
    <div className="game-options">
      {options.map((option, index) => (
        <Option key={index} label={option.label} onClick={option.onClick} />
      ))}
    </div>
  );
};

export default OptionsContainer;
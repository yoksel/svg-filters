import React from 'react';

const Button = ({
  children,
  isActive,
  onClick
}) => {

  return (
    <button
      style={{
        background: isActive ?
          'gold' :
          'none'
      }}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

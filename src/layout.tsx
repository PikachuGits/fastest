import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ border: '4px dashed green', padding: 20 }}>
      <h2>Global Layout1</h2>
      {children}
    </div>
  );
};

export default Layout;
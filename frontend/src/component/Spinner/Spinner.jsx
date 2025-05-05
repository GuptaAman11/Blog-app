import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500">
      </div>
    </div>
  );
};

export default Spinner;

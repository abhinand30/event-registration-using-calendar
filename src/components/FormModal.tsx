import {  type ReactNode } from 'react';

const FormModal = ({ children,onClose }: {children:ReactNode,onClose:() => void}) => {
  return (
    <div className="fixed inset-0 bg-transparent shadow-md bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
       {children}
      </div>
    </div>
  );
};
export default FormModal;


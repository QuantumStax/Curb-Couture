/* eslint-disable react/prop-types */
const CustomScrollbarWrapper = ({ children }) => {
    return (
      <div className="custom-scrollbar w-full h-[100vh] overflow-y-auto">
        {children}
      </div>
    );
  };
  
  export default CustomScrollbarWrapper;
  
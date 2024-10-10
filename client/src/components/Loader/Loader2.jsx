import "./Loader.css"; // Import the CSS file

// eslint-disable-next-line react/prop-types
const Loader2 = () => {
  return (
    <div className="parentSpinner flex-col">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader2;

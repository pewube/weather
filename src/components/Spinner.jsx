const Spinner = ({ page = true, size = 10 }) => {
  return (
    <div
      className={page ? "spinner-container-page" : "spinner-container-img"}
      style={{ fontSize: `${size}px` }}>
      <div className="spinner">
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
        <div className="spinner-ray"></div>
      </div>
    </div>
  );
};

export default Spinner;

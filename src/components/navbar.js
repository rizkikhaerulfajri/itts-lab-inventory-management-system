function Navbar({ onAddClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 d-flex align-items-center gap-2">
          <img 
            src="/favicon.ico" 
            alt="Lab Icon" 
            width="28" 
            height="28"
          />
          Lab Inventory
        </span>
        <button 
          className="btn btn-warning fw-semibold"
          onClick={onAddClick}
        >
          + Add Item
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

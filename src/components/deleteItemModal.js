function DeleteItemModal({ item, onConfirm, onCancel }) {
  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
        onClick={onCancel}
      />
      <div 
        className="modal d-block" 
        tabIndex="-1"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-danger text-white border-0">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirm Delete
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white"
                onClick={onCancel}
              />
            </div>
            
            <div className="modal-body p-4">
              <p className="mb-3">
                Are you sure you want to delete this item?
              </p>
              <div className="alert alert-light border">
                <strong>ID:</strong> {item.id}<br />
                <strong>Name:</strong> {item.name}<br />
                <strong>Quantity:</strong> {item.quantity}
              </div>
              <p className="text-muted small mb-0">
                This action cannot be undone.
              </p>
            </div>

            <div className="modal-footer border-0">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger px-4"
                onClick={() => onConfirm(item.id)}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteItemModal;

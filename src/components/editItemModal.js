import { useState, useEffect } from 'react';

function EditItemModal({ item, onUpdate, onClose }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Good');

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setQuantity(item.quantity?.toString() || '');
      setStatus(item.status || 'Good');
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !quantity || parseInt(quantity) < 1) {
      alert('Name and quantity are required!');
      return;
    }

    const updatedData = {
      name: name.trim(),
      quantity: parseInt(quantity),
      status: status,
    };

    console.log('📤 EditItemModal submitting:', item.id, updatedData);

    onUpdate(item.id, updatedData);
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
        onClick={onClose}
      />
      <div 
        className="modal d-block" 
        tabIndex="-1"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Edit Item #{item.id}</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Item Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Raspberry Pi 4, Arduino UNO"
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label fw-semibold">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    placeholder="e.g., 5"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label fw-semibold">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Good">Good</option>
                    <option value="Needs Repair">Needs Repair</option>
                    <option value="Broken">Broken</option>
                  </select>
                </div>

                <div className="d-flex gap-2 justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditItemModal;

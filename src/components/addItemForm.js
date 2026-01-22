import { useState } from 'react';

function AddItemForm({ onAddItem, onCancel }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Good');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !quantity || parseInt(quantity) < 1) {
      alert('Name and quantity are required!');
      return;
    }

    onAddItem({
      name: name.trim(),
      quantity: parseInt(quantity),
      status: status,
    });

    setName('');
    setQuantity('');
    setStatus('Good');
  };

  return (
    <div className="card mb-4 border-primary">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Add New Item</h5>
      </div>
      <div className="card-body">
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
              placeholder="e.g., 5"
              min="1"
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

          <div className="d-grid gap-2 d-sm-flex">
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;

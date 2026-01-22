import { useState } from 'react';
import EditItemModal from './editItemModal';
import DeleteItemModal from './deleteItemModal';

function InventoryTable({ items, onUpdate, onDelete }) {
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const handleUpdate = (id, updatedData) => {
    onUpdate(id, updatedData);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    onDelete(id);
    setDeletingItem(null);
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No items found. Add one to get started!
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className="badge bg-info">
                      {item.quantity}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Good' ? 'bg-success' : 'bg-warning'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString('id-ID')
                      : 'N/A'}
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => setDeletingItem(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        {items.length === 0 ? (
          <div className="text-center text-muted py-5">
            No items found. Add one to get started!
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="card-title mb-0 fw-bold">{item.name}</h6>
                  <span className={`badge ${
                    item.status === 'Good' ? 'bg-success' : 'bg-warning'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <p className="text-muted small mb-2">ID: {item.id}</p>
                
                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted">Quantity</small>
                    <div className="fw-semibold">
                      <span className="badge bg-info">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Date Added</small>
                    <div className="fw-semibold small">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString('id-ID')
                        : 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-primary flex-fill"
                    onClick={() => setEditingItem(item)}
                  >
                    <i className="bi bi-pencil-square me-1"></i>
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger flex-fill"
                    onClick={() => setDeletingItem(item)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onUpdate={handleUpdate}
          onClose={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <DeleteItemModal
          item={deletingItem}
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </>
  );
}

export default InventoryTable;

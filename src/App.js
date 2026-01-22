import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import InventoryTable from './components/inventoryTable';
import AddItemForm from './components/addItemForm';
import Toast from './components/toast';
import Footer from './components/footer';

const STORAGE_KEY = 'lab_inventory_items';

const DEFAULT_ITEMS = [
  {
    id: 'EQUIP-001',
    name: 'Dell Monitor 24 inch',
    quantity: 15,
    status: 'Good',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'EQUIP-002',
    name: 'Logitech Keyboard K120',
    quantity: 20,
    status: 'Good',
    createdAt: '2026-01-14T14:30:00Z',
  },
  {
    id: 'EQUIP-003',
    name: 'Logitech Mouse M100',
    quantity: 18,
    status: 'Good',
    createdAt: '2026-01-13T09:15:00Z',
  },
  {
    id: 'EQUIP-004',
    name: 'HP Desktop PC',
    quantity: 12,
    status: 'Good',
    createdAt: '2026-01-12T11:00:00Z',
  },
  {
    id: 'EQUIP-005',
    name: 'TP-Link Router',
    quantity: 3,
    status: 'Good',
    createdAt: '2026-01-11T08:30:00Z',
  },
  {
    id: 'EQUIP-006',
    name: 'HDMI Cable 2m',
    quantity: 25,
    status: 'Good',
    createdAt: '2026-01-10T15:20:00Z',
  },
  {
    id: 'EQUIP-007',
    name: 'Projector Epson EB-X05',
    quantity: 2,
    status: 'Needs Repair',
    createdAt: '2026-01-09T10:45:00Z',
  },
  {
    id: 'EQUIP-008',
    name: 'Webcam Logitech C270',
    quantity: 8,
    status: 'Good',
    createdAt: '2026-01-08T13:10:00Z',
  },
  {
    id: 'EQUIP-009',
    name: 'Ethernet Cable Cat6 3m',
    quantity: 30,
    status: 'Good',
    createdAt: '2026-01-07T16:40:00Z',
  },
  {
    id: 'EQUIP-010',
    name: 'UPS APC 650VA',
    quantity: 5,
    status: 'Broken',
    createdAt: '2026-01-06T09:00:00Z',
  },
];

function loadItemsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveItemsToStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchItems = () => {
    setLoading(true);
    const stored = loadItemsFromStorage();
    if (stored.length === 0) {
      saveItemsToStorage(DEFAULT_ITEMS);
      setItems(DEFAULT_ITEMS);
    } else {
      setItems(stored);
    }
    setLoading(false);
  };

  const addItem = (newItem) => {
    const maxNum = items.length > 0 
      ? Math.max(...items.map((item) => {
          const match = item.id.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        }))
      : 0;
    
    const newId = `EQUIP-${String(maxNum + 1).padStart(3, '0')}`;

    const itemToSave = {
      id: newId,
      name: newItem.name,
      quantity: newItem.quantity,
      status: newItem.status,
      createdAt: new Date().toISOString(),
    };

    const updated = [...items, itemToSave];
    setItems(updated);
    saveItemsToStorage(updated);
    setShowForm(false);
    showToast('Item added successfully!', 'success');
  };

  const updateItem = (id, updatedData) => {
    const updatedList = items.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          name: updatedData.name,
          quantity: updatedData.quantity,
          status: updatedData.status,
          createdAt: item.createdAt,
        };
      }
      return item;
    });

    setItems(updatedList);
    saveItemsToStorage(updatedList);
    showToast('Item updated successfully!', 'success');
  };

  const deleteItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
    saveItemsToStorage(updatedList);
    showToast('Item deleted successfully!', 'success');
  };

  return (
    <div className="App">
      <Navbar onAddClick={() => setShowForm(!showForm)} />

      <div className="container mt-5">
        {showForm && (
          <AddItemForm
            onAddItem={addItem}
            onCancel={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <InventoryTable
            items={items}
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        )}
      </div>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;

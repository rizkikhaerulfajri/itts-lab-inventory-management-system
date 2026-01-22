import { useState, useEffect } from 'react';

function Toast({ message, type = 'success', onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';

  return (
    <div 
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 99999 }}
    >
      <div 
        className={`toast show align-items-center text-white ${bgClass} border-0`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body fw-semibold">
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 300);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Toast;

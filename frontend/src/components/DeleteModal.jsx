import { useEffect } from 'react';
import './DeleteModal.css';

export default function DeleteModal({
  isOpen,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  itemName = '',
  onConfirm,
  onCancel,
  loading = false,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={loading ? undefined : onCancel}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-icon-warning">⚠️</div>
          <h3 id="modal-title" className="modal-title">{title}</h3>
        </div>

        <div className="modal-body">
          <p className="modal-text">{message}</p>
          {itemName && (
            <div className="modal-item-highlight">
              <strong>Target:</strong> <span>{itemName}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}

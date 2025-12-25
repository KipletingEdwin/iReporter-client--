// src/components/common/Modal.jsx
export default function Modal({ isOpen, title, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/50
        "
        onClick={onClose} // click background to close
      >
        <div
          className="
            bg-(--bg-surface)
            border border-(--border-color)
            rounded-xl shadow-xl
            w-[90%] max-w-xl
            p-6
          "
          onClick={(e) => e.stopPropagation()} // prevent close on inner click
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-(--text-primary)">
              {title}
            </h2>
  
            <button
              onClick={onClose}
              className="text-(--text-secondary) hover:text-(--text-primary)"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
  
          {children}
        </div>
      </div>
    );
  }
  
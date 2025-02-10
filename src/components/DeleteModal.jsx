const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        {/* Confirmation Message */}
        <p className="text-lg font-semibold text-gray-700">
          Are you sure you want to delete this item?
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center space-x-4">
          {/* Delete Button */}
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Yes, Delete
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

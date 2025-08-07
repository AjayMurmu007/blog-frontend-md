import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
                <p className="text-lg mb-4">{message || "Are you sure?"}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

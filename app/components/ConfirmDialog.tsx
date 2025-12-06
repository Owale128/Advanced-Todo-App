import { motion, AnimatePresence } from "framer-motion";
import { ConfirmDialogProps } from "../models/ConfirmationDialogProps";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "Ja",
  cancelText = "Avbryt",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onCancel}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-11/12 max-w-md"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>

            <div className="flex gap-3 justify-end">
              <motion.button
                onClick={onCancel}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cancelText}
              </motion.button>
              <motion.button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;

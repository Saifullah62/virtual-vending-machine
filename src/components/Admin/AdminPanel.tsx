import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut } from 'lucide-react';
import { CardPackManager } from './CardPackManager';
import { LoginForm } from './LoginForm';
import { useAuthStore } from './store/useAuthStore';
import { useAdminStore } from './store/useAdminStore';

export function AdminPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { saveChanges } = useAdminStore();

  const handleClose = () => {
    saveChanges(); // Save any pending changes
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-primary rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
            >
              {isAuthenticated ? (
                <div className="h-[80vh] flex flex-col">
                  <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Vending Machine Administration
                    </h2>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={logout}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <LogOut className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={handleClose}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ✕
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-6">
                    <CardPackManager />
                  </div>
                </div>
              ) : (
                <LoginForm />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
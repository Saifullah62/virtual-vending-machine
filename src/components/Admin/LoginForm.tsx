import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';

export function LoginForm() {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = login(password);
    if (!isValid) {
      setError('Invalid password');
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
        <p className="text-gray-600 mt-2">Enter your password to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Enter password"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full px-4 py-3 bg-primary text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>
      </form>
    </div>
  );
}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // هذا يسمح للوصول من جميع العناوين على الشبكة
    port: 5174, // يمكنك تغيير المنفذ حسب الحاجة
  },
});

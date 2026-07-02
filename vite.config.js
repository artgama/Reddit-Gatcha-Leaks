import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Aponta para o próprio Vite resolver localmente
        bypass: (req, res, proxyOptions) => {
          // Isso faz o Vite entender chamadas de API locais no desenvolvimento
        }
      },
    },
  },
})
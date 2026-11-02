import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { IoIosWallet } from "react-icons/io";



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),    tailwindcss(), IoIosWallet,

    babel({ presets: [reactCompilerPreset()] })
  ],
})

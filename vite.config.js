import { defineConfig } from 'vite'
import { EsLinter, linterPlugin, TypeScriptLinter } from "vite-plugin-linter"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  (configEnv) => ({
    plugins: [
      linterPlugin({
        include: ["./src/**/*.ts", "./src/**/*.tsx"],
        linters: [new EsLinter({ configEnv: configEnv }), new TypeScriptLinter()],
      }),
      react()
    ],
  })
)
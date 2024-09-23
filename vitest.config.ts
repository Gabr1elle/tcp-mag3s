
import { defineVitestConfig } from '@nuxt/test-utils/config'
//environment: 'nuxt'na configuração do Vitest para habilitar o ambiente Nuxt para todos os testes.
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  }
})

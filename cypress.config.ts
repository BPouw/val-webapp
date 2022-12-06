import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'val-api.herokuapp.com/api/',
    projectId: "zyyqf5"
  }
})
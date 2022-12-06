import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://val-api.herokuapp.com/api/',
    projectId: "zyyqf5"
  }
})
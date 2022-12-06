import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    projectId: "zyyqf5",
    env: {
      api: 'https://val-api.herokuapp.com/api/'
    }
  }
})
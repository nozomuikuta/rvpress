import { argv } from "node:process"
import { createServer } from "."

const command = argv[2]

switch (command) {
  case "dev": {
    console.log("Starting development server...")
    async function createDevServer() {
      const server = await createServer()
      await server.listen(undefined)
      server.printUrls()
    }
    createDevServer().catch((err) => {
      console.error(`Failed to start development server:\n${err.message}`)
      process.exit(1)
    })
    break
  }
  case "build": {
    console.log("Building...")
    break
  }
  case "preview": {
    console.log("Starting production server...")
    break
  }
}

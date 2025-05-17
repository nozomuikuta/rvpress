import { argv } from "node:process"

const command = argv[2]

switch (command) {
  case "dev": {
    console.log("Starting development server...")
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

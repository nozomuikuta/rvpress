import { createServer as createViteServer } from 'vite'
import { resolveConfig } from './config.ts'

export async function createServer() {
  const { root, base, cacheDir } = await resolveConfig()

  return createViteServer({
    root,
    base,
    cacheDir,
    plugins: [
      {
        name: 'rvpress',
        // TODO: implement transform logic for index.html
        async configureServer(server) {
          return () => {
            server.middlewares.use(async (req, res, next) => {
              if (req.url?.endsWith('.html')) {
                const html = `
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <h1>Hello, rvpress!</h1>
  </body>
</html>
`
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(html)
                return
              }
              next()
            })
          }
        }
      },
    ],
  })
}

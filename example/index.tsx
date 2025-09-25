// eslint-disable-next-line unused-imports/no-unused-imports
import { html, Html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import { htmx } from '../src/htmx'

console.warn('Server running at http://localhost:3000')

new Elysia()
  .use(html())
  .use(htmx())
  .get('/', () => {
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="htmx-config" content='{"historyRestoreAsHxRequest": false}' />
          <script src="https://unpkg.com/htmx.org@2"></script>
          <link rel="stylesheet" href="https://unpkg.com/picnic" />
          <title>Elysia + HTMX</title>
        </head>
        <body>
          <h1>Hello Elysia + HTMX!</h1>
          <button
            hx-get="/get"
            hx-target="#fragment"
            hx-swap="innerHTML"
          >
            Load Fragment
          </button>
          <div id="fragment">
            <div>Initial Fragment</div>
          </div>
          <button
            hx-post="/post"
          >
            Feeling Lucky?
          </button>
        </body>
      </html>
    )
  })
  .get('/get', ({ htmx }) => {
    if (!htmx)
      return 'Not an HTMX request!'
    return (
      <div style="color: red;">
        This is a fragment loaded via HTMX!
        location:
        {' '}
        {htmx.currentUrl.toString()}
      </div>
    )
  })
  .post('/post', ({ setHtmx }) => {
    setHtmx.redirect = 'https://elysiajs.com'
    return 'Redirecting to Elysia website...'
  })
  .listen(3000)

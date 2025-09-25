import type { HtmxResponseOptions } from './header'
import { Elysia } from 'elysia'
import { applyHtmxResponseHeaders, createHtmxRequestOptions } from './header'

export function htmx() {
  return new Elysia({ name: 'elysia-htmx' })
    .derive({ as: 'global' }, ({ headers }) => {
      return {
        htmx: createHtmxRequestOptions(headers),
        setHtmx: {} as HtmxResponseOptions,
      }
    })
    .onAfterHandle({ as: 'global' }, ({ htmx, setHtmx, set }) => {
      if (htmx)
        applyHtmxResponseHeaders(set.headers, setHtmx)
    })
}

import type { HtmxResponseOptions } from './header'
import { Elysia } from 'elysia'
import { applyHtmxResponseHeaders, createHtmxRequestOptions } from './header'

export function htmx() {
  return new Elysia({ name: 'elysia-htmx' })
    .derive({ as: 'global' }, ({ headers }) => {
      return {
        /**
         * The HTMX request options if the request is an HTMX request, otherwise null.
         *
         * It's useful to check this property's truthiness before proceeding with HTMX-specific logic,
         * like responding fragments for HTMX requests only.
         */
        htmx: createHtmxRequestOptions(headers),
      }
    })
    .macro({
      htmx: (options: HtmxResponseOptions) => ({
        afterHandle({ set, htmx }) {
          if (htmx)
            applyHtmxResponseHeaders(set.headers, options)
        },
      }),
    })
}

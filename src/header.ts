import type { HTTPHeaders } from 'elysia'

export interface HtmxRequestOptions {
  /**
   * indicates that the request is via an element using {@link https://htmx.org/attributes/hx-boost/ hx-boost}
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  boosted: boolean

  /**
   * the current URL of the browser
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  currentUrl: URL

  /**
   * `true` if the request is for history restoration after a miss in the local history cache
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  historyRestoreRequest: boolean

  /**
   * the user response to an {@link https://htmx.org/attributes/hx-prompt/ hx-prompt}
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  prompt: string | null

  /**
   * the `id` of the target element if it exists
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  target: string | null

  /**
   * the `id` of the triggered element if it exists
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  trigger: string | null

  /**
   * the `name` of the triggered element if it exists
   * @see {@link https://htmx.org/reference/#request_headers}
   */
  triggerName: string | null
}

export interface HtmxResponseOptions {
  /**
   * allows you to do a client-side redirect that does not do a full page reload
   * @see {@link https://htmx.org/headers/hx-location/}
   */
  location?: string

  /**
   * pushes a new url into the history stack
   * @see {@link https://htmx.org/headers/hx-push-url/}
   */
  pushUrl?: string

  /**
   * can be used to do a client-side redirect to a new location
   * @see {@link https://htmx.org/headers/hx-redirect/}
   */
  redirect?: string

  /**
   * if set to `true` the client-side will do a full refresh of the page
   * @see {@link https://htmx.org/reference/#response_headers}
   */
  refresh?: boolean

  /**
   * replaces the current URL in the location bar
   * @see {@link https://htmx.org/headers/hx-replace-url/}
   */
  replaceUrl?: string

  /**
   * allows you to specify how the response will be swapped.
   * See {@link https://htmx.org/attributes/hx-swap/ hx-swap} for possible values
   * @see {@link https://htmx.org/reference/#response_headers}
   */
  reswap?: string

  /**
   * a CSS selector that updates the target of the content update to a different element on the page
   * @see {@link https://htmx.org/reference/#response_headers}
   */
  retarget?: string

  /**
   * a CSS selector that allows you to choose which part of the response is used to be swapped in.
   * Overrides an existing hx-select on the triggering element
   * @see {@link https://htmx.org/reference/#response_headers}
   */
  reselect?: string

  /**
   * allows you to trigger client-side events
   * @see {@link https://htmx.org/headers/hx-trigger/}
   */
  trigger?: string

  /**
   * allows you to trigger client-side events after the settle step
   * @see {@link https://htmx.org/headers/hx-trigger/}
   */
  triggerAfterSettle?: string

  /**
   * allows you to trigger client-side events after the swap step
   * @see {@link https://htmx.org/headers/hx-trigger/}
   */
  triggerAfterSwap?: string
}

/**
 * Creates the HTMX request options from the incoming request.
 * @param headers the incoming request headers
 * @returns the HTMX request options or null if not an HTMX request
 */
export function createHtmxRequestOptions(headers: Record<string, string | undefined>): HtmxRequestOptions | null {
  if (headers['hx-request'] !== 'true')
    return null

  if (!headers['hx-current-url'])
    throw new Error('Unreachable: HX-Current-URL is not present while HX-Request is true.')

  return {
    boosted: headers['hx-boosted'] === 'true',
    currentUrl: new URL(headers['hx-current-url']!),
    historyRestoreRequest: headers['hx-history-restore-request'] === 'true',
    prompt: headers['hx-prompt'] ?? null,
    target: headers['hx-target'] ?? null,
    trigger: headers['hx-trigger'] ?? null,
    triggerName: headers['hx-trigger-name'] ?? null,
  }
}

/**
 * Mutates the response headers to include the HTMX response headers.
 * @param headers the response headers to mutate
 * @param options the HTMX response options
 */
export function applyHtmxResponseHeaders(headers: HTTPHeaders, options: HtmxResponseOptions): void {
  if (options.location)
    headers['hx-location'] = options.location

  if (options.pushUrl)
    headers['hx-push-url'] = options.pushUrl

  if (options.redirect)
    headers['hx-redirect'] = options.redirect

  if (options.refresh)
    headers['hx-refresh'] = 'true'

  if (options.replaceUrl)
    headers['hx-replace-url'] = options.replaceUrl

  if (options.reswap)
    headers['hx-reswap'] = options.reswap

  if (options.retarget)
    headers['hx-retarget'] = options.retarget

  if (options.reselect)
    headers['hx-reselect'] = options.reselect

  if (options.trigger)
    headers['hx-trigger'] = options.trigger

  if (options.triggerAfterSettle)
    headers['hx-trigger-after-settle'] = options.triggerAfterSettle

  if (options.triggerAfterSwap)
    headers['hx-trigger-after-swap'] = options.triggerAfterSwap
}

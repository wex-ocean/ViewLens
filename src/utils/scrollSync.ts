export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const syncScrollAcrossFrames = (
  iframes: HTMLIFrameElement[],
  scrollX: number,
  scrollY: number
) => {
  iframes.forEach((iframe) => {
    try {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: "SYNC_SCROLL",
            scrollX,
            scrollY
          },
          "*"
        )
      }
    } catch (error) {
      console.warn("Cross-origin iframe detected, scroll sync limited:", error)
    }
  })
}

export const injectScrollListener = (iframe: HTMLIFrameElement, onScroll: (x: number, y: number) => void) => {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) return

    const script = iframeDoc.createElement("script")
    script.textContent = `
      (function() {
        let lastX = 0, lastY = 0;
        const debouncedScroll = (function() {
          let timeout;
          return function(fn, delay) {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay);
          };
        })();

        window.addEventListener('scroll', function() {
          const x = window.scrollX || window.pageXOffset;
          const y = window.scrollY || window.pageYOffset;
          if (x !== lastX || y !== lastY) {
            lastX = x;
            lastY = y;
            debouncedScroll(function() {
              window.parent.postMessage({
                type: 'IFRAME_SCROLL',
                scrollX: x,
                scrollY: y
              }, '*');
            }, 16);
          }
        }, { passive: true });

        window.addEventListener('message', function(event) {
          if (event.data.type === 'SYNC_SCROLL') {
            window.scrollTo(event.data.scrollX, event.data.scrollY);
          }
        });
      })();
    `
    iframeDoc.head.appendChild(script)
  } catch (error) {
    console.warn("Could not inject scroll listener (cross-origin):", error)
  }
}

export const handleCrossOriginWarning = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    const currentOrigin = window.location.origin
    return urlObj.origin !== currentOrigin
  } catch {
    return false
  }
}

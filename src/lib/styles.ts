declare const __DSHCM_TAILWIND_CSS__: string;

let injected = false;

export function ensureTailwindStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector('style[data-dshcm-tailwind]')) {
    injected = true;
    return;
  }
  if (injected) return;
  injected = true;
  const style = document.createElement('style');
  style.dataset.dshcmTailwind = '';
  style.textContent = __DSHCM_TAILWIND_CSS__;
  document.head.appendChild(style);
}

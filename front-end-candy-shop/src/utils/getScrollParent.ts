export const getScrollParent = (element: HTMLElement, includeHidden?: boolean) => {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === 'fixed') return document.body;
  for (let parent: HTMLElement | null = element; (parent = parent.parentElement);) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  }

  return document.body;
}

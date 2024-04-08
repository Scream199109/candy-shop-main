import {useEffect, useState} from 'react';

/**
 * Вот настоящий click outside
 * Возвращает класс, который нужно присвоить элементу,
 * чтобы при клике на который не триггерилось событие
 * @param callback
 */
export function useClickOutside(callback: (() => void)) {
  const [className] = useState(`outside-element-${Math.floor(Math.random() * 10000)}`)

  useEffect(() => {
    const onClick = ({target}: MouseEvent) => {
      if (!target || !(target instanceof Element)) return;
      if (!target.closest(`.${className}`)) callback();
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  });

  return className;
}

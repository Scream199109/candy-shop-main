'use client'
import {classNames} from "components/shared/lib/classNames/classNames";
import {useClickOutside} from "hooks/useClickOutside";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import {PropsWithChildren, ReactNode, useLayoutEffect, useState} from "react";
import {Portal} from "../../Portal/Portal";
import styles from './DropDownMenu.module.scss';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
}

interface Props extends PropsWithChildren {
  items: MenuItem[];
  buttonClassName?: string;
  onChange?: (label: string) => void;
}

// Отступ от правого края экрана
const menuMargin = 8;

const DropDownMenu = ({children, items, buttonClassName, onChange}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null);
  const [left, setLeft] = useState<number | undefined>(0);
  const [top, setTop] = useState<number | undefined>(0);

  const [windowWidth] = useWindowSize();

  const onResize = () => {
    if (!buttonElement || !contentElement) return;
    const buttonBounds = buttonElement?.getBoundingClientRect();
    const menuBounds = contentElement?.getBoundingClientRect();

    const menuWidth = menuBounds.width;
    const widthGap = windowWidth - buttonBounds.x;

    setTop(buttonBounds?.y + buttonBounds?.height + menuMargin);

    if (widthGap < menuWidth) {
      setLeft(buttonBounds?.x - menuWidth - menuMargin + widthGap)
    } else {
      setLeft(buttonBounds.x)
    }
  }

  useLayoutEffect(() => {
    onResize();
  }, [buttonElement, contentElement, windowWidth])

  // внутренний триггер
  const onStateChangeHandler = (state: boolean) => {
    setIsOpen(state);
  }

  // триггер по клику вне элемента
  useClickOutside(() => onStateChangeHandler(false));

  const mods = {
    [styles.isOpen]: isOpen
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={buttonClassName}
        onClick={() => onStateChangeHandler(!isOpen)}
        ref={setButtonElement}
      >
        {children}
      </button>
      <Portal>
        <div
          className={classNames(styles.menu, mods)}
          style={{transform: `translate(${left}px, ${top}px)`}}
          ref={setContentElement}
        >
          {items.map(item => {
            return <div
              key={item.id}
              className={styles.menu_item}
            >
              {
                item.href ?
                  <Link href={item.href} className={styles.link}>
                    {item.icon}
                    {item.label}
                  </Link>
                  :
                  <button
                    className={styles.link}
                    onClick={() => {
                      onChange && onChange(item.id);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
              }
            </div>
          })}
        </div>
      </Portal>
    </div>
  );
};

export default DropDownMenu;

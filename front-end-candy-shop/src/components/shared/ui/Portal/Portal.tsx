'use client'
import {useMounted} from 'hooks/useMounted';
import {ReactNode} from 'react';
import {createPortal} from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {

  // для того чтобы не было ошибки "Documnet is not defined in NEXT.JS"
  const mounted = useMounted();
  if (!mounted) return null

  const {
    children,
    element = document.body,
  } = props;

  return createPortal(children, element);
};

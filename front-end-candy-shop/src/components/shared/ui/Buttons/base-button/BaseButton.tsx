import {
  Attributes,
  CSSProperties,
  ComponentPropsWithRef,
  ComponentType,
  createElement,
} from 'react'

export type BaseButtonComponent =
  | keyof JSX.IntrinsicElements
  | ComponentType<any>

type BaseProps<C extends BaseButtonComponent = 'button'> = {
  component?: C
  className?: string
  style?: CSSProperties
} & Attributes

export type BaseButtonProps<C extends BaseButtonComponent = 'button'> =
  C extends keyof JSX.IntrinsicElements
  ? Omit<ComponentPropsWithRef<C>, keyof BaseProps<C>> & BaseProps<C>
  : C extends ComponentType<infer P>
  ? P extends ComponentPropsWithRef<any>
  ? Omit<P, keyof BaseProps<C>> & BaseProps<C>
  : never
  : never

export default function BaseButton<C extends BaseButtonComponent = 'button'>({
  component = 'button',
  children,
  ...props
}: BaseButtonProps<C>) {
  return createElement(component, props, children)
}

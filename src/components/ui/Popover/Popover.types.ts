import {
	HTMLAttributes,
	InputHTMLAttributes,
	MutableRefObject,
	ReactNode,
	RefObject
} from 'react'


export type TypePopoverSide = 'left' | 'right' | 'top' | 'bottom'
export type TypePopoverTrigger = HTMLDivElement | HTMLLabelElement | null

export interface IPopoverContext {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
	toggleMode?: boolean
	ref: MutableRefObject<HTMLDivElement | null>
	canOpen?: boolean
	contentRef: RefObject<HTMLDivElement | null>
	triggerRef: RefObject<TypePopoverTrigger>
	
}

export type TypePopoverAutoPosition = 'same-axis' | 'any-axis'

export interface IPopoverProps {
	toggleMode: boolean
	className: string
	canOpen: boolean
	onOpenChange: (isOpen: boolean) => void
	defaultOpen: boolean
	side:TypePopoverSide
	autoPosition: TypePopoverAutoPosition
	inheritWidth:boolean
}

export interface IPopoverInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	iconLeft?: JSX.Element
	iconRight?: JSX.Element
	wrapperClassName?: string
}

// @ts-ignore
export interface IPopoverTriggerProps extends HTMLAttributes<HTMLDivElement> {
	children: ((triggerFunction: () => void) => JSX.Element) | JSX.Element | ReactNode
}


export interface IPopoverCloseProps extends HTMLAttributes<HTMLElement> {
	asChild?:boolean
}
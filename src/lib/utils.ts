import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type MutableRefObject, type RefCallback } from 'react'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};


type MutableRefList<T> = Array<
	RefCallback<T> | MutableRefObject<T> | undefined | null
>

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
	return (val: T) => {
		setRef(val, ...refs)
	}
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
	refs.forEach((ref) => {
		if (typeof ref === 'function') {
			ref(val)
		} else if (ref != null) {
			ref.current = val
		}
	})
}
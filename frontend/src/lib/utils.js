import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges CSS class names, cleanly resolving Tailwind CSS conflicts.
 * Standard helper used by shadcn/ui components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import { z } from "zod"

/**
 * Zod validation schema for the Login form.
 * Ensures the email is properly formatted and password meets a basic length constraint.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
})

/**
 * Zod validation schema for creating a new Friend card.
 * - `name`: Required, at least 2 characters.
 * - `email`: Required, valid email format.
 * - `role`: Optional description/role.
 * - `bio`: Optional short bio description.
 * - `imageUrl`: Optional string. If provided (non-empty), must pass URL validation.
 */
export const friendSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  imageUrl: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true
      try {
        new URL(val)
        return true
      } catch {
        return false
      }
    }, {
      message: "Please enter a valid image URL (e.g. https://example.com/avatar.jpg)",
    }),
})

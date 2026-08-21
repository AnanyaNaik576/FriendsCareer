const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.')
});

const registerSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.')
});

const createFriendSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Please provide a valid email address.'),
  role: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  hobbies: z.array(z.string().trim()).optional(),
  // The frontend submits an empty string for an untouched optional image input.
  imageUrl: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().trim().url('Image URL must be a valid URL.').optional()
  ),
  dateJoined: z.coerce.date().optional()
});

module.exports = { loginSchema, registerSchema, createFriendSchema };

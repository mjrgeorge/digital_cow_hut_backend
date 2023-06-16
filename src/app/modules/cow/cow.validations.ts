import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum(
      [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ] as [string, ...string[]],
      {
        required_error: 'Location is required',
      }
    ),
    breed: z.string({
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum(['for sale', 'sold out'] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum(
      ['Dairy', 'Beef', 'Dual Purpose'] as [string, ...string[]],
      {
        required_error: 'Category is required',
      }
    ),
    seller: z.string({
      required_error: 'User is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    location: z
      .enum(
        [
          'Dhaka',
          'Chattogram',
          'Barishal',
          'Rajshahi',
          'Sylhet',
          'Comilla',
          'Rangpur',
          'Mymensingh',
        ] as [string, ...string[]],
        {
          required_error: 'Location is required',
        }
      )
      .optional(),
    breed: z
      .string({
        required_error: 'Breed is required',
      })
      .optional(),
    weight: z
      .number({
        required_error: 'Weight is required',
      })
      .optional(),
    label: z
      .enum(['for sale', 'sold out'] as [string, ...string[]], {
        required_error: 'Label is required',
      })
      .optional(),
    category: z
      .enum(['Dairy', 'Beef', 'Dual Purpose'] as [string, ...string[]], {
        required_error: 'Category is required',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'User is required',
      })
      .optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};

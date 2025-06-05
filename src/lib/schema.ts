import { z } from 'zod'

export const FormDataSchema = z.object({
  course: z.string().min(1, 'Course is required'),
  passoutYear: z.string().min(1, 'Pass Out Year is required'),
  interests: z.object({
    web: z.boolean(),
    app: z.boolean(),
    ml: z.boolean(),
    ai: z.boolean(),
    iot: z.boolean(),
    blockchain: z.boolean(),
    cloud: z.boolean(),
    design: z.boolean(),
    management: z.boolean(),
    other: z.string()
  }),


  phoneNumber:z.string(),
  // email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})

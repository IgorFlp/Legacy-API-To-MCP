import z from "zod";

export const CustomerSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    phone: z.string(),
})

export type Customer = z.infer<typeof CustomerSchema>

export type CreatedCustomer = {message: string, id:string}

export const CustomerQuerySchema = z.object({
   _id: z.string().optional().describe("MongoDB Object ID from customer"),
    name: z.string().optional().describe("Full customer name"),
    phone: z.string().optional().describe("Customer's phone number")
})

export type CustomerQuery = z.infer<typeof CustomerQuerySchema>
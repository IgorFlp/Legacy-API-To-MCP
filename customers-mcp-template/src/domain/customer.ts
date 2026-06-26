import z from "zod";

// Find all
export const CustomerSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    phone: z.string(),
})

export type Customer = z.infer<typeof CustomerSchema>

// Resultado de chamadas mutadas. Create e update
export const CustomerMutationSchema = z.object({
    id: z.string().optional().describe("MongoDB Object ID from customer"),
    message: z.string().optional().describe("Confirmation message"),
    isError: z.boolean().optional().describe("Indicates if there is an error")
})
export type CustomerMutation = z.infer<typeof CustomerMutationSchema>


//Find by key
export const CustomerQuerySchema = z.object({
    _id: z.string().optional().describe("MongoDB Object ID from customer"),
    name: z.string().optional().describe("Full customer name"),
    phone: z.string().optional().describe("Customer's phone number")
})

export type CustomerQuery = z.infer<typeof CustomerQuerySchema>


// Update
export const CustomerUpdateSchema = CustomerQuerySchema.extend({
    _id: z.string().describe("MongoDB Object ID from customer"),
})

export type CustomerUpdate = z.infer<typeof CustomerUpdateSchema>
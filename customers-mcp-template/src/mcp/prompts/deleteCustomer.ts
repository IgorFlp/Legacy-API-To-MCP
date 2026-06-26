import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type CustomerQuery, CustomerQuerySchema, CustomerSchema } from "../../domain/customer.ts";
import z from "zod"
export function registerDeleteCustomerPrompt(server:McpServer,){
    server.registerPrompt(
        "delete_customer_prompt",
        {
            description: "Prompt to delete an existing customer by id",
            argsSchema: z.object({id:z.string().describe("MongoDB _id from customer")}).shape,
            
        },
        ({id})=>({
            messages:[{
                role: "user",
                content: {
                    type: "text",
                    text: `Please delete the customer with the following id using the delete_customer tool.\nId: ${id}`
                }
            }]
        })
    )
}
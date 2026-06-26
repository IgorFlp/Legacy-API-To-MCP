import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type CustomerQuery, CustomerQuerySchema, CustomerSchema, CustomerUpdateSchema } from "../../domain/customer.ts";

export function registerUpdateCustomerPrompt(server:McpServer,){
    server.registerPrompt(
        "update_customer_prompt",
        {
            description: "Prompt to update an existing customer by id",
            argsSchema: CustomerUpdateSchema.shape
            
        },
        (customer)=>({
            messages:[{
                role: "user",
                content: {
                    type: "text",
                    text: `Please update an existing user with id ${customer._id} with the following data using the update_customer tool.\nCustomer: ${JSON.stringify(customer)}`
                }
            }]
        })
    )
}
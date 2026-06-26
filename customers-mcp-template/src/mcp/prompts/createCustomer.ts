import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type CustomerQuery, CustomerQuerySchema, CustomerSchema } from "../../domain/customer.ts";

export function registerCreateCustomerPrompt(server:McpServer,){
    server.registerPrompt(
        "create_customer_prompt",
        {
            description: "Prompt to create a new customer with name and phone",
            argsSchema: CustomerSchema.shape
            
        },
        (customer)=>({
            messages:[{
                role: "user",
                content: {
                    type: "text",
                    text: `Please create a new customer with following data using the create_customer tool.\nCustomer: ${JSON.stringify(customer)}`
                }
            }]
        })
    )
}
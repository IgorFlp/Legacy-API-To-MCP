import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod"
import { type CreatedCustomer} from "../../domain/customer.ts";

export function registerCreateCustomerTool(
    server:McpServer,
    service: CustomerService
){
    server.registerTool(
        "create_customer",
        {
            description: "Creates a new customer",
            inputSchema: {
                name: z.string().describe("Full customer name"),
                phone: z.string().describe("Customer's phone number")
            },
            outputSchema: {                
                id: z.string().describe("MongoDB ID"),      
                message: z.string().describe("User created message"),
            },
        },
        async ({name, phone})=>{ 
            try {                
                const customer : CreatedCustomer = await service.createCustomer({name,phone})
                return{
                    content: [{
                        type: 'text',
                        text: JSON.stringify(customer)
                    }],
                    structuredContent: customer
                }
            } catch (error) {
                return{
                    isError: true,
                    content:[{
                        type:'text',
                        text: `Failed to create customer, please try again: ${error instanceof Error? error.message : String(error)}`
                     }
                    ]
                }
            }
        }
    )
}
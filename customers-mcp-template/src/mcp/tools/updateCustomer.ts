import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod"
import { CustomerMutationSchema, CustomerQuerySchema, CustomerUpdateSchema, type CustomerMutation} from "../../domain/customer.ts";

export function registerUpdateCustomerTool(
    server:McpServer,
    service: CustomerService
){
    server.registerTool(
        "update_customer",
        {
            description: "Updates an existing customer by id",
            inputSchema: CustomerUpdateSchema.shape,
            outputSchema: CustomerMutationSchema.shape,
        },
        async (customer)=>{             
            try {                
                const response : CustomerMutation = await service.updateCustomer(customer)
                return{
                    content: [{
                        type: 'text',
                        text: response.message ?? ""
                    }],
                    structuredContent: response
                }
            } catch (error) {
                return{
                    isError: true,
                    content:[{
                        type:'text',
                        text: `Failed update customer, please try again: ${error instanceof Error? error.message : String(error)}`
                     }
                    ]
                }
            }
        }
    )
}
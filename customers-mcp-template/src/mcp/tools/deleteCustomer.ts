import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod"
import { CustomerMutationSchema, CustomerQuerySchema, CustomerUpdateSchema, type CustomerMutation} from "../../domain/customer.ts";

export function registerDeleteCustomerTool(
    server:McpServer,
    service: CustomerService
){
    server.registerTool(
        "delete_customer",
        {
            description: "Deletes an existing customer by id",
            inputSchema: z.object({id:z.string().describe("MongoDB id to be deleted")}),
            outputSchema: CustomerMutationSchema.shape,
        },
        async ({id})=>{             
            try {                
                const response : CustomerMutation = await service.deleteCustomer(id)
                return{
                    content: [{
                        type: 'text',
                        text: JSON.stringify(response)
                    }],
                    structuredContent: response
                }
            } catch (error) {
                return{
                    isError: true,
                    content:[{
                        type:'text',
                        text: `Failed delete customer, please try again: ${error instanceof Error? error.message : String(error)}`
                     }
                    ]
                }
            }
        }
    )
}
import { describe, it, after, before } from "node:test";
import { createTestClient } from "../helpers.ts";
import { Client } from "@modelcontextprotocol/sdk/client";
import type { CustomerUpdate, Customer, CustomerMutation } from "../../src/domain/customer.ts";
import assert  from "node:assert";

type CustomersResult = {structuredContent: {customers:Customer[]}}
type CustomerResult = {structuredContent: {customer:Customer}}
type CustomerMutationResult = {structuredContent: CustomerMutation}

describe("Customer MCP Suite",()=>{
    let client: Client

    before(async ()=>{
       client = await createTestClient()
    })
    after(async ()=>{
        await client.close()
    })

    it("Should list all customers", async()=>{
        const result = await client.callTool({
            name:"list_customers",
            arguments:{}
        }) as unknown as CustomersResult

        assert.ok(
            Array.isArray(result.structuredContent.customers),
            "Should return an array of customers"
        )

    })
    
    it("Should create a new customer",async ()=>{
        const customer = {
                name: "Teste",
                phone: "121-330",                
            };
        const result = await client.callTool({
            name:"create_customer",
            arguments: customer
            
        })as unknown as CustomerMutationResult       


        assert.ok(
            result.structuredContent.id,
            'Should contain customer ID'
        )
        assert.deepStrictEqual(
            result.structuredContent.message,
            `user ${customer.name} created!`,
            'Should contain customer create message'
        )
    })
    it("Should find a customer by name",async ()=>{
        const customer = {
                name: "Igor",
                phone: "333-333",                
            };
        await client.callTool({
            name:"create_customer",
            arguments: customer
            
        })as unknown as CustomerMutationResult

        const result = await client.callTool({
            name:"get_customer",
            arguments: {
                name: customer.name
            }
            
        })as unknown as CustomerResult

        assert.ok(
            result.structuredContent.customer._id,
            'Should contain customer ID'
        )
        assert.deepStrictEqual(
            result.structuredContent.customer.name,
            customer.name,
            'Should contain customer name'
        )
    })
    it("Should update a customer",async ()=>{
        const createCustomer = {
                name: "Teste",
                phone: "121-330",                
        };
        const {structuredContent:{id}} = await client.callTool({
            name:"create_customer",
            arguments: createCustomer
            
        })as unknown as CustomerMutationResult

        const result = await client.callTool({
            name:'update_customer',
            arguments: {
                _id: id,
                name: "Jorge",
                phone: "121-330",  
            } as CustomerUpdate
        }) as unknown as CustomerMutationResult

        assert.deepStrictEqual(
            result.structuredContent.id,
            id,
            'Should contain customer ID'
        )
        
        assert.deepStrictEqual(
            result.structuredContent.message,
            `User ${id} updated!`,
            'Should contain customer create message'
        )
        
    })

    it("Should delete a customer by id",async ()=>{
        const createCustomer = {
                name: "Teste",
                phone: "121-330",                
        };
        const {structuredContent:{id}} = await client.callTool({
            name:"create_customer",
            arguments: createCustomer
            
        })as unknown as CustomerMutationResult

        const result = await client.callTool({
            name:'delete_customer',
            arguments: {
                id: id, 
            },
        }) as unknown as CustomerMutationResult

        assert.deepStrictEqual(
            result.structuredContent.id,
            id,
            'Should contain customer ID'
        )
        
        assert.deepStrictEqual(
            result.structuredContent.message,
            `User ${id} deleted!`,
            'Should contain customer create message'
        )
        
    })

})
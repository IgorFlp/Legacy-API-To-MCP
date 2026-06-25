import { describe, it, after, before } from "node:test";
import { createTestClient } from "../helpers.ts";
import { Client } from "@modelcontextprotocol/sdk/client";
import { type Customer, type CreatedCustomer } from "../../src/domain/customer.ts";
import assert  from "node:assert";

type CustomersResult = {structuredContent: {customers:Customer[]}}
type CustomerResult = {structuredContent: {customer:Customer}}
type CreateCustomerResult = {structuredContent: CreatedCustomer}

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
            
        })as unknown as CreateCustomerResult
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
            
        })as unknown as CreateCustomerResult

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
    

})
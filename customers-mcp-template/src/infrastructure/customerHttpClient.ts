import {type CreatedCustomer, type Customer} from '../domain/customer.ts'

export class CustomerHttpClient{
    private baseUrl: string
    constructor(baseUrl:string){
        this.baseUrl = baseUrl
    }

    async listCustomers(): Promise<Customer[]>{
        const response = await fetch(`${this.baseUrl}/customers`)
        return response.json() as Promise<Customer[]>
    }
    async createCustomer(customer:Customer): Promise<CreatedCustomer>{
        const init = {
            "method":"POST",
            "headers": {"Content-Type":"application/json"},
            "body": JSON.stringify(customer)
        }
        const response = await fetch(`${this.baseUrl}/customers`,init)
      
        return response.json() as Promise<CreatedCustomer>
    }
}
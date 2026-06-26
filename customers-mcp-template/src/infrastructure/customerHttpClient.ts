import {type CustomerMutation, type Customer, type CustomerUpdate} from '../domain/customer.ts'

export class CustomerHttpClient{
    private baseUrl: string
    constructor(baseUrl:string){
        this.baseUrl = baseUrl
    }

    async listCustomers(): Promise<Customer[]>{
        const response = await fetch(`${this.baseUrl}/customers`)
        return response.json() as Promise<Customer[]>
    }
    async createCustomer(customer:Customer): Promise<CustomerMutation>{
        const init = {
            "method":"POST",
            "headers": {"Content-Type":"application/json"},
            "body": JSON.stringify(customer)
        }
        const response = await fetch(`${this.baseUrl}/customers`,init)
      
        return response.json() as Promise<CustomerMutation>
    }
    async getCustomerById(id:string): Promise<Customer | null>{
        const response = await fetch(`${this.baseUrl}/customers/${id}`)
        if(response.status === 404) return null
        return response.json() as Promise<Customer>
    }
    async updateCustomer(customer:CustomerUpdate): Promise<CustomerMutation>{
        const {_id, ...remaining} = customer
        const init = {
            "method":"PUT",
            "headers": {"Content-Type":"application/json"},
            "body": JSON.stringify(remaining)
        }
        const response = await fetch(`${this.baseUrl}/customers/${_id}`,init)
      
        return response.json() as Promise<CustomerMutation>
    }
    async deleteCustomer(id:string): Promise<CustomerMutation>{        
        const response = await fetch(`${this.baseUrl}/customers/${id}`,{
            "method":"DELETE",           
        })
      
        return response.json() as Promise<CustomerMutation>
    }
}
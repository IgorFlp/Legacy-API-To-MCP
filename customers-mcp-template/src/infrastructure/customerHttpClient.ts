import {type Customer} from '../domain/customer.ts'

export class CustomerHttpClient{
    private baseUrl: string
    constructor(baseUrl:string){
        this.baseUrl = baseUrl
    }

    async listCustomers(): Promise<Customer[]>{
        const response = await fetch(`${this.baseUrl}/customers`)
        return response.json() as Promise<Customer[]>
    }
}
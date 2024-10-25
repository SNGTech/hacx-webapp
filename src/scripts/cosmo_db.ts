import { CosmosClient, Container, ItemResponse } from "@azure/cosmos";


interface Product {
    id: string;
    category: string;
    name: string;
    quantity: number;
    price: number;
    clearance: boolean;
}


const connectionString = "M4tux18JDvRDyirwGWrNHNcTgQgfz4WqawyZraWVo0N6ZHaStpy2ucLtkjVSYlC4SevzACGNFKLiACDb2Z1RPw==";
const cosmosEndpoint = 'https://gitgud-azure-cosmos-db.documents.azure.com/';


// CosmosClient setup with proxied endpoint
const client = new CosmosClient({
    endpoint: cosmosEndpoint,
    key: connectionString,
});

const container: Container = client.database('gitgud-hacx-db').container('Test');

const item: Product = {
    id: '70b63682-b93a-4c77-aad2-65501347265f',
    category: 'gear-surf-surfboards',
    name: 'Yamba Surfboard',
    quantity: 12,
    price: 850.00,
    clearance: false
};

// Async function to handle upsert
export async function upsertItem() {
    try {
        const response: ItemResponse<Product> = await container.items.upsert<Product>(item);
        console.log("Upserted item with id:", response.resource?.id);
        console.log("Response status:", response.statusCode);
    } catch (error) {
        console.error("Error upserting item:", error);
    }
}
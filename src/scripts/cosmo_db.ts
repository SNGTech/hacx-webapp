import { CosmosClient, Container, ItemResponse } from "@azure/cosmos";

const id = '70b63682-b93a-4c77-aad2-65501347265f';
interface Threshold {
    id: string;
    ReactionTime: number;
    BrainTemp: number;
    MinDilation: number;
    MaxDilation: number;
    stepWidth: number;
    cadence : number;
}

const connectionString = "M4tux18JDvRDyirwGWrNHNcTgQgfz4WqawyZraWVo0N6ZHaStpy2ucLtkjVSYlC4SevzACGNFKLiACDb2Z1RPw==";
const cosmosEndpoint = 'https://gitgud-azure-cosmos-db.documents.azure.com/';

const client = new CosmosClient({
    endpoint: cosmosEndpoint,
    key: connectionString,
});

const container: Container = client.database('gitgud-hacx-db').container('Threshold');

const defaultThreshold: Threshold = {
    id: id,
    ReactionTime: 290,
    BrainTemp: 38.2,
    MinDilation: 2.5,
    MaxDilation: 5.0,
    stepWidth: 50,
    cadence: 100
};

// Async function to handle upsert
export async function setDefaultThreshold() {
    try {
        const response: ItemResponse<Threshold> = await container.items.upsert<Threshold>(defaultThreshold);
        console.log("Upserted item with id:", response.resource?.id);
        console.log("Response status:", response.statusCode);
    } catch (error) {
        console.error("Error upserting item:", error);
    }
}

/**
 * 
 * Note: ("Weird output, key-value pair generates default")
 * {
    "0": "d",
    "1": "e",
    "2": "f",
    "3": "a",
    "4": "u",
    "5": "l",
    "6": "t",
    "id": "70b63682-b93a-4c77-aad2-65501347265f",
    "ReactionTime": 2800,
    "BrainTemp": 2342123,
    "MinDilation": 3213123,
    "MaxDilation": 131231,
    "_rid": "gjtUAJTZQs0BAAAAAAAAAA==",
    "_self": "dbs/gjtUAA==/colls/gjtUAJTZQs0=/docs/gjtUAJTZQs0BAAAAAAAAAA==/",
    "_etag": "\"90001dc1-0000-1800-0000-671c7e060000\"",
    "_attachments": "attachments/",
    "_ts": 1729920518
}
 * Updates specific parameters of a Threshold item by ID.
 * @param updates - An object containing the specific parameters to update.
 */
export async function updateThresholdParameter(updates: Partial<Threshold>): Promise<void> {
    try {
        // Retrieve the existing item by ID
        const { resource: item } = await container.item(id).read<Threshold>();

        if (!item) {
            console.error(`Item with id ${id} not found.`);
            return;
        }

        // Create an object with only the necessary fields
        const updatedItem = {
            id: item.id,  // Retain the ID to ensure it's not overwritten
            ReactionTime: updates.ReactionTime !== undefined ? updates.ReactionTime : item.ReactionTime,
            BrainTemp: updates.BrainTemp !== undefined ? updates.BrainTemp : item.BrainTemp,
            MinDilation: updates.MinDilation !== undefined ? updates.MinDilation : item.MinDilation,
            MaxDilation: updates.MaxDilation !== undefined ? updates.MaxDilation : item.MaxDilation,
            stepWidth: updates.stepWidth !== undefined ? updates.stepWidth : item.stepWidth,
            cadence: updates.cadence !== undefined ? updates.cadence : item.cadence,
            _rid: item._rid,
            _self: item._self,
            _etag: item._etag,
            _ts: item._ts
        };

        // Upsert the updated item back into the container
        const response: ItemResponse<Threshold> = await container.items.upsert<Threshold>(updatedItem);
        
        console.log(`Updated item with id: ${id}`);
        console.log("Response status:", response.statusCode);
    } catch (error) {
        console.error("Error updating item:", error);
    }
}

export const getThresholdParameters = async () => {
    try {
      const query = "SELECT * FROM c"; 
      const { resources: items } = await container.items.query(query).fetchAll();
  
      return items[0] || null;
    } catch (error) {
      console.error("Error retrieving threshold parameters:", error);
      return null;
    }
  };

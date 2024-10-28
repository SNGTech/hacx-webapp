import { EventHubConsumerClient } from "@azure/event-hubs";

// Event Hub-compatible endpoint
// az iot hub show --query properties.eventHubEndpoints.events.endpoint --name {your IoT Hub name}
const eventHubsCompatibleEndpoint = "sb://iothub-ns-hacx-gitgu-56871046-a4a6e44fd3.servicebus.windows.net/";

// Event Hub-compatible name
// az iot hub show --query properties.eventHubEndpoints.events.path --name {your IoT Hub name}
const eventHubsCompatiblePath = "hacx-gitgud-iothub";

// Primary key for the "service" policy to read messages
// az iot hub policy show --name service --query primaryKey --hub-name {your IoT Hub name}
const iotHubSasKey = "jWyEov7O2x/CJ82hQSGVAszec1+4uOT/bAIoTOwCadE=";

// If you have access to the Event Hub-compatible connection string from the Azure portal, then
// you can skip the Azure CLI commands above, and assign the connection string directly here.
const connectionString = "Endpoint=sb://iothub-ns-hacx-gitgu-56871046-a4a6e44fd3.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=W825ejAIXhwOtDwQDqzYVstazlcuaQ6NmAIoTGeyQRQ=;EntityPath=hacx-gitgud-iothub"

async function printError(err: { message: any; }) {
  console.log(err.message);
}

// Display the message content - telemetry and properties.
// - Telemetry is sent in the message body
// - The device can add arbitrary properties to the message
// - IoT Hub adds system properties, such as Device Id, to the message.
async function retrieveMessages(events: any, callback: Function) {
  for (let i = 0; i < events.length; ++i) {
    callback(events[i]);

    console.log("Telemetry received: ");
    console.log(JSON.stringify(events[i].body));
    console.log("Enqueued Time UTC: " + JSON.stringify(events[i].enqueuedTimeUtc));
    console.log("System properties (set by IoT Hub): " + JSON.stringify(events[i].systemProperties["iothub-connection-device-id"]));
    console.log("----------------------------------------------------------");
  }
}

async function startEventReader(callback: Function) {
  console.log("IoT Hub Quickstarts - Read device to cloud messages.");

  // If using websockets, uncomment the webSocketOptions below
  // If using proxy, then set `webSocketConstructorOptions` to { agent: proxyAgent }
  // You can also use the `retryOptions` in the client options to configure the retry policy
  const clientOptions = {
    // webSocketOptions: {
    //   webSocket: WebSocket,
    //   webSocketConstructorOptions: {}
    // }
  };


  // Create the client to connect to the default consumer group of the Event Hub
  const consumerClient = new EventHubConsumerClient("gitgud-monitor-telemetry", connectionString, clientOptions);
  console.log('Successfully created the EventHubConsumerClient from IoT Hub event hub-compatible connection string.');

  const partitionIds = await consumerClient.getPartitionIds();
  console.log('The partition ids are: ', partitionIds);

  // Subscribe to messages from all partitions as below
  // To subscribe to messages from a single partition, use the overload of the same method.
  try {
    consumerClient.subscribe({
      processEvents: (events, context) => retrieveMessages(events, callback),
      processError: printError,
    });
  } catch(err: any) {
    console.log(err.message);
  }
}

export default startEventReader;


// import { EventHubConsumerClient } from "@azure/event-hubs";
// import { convertIotHubToEventHubsConnectionString } from "./iot-hub-connection-string.js";

// class EventHubReader {
//   constructor(iotHubConnectionString, consumerGroup) {
//     this.iotHubConnectionString = iotHubConnectionString;
//     this.consumerGroup = consumerGroup;
//   }

//   async startReadMessage(startReadMessageCallback) {
//     try {
//       const eventHubConnectionString =
//         await convertIotHubToEventHubsConnectionString(
//           this.iotHubConnectionString
//         );
//       const consumerClient = new EventHubConsumerClient(
//         this.consumerGroup,
//         eventHubConnectionString
//       );
//       console.log(
//         "Successfully created the EventHubConsumerClient from IoT Hub event hub-compatible connection string."
//       );

//       const partitionIds = await consumerClient.getPartitionIds();
//       console.log("The partition ids are: ", partitionIds);

//       consumerClient.subscribe({
//         processEvents: (events, context) => {
//           for (let i = 0; i < events.length; ++i) {
//             startReadMessageCallback(
//               events[i].body,
//               events[i].enqueuedTimeUtc,
//               events[i].systemProperties["iothub-connection-device-id"]
//             );
//           }
//         },
//         processError: (err, context) => {
//           console.error(err.message || err);
//         },
//       });
//     } catch (ex) {
//       console.error(ex.message || ex);
//     }
//   }

//   // Close connection to Event Hub.
//   async stopReadMessage() {
//     const disposeHandlers = [];
//     this.receiveHandlers.forEach((receiveHandler) => {
//       disposeHandlers.push(receiveHandler.stop());
//     });
//     await Promise.all(disposeHandlers);

//     this.consumerClient.close();
//   }
// }

// module.exports = EventHubReader;

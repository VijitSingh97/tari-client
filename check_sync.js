const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 1. Point to the file inside the 'proto' folder
const PROTO_PATH = path.join(__dirname, 'proto', 'base_node.proto');

// 2. Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    // IMPORTANT: Tell it to look inside the 'proto' folder for imports
    includeDirs: [path.join(__dirname, 'proto')]
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// 3. Safety check: Ensure the package path exists
// START CHANGE: Updated to check 'tari.rpc' instead of 'tari.base_node'
if (!protoDescriptor.tari || !protoDescriptor.tari.rpc) {
    console.error("❌ Error: Could not find 'tari.rpc' in the proto files.");
    console.log("   Available packages:", Object.keys(protoDescriptor.tari || {}));
    process.exit(1);
}

// START CHANGE: Updated to use 'tari.rpc.BaseNode'
const BaseNodeService = protoDescriptor.tari.rpc.BaseNode;

// 4. Connect to the Base Node
// Ensure this port matches your docker mapping (default 18142)
const client = new BaseNodeService('127.0.0.1:18142', grpc.credentials.createInsecure());

console.log("Connecting to Tari Base Node...");

// 5. Get Sync Info
client.GetSyncInfo({}, (err, response) => {
    if (err) {
        console.error('❌ Sync Info Error:', err.message);
    } else {
        console.log('\n--- Sync Status ---');
        console.log(response);
    }
});

// 6. Get Tip Info
client.GetTipInfo({}, (err, response) => {
    if (err) {
        console.error('❌ Tip Info Error:', err.message);
    } else {
        console.log('\n--- Chain Tip ---');
        console.log('Chain Height:', response.metadata ? response.metadata.best_block_height : 'Unknown');
        console.log('Synced:', response.initial_sync_achieved); // Updated field name based on your proto file
        console.log('Response: ', response);
    }
});
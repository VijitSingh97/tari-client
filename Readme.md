# Tari Client - Sync Checker

This project contains a simple Node.js script to interact with a Tari Base Node using gRPC. It connects to a local node to verify its synchronization status and retrieve the current chain tip information.

## Prerequisites

*   **Node.js**: Ensure Node.js is installed on your machine.
*   **Tari Base Node**: You must have a Tari Base Node running locally (default port `18142`).

## Installation

1.  Install the dependencies:
    ```bash
    npm install
    ```

## Usage

Run the sync check script using the npm start script:

```bash
npm start
```

## Output

The script will output the current **Sync Status** and **Chain Tip** (height and sync state) from the connected Base Node.

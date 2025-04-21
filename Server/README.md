# Server

This is a TypeScript-based Node.js server application that provides a RESTful API and WebSocket functionality with multi-server support.

## Features

- RESTful API endpoints
- WebSocket support with Socket.IO
- Multi-server support with Redis for data synchronization
- JWT authentication
- CORS enabled
- Security middleware (Helmet)
- Development hot-reload support

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- Redis Server (MUST be installed and running for multi-server support and data synchronization)

### Redis Installation

#### macOS (using Homebrew)
```bash
brew install redis
brew services start redis
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

#### Windows
1. Download Redis for Windows from: https://github.com/microsoftarchive/redis/releases
2. Install and start the Redis service

Verify Redis is running:
```bash
redis-cli ping
# Should return: PONG
```

## Installation

1. Clone the repository
2. Navigate to the Server directory
3. Install dependencies:
```bash
npm install
```
4. Make sure Redis server is running on your machine

## Available Scripts

- `npm start` - Builds and starts a single server instance
- `npm run start:server1` - Starts server instance 1 (port 3001)
- `npm run start:server2` - Starts server instance 2 (port 3002)
- `npm run build:live` - Starts the server with hot-reload for development

## Multi-Server Setup

The application supports running multiple server instances simultaneously. This is useful for:
- Load balancing
- High availability
- Testing distributed scenarios

### How to Run Multiple Servers

1. Start the first server:
```bash
npm run start:server1
```

2. In a new terminal, start the second server:
```bash
npm run start:server2
```

### Data Synchronization

- All servers share data through Redis
- Changes made on one server are automatically synchronized to all other servers
- WebSocket events are broadcasted across all server instances
- Real-time updates are maintained across all connected clients

## Project Structure

- `src/` - Source code directory
- `config/` - Configuration files
- `data/` - Data storage
- `node_modules/` - Dependencies

## Environment Variables

The server uses the following environment variables:
- `NODE_ENV` - Environment (development/production)
- `APP_PORT` - HTTP server port
- `SOCKET_PORT` - WebSocket server port

## Dependencies

- Express - Web framework
- Socket.IO - WebSocket implementation
- TypeScript - Language
- Redis - For multi-server support and data synchronization
- JWT - Authentication
- Helmet - Security middleware
- CORS - Cross-origin resource sharing

## Development

The server uses TypeScript for type safety and better development experience. The code is automatically compiled and reloaded during development using nodemon.

## License

ISC 
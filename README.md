# About The Project

Lovec aims to digitise the hunting industry by transferring the current processes in the hunting industry into a digital format that is accessible to users on their mobile device. The software solution allows users to organise common hunting parties, view and book observation posts, tour districts and information about their families, manage trainees’ logbooks and the trainees’ own entry of these logbooks, view and manage equipment and, finally, the entry and checking of entries. In addition, it also includes a view for the system supervisor, who can modify the workflow management of the application. The application is written using the Ionic and Vue.js frameworks.

## Built with

Frontend

- Vue.js
- Ionic and Capacitor
- Pinia State Management
- TypeScript

Backend

- TypeScript
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens

# Getting started

To get started you need to complete the following steps.

## Prerequisites

- TypeScript 5 or higher
- Node.js 20 or higher
- ts-node 10 or higher
- MongoDB database instance

## Installation

### Configuration

In order to provide API access to the bot, you need to create a `.env` file in the root directory of the project and add the following variables:

Frontend:

```bash
VITE_API_URL
```

Backend:

```bash
PORT
MONGO_URI
NODE_ENV
JWT_SECRET
VUE_APP_API_URL
FILE_UPLOAD_PATH
FILE_UPLOAD_PATH_PROFILE
```

### Setup

1. Provide `.env` files in `src/client` and `src/server` directories
2. Install Node.js and TypeScript
3. Clone the repository
   `git clone https://github.com/janmerhar/lovec`
4. Install the required packages in the `src/client` and `src/server` directory
   `npm install`

## Usage

Start the backend server by running the following command in the `src/server` directory:

```bash
npm run dev
```

Start the frontend server by running the following command in the `src/client` directory:

```bash
npm run dev
```

## Contributing

To contribute to this project follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add some changes'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a pull request

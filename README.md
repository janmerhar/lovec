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

## System Architecture

### Data model

![Conceptual data model](./docs/md/ER-diagram-en.png?raw=true "Conceptual data model")

### DPU diagram

![DPU diagram](./docs/md/dpu-en.png?raw=true "DPU diagram")

| Use case                               | Description                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Training logs view                     | The trainee has the option to view their logs and their status                                   |
| Training log input                     | The trainee has the option to enter a log about completed work                                   |
| Hunts view                             | The user has the option to view active and past hunts                                            |
| Hunt input                             | The user has the option to enter new hunts                                                       |
| Hunt information view                  | The user has the option to view the details of a hunt                                            |
| Equipment view                         | The user has the option to view their equipment and the option to delete it                      |
| Equipment input                        | The user has the option to enter their equipment                                                 |
| Catches view                           | The user has the option to view their catches by date                                            |
| Catch input                            | The user has the option to enter a catch                                                         |
| Catch information view                 | The user has the option to view the details of a catch                                           |
| Profile view                           | The user has the option to view their user profile                                               |
| Map view                               | The user has the option to view a map with marked observation posts and hunting grounds          |
| Obsevation post reserve                | The user has the option to reserve an observation post and view any existing active reservations |
| Observation post information view      | The user has the option to view the details of an observation post                               |
| Trainee logs view                      | The hunter has insight into the logs of their trainees and the option to approve or reject them  |
| Map overview                           | The administrator has an overview of the map with observation posts and hunting grounds          |
| Observation post management            | The administrator has the option to change the properties of an observation post                 |
| Observation post reservations overview | The administrator has insight into the visits of an observation post                             |
| Hunts overview                         | The administrator has an overview of active and past hunts                                       |
| Hunt management                        | The administrator has the option to manage a hunt                                                |
| Families overview                      | The administrator has an overview of all families                                                |
| Family input                           | The administrator has the option to enter a new family                                           |
| Family management                      | The administrator has the option to manage a family                                              |
| System overview                        | The administrator has an overview of all system properties                                       |
| System management                      | The administrator has the option to manage system specifics                                      |
| Users overview                         | The administrator has an overview of all users                                                   |
| User profile overview                  | The administrator has an overview of a user's profile                                            |
| User profile management                | The administrator has the option to edit a user's profile                                        |
| User input                             | The administrator has the option to enter a new user                                             |
| User hunts overview                    | The administrator has an overview of a user's hunts                                              |
| Training logs overview                 | The administrator has an overview of a user's logs                                               |
| User post visits overview              | The administrator has an overview of a user's visits                                             |
| User catches overview                  | The administrator has an overview of a user's catches                                            |
| User catch information overview        | The administrator has an overview of the details of a user's catch                               |
| User equipment overview                | The administrator has an overview of a user's equipment                                          |

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

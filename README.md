````markdown
# task-manager-app

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Prisma Migrations](#prisma-migrations)
- [Additional Information](#additional-information)

## Introduction

This project is a web application built using NestJS for the backend and React for the frontend. This README provides instructions for setting up and running the application using Docker.

## Requirements

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (including Docker Compose)
- [Node.js](https://nodejs.org/) (for local development)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres) (optional, for migrations)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/JoushwaS/task-manager-app.git
   cd your-repo-name
   ```
````

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Backend

To run the backend using Docker:

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

The backend will be available at `http://localhost:3000`.

### Frontend

To run the frontend using Docker:

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

The frontend will be available at `http://localhost:3001`.

## Prisma Migrations

To run Prisma migrations for the database:

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run the migration command:
   ```bash
   npx prisma migrate dev --name init
   ```

This command will apply any pending migrations and create a new migration file named `init`. Make sure to replace `init` with a descriptive name for your migration.

## Additional Information

- Ensure that your `.env` files are correctly set up for both the backend and frontend. Refer to the `.env.sample` files provided in each directory.
- For more information on Prisma and how to manage your database, refer to the [Prisma Documentation](https://www.prisma.io/docs/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Notes:
- **Docker Setup**: Make sure to create a `docker-compose.yml` file for both the backend and frontend, specifying the necessary services, ports, and volumes.
- **Environment Variables**: The `.env` files should be configured with the appropriate settings for your database connection and any other necessary configurations.
- **Descriptive Migration Names**: When running Prisma migrations, use descriptive names to keep track of changes effectively.


```

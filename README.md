# Order Management App

This is a full-stack order management application designed to manage orders, products, and their relationships. The project is built with a Symfony backend and a React frontend.

## Prerequisites

Ensure you have the following installed on your system:

-   Docker
-   Docker Compose

## Setup Instructions

To set up and run the project, execute the following command:

### On Linux/MacOS (bash):

```bash
docker-compose --env-file ./backend/.env.dev up --build
```

### On Windows (cmd):

```cmd
docker-compose --env-file .\backend\.env.dev up --build
```

This command will build and start both the backend and frontend services, as well as the database, in Docker containers.

## Database Access

1. Access the database container:
    ```bash
    docker exec -it <container id or name> bash
    ```
2. Log in to MySQL:
    ```bash
    mysql -u order_user -p # password in the .env.dev file
    ```
3. Use the database:
    ```sql
    USE order_management_db;
    ```
4. Example queries:
    ```sql
    SELECT * FROM `order`;
    SELECT * FROM `product`;
    SELECT * FROM `order_product`;
    ```

## Project Structure

-   **backend/**: Contains the Symfony backend code.
-   **frontend/**: Contains the React frontend code.
-   **docker-compose.yml**: Docker Compose configuration file.

## Additional Notes

-   The backend and frontend services are designed to work together seamlessly. Make sure the Docker containers are running for full functionality.

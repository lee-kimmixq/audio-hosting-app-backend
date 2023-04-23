# audio-hosting-app-backend

## To start up local server
1. Ensure you have the required environment variables in `.env` (refer to `.env.example`)
2. Ensure that no other local instances of PostgreSQL are running
3. Install npm packages
    ```
    npm install
    ```
4. Clean volumes (if not fresh repo)
    ```
    npm run clean
    ```
5. Start up Docker
    ```
    docker compose up -d
    ```
6. Run Sequelize migrations and seeds
    ```
    npm run init
    ```
7. Run server
    ```
    npm run dev
    ```
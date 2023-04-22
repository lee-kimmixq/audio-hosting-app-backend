# audio-hosting-app-backend

## To start up local server
1. Ensure you have the required environment variables in `.env`
2. Install npm packages
    ```
    npm install
    ```
3. Start up Docker
    ```
    docker compose up -d
    ```
4. Run Sequelize migrations and seeds
    ```
    npm run init
    ```
5. Run server
    ```
    npm run dev
    ```
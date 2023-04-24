# Audio Hosting App Backend

[Link to frontend repo](https://github.com/lee-kimmixq/audio-hosting-app-frontend)

## To run
1. Ensure you have the required environment variables in `.env` (refer to `.env.example`)
2. Ensure that no other local instances of PostgreSQL are running
3. Ensure that aha-frontend-image exists (run `npm run docker:build` in frontend repo)
4. Install npm packages
    ```
    npm install
    ```
5. Clean volumes (if not fresh repo)
    ```
    npm run clean
    ```
6. Start up Docker
    ```
    npm run docker:start
    ```
7. Run Sequelize migrations and seeds
    ```
    npm run init
    ```

## Test credentials for login
```
{
    "username": "dummyboy",
    "password": "dummyboy"
}
```
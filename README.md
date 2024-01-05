# Ascent Essentials Backend

## Environment Configuration
Create environmental variables or define them in a `.env` file in the project root.
| VARIABLE    | DEFAULT                      | DESCRIPTION                          |
| ----------- | ---------------------------- | ------------------------------------ |
| PORT        | 3000                         | The port on wich the server will run |
| MONGODB_URL | mongodb://localhost:27017    | The URL to the MongoDB database      |
| JWT_SECRET  | "a-really-secure-secret-key" | The secret key for JWT               |

Note: To generate a jwt secret key, You can use the node's in-built package called crypto to create random strings:
```
node
require("crypto").randomBytes(35).toString("hex")
```

## Running the Server
To run the server locally, follow these steps:
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Build with `npm run build`.
4. Start the server with `npm start` or `npm run dev` for development mode.


## API Endpoints
Explore the available endpoints by running the server and visiting the `/api-docs` route.
This documentation is auto-generated through comments in the code.

## Contributing
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License
This project is licensed under the [Apache License](LICENSE).

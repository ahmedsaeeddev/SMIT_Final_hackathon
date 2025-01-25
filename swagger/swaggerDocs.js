const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'Backend API - All Credit Goes to Sir SADIQ SHAH 💕',
        version: '1.0.0',
        description: `
            Welcome to the API Documentation for the Backend Service.

            This backend is built with Node.js and Express and serves as the core layer for handling business logic, managing database interactions, and serving data through well-structured RESTful endpoints.

            ## Key Features:
            - **Authentication & Authorization**: Includes secure user authentication using JWT and role-based access control.
            - **CRUD Operations**: Provides complete Create, Read, Update, and Delete functionalities for resources such as users, products, and orders.
            - **Database Integration**: Connected to a MongoDB database, ensuring reliable data storage and retrieval.
            - **Error Handling**: Includes robust error-handling middleware for managing client-side and server-side errors.
            - **Swagger Integration**: This documentation is generated using Swagger, allowing developers to easily test and understand the available endpoints.
            - **Scalability**: Designed with scalability and modularity in mind for future enhancements.

            To explore the endpoints and test the API, refer to the interactive Swagger UI.
        `,
    },
    servers: [{ url: 'http://localhost:5000' }],
};

export default swaggerDocs;

# Assignment 2: Mongoose Express CRUD Mastery

**Objective:** It is a Node.js Express application with TypeScript as the programming language, integrated MongoDB with Mongoose for user data and order management. Integrated Zod to validate input data.

- Check live link: <https://assignment2.mukarrom.com/>

## How to run this application

Before running the application, make sure you have the following installed on your machine:

- Node.js
- MongoDB

### Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mukarrom21/level-2-assignment-2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-management-app
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

4. Set up mongoDB:

   - Make sure MongoDB is running on your local machine.
   - create .env file in this project root and set variables like:

     ```env
     PORT=5000
     DB_URI=mongodb://localhost:27017/your-database-name
     SALT_ROUNDS=16
     ```

5. Run this application:

   - run in development

     ```env
     yarn start:dev
     ```

   - run in production

     ```env
     yarn build
     yarn start
     ```

The application should now be running at <http://localhost:5000>.

## API Endpoints

- GET /api/users: Get all users.
- POST /api/users: Create a new user.
- GET /api/users/:userId: Get a single user by userId.
- PUT /api/users/:userId: Update a user by userId.
- DELETE /api/users/:userId: Delete a user by userId.
- PUT /api/users/:userId/orders: Add a new order to a user.
- GET /api/users/:userId/orders: Get all orders of a user.
- GET /api/users/:userId/orders/total-price: Get the total price of all orders for a user.

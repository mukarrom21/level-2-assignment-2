import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

// Define an asynchronous function to connect to MongoDB and start the Express server
async function main() {
  try {
    // Connect to MongoDB using the database URI from the configuration
    await mongoose.connect(config.database_uri as string)
    app.listen(config.port, () => {
      console.log(`Server is running on port: ${config.port}`)
    })
  } catch (error) {
    // Handle errors during the MongoDB connection or server startup
    console.log(error)
  }
}

// call main function
main()

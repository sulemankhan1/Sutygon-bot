const mongoose = require('mongoose')
<<<<<<< HEAD

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV !== 'production'
        ? process.env.ourMongoURI
        : process.env.mongoURI,
      {
        // added to avoid bugs
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
=======
// const config = require('config')
// const dbUrl = config.get('ourMongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ourMongoURI, {
      // added to avoid bugs
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
>>>>>>> master

    console.log('MongoDB is connected!')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB

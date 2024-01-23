import mongoose from 'mongoose'
const user ="akshay96102"
const pass="In34gtKhKPHLj6PD"
const url=`mongodb+srv://${user}:${pass}@cluster0.5ggulsw.mongodb.net/?retryWrites=true&w=majority`;
const connection = async () => {
  try {
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('DB CONNECTION ESTABLISHED')
  } catch (err) {
    console.log(err)
  }
}

export default connection

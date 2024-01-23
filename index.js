import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import qs from 'qs';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import KJUR from 'jsrsasign';
import jwt from 'jsonwebtoken';
import connection from './Configs/db.js';

import multer from 'multer';

import { createReadStream, promises as fsPromises } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.get('/', (req, res) => {
    res.json({
      message: "Server is running ...."
    })
  })
  // app.use((err, req, res, next) => {
  //   if (err instanceof multer.MulterError) {
  //     // A Multer error occurred when uploading.
  //     res.status(400).json({
  //       status: 'fail',
  //       message: err.message,
  //     });
  //   } else if (err) {
  //     // An unknown error occurred.
  //     res.status(500).json({
  //       status: 'error',
  //       message: err.message,
  //     });
  //   } else {
  //     next();
  //   }
  // });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/'); // Set the destination folder for image storage
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for the stored image
    },
  });
  const upload = multer({ storage: storage });
// app.post('/student_login',loginUser)
// app.post('/student_signup',upload.array('images', 1),createUser)
// app.post('/teacher_login',loginTeacher)
// app.post('/teacher_signup',upload.array('images', 2),createTeacher)
// app.use('/admin',adminRouter)

// JWT Middleware
 const requireToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key'); // Adjust the secret key

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};


// Add the middleware to secure your routes

// app.use('/api', requireToken);
const mediaPath = 'media/';
app.get('/api/media/:imageName', async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = join(mediaPath, imageName);

  // Check if the requested image exists
  if (await fileExists(imagePath)) {
    const readStream = createReadStream(imagePath);
    readStream.pipe(res);
  } else {
    // If the image doesn't exist, serve a default image
    const currentModulePath = fileURLToPath(import.meta.url);
    const currentModuleDir = dirname(currentModulePath);
    const defaultImagePath = resolve(currentModuleDir, 'media', 'default-image.jpg');
    const defaultImageStream = createReadStream(defaultImagePath);

    defaultImageStream.on('error', (err) => {
      res.status(404).send('Default image not found');
    });

    defaultImageStream.pipe(res);
  }
});

async function fileExists(filePath) {
  try {
    await fsPromises.access(filePath);
    console.log("File exists");
    return true;
  } catch (err) {
    console.log("File does not exist");
    return false;
  }
}


app.listen(port, () =>{
    connection();
    console.log(`Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`)
}

)
# Travel App - Express Node Server

## Stack Used

- **Node.js**: A runtime environment that allows you to execute JavaScript code on the server side.
- **Firebase**: Firebase is cloud object storage with industry-leading scalability, data availability, security, and performance.
- **Express**: A fast and minimalist web application framework for Node.js, used to build robust APIs and web applications.
- **MongoDB**: A NoSQL database used to store user data, posts, and other relevant information.
- **Prisma**: An ORM library for the Database.
- **jsonwebtoken**: Used for creating and validating JSON Web Tokens (JWT) to handle user authentication and authorization.
- **bcrypt**: A library used for hashing passwords before storing them in the database to enhance security.
- **Multer**: Middleware for handling multipart/form-data, enabling file uploads.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing) and manage API access from different domains.
- **helmet**: Middleware to enhance the app's security by setting various HTTP headers.
- **morgan**: HTTP request logger middleware for Node.js, useful for debugging and monitoring incoming requests.
- **socket.io**: Socket.IO is an event-driven library for real-time web applications.
- **dotenv**: A zero-dependency module used to load environment variables from a .env file.
- **Nodemon**: A utility that monitors changes in your source code and automatically restarts the server.
- **Redis**: Redis is an open-source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.

## Getting Started

**NOTE**: `ffmpeg` must be installed on your machine.

1. Clone this repository.
2. `cd`: Navigate to the project directory.
3. `npm install`: Install dependencies.
4. Create a `.env` file in the root directory and set up your environment variables.
5. `npx prisma format`:
6. `npx prisma generate`:
7. Run the server: `npm start`.
8. The server will be running on `http://localhost:80` by default.

## API Endpoints

### Root

- `/api/`:

### Auth

- `/api/auth/login`: Endpoint for user login.
- `/api/auth/register`: Endpoint for user register.

### Services

- `/api/destination/all-destination`: Endpoint for get all destination.
- `/api/destination/single-destination`: Endpoint for get single destination.
- `/api/services/post`: Endpoint for creating a new post.
- `/api/services/all-posts`: Endpoint for retrieving all posts based on specific criteria.
- `/api/services/random-posts`: Endpoint for retrieving random posts.
- `/api/services/random-people`: Endpoint for retrieving random followers or users.
- `/api/services/search-posts`: Endpoint for searching posts based on certain criteria.
- `/api/services/search-people`: Endpoint for searching users based on certain criteria.
- `/api/services/search-destinations`: Endpoint for searching destinations.
- `/api/services/upload-photos`: Endpoint for uploading photos as part of a post.
- `/api/services/follow`: Endpoint for following a user.
- `/api/services/unfollow`: Endpoint for unfollowing a user.
- `/api/services/like-post`: Endpoint for liking a post.
- `/api/services/post-comment`: Endpoint for posting a comment on a post.
- `/api/services/get-postComment?id=${id}`: Endpoint for retrieving comments on a post.
- `/api/services/followed-posts`: Endpoint for retrieving posts from users who are being followed.
- `/api/services/my-posts`: Endpoint for retrieving my posts.
- `/api/services/single-post`: Endpoint for retrieving single posts.
- `/api/services/guest-posts`: Endpoint for retrieving guest posts.
- `/api/services/re-post`: Endpoint for repost.
- `/api/services/delete-post`: Endpoint for delete post
- `/api/user/get-user`: Endpoint for retrieving user data.
- `/api/user/get-guest`: Endpoint for retrieving guest.
- `/api/user/get-follows`: Endpoint for get follows.
- `/api/user/get-notifications`: Endpoint for get notifications.
- `/api/user/update-data`: Endpoint for updating user data.

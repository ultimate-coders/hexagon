# End Points 

## Auth

| Method | Endpint         | Description                                           |
| ------ | --------------- | ----------------------------------------------------- |
| POST   | `/auth/signup`  | Create a new user                                     |
| POST   | `/auth/signuin` | Login in with certian user using basic authentication |
| GET    | `/auth/logout`  | Logout User                                           |
| POST   | `/auth/refresh` | Get new access token                                  |

## User Profile

| Method | Endpint        | Description                                |
| ------ | -------------- | ------------------------------------------ |
| GET    | `/me-profile`  | Get profile information for logged in user |
| GET    | `/profile`     | Get all users' profiles information        |
| GET    | `/profile/:id` | Get user' profiles information             |
| POST   | `/profile`     | Create user's profile                      |
| PUT    | `/profile/:id` | Update user' profiles information          |

## Follow

| Method | Endpint              | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/follow/:profileId` | Follow user   |
| DELETE | `/follow/:profileId` | Unfollow user |

## File

| Method | Endpint        | Description |
| ------ | -------------- | ----------- |
| POST   | `/file-upload` | Upload file |

## Category

| Method | Endpint     | Description         |
| ------ | ----------- | ------------------- |
| Get    | `/category` | Get categories list |

## POST

| Method | Endpint      | Description                |
| ------ | ------------ | -------------------------- |
| Get    | `/posts`     | Get all posts informations |
| Get    | `/posts/:id` | Get post informations      |
| POST   | `/posts`     | Create post                |
| PUT    | `/posts/:id` | Update post                |
| DELETE | `/posts/:id` | Delete post                |

## Comment

| Method | Endpint        | Description                   |
| ------ | -------------- | ----------------------------- |
| Get    | `/comment`     | Get all comments informations |
| Get    | `/comment/:id` | Get post informations         |
| POST   | `/comment`     | Create comment                |
| PUT    | `/comment/:id` | Update comment                |
| DELETE | `/comment/:id` | Delete *comment               |

## Notifications

| Method | Endpint          | Description                                           |
| ------ | ---------------- | ----------------------------------------------------- |
| Get    | `/Notifications` | Get all Notifications informations for logged in user |
| PUT    | `/Notifications` | Update notifications (change to seen)                 |

## Messages

| Method | Endpint         | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| Get    | `/Messages`     | Get all Messages informations for logged in user |
| DELETE | `/Messages/:id` | Delete Messages (change to seen)                 |
| PUT    | `/Messages/:id` | Update Messages (change to seen)                 |
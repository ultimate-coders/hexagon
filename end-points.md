# End Points 

## Auth

| Method | Endpint                   | Description                                           |
| ------ | ------------------------- | ----------------------------------------------------- |
| POST   | `/auth/signup`            | Create a new user                                     |
| POST   | `/auth/signuin`           | Login in with certian user using basic authentication |
| GET    | `/auth/logout`            | Logout User                                           |
| POST   | `/auth/refresh`           | Get new access token                                  |
| PUT    | `/auth/user/password`     | Update user password                                  |
| POST   | `/auth/user/verify`       | Verify user account                                   |
| POST   | `/auth/user/verification` | Send verification code to the user                    |
| GET    | `/auth/google`            | Sign in/up with google                                |

## User Profile

| Method | Endpint                     | Description                                                                 |
| ------ | --------------------------- | --------------------------------------------------------------------------- |
| GET    | `/me-profile`               | Get profile information for logged in user                                  |
| GET    | `/me-profile/with-messages` | Get profiles information that the logged in user has previous messages with |
| GET    | `/profile`                  | Get all users' profiles information                                         |
| GET    | `/profile/:username`        | Get user' profiles' information by username                                 |
| POST   | `/profile`                  | Create user's profile                                                       |
| PUT    | `/profile`                  | Update user' profiles information                                           |

## Follow

| Method | Endpint   | Description           |
| ------ | --------- | --------------------- |
| POST   | `/follow` | Follow/Unfollow  user |

## File

| Method | Endpint        | Description |
| ------ | -------------- | ----------- |
| POST   | `/file-upload` | Upload file |

## Category

| Method | Endpint     | Description         |
| ------ | ----------- | ------------------- |
| Get    | `/category` | Get categories list |

## POST

| Method | Endpint             | Description                               |
| ------ | ------------------- | ----------------------------------------- |
| Get    | `/posts/timeline`   | Get all posts timeline for logged in user |
| Get    | `/posts/profile/id` | Get all posts for a profile by profile id |
| Get    | `/posts/category`   | Get all posts information on category     |
| Get    | `/posts/post/:id`   | Get post information  by id               |
| POST   | `/posts/post`       | Create post                               |
| PUT    | `/posts/post/:id`   | Update post                               |
| DELETE | `/posts/post/:id`   | Delete post                               |

## Comment

| Method | Endpint            | Description                                    |
| ------ | ------------------ | ---------------------------------------------- |
| Get    | `/comment/:postId` | Get all comments information for specific post |
| POST   | `/comment`         | Create comment                                 |
| PUT    | `/comment/:id`     | Update comment                                 |
| DELETE | `/comment/:id`     | Delete *comment                                |

## Notifications

| Method | Endpint          | Description                                          |
| ------ | ---------------- | ---------------------------------------------------- |
| Get    | `/Notifications` | Get all Notifications information for logged in user |
| PUT    | `/Notifications` | Update notifications (change to seen)                |

## Messages

| Method | Endpint         | Description                                     |
| ------ | --------------- | ----------------------------------------------- |
| Get    | `/Messages`     | Get all Messages information for logged in user |
| DELETE | `/Messages/:id` | Delete Messages (change to seen)                |
| PUT    | `/Messages/:id` | Update Messages (change to seen)                |

## interaction
| Method | Endpint        | Description                  |
| ------ | -------------- | ---------------------------- |
| Get    | `/interaction` | Get all interaction          |
| post   | `/interaction` | Delete or INSERT interaction |
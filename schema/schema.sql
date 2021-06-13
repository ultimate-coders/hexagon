DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS jwt;

DROP TABLE IF EXISTS message;

DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS attachment;

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS profile;

DROP TABLE IF EXISTS user_file;
DROP TABLE IF EXISTS category;


DROP TABLE IF EXISTS client;

CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(250) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  verified boolean DEFAULT false
);

CREATE TABLE jwt(
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE user_file(
  id SERIAL PRIMARY KEY,
  profile_id int, -- not required
  file text NOT NULL,
  created_at date not null default current_timestamp
);

CREATE TABLE profile(
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  caption VARCHAR(250),
  profile_picture int,

  FOREIGN KEY (user_id) REFERENCES client(id),
  FOREIGN KEY (profile_picture) REFERENCES user_file(id)
);

CREATE TABLE follow(
  id SERIAL PRIMARY KEY,
  follower int NOT NULL,
  following int NOT NULL,

  FOREIGN KEY (follower) REFERENCES profile(id),
  FOREIGN KEY (following) REFERENCES profile(id)
);

CREATE TABLE message(
  id SERIAL PRIMARY KEY,
  sender_id int NOT NULL,
  receiver_id int NOT NULL,
  message text NOT NULL ,
  seen boolean DEFAULT false,
  
  FOREIGN KEY (sender_id) REFERENCES profile(id),
  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);


CREATE TABLE post(
  id SERIAL PRIMARY KEY,
  profile_id int NOT NULL,
  category_id int NOT NULL,
  text text NOT NULL,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE attachment(
  id SERIAL PRIMARY KEY,
  post_id int NOT NULL,
  file_id int NOT NULL

  -- FOREIGN KEY (post_id) REFERENCES post(id),
  -- FOREIGN KEY (file_id) REFERENCES user_file(id)
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    comment text NOT NULL,
    post_id int NOT NULL,
    profile_id int NOT NULL
);

CREATE TABLE notification(
  id SERIAL PRIMARY KEY,
  receiver_id int NOT NULL,
  message text NOT NULL,
  post_id int,
  seen boolean DEFAULT false,

  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

DROP TABLE IF EXISTS interaction;
CREATE TABLE interaction( 
    id SERIAL PRIMARY KEY,   
    post_id int NOT NULL,
    profile_id int UNIQUE
    );
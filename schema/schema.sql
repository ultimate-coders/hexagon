DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS jwt;

DROP TABLE IF EXISTS message;

DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS attachment;

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS profile;

DROP TABLE IF EXISTS client;

CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50),
  hashed_password VARCHAR(100),
  salt VARCHAR(50),
  email VARCHAR(70),
  verified boolean
);

CREATE TABLE jwt(
  id SERIAL PRIMARY KEY,
  user_id int,
  access_token VARCHAR(100),
  refresh_token VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE profile(
  id SERIAL PRIMARY KEY,
  user_id int,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  caption VARCHAR(50),
  profile_picture VARCHAR(1000),

  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE follow(
  id SERIAL PRIMARY KEY,
  user_id int,
  follower VARCHAR(20),
  following VARCHAR(20),

  FOREIGN KEY (user_id) REFERENCES client(id)
);


CREATE TABLE message(
  id SERIAL PRIMARY KEY,
  sender_id int,
  reciver_id int,
  message text ,
  seen boolean,
  FOREIGN KEY (sender_id) REFERENCES profile(id)
);

DROP TABLE IF EXISTS user_file;
CREATE TABLE user_file(
  id SERIAL PRIMARY KEY,
  profile_id int,
  file text ,
  created_at date not null default current_timestamp
);

DROP TABLE IF EXISTS catigory;
CREATE TABLE catigory(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20)
);


CREATE TABLE post(
  id SERIAL PRIMARY KEY,
  profile_id int,
  catigory_id int,
  text text,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (catigory_id) REFERENCES catigory(id)
);

CREATE TABLE attachment(
  id SERIAL PRIMARY KEY,
  post_id int,
  file_id int ,

  FOREIGN KEY (post_id) REFERENCES post(id),
  FOREIGN KEY (file_id) REFERENCES user_file(id)
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    comment text,
    rate int,
    number_like int,
    post_id int,
    seen boolean,

    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE notification(
  id SERIAL PRIMARY KEY,
  sender_id int,
  reciver_id int,
  message text ,
  post_id int,
  seen boolean,

  FOREIGN KEY (reciver_id) REFERENCES profile(id)
);
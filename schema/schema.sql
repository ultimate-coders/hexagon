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

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

DROP TABLE IF EXISTS client;

CREATE TABLE client(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_name VARCHAR(100) UNIQUE,
  hashed_password VARCHAR(250) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  google_id VARCHAR(200) UNIQUE,
  verified boolean DEFAULT false,
  created_at timestamp not null default current_timestamp
);

CREATE TABLE jwt(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES client(id)
);

CREATE TABLE user_file(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  file text NOT NULL,
  created_at date not null default current_timestamp
);

CREATE TABLE profile(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  caption VARCHAR(250),
  profile_picture uuid,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (user_id) REFERENCES client(id),
  FOREIGN KEY (profile_picture) REFERENCES user_file(id)
);

CREATE TABLE follow(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  follower uuid NOT NULL,
  following uuid NOT NULL, -- search in the name to find the id ?
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (follower) REFERENCES profile(id),
  FOREIGN KEY (following) REFERENCES profile(id)
);

CREATE TABLE message(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  sender_id uuid NOT NULL,
  receiver_id uuid NOT NULL,
  message text NOT NULL ,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (sender_id) REFERENCES profile(id),
  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);


CREATE TABLE post(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  profile_id uuid NOT NULL,
  category_id int NOT NULL,
  text text NOT NULL,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (profile_id) REFERENCES profile(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE attachment(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  post_id uuid NOT NULL,
  file_id uuid NOT NULL,
  created_at timestamp not null default current_timestamp

);

CREATE TABLE comment(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    comment text NOT NULL,
    post_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    created_at timestamp not null default current_timestamp

);

CREATE TABLE notification(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  receiver_id uuid NOT NULL,
  message text NOT NULL,
  post_id uuid,
  seen boolean DEFAULT false,
  created_at timestamp not null default current_timestamp,

  FOREIGN KEY (receiver_id) REFERENCES profile(id)
);

DROP TABLE IF EXISTS interaction;
CREATE TABLE interaction( 
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,   
    profile_id uuid ,
    post_id uuid NOT NULL,
    interaction_type VARCHAR(20) DEFAULT 'like',
    created_at timestamp not null default current_timestamp

);

-- idea : add count interaction to post tabel
-- TD:fix seed and add inserts for interaction table done
-- TD: update endpoint.md done
-- TD:add end point for interaction with its handler   *** do it like follow done
-- TD:interaction tabel done
-- TD:fix insert password and insert a real hash password not yet
-- idea: add acl on verefy :check if the client is vrified and give him the access depend on it
-- delete test folder?!
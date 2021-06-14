

INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('tamara','sss','tamara@yahoo.com',true);
INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('wessam','5879','wessam@yahoo.com',false);
INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('amjad','8863','amjad@yahoo.com',false);
INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('emran','5879','emran@yahoo.com',true);
INSERT INTO client(user_name,hashed_password,email,verified) VALUES ('anwar','hhh','anwar@yahoo.com',false);

INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('1','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('2','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('3','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('4','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('5','hhh','qqq');

INSERT INTO user_file(file) VALUES ('../img/female.jpg');
INSERT INTO user_file(file) VALUES ('../img/male.jpg');
INSERT INTO user_file(file) VALUES ('../img/male.jpg');
INSERT INTO user_file(file) VALUES ('../img/male.jpg');
INSERT INTO user_file(file) VALUES ('../img/female.jpg');

INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES (4,'emran','aloul','engneer',2);
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES (2,'wesam','al-masri','artist',2);
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES (5,'anwar','isleet',null,1);
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES (1,'tamara','al-rashed','artist',1);
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES (3,'amjad','mesmar','desighner',2);

INSERT INTO follow(follower,following) VALUES (1,2);
INSERT INTO follow(follower,following) VALUES (1,4);
INSERT INTO follow(follower,following) VALUES (2,5);
INSERT INTO follow(follower,following) VALUES (2,3);
INSERT INTO follow(follower,following) VALUES (3,4);
INSERT INTO follow(follower,following) VALUES (3,1);
INSERT INTO follow(follower,following) VALUES (4,5);
INSERT INTO follow(follower,following) VALUES (4,1);
INSERT INTO follow(follower,following) VALUES (5,3);
INSERT INTO follow(follower,following) VALUES (5,2);

INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (1,4,'hi',true);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (4,1,'hi',true);

INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (5,2,'hi',false);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (3,1,'hi',true);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (2,3,'hi',false);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (4,5,'hi',true);

INSERT INTO category(name) VALUES ('artist');
INSERT INTO category(name) VALUES ('engneer');
INSERT INTO category(name) VALUES ('desighner');

INSERT INTO post(profile_id,category_id,text) VALUES (1,1,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (2,3,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (3,2,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (4,1,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (5,3,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (1,1,'rrrrr');
INSERT INTO post(profile_id,category_id,text) VALUES (3,3,'rrrrr');

INSERT INTO attachment(post_id,file_id) VALUES (1,1);
INSERT INTO attachment(post_id,file_id) VALUES (2,2);
INSERT INTO attachment(post_id,file_id) VALUES (3,3);
INSERT INTO attachment(post_id,file_id) VALUES (4,4);
INSERT INTO attachment(post_id,file_id) VALUES (5,5);

INSERT INTO comment (comment,profile_id,post_id) VALUES ('great job',3,1);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i like it',3,2);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it',3,3);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('perfect',1,4);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('woooooow',5,4);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('not good',2,4);
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it',3,5);

INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'tamara like your post',2,false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'amjad commented on your post',2,true);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'anwar like your post',5,false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (5,'wessam like your post',6,true);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'wessam commented on your post',4,false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'amjad like your post',5,false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'wessam like your post',5,false);

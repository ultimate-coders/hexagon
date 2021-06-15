

INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','tamara','sss','tamara@yahoo.com',true);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','wessam','5879','wessam@yahoo.com',false);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','amjad','8863','amjad@yahoo.com',false);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','emran','5879','emran@yahoo.com',true);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','anwar','hhh','anwar@yahoo.com',false);

INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','hhh','qqq');

INSERT INTO user_file(id,file) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','../img/female.jpg');
INSERT INTO user_file(id,file) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','../img/male.jpg');


INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','emran','aloul','engneer','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','wesam','al-masri','artist','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','anwar','isleet',null,'770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','tamara','al-rashed','artist','770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO profile(user_id,first_name,last_name,caption,profile_picture) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','amjad','mesmar','desighner','2fa53b27-a3d7-406f-9f91-c7f3950e9078');

-- INSERT INTO follow(follower,following) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','6d0829d5-cc98-4889-8b30-b01549a4c2f9');
-- INSERT INTO follow(follower,following) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','799c203d-93ac-4c0b-8827-b3613dc84916');
-- INSERT INTO follow(follower,following) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','770e17de-3dbb-4768-b47e-e2f489879d7f');
-- INSERT INTO follow(follower,following) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','507f39aa-9122-4f24-8d18-d928bea2c1ba');
-- INSERT INTO follow(follower,following) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','799c203d-93ac-4c0b-8827-b3613dc84916');
-- INSERT INTO follow(follower,following) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
-- INSERT INTO follow(follower,following) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','770e17de-3dbb-4768-b47e-e2f489879d7f');
-- INSERT INTO follow(follower,following) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
-- INSERT INTO follow(follower,following) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','507f39aa-9122-4f24-8d18-d928bea2c1ba');
-- INSERT INTO follow(follower,following) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','6d0829d5-cc98-4889-8b30-b01549a4c2f9');

-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (1,4,'hi',true);
-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (4,1,'hi',true);

-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (5,2,'hi',false);
-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (3,1,'hi',true);
-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (2,3,'hi',false);
-- INSERT INTO message(sender_id,receiver_id,message,seen) VALUES (4,5,'hi',true);

-- INSERT INTO category(name) VALUES ('artist');
-- INSERT INTO category(name) VALUES ('engneer');
-- INSERT INTO category(name) VALUES ('desighner');

-- INSERT INTO post(profile_id,category_id,text) VALUES (1,1,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (2,3,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (3,2,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (4,1,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (5,3,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (1,1,'rrrrr');
-- INSERT INTO post(profile_id,category_id,text) VALUES (3,3,'rrrrr');

-- INSERT INTO attachment(post_id,file_id) VALUES (1,1);
-- INSERT INTO attachment(post_id,file_id) VALUES (2,2);
-- INSERT INTO attachment(post_id,file_id) VALUES (3,3);
-- INSERT INTO attachment(post_id,file_id) VALUES (4,4);
-- INSERT INTO attachment(post_id,file_id) VALUES (5,5);

-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('great job',3,1);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('i like it',3,2);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it',3,3);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('perfect',1,4);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('woooooow',5,4);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('not good',2,4);
-- INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it',3,5);

-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'tamara like your post',2,false);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'amjad commented on your post',2,true);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'anwar like your post',5,false);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (5,'wessam like your post',6,true);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (2,'wessam commented on your post',4,false);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'amjad like your post',5,false);
-- INSERT INTO notification (receiver_id,message,post_id,seen) VALUES (4,'wessam like your post',5,false);

-- INSERT INTO interaction (profile_id,post_id) VALUES (5,1);
-- INSERT INTO interaction (profile_id,post_id) VALUES (3,4);
-- INSERT INTO interaction (profile_id,post_id) VALUES (2,5);
-- INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES (4,'love',2);
-- INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES (1,'angry',3);
-- INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES (3,'love',1);
-- INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES (2,'laugh',5);

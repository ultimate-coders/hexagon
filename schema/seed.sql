

INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','tamara','sss','tamara@yahoo.com',true);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','wessam','5879','wessam@yahoo.com',false);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','amjad','8863','amjad@yahoo.com',false);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','emran','5879','emran@yahoo.com',true);
INSERT INTO client(id,user_name,hashed_password,email,verified) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','anwar','$2b$10$uT1ZmVqiRK1sE/Xhya/Z7uMl8.3EXXAWdiOqb4SlX3fp.ZI7Ou0ze','anwar@yahoo.com',false);

INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('6d0829d5-cc98-4889-8b30-b01549a4c2f9','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('507f39aa-9122-4f24-8d18-d928bea2c1ba','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('799c203d-93ac-4c0b-8827-b3613dc84916','hhh','qqq');
INSERT INTO jwt(user_id,access_token,refresh_token) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','hhh','qqq');

INSERT INTO user_file(id,file) VALUES ('770e17de-3dbb-4768-b47e-e2f489879d7f','../img/female.jpg');
INSERT INTO user_file(id,file) VALUES ('2fa53b27-a3d7-406f-9f91-c7f3950e9078','../img/male.jpg');


INSERT INTO profile(id,user_id,first_name,last_name,caption,profile_picture) VALUES ('b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','799c203d-93ac-4c0b-8827-b3613dc84916','emran','aloul','engneer','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO profile(id,user_id,first_name,last_name,caption,profile_picture) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','6d0829d5-cc98-4889-8b30-b01549a4c2f9','wesam','al-masri','artist','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO profile(id,user_id,first_name,last_name,caption,profile_picture) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','770e17de-3dbb-4768-b47e-e2f489879d7f','anwar','isleet',null,'770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO profile(id,user_id,first_name,last_name,caption,profile_picture) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','2fa53b27-a3d7-406f-9f91-c7f3950e9078','tamara','al-rashed','artist','770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO profile(id,user_id,first_name,last_name,caption,profile_picture) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','507f39aa-9122-4f24-8d18-d928bea2c1ba','amjad','mesmar','desighner','2fa53b27-a3d7-406f-9f91-c7f3950e9078');

INSERT INTO follow(follower,following) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2');
INSERT INTO follow(follower,following) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c');
INSERT INTO follow(follower,following) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','5dc1ec28-0f88-4399-8c41-18617596d66f');
INSERT INTO follow(follower,following) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','739f7cf4-fb52-46a3-a084-a0ea484129af');
INSERT INTO follow(follower,following) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c');
INSERT INTO follow(follower,following) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','c5c96575-6413-4d77-b00b-cb3c68d3a425');
INSERT INTO follow(follower,following) VALUES ('b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','5dc1ec28-0f88-4399-8c41-18617596d66f');
INSERT INTO follow(follower,following) VALUES ('b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','c5c96575-6413-4d77-b00b-cb3c68d3a425');
INSERT INTO follow(follower,following) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','739f7cf4-fb52-46a3-a084-a0ea484129af');
INSERT INTO follow(follower,following) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2');

INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','c5c96575-6413-4d77-b00b-cb3c68d3a425','hi',true);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','hi',true);

INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','hi',false);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','hi',true);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','5dc1ec28-0f88-4399-8c41-18617596d66f','hi',false);
INSERT INTO message(sender_id,receiver_id,message,seen) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','739f7cf4-fb52-46a3-a084-a0ea484129af','hi',true);

INSERT INTO category(name) VALUES ('artist');
INSERT INTO category(name) VALUES ('engneer');
INSERT INTO category(name) VALUES ('desighner');

INSERT INTO post(id,profile_id,category_id,text) VALUES ('38c64c9f-2815-48f2-b3b8-29986b6d82d1','c5c96575-6413-4d77-b00b-cb3c68d3a425',1,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('4ca3238e-274c-45ca-818f-8e27a120958c','7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2',3,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('8a05a992-c49c-42ec-b580-7d4ae611ae62','5dc1ec28-0f88-4399-8c41-18617596d66f',2,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('51e01ca6-430c-43ba-b0b8-a879d94f67eb','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c',1,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('d6c857a6-36e7-4536-9019-ab731609ef8e','739f7cf4-fb52-46a3-a084-a0ea484129af',3,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('9357e9f9-bfa1-4088-b180-07079a4f475d','c5c96575-6413-4d77-b00b-cb3c68d3a425',1,'rrrrr');
INSERT INTO post(id,profile_id,category_id,text) VALUES ('bd9d8a2c-469f-4e2e-83ba-e20db5f12d27','5dc1ec28-0f88-4399-8c41-18617596d66f',3,'rrrrr');

INSERT INTO attachment(post_id,file_id) VALUES ('38c64c9f-2815-48f2-b3b8-29986b6d82d1','770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO attachment(post_id,file_id) VALUES ('4ca3238e-274c-45ca-818f-8e27a120958c','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO attachment(post_id,file_id) VALUES ('8a05a992-c49c-42ec-b580-7d4ae611ae62','770e17de-3dbb-4768-b47e-e2f489879d7f');
INSERT INTO attachment(post_id,file_id) VALUES ('51e01ca6-430c-43ba-b0b8-a879d94f67eb','2fa53b27-a3d7-406f-9f91-c7f3950e9078');
INSERT INTO attachment(post_id,file_id) VALUES ('d6c857a6-36e7-4536-9019-ab731609ef8e','770e17de-3dbb-4768-b47e-e2f489879d7f');

INSERT INTO comment (comment,profile_id,post_id) VALUES ('great job','5dc1ec28-0f88-4399-8c41-18617596d66f','38c64c9f-2815-48f2-b3b8-29986b6d82d1');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i like it','5dc1ec28-0f88-4399-8c41-18617596d66f','4ca3238e-274c-45ca-818f-8e27a120958c');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it','5dc1ec28-0f88-4399-8c41-18617596d66f','8a05a992-c49c-42ec-b580-7d4ae611ae62');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('perfect','b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','51e01ca6-430c-43ba-b0b8-a879d94f67eb');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('woooooow','739f7cf4-fb52-46a3-a084-a0ea484129af','51e01ca6-430c-43ba-b0b8-a879d94f67eb');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('not good','7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','51e01ca6-430c-43ba-b0b8-a879d94f67eb');
INSERT INTO comment (comment,profile_id,post_id) VALUES ('i dont like it','5dc1ec28-0f88-4399-8c41-18617596d66f','d6c857a6-36e7-4536-9019-ab731609ef8e');

INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','tamara like your post','4ca3238e-274c-45ca-818f-8e27a120958c',false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','amjad commented on your post','4ca3238e-274c-45ca-818f-8e27a120958c',true);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','anwar like your post','d6c857a6-36e7-4536-9019-ab731609ef8e',false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','wessam like your post','9357e9f9-bfa1-4088-b180-07079a4f475d',true);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','wessam commented on your post','51e01ca6-430c-43ba-b0b8-a879d94f67eb',false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','amjad like your post','d6c857a6-36e7-4536-9019-ab731609ef8e',false);
INSERT INTO notification (receiver_id,message,post_id,seen) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','wessam like your post','d6c857a6-36e7-4536-9019-ab731609ef8e',false);

INSERT INTO interaction (profile_id,post_id) VALUES ('739f7cf4-fb52-46a3-a084-a0ea484129af','38c64c9f-2815-48f2-b3b8-29986b6d82d1');
INSERT INTO interaction (profile_id,post_id) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','51e01ca6-430c-43ba-b0b8-a879d94f67eb');
INSERT INTO interaction (profile_id,post_id) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','d6c857a6-36e7-4536-9019-ab731609ef8e');
INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES ('c5c96575-6413-4d77-b00b-cb3c68d3a425','love','4ca3238e-274c-45ca-818f-8e27a120958c');
INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES ('b22f4e3f-e059-4765-9a80-ad2e4b9fc78c','angry','8a05a992-c49c-42ec-b580-7d4ae611ae62');
INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES ('5dc1ec28-0f88-4399-8c41-18617596d66f','love','38c64c9f-2815-48f2-b3b8-29986b6d82d1');
INSERT INTO interaction (profile_id,interaction_type,post_id) VALUES ('7c86a0d2-8f0f-4f95-ab1f-d3abff3cd4d2','laugh','d6c857a6-36e7-4536-9019-ab731609ef8e');

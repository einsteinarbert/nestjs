CREATE schema longchou
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

create table user
(
	user_id bigint auto_increment
		primary key,
	name varchar(200) not null
);


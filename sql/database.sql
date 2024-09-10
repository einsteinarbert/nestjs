CREATE schema longchou
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

create table user
(
	user_id bigint auto_increment
		primary key,
	name varchar(200) not null
);

create table shop
(
    shop_id bigint auto_increment,
    shop_name varchar(100) not null,
    constraint shop_pk
        primary key (shop_id)
);

create table user_shop
(
    user_shop_id bigint auto_increment,
    user_id bigint not null,
    shop_id bigint not null,
    constraint user_shop_pk
        primary key (user_shop_id)
);


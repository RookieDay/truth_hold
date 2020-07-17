drop table if exists `opinions`;

create TABLE `opinions` (
    `id` int(11) not null auto_increment,
    `openid` varchar(100) not null,
    `src` text DEFAULT null,
    `wechat` varchar(100) DEFAULT null,
    `opinion` text not null,
    `create_time` timestamp not null DEFAULT current_timestamp,
    primary key(`id`) 
) DEFAULT charset=`utf8`;


drop table if exists `records`;

create TABLE `records` (
    `id` int(11) not null auto_increment,
    `openid` varchar(100) not null,
    `add` int(11) not null,
    `mark` int(11) not null,
    `note` varchar(100) DEFAULT null,
    `create_time` timestamp not null DEFAULT current_timestamp,
    primary key(`id`) 
) DEFAULT charset=`utf8`;
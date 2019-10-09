// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/parashoot', { useNewUrlParser: true, useUnifiedTopology: true });


const User = require('../models/users');


const users = [
  {
    username: 'Vika',
    email: 'vika@gmail.com',
    password: '1111',
    social: ['https://vk.com/vika', 'https://www.instagram.com/vika'],
    phone: '+79261234567',
    friendList: [],
    avatar: 'https://wallbox.ru/wallpapers/main/201308/54ac7213233a038.jpg',
    regDate: new Date(),
    bithDate: '01.10.1988',
  },
  {
    username: 'Tanya',
    email: 'Tanya@gmail.com',
    password: '2222',
    social: ['https://vk.com/Tanya', 'https://www.instagram.com/Tanya'],
    phone: '+79999999999',
    friendList: [],
    avatar: 'https://storge.pic2.me/upload/690/5c88d77c741a7.jpg',
    regDate: new Date(),
    bithDate: '21.01.1997',
  },
  {
    username: 'Luba',
    email: 'Luba@mail.ru',
    password: '3333',
    social: ['https://www.facebook.com/Luba', 'https://www.instagram.com/Luba'],
    phone: '+79222222222',
    friendList: [],
    avatar: 'https://storge.pic2.me/upload/446/59b6e021d0764.jpg',
    regDate: new Date(),
    bithDate: '07.01.2001',
  },
  {
    username: 'Kolya',
    email: 'Kolya@bk.ru',
    password: '4444',
    social: ['https://vk.com/Kolya', 'https://www.instagram.com/Kolya', 'https://www.facebook.com/Kolya'],
    phone: '+79991111111',
    friendList: [],
    avatar: 'https://avatars.mds.yandex.net/get-pdb/1220164/4679a48c-ff8f-4727-955c-70fb23fd3fa3/s1200?webp=false',
    regDate: new Date(),
    bithDate: '31.10.1979',
  },
  {
    username: 'Arina',
    email: 'Arina@yahoo.com',
    password: '5555',
    social: ['https://www.facebook.com/arina'],
    phone: '+79266666666',
    friendList: [],
    avatar: 'https://avatars.mds.yandex.net/get-zen_doc/49107/pub_5b17cc98f03173b88cbf470f_5b180d23256d5c66dd84073b/scale_1200',
    regDate: new Date(),
    bithDate: '05.06.1973',
  },
  {
    username: 'Petr',
    email: 'Petr@gmail.com',
    password: '1111',
    social: ['https://www.instagram.com/Petr'],
    phone: '+79261234567',
    friendList: [],
    avatar: 'https://w-dog.ru/wallpapers/4/18/359392834492263.jpg',
    regDate: new Date(),
    bithDate: '01.10.2001',
  },
];


User.insertMany(users).then(() => {
  mongoose.connection.close();
});

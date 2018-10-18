import assets from './assets';

export default [
  {
    id: 1,
    url: assets.tracks.langYen,
    title: 'Lang Yen',
    artist: 'Bui Anh Tuan',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
  },
  {
    id: 2,
    url: assets.tracks.phoKhongMua, // Load media from the app bundle
    title: 'Pho Khong Mua',
    artist: 'Bui Anh Tuan',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
  },
];

export const NavItem = [
  // {
  //   label: 'Trang chủ',
  //   link: 'home'
  // },
  {
    label: 'Ở đâu',
    link: 'o-dau/khach-san',
    paramsPage: { page: 'HotelPage' },
    subItems: [
      {
        label: 'Khách sạn',
        link: 'o-dau/khach-san',
        paramsPage: { page: 'HotelPage' },
      },
      {
        label: 'Homestay',
        link: 'o-dau/homestay',
        paramsPage: { page: 'HomestayPage' },
      },
      {
        label: 'Villa',
        link: 'o-dau/villa',
        paramsPage: { page: 'VillaPage' },
      }
    ]
  },
  {
    label: 'Ăn Gì',
    link: 'an-gi',
    paramsPage: { page: 'FoodPage' },
  },
  {
    label: 'Lịch Trình',
    link: 'lich-trinh',
    paramsPage: { page: 'SchedulePage' },
  },
  {
    label: 'Vui chơi',
    link: 'entertain',
    paramsPage: { page: 'EntertainPage' },
  },

  {
    label: 'Tour',
    link: 'tour/ha-long-bay-tour',
    paramsPage: { page: 'TourCruisePage' },
    subItems: [
      {
        label: 'Di Chuyển',
        link: 'tour/di-chuyen',
        paramsPage: { page: 'TransferPage' },
      },
      {
        label: 'Vịnh',
        link: 'tour/ha-long-bay-tour',
        paramsPage: { page: 'TourCruisePage' },
      },
      {
        label: 'Trọn gói',
        link: 'tour/tron-goi',
        paramsPage: { page: 'TourAllPage' },
      }
    ]
  },
  {
    label: 'Review',
    link: 'reviews'
  }
];

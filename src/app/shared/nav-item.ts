export const NavItem = [
  {
    label: 'Trang chủ',
    link: 'home'
  },
  {
    label: 'Review',
    link: 'reviews',
    subItems: [
      {
        label: 'Lịch Trình',
        link: 'reviews/lich-trinh',
        paramsPage: { page: 'SchedulePage' },
      },
      {
        label: 'Ăn Gì',
        link: 'reviews/an-gi',
        paramsPage: { page: 'FoodPage' },
      }
    ]
  },
  {
    label: 'Hạ Long Tour',
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
    label: 'Ở đâu',
    link: 'o-dau-ha-long/khach-san',
    paramsPage: { page: 'HotelPage' },
    subItems: [
      {
        label: 'Khách sạn',
        link: 'o-dau-ha-long/khach-san',
        paramsPage: { page: 'HotelPage' },
      },
      {
        label: 'Homestay',
        link: 'o-dau-ha-long/homestay',
        paramsPage: { page: 'HomestayPage' },
      },
      {
        label: 'Villa',
        link: 'o-dau-ha-long/villa',
        paramsPage: { page: 'VillaPage' },
      }
    ]
  }
];

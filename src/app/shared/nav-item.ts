export const NavItem = [
  {
    label: 'Ăn Gì',
    link: 'an-gi',
    paramsPage: { page: 'FoodPage' },
  },
  {
    label: 'Chơi gì',
    link: 'entertain',
    paramsPage: { page: 'EntertainPage' },
  },
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
    label: 'Tour',
    link: 'tour/ha-long-bay-tour',
    paramsPage: { page: 'TourCruisePage' },
    subItems: [

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
    label: 'Di Chuyển',
    link: 'tour/di-chuyen',
    paramsPage: { page: 'TransferPage' },
  },
  {
    label: 'Review',
    link: 'lich-trinh',
    subItems: [
      {
        label: 'Lịch Trình',
        link: 'lich-trinh',
        paramsPage: { page: 'SchedulePage' },
      },
      {
        label: 'Review từ du khách',
        link: 'reviews',
        paramsPage: { page: 'ReviewPage' },
      },
    ]
  }
];

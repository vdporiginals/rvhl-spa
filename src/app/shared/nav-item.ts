export const NavItem = [
  {
    text: 'Trang chủ',
    link: 'home'
  },
  {
    text: 'Review',
    link: 'reviews',
    queryParams: { category: 'bannerBlog' },
    subItems: [
      {
        text: 'Lịch Trình',
        link: 'reviews/lich-trinh',
      },
      {
        text: 'Ăn Gì',
        link: 'reviews/an-gi',
      }
    ]
  },
  {
    text: 'Hạ Long Tour',
    link: 'tour',
    queryParams: { category: 'bannerTour' },
    subItems: [
      {
        text: 'Di Chuyển',
        link: 'tour/di-chuyen'
      },
      {
        text: 'Ở đâu',
        link: 'tour/khach-san'
      },
      {
        text: 'Vịnh',
        link: 'tour/ha-long-bay-tour'
      },
      {
        text: 'Trọn gói',
        link: 'tour/tron-goi'
      }
    ]
  }
];

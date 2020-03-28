import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from 'src/app/shared/nav-item.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  faAngleDown = faAngleDown;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  @Output() menuItem = new EventEmitter();

  navItems: NavItem[] = [
    {
      text: 'Trang chủ',
      link: ''
    },
    {
      text: 'Review',
      link: 'blogs',
      queryParams: { category: 'bannerBlog' },
      subItems: [
        {
          text: 'Lịch Trình',
          link: 'blogs',
          queryParams: {
            category: 'bannerSchedule'
          }
        },
        {
          text: 'Ăn Gì',
          link: 'blogs',
          queryParams: {
            category: 'bannerFood'
          }
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
    },
    {
      text: 'Liên hệ',
      link: 'contact-us'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  menuItemClicked(child: {}) {
    this.menuItem.emit(child);
  }

  buttonEnter(trigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  menuEnter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }
}

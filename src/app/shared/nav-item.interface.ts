export interface NavItem {
  text: string;
  link?: string;
  queryParams?: {};
  subItems?: NavItem[];
}

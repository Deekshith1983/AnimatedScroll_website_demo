export interface SceneConfig {
  key: number;
  selector: string;
  tag: string;
  title: string;
  desc: string;
}

export const HERO_VIDEOS = {
  desktop: '/assets/project1-scroll.mp4',
  tablet: '/assets/project1-scroll.mp4',
  mobile: '/assets/project1-scroll-mobile.mp4',
};

export const HERO_SCENES: SceneConfig[] = [
  {
    key: 1,
    selector: '.h-scene-1',
    tag: '01 / Entrance',
    title: 'Where Luxury Finds Its Place',
    desc: 'Spaces thoughtfully crafted to inspire extraordinary living.',
  },
  {
    key: 2,
    selector: '.h-scene-2',
    tag: '02 / Suite',
    title: 'Designed Around Timeless Living',
    desc: 'Elegant collections that bring harmony, comfort, and sophistication into every home.',
  },
  {
    key: 3,
    selector: '.h-scene-3',
    tag: '03 / Detail',
    title: 'Crafted Beyond Expectations',
    desc: 'Every curve, every finish, every detail reflects our commitment to exceptional craftsmanship.',
  },
  {
    key: 4,
    selector: '.h-scene-4',
    tag: '04 / Collection',
    title: 'Curated For Every Vision',
    desc: 'A premium collection of basins, sanitaryware, vanities, and shower systems designed for modern architecture.',
  },
  {
    key: 5,
    selector: '.h-scene-5',
    tag: '05 / Showroom',
    title: 'Experience Om Mangalam',
    desc: 'Where timeless design, enduring quality, and inspired living come together.',
  },
];

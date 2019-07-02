import { createPostGrid } from '../shared/PostGrid';

const RecentPostsGridDesktop = createPostGrid({
  orderSpec: ['SQ', 'SQ', 'SQ', 'SQ', 'SQ', 'SQ', 'SQ', 'SQ'],
  itemsPerRow: 2,
  postComponentAttrMap: {
    SQ: {
      layoutVariant: 'medium',
      imageWidth: 250,
      imageHeight: 250
    }
  }
});

const RecentPostsGridMobile = createPostGrid({
  orderSpec: ['MD', 'MD', 'MD', 'MD', 'SM', 'SM', 'SM', 'SM'],
  itemsPerRow: 1,
  postComponentAttrMap: {
    MD: { layoutVariant: 'medium' },
    SM: {
      layoutVariant: 'reduced',
      showImage: true
    }
  }
});

export { RecentPostsGridDesktop, RecentPostsGridMobile };

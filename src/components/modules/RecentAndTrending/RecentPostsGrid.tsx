import { createPostGrid } from '../shared/PostGrid';

const RecentPostsGridDesktop = createPostGrid({
  orderSpec: ['MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD', 'MD'],
  itemsPerRow: 2
});

const RecentPostsGridMobile = createPostGrid({
    orderSpec: ['MD', 'MD', 'MD', 'MD', 'SM', 'SM', 'SM', 'SM'],
    itemsPerRow: 1, 
    postComponentAttrMap: {
        MD: { layoutVariant: 'medium' }, 
        SM : { 
            layoutVariant: 'reduced', 
            showImage: true 
        }
    }
});

export { 
    RecentPostsGridDesktop, 
    RecentPostsGridMobile 
};
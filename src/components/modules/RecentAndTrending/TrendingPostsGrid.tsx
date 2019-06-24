import { createPostGrid } from '../shared/PostGrid';

const TrendingPostsGridDesktop = createPostGrid({
    orderSpec: ['MD', 'AD', 'MD', 'MD', 'MD', 'SM', 'SM'],
    itemsPerRow: 1,
    postComponentAttrMap: {
        MD: { 
            layoutVariant: 'medium', 
            postLine: false 
        },
        SM: { layoutVariant: 'reduced' }
    }
});

const TrendingPostsGridMobile = createPostGrid({
    orderSpec: ['SM', 'SM', 'SM', 'SM', 'SM', 'SM'],
    itemsPerRow: 1, 
    postComponentAttrMap: {
        SM: { 
            layoutVariant: 'reduced', 
            showImage: true 
        }
    }
});

export { 
    TrendingPostsGridDesktop, 
    TrendingPostsGridMobile 
};
import { createPostGrid } from '../shared/PostGrid';

const FeaturedSplitTagGrid = createPostGrid({
  name: 'FeaturedSplitTag',
  orderSpec: ['XL', 'MD', 'AD'],
  itemsPerRow: 2
});

export default FeaturedSplitTagGrid;

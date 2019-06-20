import { createPostGrid } from '../shared/PostGrid';

const SplitTagGrid = createPostGrid({
  orderSpec: ['MD', 'MD', 'MD', 'AD'],
  itemsPerRow: 2
});

export default SplitTagGrid;

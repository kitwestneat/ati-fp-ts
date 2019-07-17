import { createPostGrid } from '../shared/PostGrid';

const SplitTagGrid = createPostGrid({
  name: 'SplitTag',
  orderSpec: ['MD', 'MD', 'MD', 'AD'],
  itemsPerRow: 2
});

export default SplitTagGrid;

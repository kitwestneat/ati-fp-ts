import { createPostGrid } from '../shared/PostGrid';

const OverlapGrid = createPostGrid({
  name: 'Overlap',
  orderSpec: ['MD', 'MD', 'MD', 'AD', 'LG']
});
export default OverlapGrid;

import React from 'react';
import ReactDOM from 'react-dom';

import Admin from '@/components/admin/Admin';

function startAdmin(moduleList, tagId) {
  ReactDOM.render(
    <Admin moduleList={moduleList} tagId={tagId} />,
    document.getElementById('root'),
  );
}
window.startAdmin = startAdmin;
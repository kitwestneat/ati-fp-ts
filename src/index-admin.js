import React from 'react';
import ReactDOM from 'react-dom';

import Admin from '@/components/admin/Admin';

function startAdmin(moduleList) {
  ReactDOM.render(
    <Admin moduleList={moduleList} />,
    document.getElementById('root'),
  );
}
window.startAdmin = startAdmin;
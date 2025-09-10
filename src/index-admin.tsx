import React from 'react';
import ReactDOM from 'react-dom';

import Admin from '@/components/admin/Admin';
import { ModuleSpec } from '@/types';

function startAdmin(moduleList: ModuleSpec[], tagId?: number) {
  ReactDOM.render(
    <Admin moduleList={moduleList} tagId={tagId} />,
    document.getElementById('root'),
  );
}
(window as any).startAdmin = startAdmin;

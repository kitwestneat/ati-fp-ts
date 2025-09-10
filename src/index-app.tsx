import React from 'react';
import ReactDOM from 'react-dom';
import codegen from 'codegen.macro';
import App from './App';
import { isDevEnv } from './utils';

codegen`
let isAdmin = process.env.IS_ADMIN;
if (isAdmin) {
  module.exports = "require('./index-admin.js');\\n";
} else {
  module.exports = '';
}`;

function startFP(data: any) {
  ReactDOM.render(
    <App data={data} />,
    document.getElementById('root')
  );
}
debugger;
const global = window as any;
global.startFP = startFP;

/*
*/

if (isDevEnv()) {
  if (window.document.location.href.includes('/tag/')) {
    startFP(global.tag_data);
  } else if (global.startAdmin && window.document.location.href.includes('/admin')) {
    global.startAdmin(global.admin_data, 76);
  } else {
    startFP(global.fp_data);
  }
}

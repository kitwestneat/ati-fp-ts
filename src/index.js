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

function startFP(data) {
  ReactDOM.render(
    <App data={data} />,
    document.getElementById('root')
  );
}
window.startFP = startFP;

/*
*/

if (isDevEnv()) {
  if (window.document.location.href.includes('/tag/')) {
    startFP(window.tag_data);
  } else if (window.startAdmin && window.document.location.href.includes('/admin')) {
    window.startAdmin(window.admin_data);
  } else {
    startFP(window.fp_data);
  }
}
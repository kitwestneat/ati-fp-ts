import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Admin from "@/components/admin/Admin";
import { BrowserRouter } from 'react-router-dom';

import { isDevEnv } from './utils';

function startFP(data) {
  // ReactDOM.render(<App data={data} />, document.getElementById('root'));
  ReactDOM.render(
    <BrowserRouter>
      <App data={data} />
    </BrowserRouter>, 
    document.getElementById('root'));
}
window.startFP = startFP;

/*
function startAdmin(moduleList) {
  ReactDOM.render(
    <Admin moduleList={moduleList} />,
    document.getElementById("root"),
  );
}
window.startAdmin = startAdmin;
*/

if (isDevEnv()) {
  startFP(window.fp_data);
  //startAdmin(window.admin_data);
}
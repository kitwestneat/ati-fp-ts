import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import Admin from "components/admin/Admin";

import { isDevEnv } from "./utils";

function startFP(data) {
  ReactDOM.render(<App data={data} />, document.getElementById("root"));
}
window.startFP = startFP;

/*
function startAdmin(moduleList) {
  ReactDOM.render(
    <Admin moduleList={moduleList} />,
    document.getElementById("root"),
  );
}
*/

if (isDevEnv()) {
  startFP(window.fp_data);
  //startAdmin(window.admin_data);
}

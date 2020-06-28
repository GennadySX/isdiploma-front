import React, { Component } from "react";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";

export class SurveyApplicationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {

    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="project.status" />
            </p>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}

export default connect()(SurveyApplicationMenu);

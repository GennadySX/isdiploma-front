import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";

import { getSurveyListWithFilter } from "../../redux/actions";
export class SurveyApplicationMenu extends Component {
  constructor(props) {
    super();
  }

  addFilter(column, value) {
    this.props.getSurveyListWithFilter(column, value);
  }
  render() {
    const {
      surveyItems,
      filter,
      allSurveyItems,
      loading,
      labels,
      categories
    } = this.props.surveyListApp;

    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="project.status" />
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink to="#" onClick={e => this.addFilter("", "")}>
                  <i className="simple-icon-reload" />
                  <IntlMessages id="project.all" />
                  <span className="float-right">
                    {loading && allSurveyItems.length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "ACTIVE"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "ACTIVE")}
                >
                  <i className="simple-icon-refresh" />
                  <IntlMessages id="project.active" />
                  <span className="float-right">
                    {loading &&
                      surveyItems.filter(x => x.status === "ACTIVE").length}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem
                className={classnames({
                  active:
                    filter &&
                    filter.column === "status" &&
                    filter.value === "COMPLETED"
                })}
              >
                <NavLink
                  to="#"
                  onClick={e => this.addFilter("status", "COMPLETED")}>
                  <i className="simple-icon-check" />
                  <IntlMessages id="project.completed" />
                  <span className="float-right">
                    {loading &&
                      surveyItems.filter(x => x.status === "COMPLETED").length}
                  </span>
                </NavLink>
              </NavItem>
            </ul>


          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}
const mapStateToProps = ({ surveyListApp }) => {
  return {
    surveyListApp
  };
};
export default connect(
  mapStateToProps,
  {
    getSurveyListWithFilter
  }
)(SurveyApplicationMenu);

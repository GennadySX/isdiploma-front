import React from "react";
import { Card, CardBody, Badge, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../common/CustomBootstrap";

const SurveyListItem = ({ item, handleCheckChange, isSelected }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex flex-row mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to={`/app/applications/survey/${item._id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <i
                className={`${
                  item.status === 0
                    ? "simple-icon-check heading-icon"
                    : "simple-icon-refresh heading-icon"
                }`}
              />
              <span className="align-middle d-inline-block pl-4">{item.name}
                <br/>
                <small className="text-muted">{item.description}</small>
              </span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.avatar}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.createdAt}
          </p>
            <div className="w-15 w-xs-100">
              <Badge color={item.status ? 'primary' : 'warning'} pill>
                {item.name}
              </Badge>
            </div>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            {/*<CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item._id}`}
              checked={isSelected}
              onChange={event => handleCheckChange(event, item._id)}
              label=""
            />*/}
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(SurveyListItem);

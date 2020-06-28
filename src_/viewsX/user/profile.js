import React, { Component, Fragment } from "react";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, Input, Label, Row} from "reactstrap";

import {Colxx, Separator} from "../../components/common/CustomBootstrap";

import Breadcrumb from "../../containers/navs/Breadcrumb";
import IntlMessages from "../../helpers/IntlMessages";
import TagsInput from "react-tagsinput";
import DatePicker from "react-datepicker";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import moment from "moment";
import {NavLink} from "react-router-dom";
import ThumbnailImage from "../../components/cards/ThumbnailImage";

const selectData = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveTab: "messages",
      messageInput: "",

      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      startDate: null,
      startDateLabelOver: null,
      startDateLabelTop: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: [],
      user: null,

    };

    console.log('props is', this.props)

  }


  componentDidMount() {
    let user = localStorage.getItem('user')
    this.setState({
      user: JSON.parse(user)
    })

  }


  saveIt() {
    localStorage.setItem('user', JSON.stringify(this.state.user))
    window.location.reload()
  }


  render() {
    return  (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb
                heading="user.profile"
                match={this.props.match}
                single={true}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="profile.your-data" />
                </CardTitle>
               <div className="col-12 d-flex justify-content-center">
                 {/*<img  src="/assets/img/profile-pic-l-2.jpg" alt="Card image cap" className="m-4 rounded-circle" style={{width: 250}} />*/}
               </div>
                {this.state.user ?
                    <Form>

                      <Label className="form-group has-float-label">
                        <Input type="text"
                               defaultValue={`${this.state.user.firstName} ${this.state.user.lastName}`}
                        />
                        <IntlMessages id="user.fullname"/>
                      </Label>
                      <Label className="form-group has-float-label">
                        <Input type="text"
                               defaultValue={`${this.state.user.login} `}
                        />
                        <IntlMessages id="user.login"/>
                      </Label>
                      <Label className="form-group has-float-label">
                        <Input type="email"
                               defaultValue={`${this.state.user.email} `}
                        />
                        <IntlMessages id="user.email"/>
                      </Label>

                      {/*<div className="form-group has-float-label">*/}
                      {/*  <DatePicker*/}
                      {/*      selected={this.state.startDateLabelOver}*/}
                      {/*      onChange={this.handleChangeDateLabelOver}*/}
                      {/*  />*/}
                      {/*  <IntlMessages id="profile.birth-date" />*/}
                      {/*</div>*/}

                      <Button color="primary"
                      onClick={(e) => {
                        e.preventDefault()
                        this.saveIt()
                      }}
                      >
                        <IntlMessages id="profile.save"/>
                      </Button>
                    </Form>
                    :null
                }
              </CardBody>
            </Card>
          </Colxx>
        </Row>

      </Fragment>
    )
  }
}


export default     Profile

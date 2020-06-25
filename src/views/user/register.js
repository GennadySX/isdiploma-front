import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

import $ from 'jquery'
import axios from 'axios'
import {Api} from "../../constants/API";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Jim",
      lastName: "Carrey",
      login: "jimCarrey",
      email: "jim@mail.com",
      password: "inmail00",
      c_password: "inmail00",
      err: ''
    };
  }
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "" && this.state.password !== "") {
      this.registerIt()
    }
  }

  registerIt() {
    axios.post(Api.register, this.state).then(res => {
      if (res.data && res.data.user) {
        window.location.href = '/user/login'
      }else {
        this.setState({err: 'Не правильные запольненые поля или такой аккаунт уже зарегистрован'}, () => {
          setTimeout(() => this.setState({err: null}), 5000)
        })
      }
    }).catch(e => {
      this.setState({err: 'Не правильные запольненые поля или такой аккаунт уже зарегистрован'}, () => {
        setTimeout(() => this.setState({err: null}), 5000)
      })
    })
  }

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">isDiploma</p>
              <p className="white mb-0">
                Пожалуйста, используйте ваши учетные данные для входа.
                <br />
                Если у вас есть аккуанта,
                <NavLink to={`/user/login`} className="white">
                  <h2>Авторизуйтесь</h2>
                </NavLink>
                пожалуйста.
              </p>
              <br/>
              <br/>
              <br/>
              <br/>
              {this.state.err ? <p className=" bg-danger text-light p-2 align-bottom rounded pl-3">{this.state.err}</p> : null}

            </div>
            <div className="form-side">

              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4 justify-content-between d-flex ">
                  <input type="name" value={this.state.firstName}
                         onChange={(e) => this.setState({firstName: $(e.target).val()}) }
                         className={' col-5 p-2 '} style={{borderColor: 'gray'}} placeholder={'Ваше имя'}/>
                  <input type="name"
                         onChange={(e) => this.setState({lastName: $(e.target).val()}) }
                         value={this.state.lastName}  className={'col-5'} style={{borderColor: 'gray'}} placeholder={'Ваша фамилия'}/>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.login} />
                  <IntlMessages id="user.login" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password"
                         defaultValue={this.state.password}
                  />
                  <IntlMessages
                    id="user.password"
                  />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password"
                         defaultValue={this.state.c_password}
                  />
                  <IntlMessages
                      id="user.password_confirm"
                  />
                </Label>
                <div className="d-flex justify-content-end align-items-center">

                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserRegister()}
                  >
                    <IntlMessages id="user.register-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(Register);

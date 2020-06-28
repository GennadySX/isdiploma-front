import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

import $ from 'jquery'
import axios from 'axios'
import {Api} from "../../constants/API";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      login: "",
      email: "",
      password: "",
      c_password: "",
      err: ''
    };
  }
  onUserRegister() {
    console.log('state is', this.state)
    if (this.state.email !== "" && this.state.password !== "" && this.state.password !== "") {
      this.registerIt()
    }
  }

  registerIt() {
    axios.post(Api.register, this.state).then(res => {
      if (res.data && res.data.user) {
        this.props.history.push('/auth/login')
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
                <NavLink to={`/auth/login`} className="white">
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
                <div className="d-flex justify-content-between col-md-12 p-0 pl-0">
                <Label className="form-group col-6 pl-0 has-float-label">
                  <Input type="name" value={this.state.firstName}
                         onChange={(e) => this.setState({firstName: e.target.value}) }
                         className={' col-md-12 '}  />
                  <IntlMessages id="user.firstName" />
                </Label>
                  <Label className="form-group col-6 pl-0 pr-0 mb-4 has-float-label">
                  <Input type="name"
                         onChange={(e) => this.setState({lastName: e.target.value}) }
                         value={this.state.lastName}
                         className={'col-12'} placeholder={'Ваша фамилия'}/>
                  <IntlMessages id="user.lastName" />
                </Label>
                </div>
                <Label className="form-group has-float-label mb-4">
                  <Input type="text"
                         onChange={(e) => this.setState({login: e.target.value})}
                         defaultValue={this.state.login} />
                  <IntlMessages id="user.login" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email"
                         name={'email'}
                         onChange={(e) => this.setState({email: e.target.value})}
                         defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password"
                         onChange={(e) => this.setState({password: e.target.value}) }
                         defaultValue={this.state.password}
                  />
                  <IntlMessages
                    id="user.password"
                  />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password"
                         onChange={(e) => this.setState({c_password: e.target.value}) }
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

export default connect(Register);

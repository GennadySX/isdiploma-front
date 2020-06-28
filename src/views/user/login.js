import React, {Component} from "react";
import {Row, Card, CardTitle, Form, Label, Input, Button} from "reactstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import {loginUser} from "../../redux/actions";
import {Colxx} from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import axios from 'axios'
import {Api} from "../../constants/API";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    onUserLogin() {
        if (this.state.email !== "" && this.state.password !== "") {
            this.props.loginUser(this.state, this.props.history);
        }
    }


    loginIt() {
        axios.post(Api.login, this.state).then(res => {
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                window.location.href = '/'
            }
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
                                <br/>
                                Если у вас нет аккуанта,
                                <NavLink to={`/auth/register`} className="white">
                                    <h2>Зарегиструйтесь</h2> пожалуйста.
                                </NavLink>

                            </p>
                        </div>
                        <div className="form-side">
                            <NavLink to={`/`} className="white">
                            </NavLink>
                            <CardTitle className="mb-4">
                                <IntlMessages id="user.login-title"/>
                            </CardTitle>
                            <Form>
                                <Label className="form-group has-float-label mb-4">
                                    <Input type="text"
                                           onChange={(e) => this.setState({login: e.target.value})}
                                           defaultValue={this.state.login}/>
                                    <IntlMessages id="user.emailOrLogin"/>
                                </Label>
                                <Label className="form-group has-float-label mb-4">
                                    <Input type="password"
                                           onChange={(e) => this.setState({password: e.target.value})}
                                           defaultValue={this.state.password}
                                    />
                                    <IntlMessages
                                        id="user.password"
                                    />
                                </Label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <NavLink to={`/auth/register`}>
                                        <IntlMessages id="user.register"/>
                                    </NavLink>
                                    <Button
                                        color="primary"
                                        className="btn-shadow"
                                        size="lg"
                                        onClick={() => this.loginIt()}
                                    >
                                        <IntlMessages id="user.login-button"/>
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

const mapStateToProps = ({authUser}) => {
    const {user, loading} = authUser;
    return {user, loading};
};

export default Login

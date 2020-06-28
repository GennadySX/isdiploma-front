import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SurveyApp from "./survey";
import surveyDetailApp from "./survey-detail";
import Chat from "./chat";
import openSocket from "socket.io-client";
import {Api} from "../../../constants/API";
import TaskApp from "./task";


const token = localStorage.getItem('token')
class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            token: token
        }

        this.socket = token ? openSocket(Api.ws, {
            query: {
                token: token
            },
            transports: ['websocket']
        }) : null
    }



    render() {

        // console.log('application router')
        const {match} = this.props
    return (
        <div className="dashboard-wrapper">
            <Switch>

                <Route path={`${match.url}/project`} component={() => <SurveyApp {...this.props} client={this.socket} />} isExact/>
                <Route path={`${match.url}/task`} component={() => <TaskApp {...this.props} client={this.socket} />} isExact/>
                <Route path={`${match.url}/chat`} component={() => <Chat {...this.props} client={this.socket} />} params={this.state} />
                <Redirect to="/error" />
            </Switch>
        </div>
    );
}
}
export default Applications;

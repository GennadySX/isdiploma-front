/**
 * Created by GennadySX on @2020
 */



import React from "react";
import {ModalBody} from "reactstrap";
import UserAvatar from "react-user-avatar";
import {chatAvatar} from "../constants/ChatAvatar";

export default class UserCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <div className="d-flex flex-row card mb-2" style={{cursor: 'pointer'}}  onClick={(e) => {
                e.preventDefault()
                this.props.onClick(this.props.user)
            }}>
                <div className="d-flex active" aria-current="page">
                    <UserAvatar
                        className="img-thumbnail list-thumbnail align-self-center ml-4 mr-4  rounded-circle small"
                        size="50" src={this.props.user.avatar}
                        name={`${this.props.user.firstName} ${this.props.user.firstName}`}
                        colors={chatAvatar.colors}/></div>
                <div className=" d-flex flex-grow-1 min-width-zero">
                    <div
                        className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero card-body">
                        <div className="min-width-zero"><h6
                            className="truncate mb-1 card-subtitle">{this.props.user.firstName} {this.props.user.lastName}</h6><p
                            className="text-muted text-small mb-2 card-text">{this.props.user.about}</p></div>
                    </div>
                </div>
            </div>
        );
    }


}
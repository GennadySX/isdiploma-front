/**
 * Created by GennadySX on @2020
 */



import React from "react";
import {ModalBody} from "reactstrap";

export default class UserCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <div className="d-flex flex-row mb-4 card">
                <div className="d-flex active" aria-current="page" onClick={(e) => {
                    e.preventDefault()
                    this.props.onClick(this.props.user)
                }}>
                    <img alt="profile"  src="/assets/img/avatar.png" className="img-thumbnail list-thumbnail align-self-center m-4  rounded-circle small" /></div>
                <div className=" d-flex flex-grow-1 min-width-zero">
                    <div
                        className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero card-body">
                        <div className="min-width-zero"><a className="active" aria-current="page" href="/app/ui/cards"><h6
                            className="truncate mb-1 card-subtitle">{this.props.user.firstName} {this.props.user.lastName}</h6></a><p
                            className="text-muted text-small mb-2 card-text">???</p></div>
                    </div>
                </div>
            </div>
        );
    }


}
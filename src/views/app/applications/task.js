import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";

import Board from 'react-trello'
import {Row} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";

import {taskData} from "../../../data/ATask";


class TaskApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveTab: "messages",
            messageInput: "",
            loading: false
        };
        this._scrollBarRef = window.innerHeight

        console.log('chat props', this.props)

    }

    componentDidMount() {
    }


    render() {
        return !this.state.loading ?
            (
                <Fragment>
                    <Row className="col-12 cd">
                        <Board data={taskData}
                               style={{backgroundColor: 'transparent'}}
                               lang={'ru'}
                               editable
                               draggable
                               onCardAdd={(card, laneId) => {
                                 console.log('created card', card)
                                 console.log('in board', laneId)
                               }}

                               // canAddLanes
                               handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
                                    console.log('card id', sourceLaneId)
                               }}
                        />
                    </Row>
                </Fragment>
            ) : (
                <div className="loading"></div>
            );
    }
}

export default injectIntl(TaskApp)

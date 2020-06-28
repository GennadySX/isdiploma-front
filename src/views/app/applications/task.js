import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";

import Board from 'react-trello'
import {Row} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";

import {taskData} from "../../../data/ATask";
import TaskHeader from "../../../components/task/header";


class TaskApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveTab: "messages",
            messageInput: "",
            loading: false
        };
        this._scrollBarRef = window.innerHeight
        this.socket = this.props.client
    }



    addCard(card, lane) {
        console.log('created card is', card)
        console.log('lane is', lane)
       this.socket.on('taskCreated', (task) => {
            console.log('server task create answer', task)
        })
        this.socket.emit('taskCreate', {
            project_id: '5ef3a7d156a3bf3d4c22de65',
            type: lane,
            title: card.title,
            description: card.description,
            creator: '5eec5b3b89af370378db7597'
        })


    }



    render() {
        return !this.state.loading ?
            (
                <Fragment>
                    <Row className="col-12 cd">


                            <TaskHeader
                                {...this.props}
                            />
                        <Board data={taskData}
                               style={{backgroundColor: 'transparent'}}
                               lang={'ru'}
                               editable
                               draggable
                               hideCardDeleteIcon={false}
                               onCardAdd={(card, laneId) => this.addCard(card, laneId)}

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

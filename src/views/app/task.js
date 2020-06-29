import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";

import Board from 'react-trello'
import {Row} from "reactstrap";
import {Colxx} from "../../components/common/CustomBootstrap";

import {taskData} from "../../data/ATask";
import TaskHeader from "../../components/task/header";
import {tasker} from "../../helpers/TaskRelease";


class TaskApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveTab: "messages",
            messageInput: "",
            loading: false,
            taskList: null
        }
        this._scrollBarRef = window.innerHeight
        this.socket = this.props.client
    }



        componentDidMount() {
        this.getTaskList()
        }



    getTaskList = () => {
        this.socket.on('taskList', (taskList) => {
            tasker(taskList.data).then(res => {
                console.log('task list get ', res)
                this.setState({
                    taskList:  res
                })
            })

        })
            this.socket.emit('emit_taskList')

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



    moved(task, type) {
        this.socket.on('on_taskMoved_confirm', task => {
            console.log('moved confirm ', task)
        })
        this.socket.emit('emit_taskMoved', task, type)
    }



    render() {
        return !this.state.loading ?
            (
                <Fragment>
                    <Row className="col-12 cd">


                            <TaskHeader
                                {...this.props}
                            />
                        {this.state.taskList &&
                            <Board data={this.state.taskList}
                                   style={{backgroundColor: 'transparent'}}
                                   lang={'ru'}
                                   editable
                                   draggable
                                   hideCardDeleteIcon={false}
                                   onCardAdd={(card, laneId) => this.addCard(card, laneId)}

                                // canAddLanes
                                   handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
                                       console.log('card id', cardId)
                                       console.log('sourceLaneId', sourceLaneId)
                                       console.log('targetLaneId', targetLaneId)
                                       console.log('cardDetails', cardDetails)
                                       this.moved({_id: cardId},targetLaneId)
                                   }}
                            />
                        }
                    </Row>
                </Fragment>
            ) : (
                <div className="loading"></div>
            );
    }
}

export default injectIntl(TaskApp)

import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import {Row} from "reactstrap";

import {Colxx} from "../../../components/common/CustomBootstrap";

import {
    getContacts,
    getConversations,
    changeConversation,
    addMessageToConversation
} from "../../../redux/actions";
import ChatApplicationMenu from "../../../containers/applications/ChatApplicationMenu";
import ChatHeading from "../../../components/applications/ChatHeading";
import MessageCard from "../../../components/applications/MessageCard";
import SaySomething from "../../../components/applications/SaySomething";

import contactsData from "../../../data/chat.contacts.json";
import conversationsData from "../../../data/chat.conversations.json";

import $ from 'jquery'
import {WSList} from "../../../constants/API";

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveTab: "messages",
            message: "",
            loading: false,
            friendlist: null,
            roomList: null,
            init: false,
            user: null,
            messages: conversationsData.data[0].messages,
            room: null,
            messageList: []
        };
        this._scrollBarRef = window.innerHeight

        //console.log('chat props', this.props)

    }

    componentDidMount() {
        this.props.getContacts();
        this.props.getConversations(2)
        this.getFriends();
        this.getGroups()
        this.socketStart()
    }


    getFriends = async () => {
        let user = localStorage.getItem('user')
        await this.props.client.on('friendList', friends => {
            this.setState({
                user: JSON.parse(user),
                friendlist: friends.data
            }, () => {})
        })
        this.props.client.emit('getFriendList')
    };


    getGroups = async () => {
        await this.props.client.on('roomList', roomList => {
            //console.log('roomList is', roomList)
            this.joinIt(roomList.data[0])

            this.setState({
                roomList: roomList.data,
                init: true,
                room: roomList.data[0],
                messageList: roomList.data[0].messageList
            })
        })
        this.props.client.emit('get_room_list')


    };


    joinIt(room) {
        this.props.client.emit('room_join',room)
    }

    componentDidUpdate() {
        if (
            this.props.chatApp.loadingConversations &&
            this.props.chatApp.loadingContacts &&
            this.props.chatApp.selectedUser == null
        ) {
            this.props.changeConversation(this.props.chatApp.selectedUserId);
        }

        if (this._scrollBarRef) {
            this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
        }
    }


    toggleAppMenu = tab => {
        this.setState({
            menuActiveTab: tab
        });
    };


    openRoom = (room) => {
        this.setState({
            room: room,
            messageList: room.messageList
        }, () => {
            this.joinIt(room)
        })

    };


    socketStart() {

        this.props.client.on(WSList.receive, (msg, room) => {
            console.log('got message', room)
            if (this.state.room && this.state.room._id === room._id) {
                this.setState({messageList: [...this.state.messageList, msg[0]]})
            }
        });
    }


    sendMess = () => {
        const {messageList, room, user, message} = this.state,
            nmessage = {
                sender_id: user._id,
                type: "text",
                text: message,
            }
        if(message && message.toString().length) {
            this.props.client.emit(WSList.send, {_id: room._id}, nmessage);
            this.setState({messageList: [...messageList, nmessage], message: ""})
            $('.messageList').animate({scrollTop: $(document).height() * 50}, 'slow');
        }
    }

    checkFriendRoom(friend) {
        //console.log('friend data', friend)
        friend.type = 'user'

        this.props.client.on('room_check_res', (room) => {
            console.log('room is exists > ', room)
            this.setState({room: room, messageList: room.messageList})
            this.props.client.emit('get_room_emit', room);
        })

        this.props.client.emit('room_check_req', friend._id);

    }



    render() {
        const {menuActiveTab, message} = this.state;
        const {messages} = this.props.intl;

        return !this.state.loading ?
            (
                <Fragment>
                    <Row className="app-row">
                        <Colxx xxs="12" className="chat-app">
                            {this.state.user &&
                            <ChatHeading
                                name={`${this.state.user.firstName} ${this.state.user.lastName}`}
                                thumb={"/assets/img/gennadysx.jpg"}
                                lastSeenDate={"online"}
                            />
                            }

                            <PerfectScrollbar
                                ref={ref => {
                                    this._scrollBarRef = ref
                                }}
                                containerRef={ref => ref}
                                option={{suppressScrollX: true, wheelPropagation: false}}>
                                {
                                    this.state.roomList && this.state.roomList.length ?
                                        this.state.messageList.map((message, index) => {

                                            return (
                                                <MessageCard
                                                    key={index}
                                                    sender={message.sender_id}
                                                    senderUser={this.state.friendlist.filter(cd => cd._id === message.sender_id)[0]}
                                                    item={message.text}
                                                    user={this.state.user}
                                                    currentUserid={this.state.user._id}
                                                />
                                            );
                                        })
                                        : null
                                }
                            </PerfectScrollbar>
                            <SaySomething
                                placeholder={messages["chat.saysomething"]}
                                messageInput={message}
                                handleChatInputPress={() => {}}
                                handleChatInputChange={(e) => this.setState({message: $(e.target).val()})}
                                handleSendButtonClick={() => {
                                    console.log('send message ')
                                    this.sendMess()
                                }}


                            />
                        </Colxx>
                    </Row>
                    {this.state.friendlist && this.state.init && this.state.user ?
                        <ChatApplicationMenu
                            openRoom={(room) => this.openRoom(room)}
                            chatChoise={(friend) => this.checkFriendRoom(friend)}
                            friendlist={this.state.friendlist}
                            roomlist={this.state.roomList}
                            user={this.state.user}
                            activeTab={menuActiveTab}
                            toggleAppMenu={this.toggleAppMenu}
                        /> : null
                    }
                </Fragment>
            ) : (
                <div className="loading"></div>
            );
    }
}

const mapStateToProps = ({chatApp}) => {
    return {chatApp};
};

export default injectIntl(
    connect(
        mapStateToProps,
        {
            getContacts,
            getConversations,
            changeConversation,
            addMessageToConversation
        }
    )(ChatApp)
);

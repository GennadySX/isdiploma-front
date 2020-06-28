import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {Nav, TabContent, TabPane, CardHeader, NavItem, CardBody} from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../helpers/IntlMessages";
import ApplicationMenu from "../../components/common/ApplicationMenu";
import StateButton from "../../components/StateButton";

import UserAvatar from 'react-user-avatar'
import {chatAvatar} from "../../constants/ChatAvatar";

class ChatApplicationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ""
    };

    console.log('user is', this.props.user)
  }
  toggleAppMenu = tab => {
    if (this.props.activeTab !== tab) {
      this.props.toggleAppMenu(tab)
    }
    if (tab === "messages") {
      this.handleSearchContact("");
    }
  };

  handleSearchContact = keyword => {

  };



  render() {
    const { messages } = this.props.intl;

    return (
      <ApplicationMenu>
        <CardHeader className="pl-0 pr-0">
          <Nav tabs className="card-header-tabs ml-0 mr-0">
            <NavItem className="w-30 text-center">
              <NavLink
                className={classnames({
                  active: this.props.activeTab === "messages",
                  "nav-link": true
                })}
                onClick={(e) => {
                  e.preventDefault()
                  this.toggleAppMenu("messages");
                }}
                to="#"
              >
                <IntlMessages id="chat.messages" />
              </NavLink>
            </NavItem>
            <NavItem className="w-30 text-center">
              <NavLink
                className={classnames({
                  active: this.props.activeTab === "contacts",
                  "nav-link": true
                })}
                onClick={(e) => {
                  e.preventDefault()
                  this.toggleAppMenu("contacts");
                }}
                to="#"
              >
                <IntlMessages id="chat.contacts" />
              </NavLink>
            </NavItem>
            <NavItem className="w-30 text-center">
              <NavLink
                  className={classnames({
                    active: this.props.activeTab === "groups",
                    "nav-link": true
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    this.toggleAppMenu("groups");
                  }}
                  to="#"
              >
                <IntlMessages id="chat.groups" />
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>

        <div className="pt-4 pr-4 pl-4 pb-0">
          <div className="form-group">
            <input
              type="text"
              className="form-control rounded"
              placeholder={messages["menu.search"]}
              value={this.state.searchKey}
              onChange={e => this.handleSearchContact(e.target.value)}
            />
          </div>
        </div>

        <TabContent
          activeTab={this.props.activeTab}
          className="chat-app-tab-content"
        >
          <TabPane tabId="messages" className="chat-app-tab-pane">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >

            <div className="pt-2 pr-4 pl-4 pb-2">

              {
                    this.props.roomlist.filter(room => room.members.includes(this.props.user._id)).map((chat, index) => {
                      const friend = chat.members.filter(member => member !== this.props.user._id)[0]
                      const chatUser = this.props.friendlist.filter(x => x._id === friend )[0]
                  return (
                      <div
                          key={index}
                          className="d-flex flex-row mb-3 border-bottom pb-3"
                      >
                        <NavLink
                            className="d-flex"
                            to="#"
                            onClick={(e)=> {
                              e.preventDefault()
                              this.props.openRoom(chat)
                            }}
                        >
                          <UserAvatar size="48" src={chatUser.avatar} name={`${chatUser.firstName} ${chatUser.lastName}`}
                          colors={chatAvatar.colors}
                          />

                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <p className="mb-0 truncate">
                                  {chatUser ?
                                      <span>{chatUser.firstName} {chatUser.lastName}</span> : null}
                                </p>
                                <div className="">
                                  <small className={'col-md-8 pl-0'}>{chat.messageList.length ? chat.messageList[chat.messageList.length-1].text : null}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                  );
                }) }
            </div>
            </PerfectScrollbar>
          </TabPane>

          <TabPane tabId="contacts" className="chat-app-tab-pane">
            <PerfectScrollbar
                option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <div className="pt-2 pr-4 pl-4 pb-2">
                {
                  this.props.friendlist.filter(x => x._id !== this.props.user._id).map((friend, index) => {
                    return (
                        <div
                            key={index}
                            className="d-flex flex-row mb-3 border-bottom pb-3"
                        >
                          <NavLink
                              className="d-flex"
                              to="#"
                              onClick={(e)=> {
                                e.preventDefault()
                                this.props.chatChoise(friend)
                              }}>
                            <UserAvatar
                                className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                                size="48" src={friend.avatar} name={`${friend.firstName} ${friend.lastName}`}
                                        colors={chatAvatar.colors}
                            />


                            <div className="d-flex flex-grow-1 min-width-zero">
                              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div className="min-width-zero">
                                  <p className="mb-0 truncate">{friend.firstName} {friend.lastName}</p>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                    );
                  })}
              </div>
            </PerfectScrollbar>
          </TabPane>

          <TabPane tabId="groups" className="chat-app-tab-pane">
            <PerfectScrollbar option={{ suppressScrollX: true, wheelPropagation: false }}>
              <div
                  className="d-flex justify-content-center">
                <StateButton
                    id="successButton"
                    color="success"
                    className="mb-3"
                    onClick={this.handleSuccessButtonClick}
                >
                  <IntlMessages id="chat.new" />
                </StateButton>
              </div>
              <div className="pt-2 pr-4 pl-4 pb-2">
                {
                  this.props.roomlist.filter(room => room.type === 'project').map((chat, index) => {
                    return (
                        <div
                            key={index}
                            className="d-flex flex-row mb-3 border-bottom pb-3"
                        >
                          <NavLink
                              className="d-flex"
                              to="#"
                              onClick={(e)=> {
                                e.preventDefault()
                                this.props.chatChoise(chat._id)
                              }}
                          >
                            <img
                                alt={''}
                                src={"/assets/img/profile-pic-l-11.jpg"}
                                className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                            />
                            <div className="d-flex flex-grow-1 min-width-zero">
                              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div className="min-width-zero">
                                  <p className="mb-0 truncate">
                                    <span>chat {index}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                    );
                  }) }


              </div>

            </PerfectScrollbar>
          </TabPane>

        </TabContent>
      </ApplicationMenu>
    );
  }
}

export default injectIntl(ChatApplicationMenu);

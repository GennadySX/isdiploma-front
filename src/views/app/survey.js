import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {
    Row,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    Collapse,
} from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import {Colxx, Separator} from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";



import SurveyListItem from "../../components/applications/SurveyListItem";
import AddNewSurveyModal from "../../containers/applications/AddNewSurveyModal";
import SurveyApplicationMenu from "../../containers/applications/SurveyApplicationMenu";

class SurveyApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            modalOpen: false,
            lastChecked: null,
            title: "",
            label: {},
            category: {},
            status: "ACTIVE",
            displayOptionsIsOpen: false,
            projectList: null,
            userList: null
        };
        this.getProjects()

    }

    componentDidMount() {

        this.userListGet()
    }


    getProjects() {
        this.props.client.on('getProjectList', (projects) => {
            this.setState({projectList: projects.data})
            console.log('project list ', projects)
        })
        this.props.client.emit('emit_getProjectList');
    }


    createProject(new_project) {

        this.props.client.on('createProject', (project) => {
            console.log('new project', project)
            window.location.reload()
        })
        this.props.client.emit('emit_createProject', new_project);
    }


    userListGet() {
        this.props.client.on('friendList', friends => {
            this.setState({
                userList: friends.data
            }, () => {
            })
        })
        this.props.client.emit('getFriendList')

    }


    toggleDisplayOptions = () => {
        this.setState({displayOptionsIsOpen: !this.state.displayOptionsIsOpen});
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    };

    handleKeyPress = e => {
        if (e.key === "Enter") {
            this.props.getSurveyListSearch(e.target.value);
        }
    };

    handleCheckChange = (event, id) => {
        if (this.state.lastChecked == null) {
            this.setState({
                lastChecked: id
            });
        }

        let selectedItems = Object.assign(
            [],
            this.props.surveyListApp.selectedItems
        );
        if (selectedItems.includes(id)) {
            selectedItems = selectedItems.filter(x => x !== id);
        } else {
            selectedItems.push(id);
        }
        this.props.selectedSurveyItemsChange(selectedItems);

        if (event.shiftKey) {
            var items = this.props.surveyListApp.surveyItems;
            var start = this.getIndex(id, items, "id");
            var end = this.getIndex(this.state.lastChecked, items, "id");
            items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
            selectedItems.push(
                ...items.map(item => {
                    return item.id;
                })
            );
            selectedItems = Array.from(new Set(selectedItems));
            this.props.selectedSurveyItemsChange(selectedItems);
        }
        return;
    };
    handleChangeSelectAll = () => {
        if (this.props.surveyListApp.loading) {
            if (
                this.props.surveyListApp.selectedItems.length >=
                this.props.surveyListApp.surveyItems.length
            ) {
                this.props.selectedSurveyItemsChange([]);
            } else {
                this.props.selectedSurveyItemsChange(
                    this.props.surveyListApp.surveyItems.map(x => x.id)
                );
            }
        }
    };

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }

    render() {
        const {messages} = this.props.intl;
        const {modalOpen} = this.state;
        return (
            <Fragment>
                <Row className="app-row survey-app">
                    <Colxx xxs="12">
                        <div className="mb-2">
                            <h1>
                                <IntlMessages id="menu.survey"/>
                            </h1>


                            <Breadcrumb match={this.props.match}/>

                            <div className="float-sm-right pt-5">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="mr-1"
                                    onClick={this.toggleModal}>
                                    <IntlMessages id="survey.add-new"/>
                                </Button>
                            </div>
                        </div>
                        <div className="mb-2">
                            <Button
                                color="empty"
                                id="displayOptions"
                                className="pt-0 pl-0 d-inline-block d-md-none"
                                onClick={this.toggleDisplayOptions}
                            >
                                <IntlMessages id="survey.display-options"/>{" "}
                                <i className="simple-icon-arrow-down align-middle"/>
                            </Button>

                            <Collapse
                                className="d-md-block"
                                isOpen={this.state.displayOptionsIsOpen}
                            >
                                <div className="d-block mb-2 d-md-inline-block">
                                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                        <DropdownToggle caret color="outline-dark" size="xs">
                                            <IntlMessages id="survey.orderby"/>
                                        </DropdownToggle>
                                    </UncontrolledDropdown>
                                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                        <input
                                            type="text"
                                            name="keyword"
                                            id="search"
                                            placeholder={messages["menu.search"]}
                                            defaultValue={null}
                                            onKeyPress={e => this.handleKeyPress(e)}
                                        />
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <Separator className="mb-5"/>
                        <Row>
                            { this.state.projectList ? (
                                this.state.projectList.map((project, index) => {
                                    return (
                                        <SurveyListItem
                                            key={`todo_item_${index}`}
                                            item={project}
                                            handleCheckChange={this.handleCheckChange}
                                            isSelected={ false}
                                        />
                                    );
                                })
                            ) : (
                                <div className="loading"/>
                            )}
                        </Row>
                    </Colxx>
                </Row>

                <SurveyApplicationMenu/>
                {this.state.userList &&
                <AddNewSurveyModal
                    userList={this.state.userList}
                    toggleModal={this.toggleModal}
                    modalOpen={modalOpen}
                    onCreate={(project) => this.createProject(project)}
                />}


            </Fragment>
        );
    }
}


export default injectIntl(
    connect()(SurveyApp)
);

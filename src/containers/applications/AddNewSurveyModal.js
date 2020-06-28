import React, {Component} from "react";
import {connect} from "react-redux";
import {
    CustomInput,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

import UserCard from "../../components/UserCard";

import PerfectScrollbar from "react-perfect-scrollbar";

class AddNewSurveyModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            label: {},
            labelColor: "",
            category: {},
            name: 'New Project 1',
            avatar: '',
            description: 'description project s',
            executors: [],
            creator: JSON.parse(localStorage.getItem('user'))._id,
            user: null,
            modalRight: false,
            userList: this.props.userList,
            fullList:this.props.userList
        };
    }

    addNetItem = () => {
        const newItem = {
            title: this.state.title,
            label: this.state.label.value,
            labelColor: this.state.label.color,
            category: this.state.category.value,
            status: this.state.status
        };
        this.props.toggleModal();
        this.setState({
            title: "",
            label: {},
            category: {},
            status: "ACTIVE"
        });
    };

    clear() {
        this.setState({executors: null, userList: this.state.fullList}, () => {
            console.log('cleared', this.state)
        })

    }


    render() {
        const {modalOpen, toggleModal} = this.props;
        return (
            <Modal
                isOpen={modalOpen}
                toggle={toggleModal}
                wrapClassName="modal-right"
                backdrop="static"
            >
                <ModalHeader
                    style={{height: 67}}
                    toggle={toggleModal}>
                    <IntlMessages id="project.add-new-title"/>
                </ModalHeader>
                <ModalBody>
                    <Label className="mt-4">
                        <IntlMessages id="project.title"/>
                    </Label>
                    <Input
                        type="text"
                        defaultValue={this.state.name}
                        onChange={event => {
                            this.setState({name: event.target.value});
                        }}
                    />
                    <Label className="mt-4">
                        <IntlMessages id="project.description"/>
                    </Label>
                    <Input
                        type="text"
                        defaultValue={this.state.description}
                        onChange={event => {
                            this.setState({description: event.target.value});
                        }}
                    />

                    <br/>
                    <br/>
                    <Button color="primary" outline onClick={() => this.setState({modalRight: true})}>
                        Добавить пользователи
                    </Button>


                    <Modal
                        isOpen={this.state.modalRight}
                        toggle={toggleModal}
                        wrapClassName="modal-right"
                        backdrop="static"
                    >
                        <ModalHeader
                            className={'mb-2'}
                            style={{height: 67}}
                            toggle={() => this.setState({modalRight: false})}>
                            Добавить пользователей
                        </ModalHeader>
                        <ModalBody>
                              {this.state.userList &&
                              this.state.userList.map((user, index) =>
                              <UserCard user={user}
                                onClick={(userx) => {
                                  console.log('user selected ', userx)
                                    let userList =this.state.userList.filter(u => u._id !== userx._id);
                                    if (userList.length > 0) {
                                        this.setState({
                                            userList: userList,
                                            executors: [...this.state.executors, userx._id]
                                        })
                                    } else {
                                        this.setState({modalRight: false})
                                    }
                                }}
                              />
                              )
                              }
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>


                    <Button color="secondary" outline onClick={ (e) => {
                        toggleModal(e);
                        this.clear()}}>
                        <IntlMessages id="project.cancel-btn"/>
                    </Button>
                    <Button color="primary" onClick={() => {
                        this.props.onCreate(this.state)
                        this.clear()}}>
                        <IntlMessages id="project.create-btn"/>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = ({surveyListApp}) => {
    return {
        surveyListApp
    };
};
export default connect(
    mapStateToProps,
    { }
)(AddNewSurveyModal);

/**
 * Created by GennadySX on @2020
 */


import React, {Fragment} from 'react'
import IntlMessages from "../../helpers/IntlMessages";
import {
    Button,
    ButtonDropdown,
    Collapse,
    CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, Row,
    UncontrolledDropdown
} from "reactstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import {Colxx, Separator} from "../common/CustomBootstrap";
import UserAvatar from 'react-user-avatar'
import '../../styles/taksHeader.sass'
export default class TaskHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownSplitOpen: ''
        }
    }


    componentDidMount() {
    }


    toggleModal() {
    }

    toggleSplit() {
    }

    render() {
        return (
            <>
                <Colxx xxs="12 task-page">
                    <div className="mb-2">
                        <h1>
                            <IntlMessages id="menu.survey"/>
                        </h1>
                        <div className="float-sm-right d-flex align-items-center executors-top">
                            <span className="mr-4 " style={{fontSize: 17, fontWeight: 'bold'}}>Испольнители: </span>
                            <div className="  d-flex">
                                <UserAvatar size="48" name="Will Binns-Smith" />
                                <UserAvatar size="48" name="Will Binns-Smith" src="https://pbs.twimg.com/profile_images/429442426038538240/6Ac9kykG_400x400.jpeg" />
                                <UserAvatar size="48" name="John Doe" colors={['#ccc', '#fafafa', '#ccaabb']}/>
                                <UserAvatar size="48" name="Mary Ann Gilligans" />
                                <UserAvatar size="48" name="Jane Doe"  />
                                <UserAvatar size="48" name="Madonna" />
                            </div>
                        </div>
                        <Breadcrumb match={this.props.match}/>
                    </div>
                    <Separator className="mb-5"/>
                </Colxx>

            </>
        )
    }
}
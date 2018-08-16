import React, { Component } from "react";
import "./business.css"

//components
import AddBusiness from "../add-business/AddBusiness";
import { MdBusiness } from "react-icons/md";
import { MdCreate } from "react-icons/md";

class Business extends Component {
    state={
        addBusiness : false
    }

    toggleShowAdd = () => {
        this.setState({addBusiness : !this.state.addBusiness})
    }

    render() {
        return (
            <div>
                <ul className="collapsible popout">
                    <li>
                        <div className="collapsible-header"><MdBusiness/>Business Name</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><MdBusiness/>Business Name</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><MdBusiness/>Business Name</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                </ul>
                <AddBusiness showBox = {this.state.addBusiness}/>
                <a onClick={this.toggleShowAdd} className="btn-floating btn-large waves-effect waves-light red" style={{position:"fixed", bottom:"50px", right:"50px"}}><MdCreate /></a>

            </div>
        )
    }
}

export default Business;
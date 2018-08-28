import React, { Component } from "react";
import "./business.css"

//components
import AddBusiness from "../add-business/AddBusiness";
import { MdBusiness } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdClose } from "react-icons/md";
import API from "../../API/api";

class Business extends Component {
    state = {
        addBusiness: false,
        businesses: [],
        name: "",
        address1: "",
        address2: "",
        phone1: "",
        phone2: "",
        city: "",
        state: 0,
        zip: "",
        email: "",

    }

    componentDidMount = () => {
        this.getBisnesses()
    }

    toggleShowAdd = () => {
        this.setState({ addBusiness: !this.state.addBusiness })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitNewBusiness = () => {
        console.log(this.state)
        if (this.state.name) {
            let newBusiness = {
                name: this.state.name,
                address1: this.state.address1,
                address2: this.state.address2,
                phone1: this.state.phone1,
                phone2: this.state.phone2,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                email: this.state.email,
            }
            API.addBusiness(newBusiness)
                .then(() => {
                    // console.log(businesses.data)
                    this.setState({
                        name: "",
                        address1: "",
                        address2: "",
                        phone1: "",
                        phone2: "",
                        city: "",
                        state: 0,
                        zip: "",
                        email: "",
                    });
                    this.getBisnesses();
                })

        }
    }

    cancelBusiness = () => {
        this.setState({
            addBusiness: false,
            name: "",
            address1: "",
            address2: "",
            phone1: "",
            phone2: "",
            city: "",
            state: 0,
            zip: "",
            email: "",
        })
    }

    getBisnesses = () => {
        API.getAllBusinesses()
            .then((businesses) => {
                // console.log(businesses)
                this.setState({
                    businesses: businesses.data
                })
            })
    }

    render() {
        return (
            <div>
                <ul className="collapsible popout">
                    {this.state.businesses.length ?
                        this.state.businesses.map((business) => {
                            return (
                                <li key={business.id} className="left-align">
                                    <div className="collapsible-header" style={{fontWeight:"bold"}}><MdBusiness style={{transform:"translateY(-5px)"}} />Business: {business.name}</div>
                                    <div className="collapsible-body">
                                        <p>Address1: {business.address1||"N/A"} || Address2: {business.address2||"N/A"}</p>
                                        <p>City: {business.city||"N/A"}, State: {business.state||"N/A"}, ZIP: {business.zip||"N/A"}</p>
                                        <p>Phone1: {business.phone1||"N/A"} || Phone2: {business.phone2||"N/A"}</p>
                                        <p>Email: {business.email || "N/A"}</p>
                                    </div>
                                </li>
                            )
                        })
                        : 
                        <li>Add New Businesses</li>
                        }


                </ul>
                <AddBusiness
                    showBox={this.state.addBusiness}
                    changeHandler={this.onChangeHandler}
                    acceptHandler={this.submitNewBusiness}
                    cancel={this.cancelBusiness}
                    {...this.state} />
                <a
                    onClick={this.toggleShowAdd}
                    className="btn-floating btn-large waves-effect waves-light green"
                    style={{ position: "fixed", bottom: "50px", right: "50px" }}>{this.state.addBusiness ? <MdClose /> : <MdCreate />}</a>

            </div>
        )
    }
}

export default Business;
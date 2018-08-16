import React from "react";
import states from "../../API/states.json"
import { MdDone } from "react-icons/md";
import { MdClose } from "react-icons/md"


const AddBusiness = (props) => {
    return (

        <div className={props.showBox ? "add-business row z-depth-2" : "add-business row z-depth-2 shrink"}>
            <div className="input-field col s12">
                <input id="business-name" type="text" className="validate" />
                <label htmlFor="business-name">Business Name</label>
            </div>
            <div className="input-field col s6">
                <input id="address1" type="text" className="validate" />
                <label htmlFor="address1">Address 1</label>
            </div>
            <div className="input-field col s6">
                <input id="address2" type="text" className="validate" />
                <label htmlFor="address2">Address 2</label>
            </div>
            <div className="input-field col s4">
                <input id="city" type="text" className="validate" />
                <label htmlFor="city">City</label>
            </div>
            {/* <div className="input-field col s4">
                <input id="state" type="text" className="validate" />
                <label htmlFor="state">State</label>
            </div> */}
            <div className="input-field col s4">
                <select defaultValue="0">
                    <option value="0" disabled>State</option>
                    {
                        states.map((state) => {
                            return (
                                <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            )
                        })
                    }
                </select>
                {/* <label>State</label> */}
            </div>
            <div className="input-field col s4">
                <input id="zip" type="number" className="validate" />
                <label htmlFor="zip">ZIP</label>
            </div>
            <div className="input-field col s6">
                <input id="phone1" type="text" className="validate" />
                <label htmlFor="phone1">Phone 1</label>
            </div>
            <div className="input-field col s6">
                <input id="phone2" type="text" className="validate" />
                <label htmlFor="phone2">Phone 2</label>
            </div>
            <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="buttons">
                <span id="mdDone"><MdDone /></span><span id="mdClose"><MdClose /></span>
            </div>

        </div>
    )
}

export default AddBusiness;
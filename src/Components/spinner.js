import { Component } from "react";
import spinner from"./Spinner-2.gif"
export default class Spinner extends Component{
    render(){
        return(
            <div className="text-center">
                <img src={spinner} alt="spinner" />
            </div>
        )
    }
}
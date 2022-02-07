import React from "react";

class FormattedDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    render() {
        return (<span>{this.format(this.state.value)}</span >)
    }

    format(date) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let dt_obj = new Date(date);
        return days[dt_obj.getDay()] + " " +
            months[dt_obj.getMonth()] + "-" +
            dt_obj.getDate() + "-" + dt_obj.getFullYear();
    }
}

export default FormattedDate;
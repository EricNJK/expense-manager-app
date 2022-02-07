import React from "react";

class FormattedMoney extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            value: p.value
        }
    }

    render() {
        return (<span>{parseFloat(this.state.value).toFixed(2)}</span>);
    }
}

export default FormattedMoney;
import React from "react";

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textbox_url: "",
            url_list: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ textbox_url: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.textbox_url !== "") {
            this.props.onSubmit(this.state.textbox_url);
        }
        event.preventDefault();
    }
    render() {
        return (
            <form
                className="row justify-content-center align-items-center my-1"
                onSubmit={this.handleSubmit}
            >
                <div className="col-8">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={this.state.textbox_url}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="col-4">
                    <button type="submit" className="btn btn-sm btn-primary">
                        Add
                    </button>
                </div>
            </form>
        );
    }
}

export { InputBox };

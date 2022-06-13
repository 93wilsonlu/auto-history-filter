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
    handleSubmit() {
        this.props.onSubmit(this.state.textbox_url);
        this.setState({ textbox_url: "" });
    }
    render() {
        return (
            <div class="d-flex justify-content-between my-1">
                <input
                    type="url"
                    name="url"
                    id="url"
                    value={this.state.textbox_url}
                    onChange={this.handleChange}
                />
                <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    id="add-button"
                    onClick={this.handleSubmit}
                >
                    Add
                </button>
            </div>
        );
    }
}

export { InputBox };

import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item d-flex justify-content-between py-1">
                <div className="text-break">{this.props.item.url}</div>
                <button
                    className="btn btn-sm"
                    onClick={() => this.props.handleDelete(this.props.item.id)}
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
            </li>
        );
    }
}

export { ListItem };

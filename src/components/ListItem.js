import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item d-flex justify-content-between py-1">
                {this.props.item.url}
                <button className="btn btn-sm" onClick={() => this.props.handleDelete(this.props.item.id)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </li>
        );
    }
}

export { ListItem };

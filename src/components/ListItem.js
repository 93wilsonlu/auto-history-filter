import { icons } from "./icons";
import React from "react";

class ListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item d-flex">
                {this.props.url}
                {icons.trash}
            </li>
        );
    }
}

export { ListItem };

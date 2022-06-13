import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <ul id="filter-list" class="list-group list-group-flush">
                {this.props.url_list.map((url) => (
                    <ListItem url={url} />
                ))}
            </ul>
        );
    }
}

export { List };

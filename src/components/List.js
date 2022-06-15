import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <ul id="filter-list" className="list-group list-group-flush mb-2">
                {this.props.url_list.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        handleDelete={this.props.handleDelete}
                    />
                ))}
            </ul>
        );
    }
}

export { List };

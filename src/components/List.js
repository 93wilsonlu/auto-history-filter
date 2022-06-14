import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <div className="row">
                <ul id="filter-list" className="list-group list-group-flush">
                    {this.props.url_list.map((item) => (
                        <ListItem key={item.id} item={item} handleDelete={this.props.handleDelete} />
                    ))}
                </ul>
            </div>
        );
    }
}

export { List };

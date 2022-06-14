import React from "react";
import { ListItem } from "./ListItem";

class List extends React.Component {
    render() {
        return (
            <div className="row my-1">
                <div className="col-12">
                    <ul
                        id="filter-list"
                        className="list-group list-group-flush"
                    >
                        {this.props.url_list.map((item) => (
                            <ListItem
                                key={item.id}
                                item={item}
                                handleDelete={this.props.handleDelete}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export { List };

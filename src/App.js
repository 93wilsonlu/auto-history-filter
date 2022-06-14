import "./App.css";
import React from "react";
import { List } from "./components/List";
import { InputBox } from "./components/InputBox";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            url_list: [],
        };
        this.addURL = this.addURL.bind(this);
        this.deleteURL = this.deleteURL.bind(this);
    }
    addURL(url) {
        this.setState({
            url_list: [...this.state.url_list, { id: +new Date(), url: url }],
        });
    }
    deleteURL(id) {
        this.setState({
            url_list: this.state.url_list.filter((item) => item.id !== id),
        });
    }
    render() {
        return (
            <div className="container mt-1">
                <div className="row">
                    <h1>Auto History Filter</h1>
                </div>
                <InputBox onSubmit={this.addURL} />
                <List
                    url_list={this.state.url_list}
                    handleDelete={this.deleteURL}
                />
            </div>
        );
    }
}

export default App;

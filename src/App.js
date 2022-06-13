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
    }
    addURL(url) {
        this.setState({
            url_list: [...this.state.url_list, url],
        });
    }
    render() {
        return (
            <div>
                <h1>Auto History Filter</h1>
                <InputBox onSubmit={this.addURL} />
                <List url_list={this.state.url_list} />
            </div>
        );
    }
}

export default App;

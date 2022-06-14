/*global chrome*/
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
    async componentDidMount() {
        const result = await chrome.storage.sync.get(["url_list"]);
        this.setState({ url_list: result.url_list || [] });
    }
    async addURL(url) {
        let new_url_list = [
            ...this.state.url_list,
            { id: +new Date(), url: url },
        ];
        this.setState({
            url_list: new_url_list,
        });
        chrome.storage.sync.set({ url_list: new_url_list }, () => {
            console.log("Added");
        });
    }
    async deleteURL(id) {
        let new_url_list = this.state.url_list.filter((item) => item.id !== id);
        this.setState({
            url_list: new_url_list,
        });
        chrome.storage.sync.set({ url_list: new_url_list }, () => {
            console.log("Deleted");
        });
    }
    render() {
        return (
            <div className="container mt-2">
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

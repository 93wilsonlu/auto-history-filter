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
            auto_filter_on: false,
        };
        this.addURL = this.addURL.bind(this);
        this.deleteURL = this.deleteURL.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        chrome.storage.sync.get(["url_list", "auto_filter_on"], (obj) => {
            this.setState({
                url_list: obj.url_list || [],
                auto_filter_on: obj.auto_filter_on || false,
            });
        });
    }
    addURL(url) {
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }
        let new_url_list = [
            ...this.state.url_list,
            { id: +new Date(), url: url },
        ];
        this.setState({
            url_list: new_url_list,
        });
        chrome.storage.sync.set({ url_list: new_url_list }, () => {
            console.log("Added url");
        });
    }
    deleteURL(id) {
        let new_url_list = this.state.url_list.filter((item) => item.id !== id);
        this.setState({
            url_list: new_url_list,
        });
        chrome.storage.sync.set({ url_list: new_url_list }, () => {
            console.log("Deleted url");
        });
    }
    handleSwitch(event) {
        let auto_filter_on = event.target.checked;
        this.setState({
            auto_filter_on: auto_filter_on,
        });
        chrome.storage.sync.set({ auto_filter_on: auto_filter_on }, () => {
            chrome.runtime.sendMessage({
                message: auto_filter_on ? "AUTO_FILTER_ON" : "AUTO_FILTER_OFF",
            });
        });
    }
    render() {
        return (
            <div className="container my-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h2>Auto History Filter</h2>
                </div>
                <InputBox onSubmit={this.addURL} />
                <List
                    url_list={this.state.url_list}
                    handleDelete={this.deleteURL}
                />
                <div class="form-check form-switch mb-1">
                    <label class="form-check-label text-sm" for="auto-filter">
                        Auto refresh
                    </label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="auto-filter"
                        checked={this.state.auto_filter_on}
                        onChange={this.handleSwitch}
                    />
                </div>
            </div>
        );
    }
}

export default App;

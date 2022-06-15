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
            is_refreshing: false,
        };
        this.addURL = this.addURL.bind(this);
        this.deleteURL = this.deleteURL.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
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
    handleRefresh() {
        chrome.runtime.sendMessage({ message: "FILTER_ALL" });
        this.setState({ is_refreshing: true });
        setTimeout(() => {
            this.setState({ is_refreshing: false });
        }, 2000);
    }
    render() {
        let refresh_icon = this.state.is_refreshing ? (
            <i
                className="bi bi-check text-success"
                onClick={this.handleRefresh}
                style={{ cursor: "pointer" }}
            ></i>
        ) : (
            <i
                className="bi bi-arrow-clockwise"
                onClick={this.handleRefresh}
                style={{ cursor: "pointer" }}
            ></i>
        );
        return (
            <div className="container my-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <h2>Auto History Filter</h2>
                </div>
                <InputBox onSubmit={this.addURL} />
                <List
                    url_list={this.state.url_list}
                    handleDelete={this.deleteURL}
                />{" "}
                <div className="d-flex justify-content-evenly align-items-center mb-1">
                    {refresh_icon}
                    <div class="form-check form-switch">
                        <label
                            class="form-check-label text-sm"
                            for="auto-filter"
                        >
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
                    <a
                        href="https://github.com/93wilsonlu/auto-history-filter"
                        class="text-decoration"
                    >
                        Github
                    </a>
                </div>
            </div>
        );
    }
}

export default App;

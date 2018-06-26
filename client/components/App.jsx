import React, { Component } from 'react';
import List from './List';
const fetch = require('node-fetch');

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
		};
	}

	fetchData() {
		fetch('http://localhost:1234/get_tasks')
		.then(res => res.json())
    	.then((data) => {
    		this.setState( {tasks: data.result} );
		})
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<div>
				<h1 className="rainbow-text">¯\_(ツ)_/¯|$|Todoer|$|¯\_(ツ)_/¯</h1>
				<h5>EgorAlmikeev</h5>
				<div>
					<button onClick={this.resetData}>Reset</button>
					<input id="input" type="text" placeholder="New task"></input>
					<button onClick={this.sendData}>Send</button>
				</div>
				<List elements={this.state.tasks}/>
			</div>
		)
	}

	sendData = () => {
		let text = document.getElementById("input").value;
		console.log(text);
		if (!text) {
			alert("Nothing to send");
		}
		else {
			fetch("http://localhost:1234/add_task/" + text)
			.then( this.fetchData() );
		}
	}

	resetData = () => {
		fetch("http://localhost:1234/reset")
			.then( this.fetchData() );
	}
}
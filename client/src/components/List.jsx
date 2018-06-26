import React from 'react';

export default function List({elements}) {
	const reactElements = elements.map(element => <li>{element}</li>);
	return (
		<ul>{reactElements}</ul>
	)
}
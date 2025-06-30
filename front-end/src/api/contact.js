fetch('localhost:3000/', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
}).then((response) => {
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}).then((data) => {
	console.log(data);
}).catch((error) => {
	console.error('There was a problem with the fetch operation:', error);
});
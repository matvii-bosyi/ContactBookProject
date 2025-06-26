function getContact() {
	return fetch('http://localhost:3000/68595b1a222a47573a58b98')
		.then(response => response.json())
		.then(data => data)
		.catch(error => console.error('Contact not found'));
}

getContact().then(contact => {
	console.log('Contact fetched successfully:', contact);
})
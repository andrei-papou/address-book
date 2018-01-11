export const mockFetch = data => {
	global.fetch = () => Promise.resolve(data);
}

export const mockFetchFail = error => {
	global.fetch = () => Promise.reject(error);
}

'use strict';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const query = {
			audible: true
		}

		queryTabs(query).then(tabs => {
			return tabs[0];
		}).then(getSongName)

		chrome.runtime.onMessage.addListener(songDataMessageListener);
	});

	function songDataMessageListener(request, sender, sendResponse) {
		if (request.type && request.type === 'SongAdder') {
			chrome.tabs.create({
				url: encodeURI(`https://soundcloud.com/search?q=${request.title} ${request.artist}`)
			});
		}
	}

	function queryTabs(query) {
		return new Promise((resolve, reject) => {
			chrome.tabs.query(query, resolve);
		});
	}

	function getSongName(tab) {
		chrome.tabs.executeScript(tab.id, {file: 'scripts/content.js'});	
	}
	
})();
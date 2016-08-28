'use strict';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const query = {
			audible: true
		}

		queryTabs(query).then(tabs => {
			return tabs[0];
		}).then(getSongName)
	});

	function queryTabs(query) {
		return new Promise((resolve, reject) => {
			chrome.tabs.query(query, resolve);
		});
	}

	function getSongName(tab) {
		chrome.tabs.executeScript(tab.id, {file: 'scripts/content.js'});	
	}
	
})();
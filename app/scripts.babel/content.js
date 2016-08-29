// TODO: extract to different file
const MixCloudParser = {
	parse() {
		let data = {};

		const players = document.getElementsByClassName('player-current-audio');
		if (players.length == 0) {
			return data;
		}

		const player = players[0];

		const titleElems = player.getElementsByClassName('current-track');
		if (titleElems.length > 0) {
			const titleText = titleElems[0].innerText;
			if (titleText.length > 0) {
				data.title = titleText;
			}
		}

		const artistContainer = player.getElementsByClassName('current-artist');
		const artistElems = (artistContainer.length) ? artistContainer[0].getElementsByTagName('span') : undefined;
		if (artistElems.length) {
			const artistText = artistElems[0].innerText;
			if (artistText.length > 0) {
				data.artist = artistText;
			}
		}

		return data;
	}
};

// TODO: extract to different file
const UnsupportedPageParser = {
	parse() {
		throw new Error('Cannot parse, unsupported page.');
	}
};



(() => {
	const hostName = parseHost(document.location.hostname);	

	try {
		const data = parserFactory(hostName).parse();
		if (data.title) {
			chrome.runtime.sendMessage(Object.assign(data, {type: 'Unison'}));
		}
	} catch (e) {
		// unsupported page, don't send a message
	}
	

	function parserFactory(hostname) {
		switch (hostname) {
			case 'mixcloud':
				return Object.create(MixCloudParser);
			default:
				return Object.create(UnsupportedPageParser);
		}
	}

	function parseHost(hostname) {
		const segments = hostname.split('.');

		for (let i = 1; i < segments.length; i++) {
			if (segments[i - 1].toLowerCase() === 'mixcloud' && segments[i] === 'com') {
				return 'mixcloud';
			}
		}
	}

})();




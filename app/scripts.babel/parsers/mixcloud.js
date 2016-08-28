const MixCloudParser = {
	parse() {
		let data = {};

		const player = document.getElementsByClassName('player-current-audio');
		if (player.length == 0) {
			return data;
		}

		const titleElems = player.getElementsByClassName('current-track');
		if (titleElems.length > 0) {
			data.title = titleElems[0].innerText;
		}

		const artistContainer = player.getElementsByClassName('current-artist');
		const artistElems = (artistContainer.length) ? artistContainer.getElementsByTagName('span') : undefined;
		if (artistElems.length) {
			data.artist = artistElems[0];
		}

		return data;
	}
};

class Chromecast {

	constructor() {
		this.init = this.init.bind(this);
	}

	// default event listeners
	onConnect() { console.log('cast connected') }
	onDisconnect() { console.log('cast disconnected') }

	addEventListener(event, callback) {
		switch (event) {
			case 'connect': this.onConnect = callback; break;
			case 'disconnect': this.onDisconnect = callback; break;
		}
	}

	init(isAvailable) {
		if (isAvailable) {
			console.log('initializing Chromecast');
			cast.framework.CastContext.getInstance().setOptions({
				receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
			});
			// set class variables
			this.player = new cast.framework.RemotePlayer();
			this.playerController = new cast.framework.RemotePlayerController(this.player);

			// add event listeners
			this.playerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, (event) => {
				if (event.value) {
					// if the event value is true, we have connected
					this.onConnect();
				} else {
					// else we have disconnected
					this.onDisconnect();
				}
			});
		}
	}

	requestSession() {
		cast.framework.CastContext.getInstance().requestSession()
		.then(err => {console.log(err)});
	}

	cast(mediaURL) {
		console.log('Loading media');
		var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, 'video/mp4');
		var request = new chrome.cast.media.LoadRequest(mediaInfo);
		cast.framework.CastContext.getInstance().getCurrentSession().loadMedia(request)
		.then(function() { console.log('Load succeed') }, function(err) { console.log(err) });
	}
}

export default new Chromecast();
class Chromecast {

	constructor() {
		this.init = this.init.bind(this);
		this.addEventListener = this.addEventListener.bind(this);
		this.mediaLoaded = this.mediaLoaded.bind(this);
		this.requestSession = this.requestSession.bind(this);
		this.loadMedia = this.loadMedia.bind(this);
		this.cast = this.cast.bind(this);
		this.playOrPause = this.playOrPause.bind(this);

		// default values
		this.duration = 0;

		// bind init to GCast available
		window['__onGCastApiAvailable'] = this.init;
	}

	// default event listeners
	onConnect() { console.log('cast connected') }
	onDisconnect() { console.log('cast disconnected') }
	onPause() { console.log('cast paused') }
	onPlay() { console.log('cast play') }
	onTimeUpdate() {}

	addEventListener(event, callback) {
		switch (event) {
			case 'connect': this.onConnect = (name) => callback(name); break;
			case 'disconnect': this.onDisconnect = callback; break;
			case 'pause': this.onPause = callback; break;
			case 'play': this.onPlay = callback; break;
			case 'timeUpdate': this.onTimeUpdate = callback; break;
		}
	}

	init(isAvailable) {
		window.setTimeout(() => { // init function in a timeout due to race condition
			// see https://code.google.com/p/google-cast-sdk/issues/detail?id=1072
			if (isAvailable) {
				console.log('initializing Chromecast');
				cast.framework.CastContext.getInstance().setOptions({
					autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
					receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
				});

				// set class variables
				this.player = new cast.framework.RemotePlayer();
				this.playerController = new cast.framework.RemotePlayerController(this.player);

				// add event listeners
				this.playerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, (event) => {
					if (event.value) {
						// if the event value is true, we have connected
						this.onConnect(cast.framework.CastContext.getInstance().getCurrentSession().getSessionObj().receiver.friendlyName);
					} else {
						// else we have disconnected
						this.onDisconnect();
					}
				});

				this.playerController.addEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED, (event) => {
					if (event.value === chrome.cast.media.PlayerState.PAUSED) {
						this.onPause();
					} else if (event.value === chrome.cast.media.PlayerState.PLAYING) {
						this.onPlay();
					}
				});

				this.playerController.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED, (event) => {
					this.onTimeUpdate(event.value);
				});

				this.playerController.addEventListener(cast.framework.RemotePlayerEventType.DURATION_CHANGED, (event) => {
					this.duration = event.value;
				});

				// for debug
				this.playerController.addEventListener(cast.framework.RemotePlayerEventType.ANY_CHANGE, function(event) {
					if (event.field !== 'currentTime') {
						console.log(event);
					}
				});

				cast.framework.CastContext.getInstance().addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, function(event) {
					console.log(event);
				});

				cast.framework.CastContext.getInstance().addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, function(event) {
					console.log(event);
				});
			}
		}, 200);
	}

	mediaLoaded() {
		return this.player.isMediaLoaded;
	}

	requestSession() {
		return cast.framework.CastContext.getInstance().requestSession()
	}

	loadMedia(mediaURL) {
		var session = cast.framework.CastContext.getInstance().getCurrentSession();

		console.log('Loading media');
		var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, 'video/mp4');

		// create subtitle track style
		var textTrackStyle = new chrome.cast.media.TextTrackStyle();
		textTrackStyle.fontFamily = 'sans-serif';
		textTrackStyle.backgroundColor = '#00000000';
		textTrackStyle.edgeType = chrome.cast.media.TextTrackEdgeType.OUTLINE;
		textTrackStyle.edgeColor = '#000000FF';
		textTrackStyle.fontScale = 0.8;

		// create subtitle track
		var englishSubtitle = new chrome.cast.media.Track(1, chrome.cast.media.TrackType.TEXT);
		englishSubtitle.trackContentId = mediaURL.substr(0, mediaURL.lastIndexOf(".")) + ".vtt";
		englishSubtitle.trackContentType = 'text/vtt';
		englishSubtitle.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
		englishSubtitle.name = 'English Subtitles';
		englishSubtitle.language = 'en-US';
		englishSubtitle.customData = null;

		// add sub track to media info object
		mediaInfo.tracks = [englishSubtitle];
		mediaInfo.textTrackStyle = textTrackStyle;

		var request = new chrome.cast.media.LoadRequest(mediaInfo);
		// set sub track as active
		request.activeTrackIds = [1];

		session.loadMedia(request)
		.then(function() { console.log('Load succeed') }, function(err) { console.log(err) });
	}

	cast(mediaURL) {
		var session = cast.framework.CastContext.getInstance().getCurrentSession();
		if (!session) { // no session available, we should request one
			this.requestSession()
			.then(this.loadMedia(mediaURL));
		} else {
			this.loadMedia(mediaURL);
		}
	}

	playOrPause() {
		this.playerController.playOrPause();
	}

	seek(time) {
		console.log("[chromecast] seeking to " + time);
		this.player.currentTime = time;
		this.playerController.seek();
	}
}

export default Chromecast;

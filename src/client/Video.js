import React from 'react';

import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
// icons
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import FullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
import VolumeOff from 'material-ui/svg-icons/av/volume-off';
import Cast from 'material-ui/svg-icons/hardware/cast';
import CastConnected from 'material-ui/svg-icons/hardware/cast-connected';

import Chromecast from './Chromecast';

import './Video.css';

const styles = {
	paper: {
		marginBottom: '8px',
		overflow: 'hidden',
		position: 'relative',
		paddingBottom: '56.25%'
	},
	container: {
		position: 'absolute',
		backgroundColor: 'black',
		width: '100%',
		height: '100%',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	video: {
		display: 'block',
		width: '100%',
		height: '100%',
		borderRadius: '2px'
	},
	controls: {
		position: 'absolute',
		bottom: '0',
		left: '0',
		right: '0',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: '0 0 2px 2px'
	},
	scrubber: {
		display: 'inline-block',
		width: '100%',
		marginBottom: '-10px',
		padding: '0 16px',
		boxSizing: 'border-box'
	},
	slider: {
		margin: '0',
		cursor: 'pointer'
	},
	buttonsLeft: {
		display: 'inline-flex',
		width: '50%',
		justifyContent: 'flex-start'
	},
	buttonsRight: {
		display: 'inline-flex',
		width: '50%',
		justifyContent: 'flex-end'
	},
	time: {
		display: 'inline-flex',
		boxSizing: 'border-box',
		height: '48px',
		padding: '12px 0',
		alignItems: 'center',
		userSelect: 'none',
		cursor: 'default'
	},
	timeSpan: {
		opacity: '0.87',
		padding: '0 2px'
	}
};

var controlsTimeout;

class Video extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			paused: true,
			muted: false,
			fullscreen: false,
			casting: false,
			currentPercentage: 0,
			currentTime: 0,
			duration: 0
		};

		this.handleVideoPause = this.handleVideoPause.bind(this);
		this.handleVideoPlaying = this.handleVideoPlaying.bind(this);
		this.handleVideoTimeUpdate = this.handleVideoTimeUpdate.bind(this);
		this.handleVideoDurationChange = this.handleVideoDurationChange.bind(this);
		this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
		this.playOrPause = this.playOrPause.bind(this);
		this.seek = this.seek.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
		this.hideControls = this.hideControls.bind(this);
		this.showControls = this.showControls.bind(this);
		this.handleCastConnect = this.handleCastConnect.bind(this);
		this.handleCastDisconnect = this.handleCastDisconnect.bind(this);
	}

	componentWillMount() {
		document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange, false);
		// chromecast initialization
		window['__onGCastApiAvailable'] = Chromecast.init;
		// also set chromecast event handlers
		Chromecast.addEventListener('connect', this.handleCastConnect);
		Chromecast.addEventListener('disconnect', this.handleCastDisconnect);
	}

	componentWillUnmount() {
		document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange, false);
	}

	// update component with video events
	handleVideoPause() {
		this.setState({ paused: true });
	}

	handleVideoPlaying() {
		this.setState({ paused: false });
	}

	handleVideoTimeUpdate() {
		var percentage = (this.refs.video.currentTime/this.refs.video.duration) * 100;

		this.setState({
			currentTime: this.refs.video.currentTime,
			currentPercentage: percentage
		});
		// also call the callback to inform the component above
		if (percentage > 0) {
			var event = new CustomEvent('timeUpdate', { detail: { percentage: percentage } });
			this.props.onTimeUpdate(event);
		}
	}

	handleVideoDurationChange() {
		this.setState({ duration: this.refs.video.duration });
	}

	handleFullscreenChange() {
		this.setState({ fullscreen: document.webkitFullscreenElement !== null });
	}

	// control video
	playOrPause() {
		if (this.refs.video.paused) {
			this.refs.video.play();
		} else {
			this.refs.video.pause();
		}
	}

	seek(e, newPercentage) {
		// calculate the new time (in seconds) by multiplying total time by percentage
		var newTime = this.refs.video.duration * (newPercentage/100);
		this.setState({ currentTime: newTime });
		this.refs.video.currentTime = newTime;
	}

	toggleMute() {
		console.log('toggle mute');
		if (this.refs.video.muted) {
			this.refs.video.muted = false;
			this.setState({ muted: false });
		} else {
			this.refs.video.muted = true;
			this.setState({ muted: true });
		}
	}

	toggleFullscreen() {
		if (this.state.fullscreen) {
			this.refs.container.style.display = 'initial';
			document.webkitExitFullscreen();
		} else {
			this.refs.container.style.display = 'flex';
			this.refs.container.webkitRequestFullscreen();
		}
	}

	// show/hide controls
	hideControls() {
		if (!this.state.paused) {
			this.refs.controls.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
			this.refs.controls.style.transform = 'translateY(100%)';
			this.refs.controls.style.opacity = '0';
			// also hide the cursor while over the video
			this.refs.video.style.cursor = 'none';
		}
	}

	showControls() {
		this.refs.controls.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
		this.refs.controls.style.transform = 'translateY(0)';
		this.refs.controls.style.opacity='1';
		// unhide the cursor
		this.refs.video.style.cursor = 'default';

		// set timeout to automatically hide controls when the mouse stops
		window.clearTimeout(controlsTimeout); // clear the current timout first, to prevent wierdness
		controlsTimeout = window.setTimeout(() => {this.hideControls()}, 3000);
	}

	// chromecast
	handleCastConnect() {
		this.setState({ casting: true });
	}

	handleCastDisconnect() {
		this.setState({ casting: false });
	}

	// helpers
	timeFormat(time) {
		var minutes = parseInt(time / 60);
		var seconds = parseInt(time % 60);
		return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}

	render() {
		return (
			<Paper
				zDepth={2}
				style={styles.paper}
				onMouseLeave={this.hideControls}
				onMouseMove={this.showControls}
			>
				<div ref="container" style={styles.container}>
					<video
						ref="video"
						preload="auto"
						style={styles.video}
						src={this.props.src + '.mp4'}
						// events
						onPause={this.handleVideoPause}
						onPlaying={this.handleVideoPlaying}
						onTimeUpdate={this.handleVideoTimeUpdate}
						onDurationChange={this.handleVideoDurationChange}

						onClick={() => { Chromecast.requestSession() }}
					>
						<track
							src={this.props.src + '.vtt'}
							kind="subtitles"
							srcLang="en"
							label="English"
							default
						/>
					</video>
					<div ref="controls" style={styles.controls}>
						<div style={styles.scrubber}>
							<Slider
								ref="scrubber"
								disableFocusRipple={true}
								max={100}
								value={this.state.currentPercentage}
								onChange={this.seek}
								sliderStyle={styles.slider}
							/>
						</div>
						<div style={styles.buttonsLeft}>
							<IconButton onTouchTap={this.playOrPause}>
								{this.state.paused ? <PlayArrow/> : <Pause/>}
							</IconButton>
							<div ref="time" style={styles.time}>
								<span ref="currentTime" style={styles.timeSpan}>
									{this.timeFormat(this.state.currentTime)}
								</span>
								<span style={styles.timeSpan}>/</span>
								<span ref="totalTime" style={styles.timeSpan}>
									{this.timeFormat(this.state.duration)}
								</span>
							</div>
						</div>
						<div style={styles.buttonsRight}>
							<IconButton onTouchTap={this.toggleMute}>
								{this.state.muted ? <VolumeOff/> : <VolumeUp/>}
							}
							</IconButton>
							<IconButton onTouchTap={Chromecast.requestSession}>
								{this.state.casting ? <CastConnected/> : <Cast/>}
							</IconButton>
							<IconButton onTouchTap={this.toggleFullscreen}>
								{this.state.fullscreen ? <FullscreenExit/> : <Fullscreen/>}
							</IconButton>
						</div>
					</div>
				</div>
			</Paper>
		)
	}
}

export default Video;

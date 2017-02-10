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

const styles = {
	container: {
		marginBottom: '8px',
		overflow: 'hidden',
		position: 'relative'
	},
	video: {
		display: 'block',
		width: '100%',
		backgroundColor: 'black',
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
	buttonsLeft: {
		display: 'inline-block',
		width: '50%',
		textAlign: 'left'
	},
	buttonsRight: {
		display: 'inline-block',
		width: '50%',
		textAlign: 'right'
	}
};

class Video extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			paused: true,
			fullscreen: false
		};

		this.handleVideoPause = this.handleVideoPause.bind(this);
		this.handleVideoPlaying = this.handleVideoPlaying.bind(this);
		this.playOrPause = this.playOrPause.bind(this);
	}

	// update component with video events
	handleVideoPause() {
		this.setState({ paused: true });
	}

	handleVideoPlaying() {
		this.setState({ paused: false });
	}

	// control video
	playOrPause() {
		if (this.refs.video.paused) {
			this.refs.video.play();
		} else {
			this.refs.video.pause();
		}
	}

	render() {
		return (
			<Paper zDepth={2} style={styles.container}>
				<video
					ref="video"
					autoPlay
					style={styles.video}
					src={this.props.src + '.mp4'}
					// events
					onPause={this.handleVideoPause}
					onPlaying={this.handleVideoPlaying}
				>
					<track
						src={this.props.src + '.vtt'}
						kind="subtitles"
						srcLang="en"
						label="English"
						default
					/>
				</video>
				<div style={styles.controls}>
					<div style={styles.buttonsLeft}>
						<IconButton onTouchTap={this.playOrPause}>
							{this.state.paused ? <PlayArrow/> : <Pause/>}
						</IconButton>
					</div>
					<div style={styles.buttonsRight}>
						<IconButton>
							{this.state.fullscreen ? <FullscreenExit/> : <Fullscreen/>}
						</IconButton>
					</div>
				</div>
			</Paper>
		)
	}
}

export default Video;
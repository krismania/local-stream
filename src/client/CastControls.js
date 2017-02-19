import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import CastConnected from 'material-ui/svg-icons/hardware/cast-connected';

class CastControls extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			currentTime: 0
		}

		this.styles = {
			paper: {
				position: 'fixed',
				bottom: '0',
				left: '0',
				right: '0',
				width: '100%',
				height: '64px',
				backgroundColor: this.props.muiTheme.palette.canvasColor
			},
			slider: {
				margin: '-8px 0 0 0',
				cursor: 'pointer'
			},
			controls: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}
		}

		this.handlePause = this.handlePause.bind(this);
		this.handlePlaying = this.handlePlaying.bind(this);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.playOrPause = this.playOrPause.bind(this);
	}

	componentWillMount() {
		this.props.chromecast.addEventListener('pause', this.handlePause);
		this.props.chromecast.addEventListener('play', this.handlePlaying);
		this.props.chromecast.addEventListener('timeUpdate', this.handleTimeUpdate);
	}

	handlePause() {
		this.setState({ playing: false });
	}

	handlePlaying() {
		this.setState({ playing: true });
	}

	handleTimeUpdate(time) {
		this.setState({ currentTime: time });
	}

	// control functions

	playOrPause() {
		this.props.chromecast.playOrPause();
	}

	// helpers

	timeFormat(time) {
		var minutes = parseInt(time / 60);
		var seconds = parseInt(time % 60);
		return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}

	render() {
		var duration = this.props.chromecast.duration;
		return (
			<div style={{ width: '100%', height: '64px', display: this.props.casting ? 'block' : 'none' }}>
				<Paper
					style={this.styles.paper}
					zDepth={2}
					rounded={false}
				>
					<div className="scrubber">
						<Slider
							ref="scrubber"
							disableFocusRipple={true}
							max={duration}
							value={this.state.currentTime}
							onChange={this.seek}
							sliderStyle={this.styles.slider}
						/>
					</div>
					<div style={this.styles.controls}>
						<IconButton onTouchTap={this.playOrPause}>
							{this.state.playing ? <Pause/> : <PlayArrow/> }
						</IconButton>
						<div ref="time" className="time" style={{ marginRight: '16px', cursor: 'default', userSelect: 'none' }} >
							<span ref="currentTime">
								{this.timeFormat(this.state.currentTime)}
							</span>
							<span>/</span>
							<span ref="totalTime">
								{this.timeFormat(duration)}
							</span>
						</div>
					</div>
				</Paper>
			</div>
		)
	}
}

export default muiThemeable()(CastControls);

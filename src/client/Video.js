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
	video: {
		display: 'block',
		width: '100%',
		backgroundColor: 'black',
		borderRadius: '2px'
	}
};

class Video extends React.Component {

	render() {
		return (
			<Paper zDepth={3} style={{ marginBottom: '15px' }}>
				<video controls style={styles.video} src={this.props.src + '.mp4'}>
					<track
						src={this.props.src + '.vtt'}
						kind="subtitles"
						srcLang="en"
						label="English"
						default
					/>
				</video>
			</Paper>
		)
	}
}

export default Video;
import React from 'react';
import Avatar from 'material-ui/Avatar';
import {grey500} from 'material-ui/styles/colors';

function NumberedAvatar(number) {
	var paddedNum = '' + (number >= 10 ? number : '0' + number);
	return (
		<Avatar
			color={grey500}
			style={{ background: 'none' }}
		>
			{paddedNum}
		</Avatar>
	);
}

export default NumberedAvatar;
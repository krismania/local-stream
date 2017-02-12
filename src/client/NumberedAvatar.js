import React from 'react';
import Avatar from 'material-ui/Avatar';
import {grey500} from 'material-ui/styles/colors';

function NumberedAvatar(number) {
	var iconString;
	if (number !== undefined) {
		// if number is defined, pad it with a zero
		iconString = '' + (number >= 10 ? number : '0' + number);
	} else {
		// otherwise, use ?? instead
		iconString = '??';
	}
	return (
		<Avatar
			color={grey500}
			style={{ background: 'none' }}
		>
			{iconString}
		</Avatar>
	);
}

export default NumberedAvatar;
import React from 'react';

const FlexBox = ({children}) => {
	return (
		<div style={{display: 'flex'}}>
			{children}
		</div>
	)
}

export default FlexBox;
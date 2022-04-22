import React from 'react';

import { FlexBox, FeedItem } from '@components';

function Home() {
  return (
    <FlexBox>
      <div style={{ width: '50vw' }}>
        <FeedItem
          name='Ritesh Patil'
          photoUrl='https://res.cloudinary.com/riteshp2000/image/upload/w_650,f_auto,q_auto/v1638948441/portfolio/v2/assets/RiteshPatil_px7ns1.webp'
          status='Fortune favours the bold'
        />
      </div>
    </FlexBox>
  );
}

export default Home;

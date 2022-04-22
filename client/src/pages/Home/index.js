import React, { useEffect, useState } from 'react';

import { doc, onSnapshot, collection, updateDoc, query, orderBy } from 'firebase/firestore';
import { useFirebase } from '@config/firebase';

import { FeedItem, Layout } from '@components';
import { useAuth } from '@store/contexts';

function Home() {
  const [feed, setFeed] = useState();
  const { db } = useFirebase();
  const [state] = useAuth();

  const updateThumbs = async (type, id) => {
    const userRef = doc(db, 'users', id);

    if (!state.user?.thumbsDownUsers.includes(id) && type === 'thumbsDown') {
      await updateDoc(userRef, {
        thumbsUp: state.user?.thumbsUpUsers.includes(id)
          ? state.user?.thumbsUp - 1
          : state.user?.thumbsUp,
        thumbsDown: state.user?.thumbsUp + 1,
        thumbsUpUsers: state.user?.thumbsUpUsers.filter((userId) => userId !== state.user?.id),
        thumbsDownUsers: [...state.user?.thumbsDownUsers, state.user?.id],
      });
    }

    if (!state.user?.thumbsUpUsers.includes(id) && type === 'thumbsUp') {
      await updateDoc(userRef, {
        thumbsDown: state.user?.thumbsDownUsers.includes(id)
          ? state.user?.thumbsDown - 1
          : state.user?.thumbsDown,
        thumbsUp: state.user?.thumbsUp + 1,
        thumbsDownUsers: state.user?.thumbsDownUsers.filter((userId) => userId !== state.user?.id),
        thumbsUpUsers: [...state.user?.thumbsUpUsers, state.user?.id],
      });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('thumbsUp', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const docList = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      setFeed(docList);
    });

    return unsub;
  }, []);

  return (
    <Layout>
      <h4 style={{ margin: '10px 0' }}>Feed</h4>
      {feed
        ?.filter(({ uid }) => uid !== state.user?.uid)
        ?.map(({ name, photoURL, status, id }) => (
          <FeedItem
            name={name}
            photoUrl={photoURL}
            status={status}
            key={name + photoURL}
            updateThumbs={updateThumbs}
            id={id}
          />
        ))}
    </Layout>
  );
}

export default Home;

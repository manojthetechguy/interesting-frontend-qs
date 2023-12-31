import React, { useState } from 'react';

const FetchAndAbort = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = () => {
    setLoading(true);
    setEmail(null);
    fetch('https://jsonplaceholder.typicode.com/comments/1', { signal })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
      })
      .catch((err) => console.info(err))
      .finally(() => setLoading(false));
  };

  const abortData = () => {
    controller.abort();
  };

  return (
    <div>
      <div style={{ margin: '1rem' }}>
        <button
          onClick={() => {
            fetchData();
          }}
        >
          Fetch Data
        </button>
      </div>
      <div style={{ margin: '1rem' }} />
      <div style={{ margin: '1rem' }}>
        <button
          onClick={() => {
            abortData();
          }}
        >
          Abort Request
        </button>
      </div>
      <div style={{ margin: '1rem' }} />
      {loading && <div>Loading ...</div>}
      {email && <div>{email}</div>}
    </div>
  );
};

export default FetchAndAbort;

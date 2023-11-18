import React from 'react';
import Link from 'next/link';


const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', background: '#fff', height: '100vh', paddingTop: '5%', color: '#000' }}>

      <h1>404 - Page Not Found</h1>
      <p>Looks like you've stumbled upon the land of mischievous 404 errors.</p>

      <Link href="/">
        <div style={{ textDecoration: 'none', padding: '10px 20px', background: '#4643EE', color: '#fff', borderRadius: '5px', marginTop: '20px', display: 'inline-block', marginTop: '20%' }}>
          Go Back Home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;

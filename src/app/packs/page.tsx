'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Packs() {
  // Add a back button to navigate to the home page
  return (
    <div style={{
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <Link href="/" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image 
          src="/assets/img/faviconwobg.png" 
          alt="Areion Logo" 
          width={200} 
          height={200} 
          className="logo"
        />
        <p style={{ 
          color: '#c04ae2', 
          fontSize: '36px', 
          marginTop: '20px', 
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400 
        }}>
          Revealing Soon...
        </p>
      </div>
    </div>
  );
}

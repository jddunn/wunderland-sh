export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: '#f0eef6',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#f0eef6',
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: '1rem',
          color: '#9b95b0',
          maxWidth: 480,
          marginBottom: '2rem',
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Go Home
        </a>
        <a
          href="https://docs.wunderland.sh"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #3b3558',
            color: '#f0eef6',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View Docs
        </a>
        <a
          href="https://github.com/manicinc/wunderland"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #3b3558',
            color: '#f0eef6',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

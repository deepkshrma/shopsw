import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="404 Not Found"
          className="not-found-image"
        />
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-text">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="go-home-btn">Go to Homepage</a>
      </div>
    </div>
  );
};

export default PageNotFound;

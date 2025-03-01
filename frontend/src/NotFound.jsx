import "./style/App.css";
const NotFound = () => {
  return (
    <div className="notFound">
      <i className="ri-error-warning-line"></i>
      <h1>
        {" "}
        <span style={{ color: "var(--colorOneDark)" }}>404</span>  Page Not Found
      </h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};
export default NotFound;

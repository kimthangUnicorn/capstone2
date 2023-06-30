function Errors(props) {
    function renderError() {
      let { errors } = props;
      if (Object.keys(errors).length > 0) {
        return Object.keys(errors).map((key, index) => {
          return (
            <p className="p-0" style={{ color: "red" }} key={index}>
              {" "}
              {errors[key]}{" "}
            </p>
          );
        });
      }
    }
    return (
      <ul className="p-0" style={{ color: "red" }}>
        {renderError()}
      </ul>
    );
  }
  export default Errors;
  
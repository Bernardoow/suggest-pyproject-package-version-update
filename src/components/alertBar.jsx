export default function AlertBar(props) {
  if (props.isPyProjectFileWithProblem) {
    return (
      <p className="alert alert-danger" role="alert">
        {props.message}
      </p>
    );
  } else {
    return "";
  }
}

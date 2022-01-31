import AlertBar from "./alertBar";
import InputArea from "./inputArea";
import slugify from "slugify";

export default function ColArea(props) {
  const alertId =
    slugify(props.title || "", {
      lower: true,
      remove: /[.]/g,
    }) + "-alert";
  return (
    <div className="col">
      <AlertBar
        hasAlert={props.hasAlert}
        message={props.alertMessage}
        id={alertId}
      />
      <div className="mb-3">
        <InputArea
          title={props.title}
          value={props.value}
          onChange={props.onChange}
          readOnly={props.readOnly || false}
        />
      </div>
    </div>
  );
}

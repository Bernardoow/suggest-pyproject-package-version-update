export default function AlertBar(props) {
    if (props.hasAlert || false) {
        return (
            <p className="alert alert-danger" role="alert" id={props.id}>
                {props.message}
            </p>
        );
    } else {
        return "";
    }
}

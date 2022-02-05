import * as React from "react";

interface Props {
    hasAlert?: boolean;
    id?: string;
    message?: string;
}

const AlertBar: React.FunctionComponent<Props> = props => {
    if (props.hasAlert) {
        return (
            <p className="alert alert-danger" role="alert" id={props.id}>
                {props.message}
            </p>
        );
    } else {
        return <></>;
    }
};

export default AlertBar;
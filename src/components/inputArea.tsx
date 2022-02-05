import React from "react";
import slugify from "slugify";

interface Props {
    title: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
}

const InputArea: React.FunctionComponent<Props> = props => {
    const labelId =
        slugify(props.title || "", {
            lower: true,
            remove: /[.]/g,
        }) + "-label";
    const textAreaId =
        slugify(props.title || "", { lower: true, remove: /[.]/g }) +
        "-textarea";
    return (
        <>
            <label htmlFor={textAreaId} className="form-label" id={labelId}>
                {props.title}
            </label>
            <textarea
                className="form-control"
                id={textAreaId}
                value={props.value}
                onChange={props.onChange}
                rows={30}
                readOnly={props.readOnly || false}
            ></textarea>
        </>
    );
};

export default InputArea;

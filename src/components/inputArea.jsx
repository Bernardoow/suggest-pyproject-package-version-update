import React from "react";
import slugify from "slugify";

class InputArea extends React.Component {
    render() {
        const labelId =
            slugify(this.props.title || "", {
                lower: true,
                remove: /[.]/g,
            }) + "-label";
        const textAreaId =
            slugify(this.props.title || "", { lower: true, remove: /[.]/g }) +
            "-textarea";
        return (
            <>
                <label htmlFor={textAreaId} className="form-label" id={labelId}>
                    {this.props.title}
                </label>
                <textarea
                    className="form-control"
                    id={textAreaId}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    rows={this.props.rows || 30}
                    readOnly={this.props.readOnly || false}
                ></textarea>
            </>
        );
    }
}

export default InputArea;

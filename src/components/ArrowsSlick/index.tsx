export const SampleNextArrow = (props: any) => {
    return (
        <div
            className={props.className}
            style={{ ...props.style, display: "block", background: "gray" }}
            onClick={props.onClick}
        />
    );
}

export const SamplePrevArrow = (props: any) => {
    return (
        <div
            className={props.className}
            style={{ ...props.style, display: "block", background: "gray" }}
            onClick={props.onClick}
        />
    );
}

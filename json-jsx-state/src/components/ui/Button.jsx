const Button = ({ text, onClick, disabled, customStyle }) => {
    const disabledStyle = {
        backgroundColor: "#999",
        color: "#333",
        cursor: "default",
    };
    const style = {
        padding: "0.25rem 1rem",
        backgroundColor: "#ddd",
        color: "#212121",
        borderRadius: "0.10rem",
        cursor: "pointer",
        ...customStyle,
        ...(disabled && disabledStyle),
    };

    return (
        <button style={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

Button.defaultProps = {
    customStyle: {},
    disabled: false,
};
export default Button;

import "./Button.css";

/**
 * COMMON BUTTON COMPONENT
 * @param {string} type - html button type ('button','submit')
 * @param {string} variant - Visual style ('primary','secondary')
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Disabled state
 */

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

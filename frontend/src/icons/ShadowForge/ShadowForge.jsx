const SvgShadowForge = ({ ...props }) => (
<svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs />
    <style>
      {`
        .neon { 
          stroke: #00FF00;
          stroke-width: 2;
          fill: none;
        }
        @media (prefers-color-scheme: light) {
          .neon { stroke: #00DD00; }
        }
      `}
    </style>
    <rect width="32" height="32" fill="#000000" />
    <path
      className="neon"
      d="M6 6L26 6L26 26L6 26L6 6"
    >
      <animate
        attributeName="stroke-dasharray"
        values="0,80;80,0;0,80"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>
    <path
      className="neon"
      d="M16 10L22 16L16 22L10 16L16 10"
    >
      <animate
        attributeName="opacity"
        values="1;0.5;1"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>

);

export default SvgShadowForge;

import useFlowStore from "@/stores/flowStore";
import { ConnectionLineComponentProps } from "@xyflow/react";

const ConnectionLineComponent = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle = {},
}: ConnectionLineComponentProps): JSX.Element => {
  const handleDragging = useFlowStore((state) => state.handleDragging);

  return (
    <g>
      <path
        fill="none"
        strokeWidth={4} // Increased stroke width for a bolder line
        className={`animated`}
        style={{
          // stroke: "white", // Changed stroke color to white
          ...connectionLineStyle,
        }}
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={5}
        stroke="white" // Changed circle stroke color to white
        className=""
        strokeWidth={1} // Made the circle stroke slightly bolder
      />
    </g>
  );
};

export default ConnectionLineComponent;

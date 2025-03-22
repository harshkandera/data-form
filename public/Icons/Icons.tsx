export const Icons = {
    arrow: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 800 800"
        {...props} // Spread the props here to allow passing className, styles, etc.
      >
        <g
          strokeWidth="11"
          stroke="#3E1E90"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="29 40"
        >
          <path
            d="M192.71572875976562 210.5Q728.7157287597656 355.5 571.7157287597656 589.5"
            markerEnd="url(#SvgjsMarker1676)"
          ></path>
        </g>
        <defs>
          <marker
            markerWidth="10"
            markerHeight="10"
            refX="2.5"
            refY="2.5"
            viewBox="0 0 5 5"
            orient="auto"
            id="SvgjsMarker1676"
          >
            <polygon
              points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
              fill="#3E1E90"
            ></polygon>
          </marker>
        </defs>
      </svg>
    ),
  };
  
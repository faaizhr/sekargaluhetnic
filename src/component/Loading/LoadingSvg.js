export default function LoadingSvg() {
  return (
      <svg 
          className=""
          style={{
              margin: 'auto',
              background: '#3F4E4F',
              display: 'block', 
              shapeRendering: 'auto'
          }} 
          width="30px" 
          height="30px" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid">
          <circle 
              cx="50" 
              cy="50" 
              r="32" 
              stroke-width="8" 
              stroke="#DCD7C9" 
              stroke-dasharray="50.26548245743669 50.26548245743669" 
              fill="none" 
              stroke-linecap="round"
          >
              <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  repeatCount="indefinite" 
                  dur="1s" keyTimes="0;1" 
                  values="0 50 50;360 50 50">
              </animateTransform>
          </circle>
      </svg>
  );
}
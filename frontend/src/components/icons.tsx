// Inline SVG logo component for dynamic theming via currentColor

export const Icons = {
  // Kendi SVG logonuzu buraya ekleyebilirsiniz.
  // Şimdilik marka kimliğini yansıtması için bir placeholder.
  logo: () => (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 41.88 10.17"
        aria-label="Atropos"
        className="h-8 w-auto text-white"
      >
        <g data-name="katman 2">
          <g data-name="katman 1">
            <path fill="currentColor" d="M0,1.8H3.26A2.72,2.72,0,0,1,6,4.53V7.79H5.12a.88.88,0,0,1-.86-.87V4.53a1,1,0,0,0-1-1H1.7V5.07a1,1,0,0,0,1,1h1V7.79h-1A2.74,2.74,0,0,1,0,5.07Z"/>
            <path fill="currentColor" d="M8.71,0V1.8H10V3.5H8.71V5.69a.38.38,0,0,0,.38.37H10V7.79H9.09A2.1,2.1,0,0,1,7,5.69V0Z"/>
            <path fill="currentColor" d="M10.93,4.53A2.74,2.74,0,0,1,13.65,1.8h1V3.5h-1a1,1,0,0,0-1,1V7.79h-1.7Z"/>
            <path fill="currentColor" d="M18.56,1.8a2.71,2.71,0,0,1,2.7,2.73V7.79H18a2.75,2.75,0,0,1-2.72-2.72V1.8ZM17,5.07a1,1,0,0,0,1,1h1.58V4.53a1.06,1.06,0,0,0-1-1H17Z"/>
            <path fill="currentColor" d="M28.23,1.8V5.07a2.72,2.72,0,0,1-2.7,2.72H24.47V6.06h1.06a1,1,0,0,0,1-1V3.5H25a1.05,1.05,0,0,0-1,1v4.8a.85.85,0,0,1-.85.84h-.83V4.53A2.72,2.72,0,0,1,25,1.8Z"/>
            <path fill="currentColor" d="M32.48,1.8a2.71,2.71,0,0,1,2.7,2.73V7.79H31.93a2.75,2.75,0,0,1-2.72-2.72V1.8ZM30.93,5.07a1,1,0,0,0,1,1h1.58V4.53a1.06,1.06,0,0,0-1-1H30.93Z"/>
            <path fill="currentColor" d="M41.74,1.8V3.5h-2.9a1,1,0,0,0-.9.54h3.94v1a2.72,2.72,0,0,1-2.7,2.72H36.27V6.06h2.91a1,1,0,0,0,.87-.5H36.12v-1A2.74,2.74,0,0,1,38.84,1.8Z"/>
          </g>
        </g>
      </svg>
    </div>
  ),
};

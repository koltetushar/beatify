import React from "react";

const SongDisc = () => (
  <svg width="320" viewBox="0 0 235 232" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="118.849" cy="116.084" r="115.833" fill="url(#paint0_radial)" />
    <ellipse cx="118.849" cy="117.011" rx="58.836" ry="59.3067" fill="#0A0A0A" />
    <ellipse cx="119.768" cy="116.084" rx="46.885" ry="47.2601" fill="#22710D" />
    <ellipse cx="118.851" cy="117.011" rx="9.19313" ry="9.26668" fill="#5670C0" />
    <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="233" height="232">
      <circle cx="116.263" cy="116.084" r="115.833" fill="url(#paint1_radial)" />
    </mask>
    <g mask="url(#mask0)">
      <g style={{ mixBlendMode: "lighten" }} filter="url(#filter0_f)">
        <g style={{ mixBlendMode: "lighten" }}>
          <path d="M111.495 116.092L199.078 2.63303L243.404 67.6268L111.495 116.092Z" fill="white" fillOpacity="0.9" />
        </g>
        <g style={{ mixBlendMode: "lighten" }}>
          <path d="M113.479 117.459L39.4044 249.952L-17.8836 186.915L113.479 117.459Z" fill="white" fillOpacity="0.9" />
        </g>
      </g>
      <circle cx="116.263" cy="116.084" r="115.833" fill="url(#paint2_radial)" />
      <ellipse cx="116.263" cy="117.011" rx="58.836" ry="59.3067" fill="#0A0A0A" />
      <ellipse cx="117.183" cy="116.084" rx="46.885" ry="47.2601" fill="#14134B" />
      <ellipse cx="116.264" cy="117.011" rx="9.19313" ry="9.26668" fill="#5670C0" />
    </g>
    <defs>
      <filter id="filter0_f" x="-20.8835" y="-0.366943" width="267.288" height="253.319" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur" />
      </filter>
      <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(118.849 116.084) rotate(90) scale(115.833)">
        <stop stopColor="#272727" />
        <stop offset="1" stopOpacity="0.85" />
      </radialGradient>
      <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(116.263 116.084) rotate(90) scale(115.833)">
        <stop stopColor="#272727" />
        <stop offset="1" stopOpacity="0.75" />
      </radialGradient>
      <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(116.263 116.084) rotate(90) scale(115.833)">
        <stop stopColor="#272727" />
        <stop offset="1" stopOpacity="0.85" />
      </radialGradient>
    </defs>
  </svg>
);

export default SongDisc;

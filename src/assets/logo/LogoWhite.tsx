import type { SvgProps } from '@/types/props';

const LogoWhite = ({ className, onClick }: SvgProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 304 103"
    fill="none"
    className={className}
    onClick={onClick}
    aria-label="logo-white"
  >
    <path
      fill="#FEFCFD"
      d="M115.14 42c-.193 0-.29-.097-.29-.29l.116-39.919c0-.155.077-.232.232-.232l10.866-.058c2.131-.04 4.067.464 5.811 1.51a11.725 11.725 0 0 1 4.241 4.242c1.046 1.743 1.569 3.68 1.569 5.81V29.74c0 2.247-.542 4.3-1.627 6.159a12.35 12.35 0 0 1-4.358 4.358c-1.82 1.085-3.873 1.646-6.159 1.685L115.14 42Zm6.799-7.147h3.602c1.433 0 2.634-.504 3.603-1.51 1.007-1.008 1.51-2.209 1.51-3.603V13.006c0-1.24-.464-2.305-1.394-3.196-.891-.93-1.956-1.375-3.196-1.337l-4.067.058-.058 26.322Zm29.649 7.728c-2.092 0-4.01-.523-5.753-1.569a12.71 12.71 0 0 1-4.125-4.242c-1.046-1.781-1.569-3.738-1.569-5.868l.058-18.42c0-2.13.504-4.067 1.511-5.81a12.018 12.018 0 0 1 4.183-4.184A10.872 10.872 0 0 1 151.588.92c2.091 0 3.99.523 5.694 1.568a11.696 11.696 0 0 1 4.067 4.184c1.046 1.743 1.569 3.68 1.569 5.81l.058 18.42c0 2.13-.523 4.087-1.569 5.868a12.01 12.01 0 0 1-4.125 4.242c-1.704 1.046-3.603 1.57-5.694 1.57Zm0-7.03c1.162 0 2.169-.465 3.021-1.395.891-.969 1.337-2.053 1.337-3.254l-.059-18.42c0-1.278-.406-2.362-1.22-3.253-.813-.891-1.84-1.337-3.079-1.337-1.201 0-2.228.446-3.08 1.337-.852.852-1.278 1.937-1.278 3.254v18.419c0 1.278.426 2.382 1.278 3.312.852.89 1.879 1.336 3.08 1.336ZM167.917 42c-.31 0-.465-.136-.465-.407l-.058-39.57c0-.31.155-.464.465-.464h5.229l9.82 22.893-.29-22.428c0-.31.174-.465.523-.465h5.752c.233 0 .349.155.349.465l.058 39.627c0 .233-.097.349-.291.349h-5.113l-10.052-21.383.407 20.918c0 .31-.175.465-.523.465h-5.811Zm24.455-.29 7.205-39.919c.038-.155.135-.232.29-.232h8.426c.154 0 .251.077.29.232l6.915 39.919c.038.193-.039.29-.233.29h-6.45c-.154 0-.251-.097-.29-.29l-.639-4.242h-7.903l-.639 4.241c-.038.194-.135.291-.29.291h-6.45c-.155 0-.232-.097-.232-.29Zm8.774-10.46h5.578l-2.383-16.327-.348-2.15-.233 2.15-2.614 16.327ZM222.174 42c-.155 0-.232-.097-.232-.29V8.59h-7.554c-.194 0-.29-.097-.29-.291l.058-6.508c0-.155.077-.232.232-.232h22.08c.194 0 .291.077.291.232V8.3c0 .194-.078.29-.233.29h-7.612l.059 33.12c0 .194-.078.291-.233.291h-6.566Zm17.687 0c-.155 0-.232-.097-.232-.29l.058-39.919c0-.155.077-.232.232-.232h18.652c.155 0 .232.097.232.29v6.508c0 .155-.077.232-.232.232h-11.912v9.065h11.912c.155 0 .232.077.232.232l.058 6.566c0 .155-.077.233-.232.233h-11.97v10.168h11.97c.155 0 .232.097.232.29v6.625c0 .154-.077.232-.232.232h-18.768ZM275.804 43.799c-.103 0-.155-.065-.155-.194v-22.08h-5.036c-.129 0-.193-.064-.193-.194l.038-4.338c0-.103.052-.155.155-.155h14.72c.13 0 .194.052.194.155v4.338c0 .13-.052.194-.155.194h-5.074l.038 22.08c0 .13-.051.194-.155.194h-4.377Zm17.933.387c-1.395 0-2.673-.348-3.835-1.046a8.474 8.474 0 0 1-2.751-2.827c-.697-1.188-1.046-2.492-1.046-3.913l.039-12.28c0-1.42.336-2.711 1.007-3.873a8.018 8.018 0 0 1 2.789-2.79 7.246 7.246 0 0 1 3.797-1.045c1.394 0 2.66.349 3.796 1.046a7.793 7.793 0 0 1 2.711 2.789c.698 1.162 1.046 2.453 1.046 3.874l.039 12.28c0 1.42-.349 2.724-1.046 3.912a8.004 8.004 0 0 1-2.75 2.827c-1.136.698-2.402 1.046-3.796 1.046Zm0-4.687c.774 0 1.446-.31 2.014-.93.594-.645.891-1.368.891-2.169l-.039-12.28c0-.852-.271-1.575-.813-2.169-.543-.594-1.227-.89-2.053-.89-.801 0-1.485.296-2.053.89-.569.569-.853 1.292-.853 2.17V36.4c0 .851.284 1.587.853 2.207.568.594 1.252.891 2.053.891ZM115.083 93.796c-.155 0-.233-.097-.233-.29l.058-39.919c0-.155.078-.232.233-.232h18.651c.155 0 .233.097.233.29v6.508c0 .155-.078.233-.233.233h-11.911v9.064h11.911c.155 0 .233.078.233.233l.058 6.565c0 .155-.078.233-.232.233h-11.97v10.168h11.97c.154 0 .232.097.232.29v6.625c0 .155-.078.232-.232.232h-18.768Zm26.2 0c-.193 0-.29-.097-.29-.29l.116-39.919c0-.155.078-.232.233-.232l10.865-.058c2.131-.039 4.068.465 5.811 1.51a11.71 11.71 0 0 1 4.241 4.242c1.046 1.743 1.569 3.68 1.569 5.81v16.677c0 2.247-.542 4.3-1.627 6.16a12.352 12.352 0 0 1-4.358 4.357c-1.82 1.085-3.873 1.646-6.159 1.685l-10.401.058Zm6.799-7.147h3.602c1.434 0 2.634-.503 3.603-1.51 1.007-1.008 1.511-2.209 1.511-3.603V64.802c0-1.24-.465-2.305-1.395-3.196-.891-.93-1.956-1.375-3.196-1.337l-4.067.059-.058 26.321Zm32.582 7.728c-2.053 0-3.951-.523-5.694-1.569a12.356 12.356 0 0 1-4.184-4.3c-1.007-1.781-1.51-3.737-1.51-5.868l.116-29.053c0-.155.077-.232.232-.232h6.508c.155 0 .232.077.232.232V82.64c0 1.317.407 2.44 1.221 3.37.852.891 1.878 1.337 3.079 1.337 1.24 0 2.266-.446 3.08-1.337.852-.93 1.278-2.053 1.278-3.37V53.587c0-.155.078-.232.233-.232h6.507c.155 0 .233.077.233.232l.116 29.053c0 2.17-.523 4.145-1.569 5.927a11.407 11.407 0 0 1-4.125 4.241c-1.705 1.046-3.622 1.57-5.753 1.57Zm28.47 0c-2.131 0-4.068-.523-5.811-1.569a12.033 12.033 0 0 1-4.067-4.3c-1.007-1.781-1.511-3.776-1.511-5.984l.058-18.129c0-2.13.484-4.067 1.453-5.81 1.007-1.782 2.363-3.196 4.067-4.242 1.743-1.085 3.68-1.627 5.811-1.627 2.13 0 4.048.523 5.752 1.569 1.704 1.046 3.06 2.46 4.067 4.241 1.008 1.743 1.511 3.7 1.511 5.869v2.673c0 .155-.077.232-.232.232h-6.508c-.155 0-.233-.077-.233-.232v-2.673c0-1.278-.426-2.382-1.278-3.312-.813-.93-1.84-1.395-3.079-1.395-1.395 0-2.46.485-3.196 1.453-.736.93-1.104 2.014-1.104 3.254v18.129c0 1.433.407 2.595 1.22 3.486.852.891 1.879 1.337 3.08 1.337 1.239 0 2.266-.485 3.079-1.453.852-1.007 1.278-2.13 1.278-3.37V79.85c0-.155.078-.233.233-.233h6.566c.155 0 .232.078.232.233v2.673c0 2.208-.523 4.203-1.569 5.985a12.033 12.033 0 0 1-4.067 4.3c-1.704 1.045-3.622 1.568-5.752 1.568Zm15.235-.871 7.205-39.919c.038-.155.135-.232.29-.232h8.425c.155 0 .252.077.291.232l6.914 39.919c.039.193-.038.29-.232.29h-6.45c-.155 0-.251-.097-.29-.29l-.639-4.242h-7.903l-.639 4.242c-.039.193-.135.29-.29.29h-6.45c-.155 0-.232-.097-.232-.29Zm8.773-10.46h5.579l-2.383-16.327-.348-2.15-.233 2.15-2.615 16.328Zm22.772 10.75c-.155 0-.232-.097-.232-.29v-33.12h-7.554c-.194 0-.29-.097-.29-.29l.058-6.509c0-.155.077-.232.232-.232h22.08c.194 0 .291.077.291.232v6.508c0 .194-.078.29-.233.29h-7.612l.059 33.12c0 .194-.078.291-.233.291h-6.566Zm19.43 0c-.155 0-.232-.097-.232-.29l.058-39.919c0-.155.077-.232.232-.232h18.652c.155 0 .232.097.232.29v6.508c0 .155-.077.233-.232.233h-11.912v9.064h11.912c.155 0 .232.078.232.233l.059 6.565c0 .155-.078.233-.233.233h-11.97v10.168h11.97c.155 0 .233.097.233.29v6.625c0 .155-.078.232-.233.232h-18.768Z"
    />
    <g filter="url(#a)">
      <path
        fill="#E2E2E2"
        fillOpacity={0.5}
        d="m9.388 47.617 30.667 34.7 11.5 10.905s3.834 3.966 7.667 0c3.804-3.935.414-7.871.362-7.93l-.003-.004-7.93-9.116a1.277 1.277 0 0 1 1.881-1.725l8.565 8.861c.001.001 3.834 3.965 7.666 0 3.41-3.527 1.514-7.053 1.052-7.79a1.606 1.606 0 0 0-.212-.264l-9.497-9.825a1.378 1.378 0 0 1 1.982-1.916l9.55 9.88s3.834 3.967 7.667 0c3.833-3.965.362-7.93.362-7.93l-9.06-9.937a1.397 1.397 0 0 1 2.037-1.912l8.578 8.874s4.792 3.966 7.667 0c2.874-3.965 0-7.931 0-7.931l-7.667-7.931c.767.793-20.125-21.481-30.667-32.717 0 0-20.125-18.837-38.333 0-18.209 18.837-3.834 33.708-3.834 33.708Z"
      />
      <path
        fill="#FEFCFD"
        d="m11.157 45.576 30.667 34.7 11.5 10.905s3.834 3.966 7.667 0c3.804-3.935.414-7.871.362-7.93l-.003-.004-7.93-9.116a1.276 1.276 0 0 1 1.88-1.725l8.566 8.86c0 .002 3.833 3.966 7.666 0 3.41-3.526 1.513-7.052 1.052-7.79a1.602 1.602 0 0 0-.212-.263l-9.497-9.825a1.378 1.378 0 1 1 1.982-1.916l9.55 9.88s3.834 3.966 7.667 0c3.833-3.965.362-7.93.362-7.93l-9.061-9.937a1.397 1.397 0 0 1 2.037-1.913l8.579 8.875s4.792 3.966 7.666 0c2.875-3.966 0-7.931 0-7.931l-7.666-7.931c.767.793-20.125-21.481-30.667-32.717 0 0-20.125-18.837-38.334 0-18.208 18.837-3.833 33.708-3.833 33.708Z"
      />
      <g filter="url(#b)">
        <rect
          width={23.195}
          height={12.669}
          fill="#4A8FE7"
          rx={6.334}
          transform="scale(.9829 1.01682) rotate(-45 70.963 14.468)"
        />
      </g>
      <g filter="url(#c)">
        <rect
          width={28.505}
          height={12.396}
          fill="#4A8FE7"
          rx={6.198}
          transform="scale(.9829 1.01682) rotate(-45 88.738 8.422)"
        />
      </g>
      <g filter="url(#d)">
        <rect
          width={23.989}
          height={12.296}
          fill="#4A8FE7"
          rx={6.148}
          transform="matrix(.69501 -.719 .69501 .719 29.35 76.689)"
        />
      </g>
      <g filter="url(#e)">
        <rect
          width={17.129}
          height={12.505}
          fill="#4A8FE7"
          rx={6.252}
          transform="matrix(.69501 -.719 .69501 .719 39.062 86.736)"
        />
      </g>
      <g filter="url(#f)">
        <path
          fill="#4A8FE7"
          d="m58.27 10.901-12.886 20.35c-.09.142-.165.291-.215.452-.362 1.153-1.655 6.174 2.575 7.924 4.765 1.972 7.634-1.938 7.667-1.982l.002-.003 9.02-12.497a2.421 2.421 0 0 1 3.721-.247l21.67 22.906c.82.867 2.141.997 3.024.194 1.957-1.78 5.231-5.35 7.026-10.584 3.034-8.854 1.258-22.658-6.896-29.512-7-5.884-15.97-6.819-22.813-5.188-7.859 1.873-11.609 7.727-11.865 8.14l-.005.008-.025.039Z"
        />
      </g>
    </g>
    <defs>
      <filter
        id="a"
        width={105.264}
        height={100.985}
        x={0}
        y={2}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_54_3692" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_3692" result="shape" />
      </filter>
      <filter
        id="b"
        width={27.768}
        height={28.45}
        x={8.953}
        y={41.322}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_54_3692" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_3692" result="shape" />
      </filter>
      <filter
        id="c"
        width={31.38}
        height={32.187}
        x={18.216}
        y={48.426}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_54_3692" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_3692" result="shape" />
      </filter>
      <filter
        id="d"
        width={28.212}
        height={28.91}
        x={27.854}
        y={62.031}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_54_3692" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_3692" result="shape" />
      </filter>
      <filter
        id="e"
        width={23.505}
        height={24.04}
        x={37.607}
        y={77.053}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_54_3692" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_3692" result="shape" />
      </filter>
      <filter
        id="f"
        width={56.565}
        height={50.533}
        x={44.699}
        y={2}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_54_3692" />
      </filter>
    </defs>
  </svg>
);

export default LogoWhite;

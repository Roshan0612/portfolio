"use client";

interface RoomIllustrationProps {
  progress: number;
}

export default function RoomIllustration({
  progress,
}: RoomIllustrationProps) {
  /*
   * Camera shots
   *
   * 0.00 → 0.28
   * Wide establishing shot
   *
   * 0.28 → 0.50
   * Side camera movement
   *
   * 0.50 → 0.72
   * Desk approach
   *
   * 0.72 → 1.00
   * Monitor close-up
   */

  const cameraX =
    progress < 0.28
      ? progress * 20
      : progress < 0.5
      ? 5.6 - (progress - 0.28) * 10
      : progress < 0.72
      ? 3.4 - (progress - 0.5) * 5
      : 2.3;

  const cameraScale =
    progress < 0.5
      ? 1 + progress * 0.15
      : progress < 0.72
      ? 1.075 + (progress - 0.5) * 1.2
      : 1.34;

  const cameraRotate =
    progress < 0.28
      ? progress * 2
      : progress < 0.5
      ? 0.56 - (progress - 0.28) * 4
      : progress < 0.72
      ? -0.32 + (progress - 0.5) * 1.5
      : 0;

  return (
    <div
      className="room-illustration"
      style={{
        transform: `
          translate3d(${cameraX}px, 0, 0)
          scale(${cameraScale})
          rotateY(${cameraRotate}deg)
        `,
      }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="room-svg"
      >
        <defs>

          {/* =================================================
              SKY
          ================================================= */}

          <linearGradient
            id="skyGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#f5b86b"
            />

            <stop
              offset="48%"
              stopColor="#ffdca3"
            />

            <stop
              offset="100%"
              stopColor="#c97855"
            />
          </linearGradient>

          {/* =================================================
              WALL
          ================================================= */}

          <linearGradient
            id="wallGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#c9a47e"
            />

            <stop
              offset="45%"
              stopColor="#a87c61"
            />

            <stop
              offset="100%"
              stopColor="#684d47"
            />
          </linearGradient>

          {/* =================================================
              FLOOR
          ================================================= */}

          <linearGradient
            id="floorGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#73523e"
            />

            <stop
              offset="100%"
              stopColor="#211b1a"
            />
          </linearGradient>

          {/* =================================================
              WOOD
          ================================================= */}

          <linearGradient
            id="woodGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#80543a"
            />

            <stop
              offset="45%"
              stopColor="#4e3024"
            />

            <stop
              offset="100%"
              stopColor="#241914"
            />
          </linearGradient>

          {/* =================================================
              GLASS
          ================================================= */}

          <linearGradient
            id="glassGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="rgba(255,255,255,0.18)"
            />

            <stop
              offset="45%"
              stopColor="rgba(255,255,255,0.04)"
            />

            <stop
              offset="100%"
              stopColor="rgba(100,150,190,0.12)"
            />
          </linearGradient>

          {/* =================================================
              MONITOR
          ================================================= */}

          <linearGradient
            id="monitorGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#292b2f"
            />

            <stop
              offset="50%"
              stopColor="#101113"
            />

            <stop
              offset="100%"
              stopColor="#050506"
            />
          </linearGradient>

          {/* =================================================
              PLANT
          ================================================= */}

          <linearGradient
            id="leafGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#779f69"
            />

            <stop
              offset="55%"
              stopColor="#315538"
            />

            <stop
              offset="100%"
              stopColor="#14291d"
            />
          </linearGradient>

          {/* =================================================
              LIGHT
          ================================================= */}

          <radialGradient
            id="sunGlow"
          >
            <stop
              offset="0%"
              stopColor="#fff5d1"
              stopOpacity="0.8"
            />

            <stop
              offset="60%"
              stopColor="#ffc978"
              stopOpacity="0.25"
            />

            <stop
              offset="100%"
              stopColor="#ffb45c"
              stopOpacity="0"
            />
          </radialGradient>

          {/* =================================================
              SHADOW
          ================================================= */}

          <filter
            id="softShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="20"
              floodColor="#120d0b"
              floodOpacity="0.55"
            />
          </filter>

          {/* =================================================
              ROOM GRAIN
          ================================================= */}

          <filter id="roomTexture">

            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              stitchTiles="stitch"
            />

            <feColorMatrix
              type="saturate"
              values="0"
            />

            <feComponentTransfer>

              <feFuncA
                type="table"
                tableValues="0 0.04"
              />

            </feComponentTransfer>

          </filter>

        </defs>

        {/* ===================================================
            ROOM BASE
        =================================================== */}

        <rect
          width="1600"
          height="900"
          fill="url(#wallGradient)"
        />

        {/* ===================================================
            WINDOW / CITY
        =================================================== */}

        <g className="room-layer-background">

          <rect
            x="180"
            y="100"
            width="620"
            height="500"
            rx="4"
            fill="#18191c"
            filter="url(#softShadow)"
          />

          <rect
            x="200"
            y="120"
            width="580"
            height="460"
            fill="url(#skyGradient)"
          />

          {/* sun */}

          <circle
            cx="310"
            cy="250"
            r="180"
            fill="url(#sunGlow)"
          />

          <circle
            cx="310"
            cy="250"
            r="42"
            fill="#ffe4a4"
          />

          {/* distant city */}

          <g opacity="0.75">

            <rect
              x="210"
              y="420"
              width="80"
              height="160"
              fill="#aa7560"
            />

            <rect
              x="300"
              y="350"
              width="110"
              height="230"
              fill="#8b6259"
            />

            <rect
              x="425"
              y="390"
              width="70"
              height="190"
              fill="#795a55"
            />

            <rect
              x="510"
              y="310"
              width="130"
              height="270"
              fill="#765755"
            />

            <rect
              x="655"
              y="375"
              width="120"
              height="205"
              fill="#654d4c"
            />

          </g>

          {/* window frame */}

          <rect
            x="485"
            y="120"
            width="12"
            height="460"
            fill="#50372f"
          />

          <rect
            x="200"
            y="330"
            width="580"
            height="12"
            fill="#50372f"
          />

          {/* glass reflections */}

          <path
            d="
              M220 140
              L430 140
              L300 560
              L220 560
              Z
            "
            fill="url(#glassGradient)"
            opacity="0.6"
          />

        </g>

        {/* ===================================================
            WALL ART
        =================================================== */}

        <g
          className="room-layer-mid"
          filter="url(#softShadow)"
        >

          <rect
            x="930"
            y="120"
            width="140"
            height="190"
            fill="#3c2925"
          />

          <rect
            x="945"
            y="135"
            width="110"
            height="160"
            fill="#a96d58"
          />

          <circle
            cx="1000"
            cy="190"
            r="32"
            fill="#e29b67"
          />

          <path
            d="
              M960 260
              Q1000 205 1040 260
            "
            stroke="#46332e"
            strokeWidth="12"
            fill="none"
          />

          <rect
            x="1090"
            y="160"
            width="100"
            height="130"
            fill="#302522"
          />

          <rect
            x="1100"
            y="170"
            width="80"
            height="110"
            fill="#80604c"
          />

        </g>

        {/* ===================================================
            SHELF
        =================================================== */}

        <g
          className="room-layer-mid"
          filter="url(#softShadow)"
        >

          <rect
            x="1120"
            y="80"
            width="350"
            height="25"
            fill="url(#woodGradient)"
          />

          <rect
            x="1135"
            y="270"
            width="335"
            height="25"
            fill="url(#woodGradient)"
          />

          {/* books */}

          <rect
            x="1150"
            y="130"
            width="28"
            height="120"
            fill="#6b4034"
          />

          <rect
            x="1180"
            y="145"
            width="32"
            height="105"
            fill="#4b5e66"
          />

          <rect
            x="1215"
            y="120"
            width="24"
            height="130"
            fill="#b77a4c"
          />

          {/* speaker */}

          <rect
            x="1280"
            y="135"
            width="90"
            height="115"
            rx="8"
            fill="#171719"
          />

          <circle
            cx="1325"
            cy="175"
            r="25"
            fill="#303136"
          />

          <circle
            cx="1325"
            cy="175"
            r="14"
            fill="#101114"
          />

          <circle
            cx="1325"
            cy="220"
            r="14"
            fill="#303136"
          />

        </g>

        {/* ===================================================
            PLANTS
        =================================================== */}

        <g
          className="room-layer-mid"
        >

          {/* left pot */}

          <path
            d="
              M90 690
              L210 690
              L190 820
              L110 820
              Z
            "
            fill="#79533f"
          />

          {/* leaves */}

          <g fill="url(#leafGradient)">

            <ellipse
              cx="150"
              cy="650"
              rx="90"
              ry="28"
              transform="rotate(-35 150 650)"
            />

            <ellipse
              cx="130"
              cy="620"
              rx="80"
              ry="25"
              transform="rotate(30 130 620)"
            />

            <ellipse
              cx="200"
              cy="600"
              rx="90"
              ry="28"
              transform="rotate(-20 200 600)"
            />

            <ellipse
              cx="170"
              cy="560"
              rx="80"
              ry="25"
              transform="rotate(45 170 560)"
            />

            <ellipse
              cx="230"
              cy="530"
              rx="75"
              ry="24"
              transform="rotate(-30 230 530)"
            />

          </g>

          {/* small plants on desk */}

          <circle
            cx="730"
            cy="470"
            r="35"
            fill="#704b3b"
          />

          <path
            d="
              M730 460
              Q690 400 705 350
              Q730 420 735 450
              Q760 390 780 375
              Q770 440 740 465
            "
            fill="url(#leafGradient)"
          />

        </g>

        {/* ===================================================
            DESK
        =================================================== */}

        <g
          className="room-layer-desk"
          filter="url(#softShadow)"
        >

          <path
            d="
              M420 540
              L1160 540
              L1220 580
              L360 580
              Z
            "
            fill="url(#woodGradient)"
          />

          <path
            d="
              M420 580
              L1150 580
              L1100 820
              L470 820
              Z
            "
            fill="#3a261e"
          />

          {/* desk edge */}

          <rect
            x="380"
            y="570"
            width="790"
            height="18"
            fill="#1f1512"
          />

          {/* keyboard */}

          <rect
            x="670"
            y="525"
            width="210"
            height="35"
            rx="5"
            fill="#151619"
          />

          {/* keyboard highlights */}

          <g opacity="0.5">

            {Array.from({
              length: 28,
            }).map((_, i) => (
              <rect
                key={i}
                x={680 + (i % 7) * 27}
                y={
                  532 +
                  Math.floor(i / 7) * 7
                }
                width="18"
                height="4"
                rx="1"
                fill="#55585e"
              />
            ))}

          </g>

          {/* mouse */}

          <ellipse
            cx="915"
            cy="542"
            rx="22"
            ry="30"
            fill="#1b1c20"
          />

        </g>

        {/* ===================================================
            MAIN MONITOR
        =================================================== */}

        <g
          className="room-layer-monitor"
          filter="url(#softShadow)"
        >

          <rect
            x="610"
            y="275"
            width="470"
            height="285"
            rx="15"
            fill="url(#monitorGradient)"
          />

          <rect
            x="630"
            y="295"
            width="430"
            height="245"
            rx="5"
            fill="#071019"
          />

          {/* monitor reflection */}

          <path
            d="
              M640 305
              L850 305
              L720 535
              L640 535
              Z
            "
            fill="#ffffff"
            opacity="0.035"
          />

          {/* monitor stand */}

          <rect
            x="815"
            y="555"
            width="60"
            height="90"
            fill="#151619"
          />

          <ellipse
            cx="845"
            cy="650"
            rx="120"
            ry="20"
            fill="#111214"
          />

        </g>

        {/* ===================================================
            SECOND MONITOR
        =================================================== */}

        <g
          className="room-layer-desk"
          filter="url(#softShadow)"
        >

          <rect
            x="390"
            y="340"
            width="210"
            height="145"
            rx="8"
            fill="#151619"
          />

          <rect
            x="405"
            y="355"
            width="180"
            height="115"
            fill="#263d4a"
          />

          <path
            d="
              M415 445
              L460 400
              L500 430
              L535 385
              L580 445
              Z
            "
            fill="#6e9d73"
          />

          <rect
            x="480"
            y="485"
            width="30"
            height="45"
            fill="#151619"
          />

        </g>

        {/* ===================================================
            SPEAKERS
        =================================================== */}

        <g
          className="room-layer-foreground"
          filter="url(#softShadow)"
        >

          <rect
            x="1120"
            y="570"
            width="90"
            height="230"
            rx="8"
            fill="#202124"
          />

          <circle
            cx="1165"
            cy="650"
            r="40"
            fill="#0e0f11"
          />

          <circle
            cx="1165"
            cy="650"
            r="22"
            fill="#34363b"
          />

          <circle
            cx="1165"
            cy="735"
            r="20"
            fill="#101113"
          />

        </g>

        {/* ===================================================
            CHAIR
        =================================================== */}

        <g
          className="room-layer-foreground"
          filter="url(#softShadow)"
        >

          <path
            d="
              M720 590
              Q760 550 830 570
              L870 760
              Q800 805 735 760
              Z
            "
            fill="#202124"
          />

          <ellipse
            cx="800"
            cy="760"
            rx="95"
            ry="35"
            fill="#151619"
          />

          <rect
            x="790"
            y="760"
            width="20"
            height="100"
            fill="#111214"
          />

        </g>

        {/* ===================================================
            FLOOR
        =================================================== */}

        <path
          d="
            M0 700
            L1600 650
            L1600 900
            L0 900
            Z
          "
          fill="url(#floorGradient)"
        />

        {/* sunlight on floor */}

        <path
          d="
            M150 600
            L750 600
            L980 900
            L0 900
            Z
          "
          fill="#e9a46a"
          opacity="0.08"
        />

        {/* floor boards */}

        <g opacity="0.12">

          <path
            d="M0 760 L1600 720"
            stroke="#d5a07c"
            strokeWidth="3"
          />

          <path
            d="M0 820 L1600 780"
            stroke="#d5a07c"
            strokeWidth="3"
          />

          <path
            d="M300 700 L500 900"
            stroke="#d5a07c"
            strokeWidth="3"
          />

          <path
            d="M700 680 L850 900"
            stroke="#d5a07c"
            strokeWidth="3"
          />

        </g>

        {/* ===================================================
            ATMOSPHERIC GRAIN
        =================================================== */}

        <rect
          width="1600"
          height="900"
          filter="url(#roomTexture)"
          opacity="0.5"
        />

      </svg>
    </div>
  );
}
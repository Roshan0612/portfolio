import React, { useEffect, useState } from 'react';

const PROFILE_IMAGE =
  'https://res.cloudinary.com/dswa5docr/image/upload/v1767027372/headshot_roshan_portfolio_lwgaci.jpg';

const IntroAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [falling, setFalling] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 650),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1550),
      setTimeout(() => setPhase(5), 2000),

      // Start falling
      setTimeout(() => setFalling(true), 2600),

      // Remove intro after elements have fallen
      setTimeout(() => setClosing(true), 3700),

      // Hero is now visible
      setTimeout(() => onComplete(), 4200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const firstName = 'ROSHAN';
  const lastName = 'GAWADE';

  const getLetterStyle = (index, type) => {
    if (!falling) {
      return {
        opacity: phase >= (type === 'first' ? 3 : 4) ? 1 : 0,
        transform:
          phase >= (type === 'first' ? 3 : 4)
            ? 'translateY(0)'
            : 'translateY(45px)',
        filter:
          phase >= (type === 'first' ? 3 : 4)
            ? 'blur(0)'
            : 'blur(4px)',
      };
    }

    const delays =
      type === 'first'
        ? [0, 60, 125, 185, 245, 310]
        : [90, 155, 220, 290, 360, 430];

    const delay = delays[index] || index * 60;

    const animationDuration = 900;

    const elapsed = Math.max(
      0,
      performance.now() -
        (window.__introFallStart || performance.now()) -
        delay
    );

    const progress = Math.min(
      1,
      elapsed / animationDuration
    );

    /*
     * Ease-in gravity:
     * Starts slowly, then accelerates.
     */
    const gravityProgress = progress * progress;

    const distance =
      gravityProgress *
      (window.innerHeight * 0.95);

    /*
     * Extremely small rotation.
     * No sideways movement.
     */
    const rotation =
      Math.sin(index * 1.7) *
      progress *
      2.5;

    const opacity =
      progress > 0.7
        ? 1 - (progress - 0.7) / 0.3
        : 1;

    return {
      opacity,
      transform: `
        translate3d(0, ${distance}px, 0)
        rotate(${rotation}deg)
      `,
      filter: `blur(${progress * 1.5}px)`,
    };
  };

  useEffect(() => {
    if (!falling) return;

    window.__introFallStart = performance.now();

    let frame;

    const refresh = () => {
      setPhase((value) => value + 0.0001);
      frame = requestAnimationFrame(refresh);
    };

    frame = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(frame);
      delete window.__introFallStart;
    };
  }, [falling]);

  return (
    <div
      className={`
        fixed inset-0
        z-[9999]

        overflow-hidden

        flex
        items-center
        justify-center

        bg-gradient-to-br
        from-gray-950
        via-gray-900
        to-black

        transition-opacity
        duration-500

        ${
          closing
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }
      `}
    >
      {/* ===============================================
          SOFT HERO-LIKE AMBIENT LIGHT
      ================================================ */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[500px]
          h-[500px]

          rounded-full

          bg-teal-500/[0.035]

          blur-[120px]

          pointer-events-none
        "
      />

      {/* ===============================================
          CONTENT
      ================================================ */}

      <div className="relative z-10 flex flex-col items-center">

        {/* =============================================
            PHOTO
        ============================================== */}

        <div
          className={`
            relative
            mb-7

            transition-all
            duration-[1100ms]

            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              !falling
                ? phase >= 2
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-90'
                : ''
            }
          `}
          style={
            falling
              ? {
                  transform:
                    'translate3d(0, 800px, 0) rotate(2deg)',
                  opacity: 0,
                  transition:
                    'transform 1.05s cubic-bezier(0.55,0.05,0.85,0.35), opacity 0.55s ease-in 0.55s',
                }
              : undefined
          }
        >

          {/* Teal glow */}

          <div
            className="
              absolute
              -inset-4

              rounded-full

              bg-teal-400/10

              blur-2xl

              opacity-60
            "
          />

          {/* Outer ring */}

          <div
            className={`
              absolute
              -inset-3

              rounded-full

              border
              border-teal-400/20

              transition-all
              duration-1000

              ${
                phase >= 3
                  ? 'scale-110 opacity-100'
                  : 'scale-90 opacity-0'
              }
            `}
          />

          {/* Photo */}

          <div
            className="
              relative

              w-28
              h-28

              sm:w-32
              sm:h-32

              md:w-36
              md:h-36

              rounded-full

              overflow-hidden

              border
              border-teal-400/40

              bg-gray-950

              shadow-[0_0_60px_rgba(45,212,191,0.12)]
            "
          >
            <img
              src={PROFILE_IMAGE}
              alt="Roshan Gawade"
              className="
                w-full
                h-full

                object-cover

                transition-transform
                duration-1000

                hover:scale-105
              "
            />
          </div>
        </div>

        {/* =============================================
            SOFTWARE ENGINEER
        ============================================== */}

        <div
          className={`
            transition-all
            duration-700

            ${
              falling
                ? 'opacity-0'
                : phase >= 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }
          `}
        >
          <span
            className="
              text-[9px]
              sm:text-[10px]

              tracking-[0.55em]

              uppercase

              text-teal-400/70
            "
          >
            Software Engineer
          </span>
        </div>

        {/* =============================================
            ROSHAN
        ============================================== */}

        <div className="flex mt-4 overflow-visible">

          {firstName.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="
                inline-block

                text-5xl
                sm:text-7xl
                md:text-8xl

                font-bold

                tracking-[-0.06em]

                text-white

                will-change-transform
              "
              style={{
                ...getLetterStyle(
                  index,
                  'first'
                ),

                transition:
                  falling
                    ? 'none'
                    : `
                      opacity 700ms ease,
                      transform 700ms
                      cubic-bezier(0.22,1,0.36,1),
                      filter 700ms ease
                    `,

                transitionDelay:
                  falling
                    ? '0ms'
                    : `${index * 65}ms`,
              }}
            >
              {letter}
            </span>
          ))}

        </div>

        {/* =============================================
            DIVIDER
        ============================================== */}

        <div
          className={`
            flex
            items-center
            justify-center

            mt-3

            transition-all
            duration-700

            ${
              falling
                ? 'opacity-0'
                : phase >= 3
                ? 'opacity-100 scale-x-100'
                : 'opacity-0 scale-x-0'
            }
          `}
        >
          <div className="w-10 sm:w-20 h-px bg-teal-400/20" />

          <div
            className="
              mx-3

              w-1.5
              h-1.5

              rounded-full

              bg-teal-400

              shadow-[0_0_10px_rgba(45,212,191,0.5)]
            "
          />

          <div className="w-10 sm:w-20 h-px bg-teal-400/20" />
        </div>

        {/* =============================================
            GAWADe
        ============================================== */}

        <div className="flex mt-4">

          {lastName.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="
                inline-block

                text-xs
                sm:text-lg
                md:text-xl

                font-medium

                text-gray-400

                uppercase

                will-change-transform
              "
              style={{
                ...getLetterStyle(
                  index,
                  'last'
                ),

                letterSpacing:
                  phase >= 4
                    ? '0.45em'
                    : '0.8em',

                transition:
                  falling
                    ? 'none'
                    : 'all 900ms ease-out',
              }}
            >
              {letter}
            </span>
          ))}

        </div>

        {/* =============================================
            ROLE
        ============================================== */}

        <div
          className={`
            mt-8

            transition-all
            duration-700

            ${
              falling
                ? 'opacity-0 translate-y-5'
                : phase >= 5
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }
          `}
        >
          <span
            className="
              text-[9px]
              sm:text-xs

              tracking-[0.35em]

              uppercase

              text-gray-600
            "
          >
            Full-Stack Developer
          </span>
        </div>

      </div>
    </div>
  );
};

export default IntroAnimation;
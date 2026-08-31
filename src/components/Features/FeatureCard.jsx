import { forwardRef, useRef } from "react";

const FeatureCard = forwardRef(
  (
    {
      title = "",
      description = "",
      icon = "",
      bgColor = "",
      borderColor = "#e5e7eb",
      borderWidth = 1,
      radius = {
        topLeft: 180,
        topRight: 0,
        bottomRight: 180,
        bottomLeft: 180,
      },
    },
    ref
  ) => {
    const cardInnerRef = useRef(null);

    function handleMouseMove(e) {
      if (!cardInnerRef.current) return;
      const rect = cardInnerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardInnerRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardInnerRef.current.style.setProperty("--mouse-y", `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      cardInnerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    function handleMouseLeave() {
      if (!cardInnerRef.current) return;
      cardInnerRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }

    const shapeRadius = `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`;

    return (
      <div
        ref={ref}
        className="feature-card-outer relative group/outer cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardInnerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="feature-card relative w-full min-h-[129px] transition-transform duration-300 ease-out will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-0 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] group-hover/outer:shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-500 overflow-hidden"
            style={{
              borderRadius: shapeRadius,
              border: `${borderWidth}px solid ${borderColor}`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover/outer:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 44, 90, 0.08), transparent 70%)",
              }}
            />
          </div>

          <div
            className="relative z-10 flex items-center justify-between gap-6 px-12 py-7 h-full"
            style={{ transform: "translateZ(25px)" }}
          >
            <div
              className={`feature-icon w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center p-2.5 border border-slate-100 shadow-inner transition-all duration-500 group-hover/outer:scale-105 group-hover/outer:rotate-2 ${bgColor}`}
            >
              <img src={icon} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="text-right flex-1">
              <h3 className="text-xl font-bold text-[#002C5A] mb-2.5 transition-colors duration-300 group-hover/outer:text-[#38B793]">
                {title}
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
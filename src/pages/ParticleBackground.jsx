import React, { useEffect, useRef } from "react";

const ParticleBackground = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    const CONFIG = {
      baseDensity: 0.12,
      maxSpeed: 0.6,
      radius: [1.0, 2.2],
      linkDist: 110,
      linkAlpha: 0.16,
      mouseInfluence: 110,
      repelStrength: 0.35,
      clickBurst: 120,
      colorParticle: "#c9e7ff",
      colorLink: "#7dd3fc",
    };

    let DPR = Math.max(
      1,
      Math.min(2, window.devicePixelRatio || 1)
    );

    let W = 0;
    let H = 0;
    let particles = [];
    let targetCount = 0;
    let animationId;

    const mouse = {
      x: null,
      y: null,
    };

    const rand = (min, max) =>
      Math.random() * (max - min) + min;

    const clamp = (value, min, max) =>
      Math.max(min, Math.min(max, value));

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(randomPos = false) {
        this.x = randomPos
          ? rand(0, W)
          : Math.random() < 0.5
          ? 0
          : W;

        this.y = rand(0, H);

        const angle = rand(0, Math.PI * 2);
        const speed = rand(
          0.05,
          CONFIG.maxSpeed
        );

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.r =
          rand(
            CONFIG.radius[0],
            CONFIG.radius[1]
          ) * DPR;
      }

      step(mx, my) {
        if (mx !== null && my !== null) {
          const dx = this.x - mx;
          const dy = this.y - my;

          const d2 = dx * dx + dy * dy;
          const radius =
            CONFIG.mouseInfluence * DPR;

          if (d2 < radius * radius) {
            const distance =
              Math.sqrt(d2) || 0.001;

            const ux = dx / distance;
            const uy = dy / distance;

            const strength =
              CONFIG.repelStrength;

            this.vx +=
              ux *
              strength *
              (1 - distance / radius);

            this.vy +=
              uy *
              strength *
              (1 - distance / radius);
          }
        }

        const speed = Math.hypot(
          this.vx,
          this.vy
        );

        if (speed > CONFIG.maxSpeed) {
          this.vx *= CONFIG.maxSpeed / speed;
          this.vy *= CONFIG.maxSpeed / speed;
        }

        this.x += this.vx * DPR;
        this.y += this.vy * DPR;

        if (this.x < -50) this.x = W + 50;
        if (this.x > W + 50) this.x = -50;

        if (this.y < -50) this.y = H + 50;
        if (this.y > H + 50) this.y = -50;
      }

      draw() {
        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.r,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          CONFIG.colorParticle;

        ctx.globalAlpha = 0.9;
        ctx.fill();
      }
    }

    const computeParticlesCount = () => {
      const area =
        (W * H) / (DPR * DPR);

      targetCount = Math.round(
        CONFIG.baseDensity *
          (area / 10000)
      );

      targetCount = clamp(
        targetCount,
        40,
        220
      );

      if (
        particles.length <
        targetCount
      ) {
        const add =
          targetCount -
          particles.length;

        for (let i = 0; i < add; i++) {
          particles.push(
            new Particle()
          );
        }
      } else if (
        particles.length >
        targetCount
      ) {
        particles.length =
          targetCount;
      }
    };

    const resize = () => {
      DPR = Math.max(
        1,
        Math.min(
          2,
          window.devicePixelRatio || 1
        )
      );

      W =
        canvas.width =
          Math.floor(
            window.innerWidth * DPR
          );

      H =
        canvas.height =
          Math.floor(
            window.innerHeight * DPR
          );

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      computeParticlesCount();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX * DPR;
      mouse.y = e.clientY * DPR;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      const mx = e.clientX * DPR;
      const my = e.clientY * DPR;

      for (const particle of particles) {
        const dx = particle.x - mx;
        const dy = particle.y - my;

        const distanceSquared =
          dx * dx + dy * dy;

        const radius =
          CONFIG.mouseInfluence * DPR;

        if (
          distanceSquared <
          radius * radius
        ) {
          const distance =
            Math.sqrt(
              distanceSquared
            ) || 0.001;

          const ux = dx / distance;
          const uy = dy / distance;

          particle.vx +=
            ux *
            (CONFIG.clickBurst / 100);

          particle.vy +=
            uy *
            (CONFIG.clickBurst / 100);
        }
      }
    };

    const drawLinks = () => {
      ctx.lineWidth = 1 * DPR;
      ctx.strokeStyle =
        CONFIG.colorLink;

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance =
            Math.hypot(dx, dy);

          if (
            distance <
            CONFIG.linkDist * DPR
          ) {
            const alpha =
              CONFIG.linkAlpha *
              (1 -
                distance /
                  (CONFIG.linkDist *
                    DPR));

            ctx.globalAlpha = alpha;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((particle) => {
        particle.step(
          mouse.x,
          mouse.y
        );
      });

      drawLinks();

      particles.forEach((particle) => {
        particle.draw();
      });

      animationId =
        requestAnimationFrame(loop);
    };

    resize();

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    computeParticlesCount();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "click",
      handleClick
    );

    loop();

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: `
          radial-gradient(
            1200px 600px at 20% 20%,
            rgba(56, 189, 248, 0.1),
            transparent 60%
          ),
          radial-gradient(
            1000px 500px at 80% 30%,
            rgba(124, 58, 237, 0.1),
            transparent 60%
          ),
          #0b1220
        `,
      }}
    >
      {/* Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Login / Page content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParticleBackground;
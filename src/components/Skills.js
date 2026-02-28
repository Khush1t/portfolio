import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Frontend & UI
import { FaReact, FaAngular } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiMaterialdesign,
  SiVscodium,
} from 'react-icons/si';

// Backend & Languages
import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiCplusplus, SiPostgresql } from 'react-icons/si';

// Tools & Platforms
import { FaGitAlt } from 'react-icons/fa';
import {
  SiApachekafka,
  SiRedis,
  SiJsonwebtokens,
  SiPostman,
  SiIntellijidea,
} from 'react-icons/si';

// DevOps & Cloud
import { FaAws } from 'react-icons/fa';
import { SiSubversion } from 'react-icons/si';

const FREE_SIDE_PADDING = 8;
const FREE_TOP_PADDING = 16;
const FREE_BOTTOM_PADDING = 8;
const MAX_TILT = 0;

const getFreeBounds = (bounds, metrics) => {
  const { cardWidth, cardHeight } = metrics;

  const rotationInset =
    (Math.abs(cardWidth * Math.cos(MAX_TILT)) + Math.abs(cardHeight * Math.sin(MAX_TILT)) - cardWidth) /
    2;

  return {
    minX: -bounds.width / 2 + cardWidth / 2 + FREE_SIDE_PADDING + rotationInset,
    maxX: bounds.width / 2 - cardWidth / 2 - FREE_SIDE_PADDING - rotationInset,
    minY: -bounds.height / 2 + cardHeight / 2 + FREE_TOP_PADDING,
    maxY: bounds.height / 2 - cardHeight / 2 - FREE_BOTTOM_PADDING,
  };
};

const getFreeMetrics = (width) => {
  if (width < 420) {
    return { cardWidth: 120, cardHeight: 44, gapX: 8, gapY: 8 };
  }

  if (width < 768) {
    return { cardWidth: 132, cardHeight: 48, gapX: 9, gapY: 9 };
  }

  return { cardWidth: 146, cardHeight: 54, gapX: 10, gapY: 10 };
};

const clampFreePosition = (position, bounds, metrics) => {
  if (!bounds.width || !bounds.height) return position;
  const { minX, maxX, minY, maxY } = getFreeBounds(bounds, metrics);

  return {
    x: Math.max(minX, Math.min(maxX, position.x)),
    y: Math.max(minY, Math.min(maxY, position.y)),
  };
};

const createFreeBodies = (count, bounds, metrics, previousBodies = []) => {
  const { cardWidth, cardHeight, gapX, gapY } = metrics;

  if (!bounds.width || !bounds.height) {
    return Array.from({ length: count }, (_, index) => ({
      x: ((index % 4) - 1.5) * (cardWidth + gapX),
      y: -120 + Math.floor(index / 4) * (cardHeight + gapY),
      vx: 0,
      vy: 0,
      angle: 0,
      omega: 0,
      width: cardWidth,
      height: cardHeight,
    }));
  }

  if (previousBodies.length === count) {
    return previousBodies.map((body) => {
      const clamped = clampFreePosition({ x: body.x, y: body.y }, bounds, metrics);
      return {
        ...body,
        x: clamped.x,
        y: clamped.y,
        width: cardWidth,
        height: cardHeight,
      };
    });
  }

  const usableWidth = Math.max(0, bounds.width - FREE_SIDE_PADDING * 2);
  const cols = Math.max(2, Math.min(8, Math.floor((usableWidth + gapX) / (cardWidth + gapX))));
  const rows = Math.ceil(count / cols);
  const { minX, maxX, minY } = getFreeBounds(bounds, metrics);
  const startY = minY + 8;

  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const isLastRow = row === rows - 1;
    const itemsInRow = isLastRow ? count - row * cols || cols : cols;
    const x =
      itemsInRow === 1
        ? (minX + maxX) / 2
        : minX + (col * (maxX - minX)) / (itemsInRow - 1);
    const y = startY + row * (cardHeight + gapY);

    const clamped = clampFreePosition({ x, y }, bounds, metrics);

    return {
      x: clamped.x,
      y: clamped.y,
      vx: 0,
      vy: 0,
      angle: 0,
      omega: 0,
      width: cardWidth,
      height: cardHeight,
    };
  });
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mode, setMode] = useState('free');
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [freePositions, setFreePositions] = useState([]);

  const dragAreaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const freeBodiesRef = useRef([]);
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const pointerVelocityRef = useRef({ x: 0, y: 0 });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular', icon: FaAngular, color: '#C3002F', level: 90 },
        { name: 'React', icon: FaReact, color: '#61DAFB', level: 92 },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 95 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 90 },
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26', level: 95 },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6', level: 95 },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 90 },
        { name: 'Material-UI', icon: SiMaterialdesign, color: '#0081CB', level: 85 },
        { name: 'PrimeNG', icon: FaAngular, color: '#0C7C59', level: 80 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Java', icon: FaJava, color: '#007396', level: 90 },
        { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F', level: 88 },
        { name: 'REST APIs', icon: SiPostman, color: '#FF6C37', level: 92 },
        { name: 'Microservices', icon: SiSpringboot, color: '#FF5722', level: 85 },
        { name: 'SQL', icon: SiPostgresql, color: '#336791', level: 87 },
        { name: 'C/C++', icon: SiCplusplus, color: '#00599C', level: 80 },
      ],
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Apache Kafka', icon: SiApachekafka, color: '#231F20', level: 80 },
        { name: 'Redis', icon: SiRedis, color: '#DC382D', level: 82 },
        { name: 'JWT / OAuth 2.0', icon: SiJsonwebtokens, color: '#000000', level: 85 },
        { name: 'Log4j2', icon: FaJava, color: '#FF0000', level: 75 },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37', level: 90 },
        { name: 'IntelliJ IDEA', icon: SiIntellijidea, color: '#000000', level: 88 },
        { name: 'VS Code', icon: SiVscodium, color: '#007ACC', level: 92 },
      ],
    },
    {
      title: 'DevOps & Cloud',
      skills: [
        { name: 'AWS (EC2, RDS, S3)', icon: FaAws, color: '#FF9900', level: 80 },
        { name: 'Git/GitHub', icon: FaGitAlt, color: '#F05032', level: 95 },
        { name: 'SVN', icon: SiSubversion, color: '#809CC9', level: 75 },
        { name: 'CI/CD (basic)', icon: FaGitAlt, color: '#00C853', level: 70 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const allSkills = skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      ...skill,
      category: category.title,
    }))
  );

  const skillCount = allSkills.length;
  const freeMetrics = useMemo(() => getFreeMetrics(bounds.width), [bounds.width]);

  useEffect(() => {
    const area = dragAreaRef.current;
    if (!area) return;

    const measure = () => {
      setBounds({
        width: area.clientWidth,
        height: area.clientHeight,
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(area);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!bounds.width || !bounds.height) return;

    freeBodiesRef.current = createFreeBodies(skillCount, bounds, freeMetrics, freeBodiesRef.current);

    setFreePositions(
      freeBodiesRef.current.map((body) => ({
        x: body.x,
        y: body.y,
        angle: body.angle,
      }))
    );
  }, [bounds, skillCount, freeMetrics]);

  useEffect(() => {
    if (mode !== 'free' || !bounds.width || !bounds.height) return undefined;

    const step = () => {
      const { minX, maxX, minY, maxY } = getFreeBounds(bounds, freeMetrics);

      freeBodiesRef.current = freeBodiesRef.current.map((body) => {
        const nextBody = { ...body };
        const gravity = 0.58;

        nextBody.vy += gravity;
        nextBody.vx *= 0.995;
        nextBody.vy *= 0.996;
        nextBody.omega = 0;

        nextBody.x += nextBody.vx;
        nextBody.y += nextBody.vy;
        nextBody.angle += nextBody.omega;

        if (nextBody.x < minX) {
          nextBody.x = minX;
          nextBody.vx *= -0.38;
          nextBody.omega = 0;
        } else if (nextBody.x > maxX) {
          nextBody.x = maxX;
          nextBody.vx *= -0.38;
          nextBody.omega = 0;
        }

        if (nextBody.y < minY) {
          nextBody.y = minY;
          if (nextBody.vy < 0) nextBody.vy *= -0.25;
        }

        if (nextBody.y > maxY) {
          nextBody.y = maxY;
          if (nextBody.vy > 0) nextBody.vy *= -0.22;
          nextBody.vx *= 0.92;
          nextBody.omega = 0;

          if (Math.abs(nextBody.vy) < 0.24) {
            nextBody.vy = 0;
          }

          if (Math.abs(nextBody.vx) < 0.08) {
            nextBody.vx = 0;
          }

        }

        nextBody.angle = 0;

        return nextBody;
      });

      for (let pass = 0; pass < 6; pass += 1) {
        for (let i = 0; i < freeBodiesRef.current.length; i += 1) {
          for (let j = i + 1; j < freeBodiesRef.current.length; j += 1) {
            const bodyA = freeBodiesRef.current[i];
            const bodyB = freeBodiesRef.current[j];

            const deltaX = bodyB.x - bodyA.x;
            const deltaY = bodyB.y - bodyA.y;
            const overlapX = (bodyA.width + bodyB.width) / 2 - Math.abs(deltaX);
            const overlapY = (bodyA.height + bodyB.height) / 2 - Math.abs(deltaY);

            if (overlapX <= 0 || overlapY <= 0) continue;

            if (overlapX < overlapY) {
              const direction = deltaX >= 0 ? 1 : -1;
              const separation = (overlapX + 0.25) / 2;

              bodyA.x -= direction * separation;
              bodyB.x += direction * separation;

              const relVX = bodyB.vx - bodyA.vx;
              const impulse = relVX * 0.75;
              bodyA.vx += impulse * 0.5;
              bodyB.vx -= impulse * 0.5;
            } else {
              const direction = deltaY >= 0 ? 1 : -1;
              const separation = (overlapY + 0.25) / 2;

              bodyA.y -= direction * separation;
              bodyB.y += direction * separation;

              const relVY = bodyB.vy - bodyA.vy;
              const impulse = relVY * 0.72;
              bodyA.vy += impulse * 0.5;
              bodyB.vy -= impulse * 0.5;

              bodyA.omega = 0;
              bodyB.omega = 0;
            }

            const clampedA = clampFreePosition({ x: bodyA.x, y: bodyA.y }, bounds, freeMetrics);
            bodyA.x = clampedA.x;
            bodyA.y = clampedA.y;

            const clampedB = clampFreePosition({ x: bodyB.x, y: bodyB.y }, bounds, freeMetrics);
            bodyB.x = clampedB.x;
            bodyB.y = clampedB.y;
          }
        }
      }

      // Hard containment: ensure all boxes stay within bounds
      if (freeBodiesRef.current.length) {
        // Find actual occupied edges (in physics coordinates, card edges not centers)
        let leftEdge = Infinity;
        let rightEdge = -Infinity;

        for (const body of freeBodiesRef.current) {
          leftEdge = Math.min(leftEdge, body.x - body.width / 2);
          rightEdge = Math.max(rightEdge, body.x + body.width / 2);
        }

        // Container edges in physics coordinates
        const containerLeft = -bounds.width / 2 + FREE_SIDE_PADDING;
        const containerRight = bounds.width / 2 - FREE_SIDE_PADDING;

        // Calculate how much we need to shift to fit within container
        let shiftX = 0;
        if (leftEdge < containerLeft) {
          shiftX = containerLeft - leftEdge;
        } else if (rightEdge > containerRight) {
          shiftX = containerRight - rightEdge;
        }

        // Apply shift if needed
        if (Math.abs(shiftX) > 0.1) {
          freeBodiesRef.current = freeBodiesRef.current.map((body) => ({
            ...body,
            x: body.x + shiftX,
          }));
        }

        // Final clamp to ensure everything is within bounds
        freeBodiesRef.current = freeBodiesRef.current.map((body) => {
          const clamped = clampFreePosition({ x: body.x, y: body.y }, bounds, freeMetrics);
          return {
            ...body,
            x: clamped.x,
            y: clamped.y,
          };
        });
      }

      setFreePositions(
        freeBodiesRef.current.map((body) => ({
          x: body.x,
          y: body.y,
          angle: body.angle,
        }))
      );

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mode, bounds, freeMetrics]);

  const applyRipple = (event) => {
    if (mode !== 'free') return;

    const area = dragAreaRef.current;
    if (!area || !bounds.width || !bounds.height) return;

    const rect = area.getBoundingClientRect();
    const cursorX = event.clientX - rect.left - rect.width / 2;
    const cursorY = event.clientY - rect.top - rect.height / 2;

    const now = performance.now();

    const previous = lastPointerRef.current;
    lastPointerRef.current = { x: cursorX, y: cursorY, time: now };

    if (!previous.time) return;

    const dt = Math.max(16, now - previous.time);
    const moveX = cursorX - previous.x;
    const moveY = cursorY - previous.y;
    const instantaneousVX = moveX / dt;
    const instantaneousVY = moveY / dt;

    pointerVelocityRef.current = {
      x: pointerVelocityRef.current.x * 0.45 + instantaneousVX * 0.55,
      y: pointerVelocityRef.current.y * 0.45 + instantaneousVY * 0.55,
    };

    const velocityX = pointerVelocityRef.current.x;
    const velocityY = pointerVelocityRef.current.y;
    const speed = Math.hypot(velocityX, velocityY) * 1000;
    const speedFactor = Math.min(2.2, speed / 1000);

    if (speedFactor < 0.06) return;

    const directionNorm = Math.max(0.001, Math.hypot(velocityX, velocityY));
    const directionX = velocityX / directionNorm;
    const directionY = velocityY / directionNorm;

    const rippleRadius = 100 + speedFactor * 80;
    const baseImpulse = 5.5 + speedFactor * 5.5;

    freeBodiesRef.current = freeBodiesRef.current.map((body) => {
      const deltaX = body.x - cursorX;
      const deltaY = body.y - cursorY;
      const distance = Math.max(1, Math.hypot(deltaX, deltaY));

      if (distance > rippleRadius) {
        return body;
      }

      const falloff = Math.pow(1 - distance / rippleRadius, 2);

      const normalizeX = deltaX / distance;
      const normalizeY = deltaY / distance;
      const alignment = Math.max(0, normalizeX * directionX + normalizeY * directionY);
      const impulse = baseImpulse * falloff * (0.8 + alignment * 0.4);

      const nextBody = { ...body };
      nextBody.vx += normalizeX * impulse * 0.24 + directionX * impulse * 0.14;
      nextBody.vy += normalizeY * impulse * 0.12 + directionY * impulse * 0.06;
      nextBody.vy -= impulse * 0.62;
      nextBody.omega = 0;

      const clamped = clampFreePosition({ x: nextBody.x, y: nextBody.y }, bounds, freeMetrics);
      nextBody.x = clamped.x;
      nextBody.y = clamped.y;

      return nextBody;
    });
  };

  const resetPointerTrack = () => {
    lastPointerRef.current = { x: 0, y: 0, time: 0 };
    pointerVelocityRef.current = { x: 0, y: 0 };
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 md:py-28 bg-gray-50 dark:bg-dark-800 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-4" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-7 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-dark-700 bg-white/85 dark:bg-dark-900/75 p-1 shadow-md backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setMode('free')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'free'
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                  }`}
              >
                Surprise
              </button>
              <button
                type="button"
                onClick={() => setMode('grid')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'grid'
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                  }`}
              >
                Skills
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              className={`relative mx-auto w-full max-w-[66rem] rounded-4xl border border-gray-200 dark:border-dark-700 bg-white/70 dark:bg-dark-900/60 backdrop-blur-sm shadow-premium overflow-hidden ${mode === 'grid' ? 'h-[470px] sm:h-[530px] md:h-[570px]' : 'h-[430px] sm:h-[470px] md:h-[510px]'}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_45%)]" />

              <div className={`absolute inset-0 ${mode === 'free' ? 'px-2 py-2 sm:py-3 sm:pb-0' : 'px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4'}`}>
                <div
                  ref={dragAreaRef}
                  onPointerMove={applyRipple}
                  onPointerLeave={resetPointerTrack}
                  className="relative w-full h-full"
                >
                  {mode === 'grid' ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="h-full flex items-center justify-center py-0.5 sm:py-1">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2 md:gap-2.5 place-items-center">
                          {allSkills.map((skill, index) => (
                            <motion.div
                              key={`${skill.category}-${skill.name}`}
                              initial={{ opacity: 0, y: 12, scale: 0.98 }}
                              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                              transition={{
                                duration: 0.34,
                                delay: index * 0.012,
                                type: 'tween',
                                stiffness: 170,
                                damping: 25,
                              }}
                              whileHover={{ scale: 1.08 }}
                              className="select-none"
                            >
                              <div
                                className="box-border w-[110px] h-[44px] sm:w-[138px] sm:h-[52px] lg:w-[184px] lg:h-[62px] flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-2xl border bg-white/95 dark:bg-dark-800/95 shadow-md hover:shadow-lg transition-shadow"
                                style={{ borderColor: `${skill.color}88` }}
                              >
                                <skill.icon size={16} style={{ color: skill.color }} />
                                <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-900 dark:text-white leading-tight whitespace-normal break-words">
                                  {skill.name}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    allSkills.map((skill, index) => (
                      <motion.div
                        key={`${skill.category}-${skill.name}`}
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        initial={{
                          opacity: 0,
                          x: 0,
                          y: 0,
                          rotate: 0,
                        }}
                        animate={
                          inView
                            ? {
                              opacity: 1,
                              x: freePositions[index]?.x || 0,
                              y: freePositions[index]?.y || 0,
                              rotate: ((freePositions[index]?.angle || 0) * 180) / Math.PI,
                            }
                            : {}
                        }
                        transition={{
                          duration: 0.07,
                          delay: 0,
                          type: 'tween',
                          ease: 'linear',
                        }}
                        className="absolute left-1/2 top-1/2 z-10 select-none"
                        style={{
                          zIndex: 1000 + Math.round(freePositions[index]?.y || 0),
                          marginLeft: -freeMetrics.cardWidth / 2,
                          marginTop: -freeMetrics.cardHeight / 2,
                        }}
                      >
                        <div
                          className="box-border flex items-center rounded-2xl border bg-white/95 dark:bg-dark-800/95 shadow-md hover:shadow-lg transition-shadow"
                          style={{
                            borderColor: `${skill.color}88`,
                            width: `${freeMetrics.cardWidth}px`,
                            height: `${freeMetrics.cardHeight}px`,
                            gap: freeMetrics.cardWidth < 130 ? '8px' : '10px',
                            paddingInline: freeMetrics.cardWidth < 130 ? '12px' : '14px',
                          }}
                        >
                          <skill.icon size={freeMetrics.cardWidth < 130 ? 16 : 18} style={{ color: skill.color }} />
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                            {skill.name}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;


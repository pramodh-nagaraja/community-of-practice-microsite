import { motion } from 'framer-motion'
import './CoPJourneyAnimation.css'

export default function CoPJourneyAnimation() {
  // Timeline: ~20 seconds loop
  // Stages: College (0s) → Accenture Entry (3s) → Orientation (6s) → COP Enrollment (9s)
  //         → Trained (12s) → Intermediate (14s) → Expert (16s) → Victory (18s) → Loop

  const animationDuration = 20

  // LEFT SIDE: Character journey into organization
  const leftVariants = {
    initial: { opacity: 0, x: -100 },
    college: { opacity: 1, x: -80, transition: { duration: 2 } },
    walking: { opacity: 1, x: -40, transition: { duration: 3 } },
    entering: { opacity: 1, x: 0, transition: { duration: 3 } },
    orientating: { opacity: 0.8, x: 10, transition: { duration: 3 } },
    hidden: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  }

  // RIGHT SIDE: Character transformation stages
  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    trained: { opacity: 1, x: 60, scale: 1, transition: { duration: 2 } },
    intermediate: { opacity: 1, x: 40, scale: 1.05, transition: { duration: 2 } },
    expert: { opacity: 1, x: 20, scale: 1.1, transition: { duration: 2 } },
    victory: { opacity: 1, x: 0, scale: 1.15, transition: { duration: 2 } },
    reset: { opacity: 0, x: 100, scale: 1, transition: { duration: 0.5 } },
  }

  const leftSequence = [
    'college',
    'walking',
    'entering',
    'orientating',
    'hidden',
    'hidden',
    'hidden',
    'hidden',
  ]

  const rightSequence = [
    'hidden',
    'hidden',
    'hidden',
    'hidden',
    'trained',
    'intermediate',
    'expert',
    'victory',
  ]

  return (
    <div className="cop-journey-container">
      {/* LEFT SIDE: Story Introduction */}
      <motion.div
        className="journey-side journey-left"
        variants={leftVariants}
        initial="initial"
        animate={leftSequence}
        transition={{
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
          duration: animationDuration,
          repeat: Infinity,
        }}
      >
        <div className="character-container">
          {/* College Stage */}
          <motion.div
            className="stage stage-college"
            animate={{ opacity: [0, 1, 1, 0, 0, 0, 0, 0] }}
            transition={{
              times: [0, 0.1, 0.35, 0.5, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              {/* Head */}
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Graduation Cap */}
              <rect x="45" y="10" width="30" height="8" fill="#000" />
              <polygon points="75,10 65,0 55,0" fill="#000" />
              {/* Diploma */}
              <rect x="50" y="60" width="20" height="12" fill="#D4AF37" opacity="0.9" />
              <text x="60" y="68" textAnchor="middle" fontSize="8" fill="#000" fontWeight="bold">Cert</text>
              {/* Body - College Attire */}
              <rect x="45" y="48" width="30" height="35" fill="#8B4513" rx="2" />
              {/* Arms */}
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              {/* Legs */}
              <rect x="50" y="85" width="8" height="25" fill="#333" />
              <rect x="62" y="85" width="8" height="25" fill="#333" />
              {/* Shoes */}
              <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
          </motion.div>

          {/* Walking/Entering Stage */}
          <motion.div
            className="stage stage-entering"
            animate={{ opacity: [0, 0, 1, 1, 0, 0, 0, 0] }}
            transition={{
              times: [0, 0.1, 0.25, 0.45, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              {/* Head */}
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Professional look starting */}
              <rect x="45" y="48" width="30" height="35" fill="#1a1a1a" rx="2" />
              {/* Tie */}
              <polygon points="60,48 55,60 65,60" fill="#DC2626" />
              {/* Arms */}
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              {/* Legs walking pose */}
              <rect x="48" y="85" width="8" height="25" fill="#333" rx="2" />
              <rect x="64" y="83" width="8" height="27" fill="#333" rx="2" />
              {/* Shoes */}
              <ellipse cx="52" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="68" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
          </motion.div>

          {/* Orientation/Enrollment Stage */}
          <motion.div
            className="stage stage-enrollment"
            animate={{ opacity: [0, 0, 0, 1, 0, 0, 0, 0] }}
            transition={{
              times: [0, 0.1, 0.25, 0.35, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              {/* Head */}
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Professional Attire */}
              <rect x="45" y="48" width="30" height="35" fill="#1a1a1a" rx="2" />
              {/* Tie - blue accent */}
              <polygon points="60,48 55,60 65,60" fill="#0369A1" />
              {/* Certificate in hand */}
              <rect x="75" y="65" width="12" height="15" fill="#FFD700" rx="1" />
              <text x="81" y="75" textAnchor="middle" fontSize="6" fill="#000">CoP</text>
              {/* Arms */}
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              {/* Standing pose */}
              <rect x="50" y="85" width="8" height="25" fill="#333" />
              <rect x="62" y="85" width="8" height="25" fill="#333" />
              {/* Shoes */}
              <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Transformation Journey */}
      <motion.div
        className="journey-side journey-right"
        variants={rightVariants}
        initial="hidden"
        animate={rightSequence}
        transition={{
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
          duration: animationDuration,
          repeat: Infinity,
        }}
      >
        <div className="transformation-container">
          {/* TRAINED Stage */}
          <motion.div
            className="transform-stage trained"
            animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0] }}
            transition={{
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Professional shirt - Trained level */}
              <rect x="45" y="48" width="30" height="35" fill="#4B5563" rx="2" />
              <polygon points="60,48 55,60 65,60" fill="#16A34A" />
              {/* Badge */}
              <circle cx="75" cy="60" r="5" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
              <text x="75" y="63" textAnchor="middle" fontSize="7" fill="#000" fontWeight="bold">1</text>
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="50" y="85" width="8" height="25" fill="#333" />
              <rect x="62" y="85" width="8" height="25" fill="#333" />
              <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
            <p className="stage-label">Trained</p>
          </motion.div>

          {/* INTERMEDIATE Stage */}
          <motion.div
            className="transform-stage intermediate"
            animate={{ opacity: [0, 0, 0, 0, 0, 1, 0, 0] }}
            transition={{
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Blazer - Intermediate level */}
              <rect x="45" y="48" width="30" height="35" fill="#1e3a8a" rx="2" />
              <polygon points="60,48 55,60 65,60" fill="#2563EB" />
              {/* Multiple badges */}
              <circle cx="70" cy="55" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
              <circle cx="80" cy="55" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
              <text x="70" y="59" textAnchor="middle" fontSize="6" fontWeight="bold">II</text>
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="50" y="85" width="8" height="25" fill="#1a1a1a" />
              <rect x="62" y="85" width="8" height="25" fill="#1a1a1a" />
              <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
            <p className="stage-label">Intermediate</p>
          </motion.div>

          {/* EXPERT Stage */}
          <motion.div
            className="transform-stage expert"
            animate={{ opacity: [0, 0, 0, 0, 0, 0, 1, 0] }}
            transition={{
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 120 160" className="character">
              <circle cx="60" cy="30" r="15" fill="#FFB88C" />
              {/* Premium suit - Expert level */}
              <rect x="44" y="48" width="32" height="36" fill="#2D3142" rx="3" />
              <rect x="46" y="50" width="28" height="2" fill="#D4AF37" />
              <polygon points="60,48 55,60 65,60" fill="#A100FF" />
              {/* Achievement badges and stars */}
              <circle cx="65" cy="50" r="5" fill="#A100FF" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="75" cy="55" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
              <circle cx="85" cy="50" r="4" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
              <text x="65" y="54" textAnchor="middle" fontSize="7" fontWeight="bold">★</text>
              {/* Coat tails */}
              <path d="M 47 84 Q 45 100 48 115" stroke="#2D3142" strokeWidth="3" fill="none" />
              <path d="M 73 84 Q 75 100 72 115" stroke="#2D3142" strokeWidth="3" fill="none" />
              <rect x="30" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="75" y="52" width="15" height="8" fill="#FFB88C" />
              <rect x="50" y="85" width="8" height="25" fill="#1a1a1a" />
              <rect x="62" y="85" width="8" height="25" fill="#1a1a1a" />
              <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
              <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
            </svg>
            <p className="stage-label">Expert</p>
          </motion.div>

          {/* VICTORY Stage */}
          <motion.div
            className="transform-stage victory"
            animate={{
              opacity: [0, 0, 0, 0, 0, 0, 0, 1],
              y: [0, 0, 0, 0, 0, 0, 0, -20],
            }}
            transition={{
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.85, 1],
              duration: animationDuration,
              repeat: Infinity,
            }}
          >
            <div className="celebration">
              {/* Confetti */}
              <motion.div
                className="confetti"
                animate={{
                  y: [-10, 20, 30],
                  x: [-5, 5, -3],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />

              <svg viewBox="0 0 120 160" className="character">
                <circle cx="60" cy="30" r="15" fill="#FFB88C" />
                {/* Victory pose - Arms up */}
                <rect x="44" y="48" width="32" height="36" fill="#2D3142" rx="3" />
                <rect x="46" y="50" width="28" height="2" fill="#D4AF37" />
                <polygon points="60,48 55,60 65,60" fill="#A100FF" />
                {/* Raised arms celebration */}
                <line x1="30" y1="52" x2="20" y2="30" stroke="#FFB88C" strokeWidth="3" />
                <line x1="90" y1="52" x2="100" y2="30" stroke="#FFB88C" strokeWidth="3" />
                {/* Trophy */}
                <path
                  d="M 60 20 L 55 25 L 55 35 Q 60 38 65 35 L 65 25 Z"
                  fill="#FFD700"
                  stroke="#DAA520"
                  strokeWidth="1"
                />
                {/* Coat tails */}
                <path d="M 47 84 Q 45 100 48 115" stroke="#2D3142" strokeWidth="3" fill="none" />
                <path d="M 73 84 Q 75 100 72 115" stroke="#2D3142" strokeWidth="3" fill="none" />
                <rect x="50" y="85" width="8" height="25" fill="#1a1a1a" />
                <rect x="62" y="85" width="8" height="25" fill="#1a1a1a" />
                <ellipse cx="54" cy="115" rx="6" ry="4" fill="#000" />
                <ellipse cx="66" cy="115" rx="6" ry="4" fill="#000" />
              </svg>
            </div>
            <p className="stage-label">Champion</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

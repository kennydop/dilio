import React from "react";

function Circles() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-[-1]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle 1 */}
      <circle cx="50" cy="50" r="40" fill="rgba(255, 99, 71, 0.6)" />
      {/* Circle 2 */}
      <circle cx="200" cy="200" r="80" fill="rgba(135, 206, 250, 0.6)" />
      {/* Circle 3 */}
      <circle cx="400" cy="100" r="50" fill="rgba(50, 205, 50, 0.6)" />
      {/* Circle 4 */}
      <circle cx="300" cy="400" r="100" fill="rgba(238, 130, 238, 0.6)" />
      {/* Circle 5 */}
      <circle cx="500" cy="300" r="60" fill="rgba(255, 165, 0, 0.6)" />
    </svg>
  );
}

export default Circles;

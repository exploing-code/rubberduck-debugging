import React, { useRef, useEffect } from "react";
import * as Cannon from "cannon";

const ConfettiCannon = () => {
  const cannonContainerRef = useRef(null);

  useEffect(() => {
    // Create a cannon world
    const world = new Cannon.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    // Create a cannon sphere shape for confetti
    const sphereShape = new Cannon.Sphere(0.1);
    const sphereBody = new Cannon.Body({
      mass: 1,
      position: new Cannon.Vec3(0, 5, 0), // Initial position
      shape: sphereShape,
    });

    // Add the sphere to the world
    world.addBody(sphereBody);

    // Update physics in each frame
    const updatePhysics = () => {
      const timeStep = 1 / 60; // seconds
      world.step(timeStep);
    };

    // Animation loop
    const animate = () => {
      updatePhysics();
      // Update sphere position in React
      sphereBody.position.copy(cannonContainerRef.current.position);
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      world.removeBody(sphereBody);
    };
  }, []);

  return (
    <mesh ref={cannonContainerRef}>
      {/* You can render your confetti mesh here */}
    </mesh>
  );
};

export default ConfettiCannon;

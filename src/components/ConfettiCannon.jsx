import React, { useRef, useEffect } from "react";
import * as Cannon from "cannon-es";
import { Mesh, SphereGeometry, MeshBasicMaterial } from "three";

const ConfettiCannon = () => {
  const cannonContainerRef = useRef(null);

  useEffect(() => {
    // Create a cannon world
    const world = new Cannon.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    // Create an array to store confetti bodies
    const confettiBodies = [];

    // Create confetti particles and their corresponding cannon bodies
    for (let i = 0; i < 100; i++) {
      const sphereShape = new Cannon.Sphere(0.05);
      const sphereBody = new Cannon.Body({
        mass: 0.1,
        position: new Cannon.Vec3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ),
        shape: sphereShape,
      });
      // Set initial velocity to shoot upwards
      sphereBody.velocity.set(0, Math.random() * 10 + 5, 0);
      world.addBody(sphereBody);
      confettiBodies.push(sphereBody);
    }

    // Update physics in each frame
    const updatePhysics = () => {
      const timeStep = 1 / 60; // seconds
      world.step(timeStep);
    };

    // Animation loop
    const animate = () => {
      updatePhysics();
      // Update confetti positions in React
      confettiBodies.forEach((body, index) => {
        const position = body.position;
        cannonContainerRef.current.children[index].position.set(
          position.x,
          position.y,
          position.z
        );
      });
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      confettiBodies.forEach((body) => {
        world.removeBody(body);
      });
    };
  }, []);

  return (
    <mesh ref={cannonContainerRef}>
      {/* Render confetti particles */}
      <ConfettiParticles />
    </mesh>
  );
};

const ConfettiParticles = () => {
  const particles = [];

  for (let i = 0; i < 100; i++) {
    const geometry = new SphereGeometry(0.05);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const particle = new Mesh(geometry, material);
    particles.push(particle);
  }

  return (
    <>
      {particles.map((particle, index) => (
        <primitive key={index} object={particle} />
      ))}
    </>
  );
};

export default ConfettiCannon;

import React, { useRef, useEffect } from "react";
import * as Cannon from "cannon-es";
import { Mesh, SphereGeometry, MeshBasicMaterial } from "three";

const ConfettiCannon = ({ position, rotation }) => {
  const cannonContainerRef = useRef(null);

  useEffect(() => {
    // Create a cannon world
    const world = new Cannon.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    // Create an array to store confetti bodies
    const confettiBodies = [];

    // Create confetti particles and their corresponding cannon bodies
    const numParticles = 100;
    const coneAngle = Math.PI / 4; // Adjust the angle of the cone as needed

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * coneAngle - coneAngle / 2; // Random angle within the cone
      const speed = Math.random() * 10 + 5; // Random speed

      const x = Math.sin(angle) * speed;
      const y = Math.random() * 5 + 5; // Adjust the height of the cone as needed
      const z = Math.cos(angle) * speed;

      const sphereShape = new Cannon.Sphere(0.05);
      const sphereBody = new Cannon.Body({
        mass: 0.1,
        position: new Cannon.Vec3(position[0], position[1], position[2]), // Start from the specified position
        shape: sphereShape,
      });
      // Set initial velocity
      sphereBody.velocity.set(x, y, z);
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
  }, [position]);

  return (
    <mesh ref={cannonContainerRef} position={position} rotation={rotation}>
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

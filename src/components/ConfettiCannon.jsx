import React, { useRef, useEffect } from "react";
import * as Cannon from "cannon-es";
import { Mesh, SphereGeometry, MeshStandardMaterial } from "three";

const ConfettiCannon = ({ position, rotation }) => {
  const cannonContainerRef = useRef(null);
  const worldRef = useRef(null);
  const confettiBodiesRef = useRef([]);

  useEffect(() => {
    // Create a cannon world
    const world = new Cannon.World();
    world.gravity.set(0, -9.82, 0); // Set gravity
    worldRef.current = world;

    return () => {
      worldRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (worldRef.current) {
      fireCannon();
    }
  }, []); // Trigger fireCannon after worldRef is set

  const fireCannon = () => {
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
      worldRef.current.addBody(sphereBody);
      confettiBodiesRef.current.push(sphereBody);
    }
  };

  useEffect(() => {
    const animate = () => {
      if (!worldRef.current) return;

      const timeStep = 1 / 60; // seconds
      worldRef.current.step(timeStep);

      // Update confetti positions in React
      confettiBodiesRef.current.forEach((body, index) => {
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

    return () => {
      if (!worldRef.current) return;
      confettiBodiesRef.current.forEach((body) => {
        worldRef.current.removeBody(body);
      });
      confettiBodiesRef.current = [];
    };
  }, []);

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
    const material = new MeshStandardMaterial({ color: 0xeeeeee });
    const particle = <mesh key={i} geometry={geometry} material={material} />;
    particles.push(particle);
  }

  return <>{particles}</>;
};

export default ConfettiCannon;

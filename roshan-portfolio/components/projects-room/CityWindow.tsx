"use client";

export default function CityWindow() {
  const buildings = Array.from(
    { length: 16 },
    (_, index) => ({
      x: (index - 8) * 1.4,
      height: 2 + Math.random() * 5,
    })
  );

  return (
    <group position={[0, 3, -7.7]}>

      {/* Window */}
      <mesh>
        <boxGeometry args={[15, 7, 0.1]} />
        <meshBasicMaterial color="#05070b" />
      </mesh>

      {/* Buildings */}
      {buildings.map((building, index) => (
        <mesh
          key={index}
          position={[
            building.x,
            -2.8 + building.height / 2,
            0.1,
          ]}
        >
          <boxGeometry
            args={[
              1,
              building.height,
              0.2,
            ]}
          />

          <meshStandardMaterial
            color="#111111"
            emissive="#050505"
          />
        </mesh>
      ))}

    </group>
  );
}
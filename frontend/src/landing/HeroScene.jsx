import { useEffect, useRef } from "react";
import * as THREE from "three";

function planetTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const pen = canvas.getContext("2d");
  const sky = pen.createLinearGradient(0, 0, 512, 256);
  sky.addColorStop(0, "#1d4ed8");
  sky.addColorStop(0.5, "#312e81");
  sky.addColorStop(1, "#0ea5e9");
  pen.fillStyle = sky;
  pen.fillRect(0, 0, 512, 256);
  pen.fillStyle = "#67e8f9";
  for (let i = 0; i < 8; i += 1) {
    pen.beginPath();
    pen.ellipse(40 + (i * 67) % 470, 50 + (i % 4) * 42, 48, 22, i * 0.5, 0, Math.PI * 2);
    pen.fill();
  }
  pen.fillStyle = "rgba(255,255,255,0.35)";
  pen.fillRect(0, 0, 512, 18);
  pen.fillRect(0, 230, 512, 26);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  return map;
}

export default function HeroScene() {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0.4, 0.35, 7.4);

    scene.add(new THREE.AmbientLight(0xc9d7ff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 3, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x7c5cff, 8, 14);
    rim.position.set(-2, 1, 2);
    scene.add(rim);

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(
          Float32Array.from({ length: 700 * 3 }, () => (Math.random() - 0.5) * 24),
          3,
        ),
      ),
      new THREE.PointsMaterial({ color: 0xe8f1ff, size: 0.03, transparent: true, opacity: 0.8 }),
    );
    scene.add(stars);

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 48, 48),
      new THREE.MeshStandardMaterial({ map: planetTexture(), roughness: 0.62, metalness: 0.08 }),
    );
    planet.position.set(2.7, 0.55, -0.4);
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.16, side: THREE.BackSide }),
    );
    glow.position.copy(planet.position);
    scene.add(planet, glow);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xb9d7ff,
      emissive: 0x3b4fd6,
      emissiveIntensity: 0.45,
      metalness: 0.55,
      roughness: 0.28,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.04, 12, 100), ringMat);
    ring.position.copy(planet.position);
    ring.rotation.x = Math.PI / 2.15;
    ring.rotation.z = 0.4;
    scene.add(ring);
    const station = new THREE.Group();
    station.position.copy(planet.position);
    for (let i = 0; i < 4; i += 1) {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.16), ringMat);
      const angle = (i / 4) * Math.PI * 2;
      pod.position.set(Math.cos(angle) * 2.55, Math.sin(angle) * 0.42, Math.sin(angle) * 0.25);
      station.add(pod);
    }
    scene.add(station);

    const rock = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 28, 18),
      new THREE.MeshStandardMaterial({ color: 0x161d33, roughness: 0.95 }),
    );
    rock.scale.set(2.1, 0.42, 1.3);
    rock.position.set(1.55, -1.85, 1.35);
    scene.add(rock);

    const suit = new THREE.MeshStandardMaterial({ color: 0xf4f7fb, roughness: 0.42, metalness: 0.12 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x243156, roughness: 0.4, metalness: 0.25 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x1d4ed8, emissiveIntensity: 0.55, roughness: 0.15 });
    const astronaut = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.22, 4, 8), suit);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 14), suit);
    helmet.position.y = 0.32;
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), glass);
    visor.scale.set(1.1, 0.7, 0.45);
    visor.position.set(0.05, 0.33, 0.08);
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.08), dark);
    pack.position.set(0, 0.05, -0.14);
    const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.14, 3, 6), suit);
    legL.position.set(-0.07, -0.28, 0);
    const legR = legL.clone();
    legR.position.x = 0.07;
    astronaut.add(body, helmet, visor, pack, legL, legR);
    astronaut.position.set(2.05, -1.22, 1.7);
    astronaut.rotation.y = -0.6;
    scene.add(astronaut);

    let frame = 0;
    let visible = true;
    const clock = new THREE.Clock();
    const look = new THREE.Vector2();

    function resize() {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function onMove(event) {
      if (reduce) return;
      const rect = host.getBoundingClientRect();
      look.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
      look.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      const delta = reduce ? 0 : clock.getDelta();
      planet.rotation.y += delta * 0.12;
      glow.rotation.y += delta * 0.12;
      ring.rotation.z += delta * 0.08;
      station.rotation.y += delta * 0.08;
      stars.rotation.y += delta * 0.01;
      astronaut.position.y = -1.22 + Math.sin(clock.elapsedTime * 0.8) * (reduce ? 0 : 0.03);
      camera.position.x += (0.35 + look.x - camera.position.x) * 0.04;
      camera.position.y += (0.32 - look.y - camera.position.y) * 0.04;
      camera.lookAt(1.8, 0.15, 0);
      renderer.render(scene, camera);
      if (reduce) cancelAnimationFrame(frame);
    }

    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    watcher.observe(host);
    resize();
    animate();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(frame);
      watcher.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="cine-canvas" ref={mount} aria-hidden="true" />;
}

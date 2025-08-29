class AnimatedGraph {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    this.nodeCount = 250;
    this.clickEffects = [];

    this.init();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    this.resize();
    this.createNodes();
    this.createConnections();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createNodes() {
    this.nodes = [];
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        mouseInfluence: 0,
        connections: []
      });
    }
  }

  createConnections() {
    this.connections = [];
    const k = 3; // number of nearest neighbors per node

    for (let i = 0; i < this.nodes.length; i++) {
      // Calculate distance to all other nodes
      const distances = [];
      for (let j = 0; j < this.nodes.length; j++) {
        if (i === j) continue;
        const distance = this.getDistance(this.nodes[i], this.nodes[j]);
        distances.push({ node: this.nodes[j], distance });
      }

      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance);

      // Connect to k nearest nodes
      for (let n = 0; n < k; n++) {
        const neighbor = distances[n].node;

        // Avoid duplicate connections
        if (!this.connections.some(conn =>
          (conn.node1 === this.nodes[i] && conn.node2 === neighbor) ||
          (conn.node2 === this.nodes[i] && conn.node1 === neighbor)
        )) {
          this.connections.push({
            node1: this.nodes[i],
            node2: neighbor,
            opacity: Math.random() * 0.3 + 0.1,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }
  }


  getDistance(node1, node2) {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
      this.createConnections();
    });

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    document.addEventListener('click', (e) => {
      this.clickEffects.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 400,
        strength: 4,
        opacity: 0.5
      });
    });

  }

  updateNodes() {
    this.nodes.forEach(node => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;


      // on click effect
      this.clickEffects.forEach(effect => {
        this.nodes.forEach(node => {
          const dx = node.x - effect.x;
          const dy = node.y - effect.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < effect.radius && dist > 0) {
            const force = (effect.radius - dist) / effect.radius * effect.strength * 0.05;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        });
        effect.radius += 6;      // Expand slower
        effect.opacity *= 0.9;  // Fade slower
      });
      this.clickEffects = this.clickEffects.filter(e => e.radius < e.maxRadius && e.opacity > 0.02);
      // Wrap around edges
      if (node.x < -10) node.x = this.canvas.width + 10;
      if (node.x > this.canvas.width + 10) node.x = -10;
      if (node.y < -10) node.y = this.canvas.height + 10;
      if (node.y > this.canvas.height + 10) node.y = -10;

      // Enhanced mouse interaction
      const mouseDistance = this.getDistance(node, this.mouse);

      // Strong attraction effect
      if (mouseDistance < 300) {
        const force = (300 - mouseDistance) / 300;
        const angle = Math.atan2(this.mouse.y - node.y, this.mouse.x - node.x);
        const attractionForce = force * 0.01; // Increased force
        node.vx += Math.cos(angle) * attractionForce;
        node.vy += Math.sin(angle) * attractionForce;

        // Scale nodes based on proximity to mouse
        node.mouseInfluence = force;
      } else {
        node.mouseInfluence = 0;
      }

      // Repulsion effect when very close
      if (mouseDistance < 50 && mouseDistance > 0) {
        const repelForce = (50 - mouseDistance) / 50;
        const angle = Math.atan2(node.y - this.mouse.y, node.x - this.mouse.x);
        node.vx += Math.cos(angle) * repelForce * 0.005;
        node.vy += Math.sin(angle) * repelForce * 0.005;
      }

      // Apply friction
      node.vx *= 0.995; // Less friction for more responsive movement
      node.vy *= 0.995;

      // Update pulse phase (faster when near mouse)
      const pulseSpeed = 0.02 + (node.mouseInfluence * 0.05);
      node.pulsePhase += pulseSpeed;
    });
  }

  updateConnections() {
    this.connections = this.connections.filter(conn => {
      const distance = this.getDistance(conn.node1, conn.node2);
      if (distance > 250) return false; // Increased max distance

      conn.phase += conn.pulseSpeed;

      // Enhanced connection opacity based on mouse proximity
      const mouseToNode1 = this.getDistance(conn.node1, this.mouse);
      const mouseToNode2 = this.getDistance(conn.node2, this.mouse);
      const minMouseDistance = Math.min(mouseToNode1, mouseToNode2);

      let baseOpacity = (Math.sin(conn.phase) + 1) * 0.1 + 0.05;

      // Brighten connections near mouse
      if (minMouseDistance < 200) {
        const mouseInfluence = (200 - minMouseDistance) / 200;
        baseOpacity += mouseInfluence * 0.3;
      }

      conn.opacity = baseOpacity;
      return true;
    });

    // Create new connections dynamically, especially near mouse
    if (Math.random() > 0.95) { // More frequent connection creation
      const node1 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      const node2 = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      const distance = this.getDistance(node1, node2);

      // Favor connections near mouse
      const mouseToNode1 = this.getDistance(node1, this.mouse);
      const mouseToNode2 = this.getDistance(node2, this.mouse);
      const nearMouse = Math.min(mouseToNode1, mouseToNode2) < 250;

      if (distance < 180 && node1 !== node2 && (nearMouse || Math.random() > 0.7)) {
        this.connections.push({
          node1,
          node2,
          opacity: nearMouse ? 0.3 : 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          phase: 0
        });
      }
    }
  }

  draw() {
    this.ctx.fillStyle = '#1e1e2f';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw connections
    this.connections.forEach(conn => {
      this.ctx.beginPath();
      this.ctx.moveTo(conn.node1.x, conn.node1.y);
      this.ctx.lineTo(conn.node2.x, conn.node2.y);

      const gradient = this.ctx.createLinearGradient(
        conn.node1.x, conn.node1.y,
        conn.node2.x, conn.node2.y
      );
      gradient.addColorStop(0, `rgba(130, 170, 255, ${conn.opacity})`);
      gradient.addColorStop(0.5, `rgba(130, 170, 255, ${conn.opacity * 2})`);
      gradient.addColorStop(1, `rgba(130, 170, 255, ${conn.opacity})`);

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach(node => {
      const pulseRadius = node.radius + Math.sin(node.pulsePhase) * 0.5;
      const pulseOpacity = node.opacity + Math.sin(node.pulsePhase) * 0.2;

      // Scale and brighten nodes near mouse
      const mouseInfluence = node.mouseInfluence || 0;
      const finalRadius = pulseRadius + (mouseInfluence * 3); // Larger when near mouse
      const finalOpacity = Math.min(pulseOpacity + (mouseInfluence * 0.5), 1); // Brighter when near mouse

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, finalRadius, 0, Math.PI * 2);

      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, finalRadius
      );
      gradient.addColorStop(0, `rgba(130, 170, 255, ${finalOpacity})`);
      gradient.addColorStop(1, `rgba(130, 170, 255, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Inner core (brighter when near mouse)
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, finalRadius * 0.3, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(130, 170, 255, ${Math.min(finalOpacity + 0.3 + (mouseInfluence * 0.4), 1)})`;
      this.ctx.fill();

      // Add glow effect when very close to mouse
      if (mouseInfluence > 0.7) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, finalRadius * 1.5, 0, Math.PI * 2);
        const glowGradient = this.ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, finalRadius * 1.5
        );
        glowGradient.addColorStop(0, `rgba(130, 170, 255, ${mouseInfluence * 0.2})`);
        glowGradient.addColorStop(1, `rgba(130, 170, 255, 0)`);
        this.ctx.fillStyle = glowGradient;
        this.ctx.fill();
      }
    });
    this.clickEffects.forEach(effect => {
      const gradient = this.ctx.createRadialGradient(
        effect.x, effect.y, effect.radius * 0.1,
        effect.x, effect.y, effect.radius
      );
      gradient.addColorStop(0, `rgba(130, 170, 255, ${effect.opacity})`);
      gradient.addColorStop(1, `rgba(130, 170, 255, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateNodes();
    this.updateConnections();
    this.draw();

    requestAnimationFrame(() => this.animate());
  }
}

// Old DOM-based network code (keeping for compatibility but not used)
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the new animated graph
  const canvas = document.getElementById('graphCanvas');
  if (canvas) {
    new AnimatedGraph(canvas);
  }
});
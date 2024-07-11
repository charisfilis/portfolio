document.addEventListener('DOMContentLoaded', () => {
  const network = document.querySelector('.network');
  const attractor = document.querySelector('.attractor');
  const nodes = [];
  const connections = [];

  // Create nodes
  const nodeCount = 33;
  for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.classList.add('node');
    node.style.left = `${Math.random() * 80 + 10}%`;
    node.style.top = `${Math.random() * 80 + 10}%`;
    network.appendChild(node);
    nodes.push(node);
  }

  // Update nodes and connections based on cursor position
  network.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    attractor.style.left = `${clientX-20}px`;
    attractor.style.top = `${clientY-20}px`;

    // Reset node colors
    nodes.forEach(node => {
      node.classList.remove('connected');
    });

    connections.forEach((connection) => {
      network.removeChild(connection);
    });

    connections.length = 0;

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const connection = document.createElement('div');
        connection.classList.add('connection');
        connection.style.left = `${centerX}px`;
        connection.style.top = `${centerY}px`;
        connection.style.width = `${dx}px`;
        connection.style.height = `${dy}px`;
    
        network.appendChild(connection);
        connections.push(connection);

        node.classList.add('connected');
      }
    });
  });
});

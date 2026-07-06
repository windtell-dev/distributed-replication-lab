# Distributed Notes Lab

> A distributed systems learning project exploring how data remains available when servers fail. Built with Docker using multiple containers to simulate distributed server nodes. Demonstrates data replication, automatic recovery after node failures, and cluster synchronization through a three-node distributed system with a real-time operations console.

<img width="1680" height="927" alt="Console" src="https://github.com/user-attachments/assets/7b7be3db-6aa8-46a1-bdaf-7dcfe082048f" />
<img width="1636" height="817" alt="Console2" src="https://github.com/user-attachments/assets/b4dbf384-0287-42bb-a6eb-f5a57bb78c85" />

---

## Architecture Diagrams

Node/Container Architecture
<img width="2720" height="1600" alt="architecture_diagram_console_style-2" src="https://github.com/user-attachments/assets/902ba4a1-993b-4e3f-a104-ba36b45d38b0" /> <img width="2720" height="1280" alt="same_code_different_configuration-2" src="https://github.com/user-attachments/assets/13ff46a7-8ad0-47dd-8ea8-c46c87f750a9" /> 

Node Recovery
<img width="2720" height="600" alt="node_recovery_flow-2" src="https://github.com/user-attachments/assets/a28f4e79-702a-42c1-8629-846446e5f06d" />

Server Architecture
<img width="2720" height="3000" alt="docker_architecture" src="https://github.com/user-attachments/assets/e6eab245-6512-4dad-b2a4-fb0d9b954895" />


---

## Features

- Three-node distributed cluster
- Peer-to-peer replication
- Automatic startup recovery
- Failure handling
- Docker Compose deployment
- Cluster Operations Console
- Live health monitoring
- Operational shell scripts

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js             | Backend runtime |
| Express             | REST API |
| Axios               | Node-to-node communication |
| Docker              | Containerization |
| Docker Compose      | Multi-node orchestration |
| HTML/CSS/JavaScript | Dashboard |

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/windtell-dev/Distributed-Replication-Lab.git

cd Distributed-Replication-Lab
```

Start the cluster:

```bash
docker compose up --build
```

Open the dashboard:

```text
http://localhost:3000
```

---

## Useful Commands

Restart cluster:

```bash
./scripts/reset-cluster.sh
```

View cluster status:

```bash
./scripts/cluster-status.sh
```

Simulate node failure:

```bash
./scripts/simulate-node-failure.sh node2
```

Recover a node:

```bash
./scripts/recover-node.sh node2
```

View notes stored on each node:

```bash
./scripts/notes-per-node.sh
```

## API Examples

Create a note on Node 1:

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Node 1"}'
```

Create a note on Node 2:

```bash
curl -X POST http://localhost:3001/notes \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Node 2"}'
```

Create a note on Node 3:

```bash
curl -X POST http://localhost:3002/notes \
  -H "Content-Type:application/json" \
  -d '{"text":"Hello from Node 3"}'
```

---

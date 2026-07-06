# Distributed Notes Lab

> A distributed systems learning project exploring how data remains available when servers fail. Built with Docker using multiple containers to simulate distributed server nodes. Demonstrates data replication, automatic recovery after node failures, and cluster synchronization through a three-node distributed system with a real-time operations console.

![Cluster Operations Console](<img width="1680" height="927" alt="Console" src="https://github.com/user-attachments/assets/7b7be3db-6aa8-46a1-bdaf-7dcfe082048f" />
<img width="1636" height="817" alt="Console2" src="https://github.com/user-attachments/assets/b4dbf384-0287-42bb-a6eb-f5a57bb78c85" />)

---

## Architecture Diagram
![Architecture](<img width="2720" height="1600" alt="architecture_diagram_console_style-2" src="https://github.com/user-attachments/assets/902ba4a1-993b-4e3f-a104-ba36b45d38b0" /> <img width="2720" height="1280" alt="same_code_different_configuration" src="https://github.com/user-attachments/assets/95a47207-17b8-41ca-9d84-3799dc272626" /> <img width="2720" height="600" alt="node_recovery_flow" src="https://github.com/user-attachments/assets/d5c7f397-46a3-412e-82cf-037bddacf7f1" />)

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

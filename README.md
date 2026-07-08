# Distributed Notes Lab
<img width="802" height="529" alt="image" src="https://github.com/user-attachments/assets/ab36ed6d-b411-4b59-b31e-c56ebb8999de" />

## About
A distributed notes systems learning project, exploring how data remains available when servers fail. Each node acts as a server, and nodes can have notes which shows how data survives among simulating node failure/fault tolerant replication. I design specfifc architecture to show the system where if one node fails, the other nodes can continue running with copies of their own data. This project is meant to demonstrate logic and system design for data replication, automatic recovery after node failures, and cluster synchronization through a three-node distributed system with a real-time operations console.

---

## Concepts
- Replication: New notes automatically replicate to peer nodes.
- Failure Tolerance: Nodes continue serving requests when peers become unavailable.
- Protocol Design: created metadata such as *sourceNode* and *replicated* to prevent infinite replication loops
- Synchronization: Notes recover back to failed node, after failure

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

## Real-time Node Tracking Console

<img width="1680" height="927" alt="Console" src="https://github.com/user-attachments/assets/7b7be3db-6aa8-46a1-bdaf-7dcfe082048f" />
<img width="1636" height="817" alt="Console2" src="https://github.com/user-attachments/assets/b4dbf384-0287-42bb-a6eb-f5a57bb78c85" />

---

## Architecture Diagrams

Server Architecture
<img width="2720" height="3000" alt="docker_architecture" src="https://github.com/user-attachments/assets/e6eab245-6512-4dad-b2a4-fb0d9b954895" />


Node Recovery
<img width="2720" height="600" alt="node_recovery_flow-2" src="https://github.com/user-attachments/assets/a28f4e79-702a-42c1-8629-846446e5f06d" />

---
## Concepts

- **Peer-to-Peer Replication:** New notes automatically replicate to peer nodes to maintain multiple copies of the data.
- **Failure Tolerance:** Nodes continue serving requests even when one or more peer nodes become unavailable.
- **Protocol Design:** Metadata such as `sourceNode` and `replicated` prevents infinite replication loops and tracks the origin of replicated notes.
- **Synchronization:** Recovered nodes automatically synchronize missing notes from their peers after restarting.
- **Database-per-Node Architecture (v2):** Each node owns its own SQLite database, allowing independent persistent storage while maintaining replication between peers.

---

## Features
- Three-node distributed cluster
- Peer-to-peer note replication
- Database-per-node persistence (SQLite)
- Automatic startup recovery and synchronization
- Graceful failure handling
- Docker Compose deployment
- Cluster Operations Console
- Real-time cluster health monitoring
- Operational shell scripts
- RESTful API endpoints
- Interactive web dashboard


---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js             | Backend runtime, file systems and environment variables |
| Express             | REST API, JSON, HTTP status codes |
| Axios               | Allows Node-to-Node Communication in order to implement replication and recovery |
| Docker              | Containerization, representing Nodes, build processes |
| Docker Compose      | Multi-node orchestration instead of manual conatiner creation |
| HTML/CSS/JavaScript | Dashboard w/backend and frontend integration for live updates|

---
## Getting Started

Clone the repository:

```bash
git clone https://github.com/windtell-dev/Distributed-Replication-Lab.git

cd distributed-replication-lab
```

Start Docker Desktop, then start the cluster:

```bash
docker compose up --build
```

Open the Cluster Operations Console:

```text
http://localhost:3000
```

> This project runs through Docker Compose. Local `npm install` is not required for the standard setup.

---

## Useful Commands

Restart the cluster:

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

---

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
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Node 3"}'
```

View notes from all nodes:

```bash
curl http://localhost:3000/notes | jq
curl http://localhost:3001/notes | jq
curl http://localhost:3002/notes | jq
```

Check node health:

```bash
curl http://localhost:3000/health | jq
curl http://localhost:3001/health | jq
curl http://localhost:3002/health | jq
```

---

## Stop the Cluster

```bash
docker compose down
```

---

## What I learned for this project:

Project Goals:
> I wanted to get familiar with differrent technologies that would allow me to simulate a mini distributed systems that shows me how data stays available when servers fail. And also handling logic for use cases such as when a note is replicated but a node is deleted, how recovery and replication works, and possibly in the future deletion.

Design Justifications:
> Docker: Used for isolating running processes and worked well for the 3-node cluster architecture where one image creates 3 containers. I also used Docker Compose to start up the build rather than manually creating containers. Learned about multicontainer development and docker networking.
> I chose Node.js for runtime for the backend so it can execute outside the browswer and power each node. I learned Javascript backend development, running servers, and npm packages.
> I chose Express because it exposes REST APIs and that is how each node is able to talk to each other. I learned how to apply JSON requests logic to demonstrate how each node talks. Each node has a GET or POST with endpoints such as health, notes, and sync.
> Axios. Allows for Nodes to also act as a client, not just user to node, but also node (as client) to node. Each Node acts as both the HTTP server and client. Using this allowed me to implement push replication and pull synchroniation relationship between my nodes. I wanted to explore how replication and recovery solve distributed systems problems.
> JavaScript (w/HTML & CSS): Allowed me to actually be able to continuously retrieves live information from every node. Learned Fetch API and DOM manipulation.

## Future additions
- SQLite for notes
- Delete Operations
- Conflict handling

---

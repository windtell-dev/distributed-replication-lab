#!/bin/bash

echo
echo "=========================================="
echo "   Resetting Distributed Cluster"
echo "=========================================="
echo

docker compose down

echo
echo "Cluster stopped."
echo

docker compose up --build -d

echo
echo "Cluster restarted."
echo

sleep 2

./scripts/cluster-status.sh
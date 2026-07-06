#!/bin/bash

NODE=$1

if [ -z "$NODE" ]; then
  echo "Usage: ./scripts/recover-node.sh node1|node2|node3"
  exit 1
fi

echo
echo "=========================================="
echo "   Recovering $NODE"
echo "=========================================="
echo

docker compose start "$NODE"

echo
echo "Waiting for $NODE to start..."
sleep 2

echo
echo "Recovery triggered by startup sync."
echo "Current cluster status:"
echo

./scripts/cluster-status.sh
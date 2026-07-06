#!/bin/bash

NODE=$1

if [ -z "$NODE" ]; then
  echo "Usage: ./scripts/simulate-node-failure.sh node1|node2|node3"
  exit 1
fi

echo
echo "=========================================="
echo "   Simulating Failure: $NODE"
echo "=========================================="
echo

docker compose stop "$NODE"

echo
echo "$NODE has been stopped."
echo
echo "Current cluster status:"
echo

./scripts/cluster-status.sh
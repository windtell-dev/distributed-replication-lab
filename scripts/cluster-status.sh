#!/bin/bash

echo
echo "=========================================="
echo "   Distributed Replication Lab"
echo "=========================================="
echo

for PORT in 3000 3001 3002
do

    HEALTH=$(curl -s http://localhost:$PORT/health)

    NODE=$(echo "$HEALTH" | jq -r '.node')

    NOTE_COUNT=$(curl -s http://localhost:$PORT/notes | jq 'length')

    echo "🟢 $NODE"

    echo "   Notes : $NOTE_COUNT"

    echo "   Health:"
    echo "$HEALTH" | jq

    echo

done

echo "=========================================="
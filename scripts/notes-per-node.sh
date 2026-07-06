#!/bin/bash

echo "=============================="
echo "Notes Per Node"
echo "=============================="

echo "Node 1:"
curl -s http://localhost:3000/notes | jq 'length'

echo

echo "Node 2:"
curl -s http://localhost:3001/notes | jq 'length'

echo

echo "Node 3:"
curl -s http://localhost:3002/notes | jq 'length'
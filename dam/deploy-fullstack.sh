#!/bin/bash

# Deploy DAM Full Stack Application
# Based on NAM standard deployment pattern

set -e

echo "========================================"
echo "Deploying DAM Music Library"
echo "========================================"

# Get directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Stop service first (before building)
echo ""
echo ">>> Stopping DAM service..."
if sudo systemctl is-active --quiet dam-api; then
    sudo systemctl stop dam-api
    echo "Service stopped"
    sleep 1
else
    echo "Service not running"
fi

# Backend deployment
echo ""
echo ">>> Building Backend..."
cd backend
CGO_ENABLED=0 go build -ldflags="-w -s" -o dam-api-bin ./cmd/server

echo ">>> Creating backend target directory..."
mkdir -p /home/dtb/custom-systemd/dam-api

echo ">>> Copying backend binary..."
cp dam-api-bin /home/dtb/custom-systemd/dam-api/

echo ">>> Copying database schema..."
cp -r db /home/dtb/custom-systemd/dam-api/

echo ">>> Setting backend permissions..."
chmod +x /home/dtb/custom-systemd/dam-api/dam-api-bin
chmod -R 777 /home/dtb/custom-systemd/dam-api

# Create data directories
echo ">>> Creating data directories..."
mkdir -p /home/dtb/0/apps-media/dam/data
mkdir -p /home/dtb/Music/dam/tracks

# Database handling - preserve production data first
PROD_DB="/home/dtb/0/apps-media/dam/data/dam.db"
DEV_DB="$SCRIPT_DIR/backend/data/dam.db"

if [ -f "$PROD_DB" ]; then
    echo ">>> Production database exists - preserving existing data"
    # Only copy from dev if production doesn't exist (first deployment)
elif [ -f "$DEV_DB" ]; then
    echo ">>> First deployment - copying database from development..."
    cp "$DEV_DB" "$PROD_DB"
    echo "Database copied"
else
    echo ">>> No database found - will be created on first run"
fi

chmod -R 777 /home/dtb/0/apps-media/dam
chmod -R 777 /home/dtb/Music/dam

# Frontend deployment
echo ""
echo ">>> Building Frontend..."
cd ../frontend

echo ">>> Installing frontend dependencies..."
if ! bun install; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo ">>> Building with production configuration..."
if ! VITE_API_BASE_URL="https://dam-api.docker.localdev" bun run build; then
    echo "ERROR: Failed to build frontend"
    exit 1
fi

echo ">>> Creating frontend target directory..."
sudo mkdir -p /var/www/html-dam

echo ">>> Copying frontend build files..."
sudo cp -r dist/* /var/www/html-dam/

echo ">>> Setting frontend permissions..."
sudo chmod -R 777 /var/www/html-dam

echo ""
echo ">>> Restarting DAM service..."
sudo systemctl restart dam-api

echo ">>> Checking service status..."
sleep 2
sudo systemctl status dam-api --no-pager -l || true

echo ""
echo "========================================"
echo " DAM deployment complete!"
echo "========================================"
echo "Backend: https://dam-api.docker.localdev"
echo "Frontend: https://dam.docker.localdev"
echo ""
echo "Service status: $(sudo systemctl is-active dam-api)"
echo ""
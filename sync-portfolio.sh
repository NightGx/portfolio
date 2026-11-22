#!/bin/bash
set -e

# Emplacement du dossier contenant le code
REPO_DIR="/opt/portfolio/html"
COMPOSE_FILE="/opt/portfolio/docker-compose.yml"

cd "$REPO_DIR"

# 1. On récupère la branche cible
git fetch origin main --quiet

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

# Si le commit distant est différent du local, on aligne
if [ "$LOCAL" != "$REMOTE" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Nouveau commit détecté, déploiement en cours..."
    git reset --hard origin/main --quiet
    git clean -fd --quiet

    docker compose -f "$COMPOSE_FILE" exec -T web nginx -s reload
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Déploiement terminé."
fi

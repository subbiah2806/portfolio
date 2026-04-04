# Portfolio Makefile
# Usage: cd modules/portfolio && make <target>

GREEN := \033[0;32m
BLUE := \033[0;34m
NC := \033[0m

PORT := 4000

.PHONY: help setup install start stop clean

help:
	@echo "$(BLUE)Portfolio Commands:$(NC)"
	@echo "  make install  - Install dependencies"
	@echo "  make start    - Start dev server"
	@echo "  make stop     - Stop dev server"
	@echo "  make clean    - Remove node_modules"

setup:
	@echo "$(BLUE)Checking system dependencies...$(NC)"
	@command -v node >/dev/null 2>&1 || { echo "Installing Node.js..."; brew install node; }
	@echo "$(GREEN)All system dependencies ready!$(NC)"

install:
	@echo "$(BLUE)Installing Portfolio...$(NC)"
	npm install
	@echo "$(GREEN)Portfolio ready!$(NC)"

start:
	@npx kill-port $(PORT) 2>/dev/null || true
	@echo "$(GREEN)Starting Portfolio on port $(PORT)...$(NC)"
	npm start -- --port=$(PORT)

stop:
	@npx kill-port $(PORT) 2>/dev/null || true
	@echo "$(GREEN)Portfolio stopped$(NC)"

clean:
	rm -rf node_modules package-lock.json
	@echo "$(GREEN)Cleanup complete!$(NC)"

# React Pixora
# Usage: make <target>
# Author: Aashish Panchal <aipanchal51@gmail.com>

# Default target
.DEFAULT_GOAL := help

# Output Colors
RED    := \033[0;31m
GREEN  := \033[0;32m
YELLOW := \033[1;33m
BLUE   := \033[0;34m
CYAN   := \033[0;36m
NC     := \033[0m

# Project variables
PROJECT_NAME = Pixora

# Auto generate .PHONY for all targets
.PHONY: $(MAKECMDGOALS)

##@ Help
help: ## - Show help message
	@echo "$(CYAN)React Native Project - $(PROJECT_NAME)$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make $(CYAN)<target>$(NC)\n"} \
	/^[a-zA-Z_-]+:.*##/ { printf "  $(CYAN)%-13s$(NC) %s\n", $$1, $$2 } \
	/^##@/ { printf "\n$(GREEN)%s$(NC)\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Setup & Installation
setup: ## - Install all dependencies and setup project
	@echo "$(GREEN)🚀 Setting up $(PROJECT_NAME)...$(NC)"
	$(MAKE) install
	$(MAKE) pod-install
	$(MAKE) link-asset
	@echo "$(GREEN)✅ Setup complete!$(NC)"

install: ## - Install Node dependencies
	@echo "$(YELLOW)📦 Installing dependencies...$(NC)"
	@bun install

pod-install: ## - Install CocoaPods dependencies
	@echo "$(YELLOW)🍎 Installing iOS pods...$(NC)"
	@if [ -d ios ]; then cd ios && pod install --repo-update || echo "⚠️ CocoaPods install failed"; fi

link-asset: ## - Link fonts/assets
	@echo "$(GREEN)🔗 Linking assets...$(NC)"
	@bunx react-native-asset

##@ Development
start: ## - Start Metro bundler
	@echo "$(GREEN)🚀 Starting Metro bundler...$(NC)"
	@bun start

ios: ## - Run app on iOS simulator
	@echo "$(GREEN)📱 Running iOS app...$(NC)"
	@bun run ios

android: ## - Run app on Android emulator
	@echo "$(GREEN)🤖 Running Android app...$(NC)"
	@bun run android

test: ## - Run Jest tests
	@echo "$(YELLOW)🧪 Running tests...$(NC)"
	@bun test

##@ Code Quality
lint: ## - Run ESLint
	@echo "$(YELLOW)🔍 Linting...$(NC)"
	@bun run lint

format: ## - Format code with Prettier
	@echo "$(YELLOW)💅 Formatting code...$(NC)"
	@bun run format

type-check: ## - Type check with TypeScript
	@echo "$(YELLOW)🔍 Running type checks...$(NC)"
	@bunx tsc --noEmit

##@ Build & Release
build-ios: ## - Build iOS archive
	@echo "$(GREEN)🏗️ Building iOS archive...$(NC)"
	@cd ios && xcodebuild -workspace $(PROJECT_NAME).xcworkspace -scheme $(PROJECT_NAME) -configuration Release -destination generic/platform=iOS -archivePath build/$(PROJECT_NAME).xcarchive archive

build-apk: ## - Build Android APK
	@echo "$(GREEN)🏗️ Building Android APK...$(NC)"
	@cd android && ./gradlew assembleRelease

bundle-apk: ## - Build Android App Bundle (AAB)
	@echo "$(GREEN)🏗️ Building Android AAB...$(NC)"
	@cd android && ./gradlew bundleRelease

release-ios: ## - Archive for iOS release
	@$(MAKE) build-ios
	@echo "$(GREEN)✅ iOS archive created in ios/build/$(NC)"

release-apk: ## - Build Android APK + AAB
	@$(MAKE) build-android
	@$(MAKE) build-android-bundle
	@echo "$(GREEN)✅ Android artifacts in android/app/build/outputs/$(NC)"

##@ Maintenance
info: ## - Show environment info
	@echo "$(BLUE)ℹ️ Environment info:$(NC)"
	@bunx @react-native-community/cli info

clean: ## - Remove build artifacts
	@echo "$(RED)🧹 Cleaning project...$(NC)"
	@bunx @react-native-community/cli clean
	@echo "$(GREEN)✅ Project cleaned!$(NC)"

doctor: ## - Run RN environment doctor
	@echo "$(BLUE)🩺 Doctor check...$(NC)"
	@bunx @react-native-community/cli doctor

status: ## - Show project status
	@echo "$(BLUE)📊 Project Status:$(NC)"
	@echo "Project: $(PROJECT_NAME)"
	@echo "Node: $$(node --version)"
	@echo "Bun: $$(bun --version)"
	@echo "React Native CLI: $$(bunx @react-native-community/cli --version)"
	@echo "Git branch: $$(git branch --show-current 2>/dev/null || echo 'N/A')"
	@echo "Changes: $$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ') files changed"

devices: ## - List connected devices/simulators
	@echo "$(BLUE)📱 iOS Simulators:$(NC)"
	@xcrun simctl list devices | grep -E "(Booted|Shutdown)"
	@echo "$(BLUE)🤖 Android Devices:$(NC)"
	@adb devices

reset-cache: ## - Clear Metro cache
	@echo "$(YELLOW)🔄 Resetting Metro bundler cache...$(NC)"
	@bun run start --reset-cache

##@ Git Operations
commit: ## - Add all changes and commit with message (usage: make commit m="your message")
	@if [ -z "$(m)" ]; then echo "$(RED)❌ Please provide commit message: make commit m=\"your message\"$(NC)"; exit 1; fi
	@echo "$(GREEN)📝 Committing changes...$(NC)"
	@git add .
	@git commit -m "$(m)"
	@echo "$(GREEN)✅ Committed: $(m)$(NC)"
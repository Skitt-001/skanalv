#!/bin/bash

# 🚀 Skana.lv Production Build & Deployment Script
# This script prepares your website for FirstHost.lv deployment

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Skana.lv Production Build Script${NC}"
echo -e "${BLUE}========================================${NC}\n"

# 1. Check prerequisites
echo -e "${YELLOW}[1/7] Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"
echo -e "${GREEN}✓ npm found: $(npm -v)${NC}\n"

# 2. Security checks
echo -e "${YELLOW}[2/7] Running security checks...${NC}"

# Check if .env contains sensitive data
if grep -q "VITE_ANTHROPIC_API_KEY" .env 2>/dev/null; then
    if ! grep -q "^VITE_ANTHROPIC_API_KEY=$" .env; then
        echo -e "${RED}⚠️  WARNING: VITE_ANTHROPIC_API_KEY found in .env${NC}"
        echo -e "${YELLOW}   This key should only be used server-side, not in client code.${NC}"
        echo -e "${YELLOW}   Remove it before deployment!${NC}"
    fi
fi

# Check if .env is in .gitignore
if ! grep -q "^\.env$" .gitignore; then
    echo -e "${RED}⚠️  WARNING: .env might not be in .gitignore${NC}"
fi

echo -e "${GREEN}✓ Security checks completed${NC}\n"

# 3. Install dependencies
echo -e "${YELLOW}[3/7] Installing dependencies...${NC}"

if [ -d "node_modules" ]; then
    echo "Removing old node_modules..."
    rm -rf node_modules
fi

npm install
echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# 4. Audit dependencies
echo -e "${YELLOW}[4/7] Auditing dependencies for vulnerabilities...${NC}"

npm audit --production || {
    echo -e "${YELLOW}⚠️  Some vulnerabilities found. Review them carefully.${NC}"
    read -p "Continue with build? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

echo -e "${GREEN}✓ Dependency audit completed${NC}\n"

# 5. Clean and build
echo -e "${YELLOW}[5/7] Building for production...${NC}"

rm -rf dist
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed. dist/ directory not created.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Production build completed${NC}\n"

# 6. Prepare deployment package
echo -e "${YELLOW}[6/7] Preparing deployment package...${NC}"

DEPLOY_DIR="dist_deployment_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy dist contents
cp -r dist/* "$DEPLOY_DIR/"

# Copy security files
cp .htaccess "$DEPLOY_DIR/" 2>/dev/null || echo -e "${YELLOW}   .htaccess not found - will need to be added manually${NC}"
cp public/robots.txt "$DEPLOY_DIR/" 2>/dev/null || echo -e "${YELLOW}   robots.txt not found${NC}"
cp -r public/.well-known "$DEPLOY_DIR/" 2>/dev/null || echo -e "${YELLOW}   .well-known/ not found${NC}"

# Copy public assets
cp public/logo.png "$DEPLOY_DIR/" 2>/dev/null || true

echo -e "${GREEN}✓ Deployment package prepared: $DEPLOY_DIR${NC}\n"

# 7. Generate report
echo -e "${YELLOW}[7/7] Generating deployment report...${NC}"

cat > "$DEPLOY_DIR/DEPLOYMENT_CHECKLIST.txt" << 'EOF'
🚀 DEPLOYMENT CHECKLIST FOR FIRSTHOST.LV

Before uploading to FirstHost, verify:

SECURITY:
☐ No API keys in client code (check ChatBot.jsx)
☐ .env file NOT included in dist/
☐ .htaccess file uploaded to /public_html/
☐ SSL/TLS certificate installed and auto-renewal enabled
☐ All security headers in .htaccess are correct

FILES TO UPLOAD TO /public_html/:
☐ All files from this deployment package
☐ .htaccess (from project root)
☐ robots.txt (from dist/)
☐ .well-known/security.txt (folder structure)
☐ logo.png and other public images

TESTING AFTER DEPLOYMENT:
☐ https://skana.lv loads correctly (not http://)
☐ Navigation works on all pages
☐ Contact form submits successfully
☐ reCAPTCHA validates correctly
☐ Images load properly
☐ Mobile responsive design works
☐ No console errors (DevTools → Console)
☐ Security headers present (DevTools → Network → Response Headers)

PERFORMANCE:
☐ Check browser caching is working
☐ Test page load speed (Lighthouse audit)
☐ Verify gzip compression is enabled

MONITORING:
☐ Set up uptime monitoring
☐ Enable email alerts in cPanel
☐ Save FirstHost support contact info
☐ Schedule regular backups

NEXT STEPS:
1. Upload all files to FirstHost /public_html/
2. Test website thoroughly
3. Submit sitemap to Google Search Console
4. Monitor for errors and performance
5. Keep dependencies updated

For detailed instructions, see: DEPLOYMENT_FIRSTHOST.md
For security guidelines, see: SECURITY.md

Generated: $(date)
EOF

cat > "$DEPLOY_DIR/BUILD_INFO.txt" << EOF
Build Information
=================
Build Date: $(date)
Node Version: $(node -v)
npm Version: $(npm -v)
Build Directory: dist/
Deployment Package: $DEPLOY_DIR

Files Included:
$(find "$DEPLOY_DIR" -type f | sort)

Build Size: $(du -sh "$DEPLOY_DIR" | cut -f1)

Website: https://skana.lv
Support: info@skana.lv
Security: security@skana.lv
EOF

echo -e "${GREEN}✓ Deployment report generated${NC}\n"

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ BUILD SUCCESSFUL!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo -e "${YELLOW}📦 Deployment Package:${NC} $DEPLOY_DIR"
echo -e "${YELLOW}📊 Package Size:${NC} $(du -sh "$DEPLOY_DIR" | cut -f1)"
echo -e "${YELLOW}📝 Files Ready:${NC} $(find "$DEPLOY_DIR" -type f | wc -l) files\n"

echo -e "${BLUE}NEXT STEPS:${NC}"
echo -e "1. Review the deployment package in: ${YELLOW}$DEPLOY_DIR${NC}"
echo -e "2. Follow the checklist in: ${YELLOW}DEPLOYMENT_CHECKLIST.txt${NC}"
echo -e "3. Upload files to FirstHost /public_html/"
echo -e "4. Read detailed guide: ${YELLOW}DEPLOYMENT_FIRSTHOST.md${NC}"
echo -e "5. Check security guidelines: ${YELLOW}SECURITY.md${NC}\n"

echo -e "${GREEN}Happy deploying! 🚀${NC}\n"

# 🚀 Quick Start - Deploy to FirstHost.lv

## 30-Second Overview

Your website is now **production-hardened** with security headers, environment variables separation, and deployment guides.

## Quick Deployment (5 steps)

### 1️⃣ Build for Production
```bash
cd /Users/skitt/Desktop/skana-website-2
npm run build
```

### 2️⃣ Create Deployment Package
```bash
bash scripts/deploy.sh
```
This creates a folder with everything ready to upload.

### 3️⃣ Upload to FirstHost
- Go to FirstHost cPanel
- File Manager → /public_html/
- Upload all files from the deployment package
- Upload `.htaccess` (security headers)

### 4️⃣ Test
- Visit https://skana.lv
- Fill and submit contact form
- Check DevTools → Network → Response Headers for security headers

### 5️⃣ Monitor
- Set up uptime monitoring
- Check FirstHost backups are enabled

## What Changed?

### ✅ Security Enhancements
- **Security Headers** - CSP, HSTS, X-Frame-Options, etc.
- **Environment Variables** - `.env.example` created, API keys separated
- **Build Optimization** - Source maps disabled, minified code
- **.htaccess** - Comprehensive security configuration
- **robots.txt** - Search engine controls
- **security.txt** - Security contact information

### 📁 New Files Created
```
.env.example                    # Template for environment variables
.htaccess                       # Apache security headers (upload this!)
SECURITY.md                     # Detailed security guide
DEPLOYMENT_FIRSTHOST.md         # Step-by-step FirstHost guide
PRODUCTION_CHECKLIST.md         # Pre-deployment checklist
scripts/deploy.sh               # Automated build & package script
public/robots.txt               # Search engine robots
public/.well-known/security.txt # Security contact
vite.config.js                  # Enhanced with security settings
```

### 🔒 Critical Security Fixes
1. **Anthropic API Key** - Now only used server-side (you'll need to set up backend)
2. **.env Security** - Confirmed in .gitignore, example created
3. **Security Headers** - Added to .htaccess for FirstHost
4. **Build Safety** - Source maps disabled, code minified

## Important: API Key Warning ⚠️

The Anthropic API key in ChatBot.jsx should be moved to a backend server:

**Option A: Keep ChatBot Disabled**
- Remove the ChatBot component if not needed

**Option B: Set Up Backend API**
- Create a Node.js/serverless endpoint
- Call it from frontend instead of Anthropic directly
- See SECURITY.md for code example

**Option C: Use Different Service**
- Switch to a different AI service with browser APIs
- Or disable chatbot for now

## Pre-Deployment Checklist

Quick version - full checklist in `PRODUCTION_CHECKLIST.md`:

```
[ ] npm audit - all critical issues fixed
[ ] npm run build - completes without error
[ ] No .env file in dist/ folder
[ ] .htaccess file ready to upload
[ ] Contact form tested locally (npm run preview)
[ ] HTTPS certificate ready on FirstHost
[ ] reCAPTCHA keys verified
[ ] EmailJS configuration correct
```

## After Deployment

1. **Test Everything**
   ```
   - Visit https://skana.lv
   - Check security headers: https://securityheaders.com
   - Run SSL test: https://www.ssllabs.com/ssltest/
   - Lighthouse audit: DevTools → Lighthouse
   ```

2. **Monitor**
   - Set up uptime monitoring (uptime.com, pingdom, etc.)
   - Check FirstHost email alerts
   - Review error logs weekly

3. **Maintain**
   - Update npm packages monthly: `npm update`
   - Audit for vulnerabilities: `npm audit`
   - Renew SSL certificate (should be automatic)

## File Reference

| File | Purpose | Action |
|------|---------|--------|
| `.env` | Private config (API keys) | Keep in .gitignore, don't commit |
| `.env.example` | Public template | Check it in, use as documentation |
| `.htaccess` | Apache security config | Upload to FirstHost /public_html/ |
| `SECURITY.md` | Security guidelines | Read before deploying |
| `DEPLOYMENT_FIRSTHOST.md` | Step-by-step guide | Follow when deploying |
| `PRODUCTION_CHECKLIST.md` | Pre-deployment checklist | Check all items before going live |
| `scripts/deploy.sh` | Automated build script | Run to prepare deployment |

## Troubleshooting

**Q: Where do I upload files?**
A: FirstHost cPanel → File Manager → /public_html/

**Q: Do I need to keep the .env file?**
A: No, keep .env.example in repo. .env stays local only.

**Q: Is the chatbot secure?**
A: Not yet - the API key is exposed. Move it server-side first.

**Q: How do I enable HTTPS?**
A: FirstHost → cPanel → SSL/TLS Manager → Auto SSL

**Q: Can I use this deployment for multiple domains?**
A: Yes, just create addon domains in cPanel and upload to each.

## Support

- **Website Setup:** See DEPLOYMENT_FIRSTHOST.md
- **Security Issues:** See SECURITY.md
- **FirstHost Help:** https://www.firsthost.lv/en/help
- **Your Email:** info@skana.lv

---

**Next Step:** Run the deployment script with `bash scripts/deploy.sh`

Happy deploying! 🚀

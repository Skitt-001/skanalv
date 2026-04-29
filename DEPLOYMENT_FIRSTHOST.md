# 🚀 FirstHost.lv Deployment Guide - Skana.lv Website

## Pre-Deployment Checklist

### 1. Environment & Secrets ✅
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` created with placeholder values
- [ ] No API keys committed to version control
- [ ] Anthropic API key removed from frontend code
- [ ] All sensitive data secured

### 2. Code Quality ✅
- [ ] Run `npm audit` - fix any vulnerabilities
- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run preview`
- [ ] Check Console for errors/warnings
- [ ] Verify all forms work correctly
- [ ] Test reCAPTCHA functionality

### 3. Security Headers ✅
- [ ] `.htaccess` file created with security headers
- [ ] CSP policy configured
- [ ] HSTS enabled
- [ ] CORS configured correctly

## Step-by-Step FirstHost.lv Deployment

### Step 1: Prepare Your Domain in cPanel

1. **Login to FirstHost cPanel**
   - Visit: `firsthost.lv` → Client area
   - Login with your credentials
   - Click "cPanel" or go to control.firsthost.lv

2. **Configure Domain/Addon Domain**
   - Navigate to: Addon Domains (or Main Domain if new)
   - Add your domain: `skana.lv`
   - Document URL: `/public_html/`
   - Set up automatic SSL certificate

3. **Enable SSL/TLS**
   - Go to: SSL/TLS Manager
   - Click: "Auto SSL"
   - Or: Install Let's Encrypt (Free)
   - Verify: HTTPS works
   - Force HTTPS: Add to .htaccess (included)

### Step 2: Build Your Project

```bash
# Navigate to project directory
cd /Users/skitt/Desktop/skana-website-2

# Clean previous builds
rm -rf dist

# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Verify build succeeded
ls -la dist/
```

### Step 3: Upload Files to FirstHost

#### Option A: cPanel File Manager (Easy)

1. Open cPanel → File Manager
2. Navigate to: `/public_html/`
3. Delete old files (keep .htaccess if already working)
4. Upload contents of `dist/` folder:
   - All files and folders from dist/
   - assets/ folder
   - index.html
5. Upload additional files:
   - `.htaccess` (from project root)
   - `robots.txt` (from public/)
   - `public/.well-known/` folder
   - `public/logo.png` and other public assets

#### Option B: SSH/SFTP (Recommended for Developers)

```bash
# Using SFTP (if available on FirstHost account)
sftp username@firsthost.lv

# Navigate to public_html
cd public_html

# Upload dist contents
put -r dist/* ./

# Upload security files
put .htaccess .
put public/robots.txt .

# Verify upload
ls -la

# Exit
exit
```

**Or using SSH (if available):**

```bash
# SSH into FirstHost
ssh username@firsthost.lv

# Navigate to web root
cd public_html

# Create backup of existing site
mkdir backup-$(date +%Y%m%d)
cp -r * backup-$(date +%Y%m%d)/ 2>/dev/null || true

# Copy new files (from your local machine)
# Option: Use rsync
rsync -avz --delete dist/* username@firsthost.lv:public_html/

# Verify
ls -la
```

### Step 4: Create .htaccess (Security Configuration)

1. In cPanel File Manager:
   - Go to `/public_html/`
   - Create new file: `.htaccess`
   - Paste the contents from `project-root/.htaccess`
   - Save

Or via SSH:
```bash
ssh username@firsthost.lv
cd public_html
# Create .htaccess with security headers
cat > .htaccess << 'HTACCESS_EOF'
# Paste full .htaccess content here
HTACCESS_EOF
```

### Step 5: Upload Public Assets

```bash
# In File Manager, upload to /public_html/
- logo.png (from public/)
- robots.txt (from public/)
- .well-known/security.txt (folder structure)
- bilde1.JPG, bilde2.JPG, etc. (if needed)
```

### Step 6: Configure Environment Variables

**In cPanel:**

1. Go to: cPanel → "Environment Variables" (if available)
2. Or create a `.env` file in `/public_html/` with:

```bash
# Only public keys - keep this secure
VITE_EMAILJS_SERVICE_ID=service_fr4jgrf
VITE_EMAILJS_TEMPLATE_ID=template_1jaz0u2
VITE_EMAILJS_PUBLIC_KEY=3e2a5_BlS5z2BJDLH
VITE_RECAPTCHA_SITE_KEY=6LeJ6s4sAAAAAMnpkEr8Hci0tnpkC3qewu0c05gA
```

**NEVER store private API keys in .env on the server.**

### Step 7: Test HTTPS & Redirects

1. **Test HTTPS works:**
   ```bash
   https://skana.lv  # Should work
   http://skana.lv   # Should redirect to HTTPS
   ```

2. **Check security headers** (in browser):
   - Open DevTools (F12)
   - Go to Network tab
   - Reload page
   - Click on document request
   - Check Response Headers:
     - ✓ Strict-Transport-Security
     - ✓ X-Frame-Options
     - ✓ Content-Security-Policy
     - ✓ X-Content-Type-Options

3. **Test CSP compliance:**
   - Check Console for CSP violations
   - If errors appear, adjust CSP in .htaccess

### Step 8: Test Website Functionality

```
[ ] Homepage loads correctly
[ ] Navigation works
[ ] Images load properly
[ ] Contact form submits successfully
[ ] reCAPTCHA validates
[ ] Form sends email
[ ] Chatbot loads (if backend set up)
[ ] Mobile responsive design works
[ ] All links work
[ ] No console errors
```

### Step 9: Enable Caching (Performance)

The `.htaccess` includes caching rules. Verify by:

1. In DevTools → Network tab
2. Reload page
3. Check file headers for:
   - `cache-control: public, max-age=31536000` (for assets)
   - `cache-control: max-age=0` (for HTML)

### Step 10: Monitor & Maintain

#### Weekly:
```bash
# Check SSL certificate (days until expiration)
# Auto-renewal should be on - verify in cPanel
```

#### Monthly:
```bash
# Review access logs for suspicious activity
# Check error logs in cPanel
# Monitor uptime
```

#### Quarterly:
- Run security scan: https://securityheaders.com
- Run SSL test: https://www.ssllabs.com/ssltest/
- Audit npm dependencies: npm audit
- Update dependencies: npm update

## Important FirstHost-Specific Notes

### cPanel Path Clarification:
- **Public folder:** `/public_html/`
- **Behind-the-scenes:** `/home/username/`
- **Backups:** Auto-backup in cPanel backup section

### Common FirstHost Limits:
- **Disk Space:** Check in cPanel → Usage
- **Bandwidth:** Monitor in cPanel → Bandwidth
- **Email Accounts:** Can create for info@skana.lv
- **SSL Certificate:** Automatic (Let's Encrypt)

### FirstHost Support:
- Help: https://www.firsthost.lv/en/help
- Ticket: Submit through Client Area
- Chat: Available during business hours

## Backend Setup (For Chatbot API Proxy)

If you want to move the Anthropic API calls to backend:

### Create a simple Node.js backend on FirstHost

**If FirstHost supports Node.js:**

1. Set up Node.js in cPanel (if available)
2. Create `api/chat.js`:

```javascript
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const rateLimit = require('express-rate-limit');
const app = express();

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY // Server-side only
    });
    
    const message = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      system: 'Tu esi Skana.lv klientu apkalpošanas asistents...',
      messages: messages
    });
    
    res.json({ content: message.content[0].text });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Service unavailable' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

3. Update ChatBot.jsx to use backend:

```javascript
async function sendMessageToAPI(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  
  if (!response.ok) throw new Error('API request failed');
  const data = await response.json();
  return data.content;
}
```

**If FirstHost doesn't support Node.js:**

Use a third-party serverless platform:
- Vercel (Free tier available)
- Firebase Cloud Functions (Free tier)
- AWS Lambda (Free tier first year)

Configure the backend URL in `.env`:
```
VITE_API_ENDPOINT=https://your-serverless-backend.com/api/chat
```

## Troubleshooting

### Issue: "Cannot find module" errors
- Check that all dependencies are installed: `npm install`
- Rebuild: `npm run build`

### Issue: Images not loading
- Verify image paths in public folder
- Check image ownership: `chmod 644 image.jpg`
- Ensure no hotlink blocking in .htaccess

### Issue: 404 on page refresh
- .htaccess may not be working
- Upload .htaccess to /public_html/
- Enable mod_rewrite in cPanel if available
- Contact FirstHost support if not enabled

### Issue: Email not sending
- Verify EmailJS credentials are correct
- Check FirstHost email restrictions
- Ensure reCAPTCHA token is valid
- Review form data server-side

### Issue: CSP blocking resources
- Check browser console for CSP violations
- Update CSP header in .htaccess
- Test with specific domain exceptions

### Issue: SSL certificate warning
- Force HTTPS in .htaccess (included)
- Enable AutoSSL in cPanel
- Wait 24-48 hours for renewal
- Contact FirstHost if certificate doesn't renew

## Security Checklist - Before Going Live ✅

- [ ] HTTPS is working and enforced
- [ ] .env file not accessible (in .gitignore)
- [ ] Security headers configured (.htaccess uploaded)
- [ ] CORS set to your domain only
- [ ] API keys rotated if ever exposed
- [ ] Forms have reCAPTCHA + honeypot
- [ ] Email validation on contact form
- [ ] Rate limiting on forms (implemented)
- [ ] No sensitive data in source code
- [ ] robots.txt blocks /api/, /admin/
- [ ] No directory listing allowed
- [ ] Source maps disabled in production
- [ ] Dependencies audited (npm audit)
- [ ] Backups scheduled in cPanel
- [ ] SSL auto-renewal enabled

## Support & Further Help

- **FirstHost Support:** support@firsthost.lv
- **SSL/TLS Issues:** Contact FirstHost (cPanel → SSL)
- **Performance Optimization:** Use cPanel → Optimization tools
- **Security Monitoring:** Set up email alerts in cPanel
- **Monitoring Service:** Use https://uptime.com or similar

## Next Steps After Deployment

1. ✅ Test everything thoroughly
2. ✅ Submit sitemap to Google Search Console
3. ✅ Monitor uptime
4. ✅ Set up email alerts for errors
5. ✅ Regular security audits
6. ✅ Keep software updated
7. ✅ Regular backups verification

---

**Deployment Date:** [Your Date]
**Website:** https://skana.lv
**Support Email:** info@skana.lv
**Security Email:** security@skana.lv

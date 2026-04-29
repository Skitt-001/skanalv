# 🔒 Security Hardening Guide for Production Deployment

## Critical Security Issues & Fixes

### 1. ✅ API Key Management - SECURE

**Implementation:** Only public keys are used in client-side code
- EmailJS keys (public)
- reCAPTCHA keys (public)
- No private API keys exposed ✓

**Best Practice:** Never expose private API keys in frontend code. If you need backend services, create a server-side proxy.

### 2. 🌐 Environment Variables

```bash
# .env file (NEVER commit this)
VITE_EMAILJS_SERVICE_ID=your_public_id
VITE_EMAILJS_TEMPLATE_ID=your_public_id  
VITE_RECAPTCHA_SITE_KEY=your_public_key
VITE_API_ENDPOINT=https://api.skana.lv  # Backend endpoint, not client keys
```

### 3. 🔐 Security Headers - Add to Server Configuration

**For FirstHost/cPanel/.htaccess:**

```apache
<IfModule mod_headers.c>
  # HTTPS Strict Transport Security
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  
  # Content Security Policy - Prevents XSS/injection attacks
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.anthropic.com https://www.google.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://www.google.com; object-src 'none';"
  
  # X-Frame-Options - Prevents clickjacking
  Header set X-Frame-Options "SAMEORIGIN"
  
  # X-Content-Type-Options - Prevents MIME sniffing
  Header set X-Content-Type-Options "nosniff"
  
  # X-XSS-Protection - Browser XSS filter
  Header set X-XSS-Protection "1; mode=block"
  
  # Referrer Policy - Controls referrer information
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Permissions Policy - Restricts browser features
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()"
</IfModule>
```

### 4. 🤖 CORS Configuration

```apache
<IfModule mod_headers.c>
  # Allow your domain only
  SetEnvIf Origin "^https?://(www\.)?skana\.lv$" CORS_ALLOWED=true
  Header set Access-Control-Allow-Origin "*" env=CORS_ALLOWED
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, X-Requested-With"
  Header set Access-Control-Max-Age "86400"
</IfModule>
```

### 5. 🔄 HTTPS Enforcement

```apache
# Redirect HTTP to HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

### 6. 🚫 Bot Protection & Rate Limiting

```apache
# Disable directory listing
<IfModule mod_autoindex.c>
  Options -Indexes
</IfModule>

# Block common bot patterns
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_USER_AGENT} (bot|crawler|spider|scraper) [NC]
  RewriteRule ^.*$ - [F,L]
</IfModule>
```

### 7. 📝 Hide Server Information

```apache
<IfModule mod_headers.c>
  Header always unset X-Powered-By
  Header unset X-Aspnet-Version
  Header unset X-Runtime
</IfModule>
```

### 8. ✅ Form Security (Already Implemented - GOOD!)

Your Contact form has:
- ✅ reCAPTCHA validation
- ✅ Honeypot field (bot detection)  
- ✅ Rate limiting (5 second minimum)
- ✅ Email validation

**Recommendation:** Also add server-side validation for all form data.

### 9. 📦 Dependencies Security

Regular updates:
```bash
npm audit
npm audit fix
npm update
```

### 10. 🏗️ Build Optimization

Your Vite config should include:
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
    // Security optimizations
    sourcemap: false, // Don't expose source maps in production
    minify: 'terser', // Minify code
  },
  // Content Security Policy
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    }
  }
})
```

## Production Deployment Checklist

### Before Going Live:

- [ ] Remove Anthropic API key from .env (implement server-side endpoint)
- [ ] Verify .env is in .gitignore
- [ ] Create .env.example with public keys only
- [ ] Add all security headers to .htaccess or server config
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Test CSP implementation (browser console for violations)
- [ ] Configure CORS properly (your domain only)
- [ ] Set up rate limiting on API endpoints
- [ ] Enable gzip compression
- [ ] Remove source maps from production build
- [ ] Test form submission with server-side validation
- [ ] Add security.txt file
- [ ] Review robots.txt for sensitive paths
- [ ] Enable email verification if possible
- [ ] Set up logging and monitoring
- [ ] Create backup and disaster recovery plan

### Ongoing Security:

- [ ] Monitor npm dependencies for vulnerabilities weekly
- [ ] Keep server software updated
- [ ] Review access logs monthly
- [ ] Test backups regularly
- [ ] Keep SSL certificate renewed
- [ ] Monitor uptime and performance

## FirstHost.lv Specific Setup

### File Locations:
- Web root: `/public_html/`
- Configuration: `.htaccess` in web root
- Environment: Use cPanel Environment Variables or backend .env

### SSH Access (if available):
```bash
# Access your FirstHost account via SSH
ssh username@firsthost.lv

# Navigate to web root
cd public_html

# Create .htaccess with security headers
cat > .htaccess << 'EOF'
[paste the .htaccess content from section 3 above]
EOF
```

### cPanel Configuration:
1. Go to cPanel → SSL/TLS Manager
2. Install AutoSSL certificate (free Let's Encrypt)
3. Force HTTPS in domain settings
4. Set up automatic renewal

## File Structure for Deployment

```
public_html/
├── index.html
├── .htaccess (security headers)
├── robots.txt (SEO)
├── security.txt (security contact)
├── dist/
│   ├── assets/
│   ├── index-*.js
│   └── index-*.css
├── public/
│   └── logo.png
└── package.json (for reference)
```

## Security Monitoring

1. **Monitor suspicious activity:**
   - Check access logs for unusual patterns
   - Monitor form submissions for spam
   - Watch for repeated failed reCAPTCHA attempts

2. **Set up alerts for:**
   - Sudden traffic spikes
   - Failed authentication attempts
   - 404 errors (scanning for vulnerabilities)
   - SSL certificate expiration (30 days before)

3. **Regular security audits:**
   - Use online tools: SSL Labs, SecurityHeaders.com, Mozilla Observatory
   - Run local security checks: npm audit, lighthouse audits
   - Test manually with OWASP testing guide

## Contact Information

For security issues: security@skana.lv

Never disclose security vulnerabilities publicly. Report them privately to the email above.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines)
- [HTML5 Security Cheatsheet](https://html5sec.org/)
- [Content Security Policy Guide](https://content-security-policy.com/)

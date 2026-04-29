# 🔐 Production Security Checklist

Use this checklist before deploying to FirstHost.lv

## Code Security

### Environment Variables
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` created with public values only
- [ ] No credentials in `package.json`
- [ ] No API keys in source code
- [ ] No hardcoded URLs/IPs in code
- [ ] Anthropic API key removed from ChatBot.jsx

### Dependencies
- [ ] Ran `npm audit` - all critical issues resolved
- [ ] Ran `npm install` to get latest security patches
- [ ] No unused dependencies (npm prune)
- [ ] Verified all third-party packages are legitimate

### Source Code
- [ ] Input validation on all forms
- [ ] No console.log() with sensitive data
- [ ] No eval() or Function() constructor usage
- [ ] No dangling API calls
- [ ] Error messages don't expose system info
- [ ] SQL/NoSQL injection protection (if applicable)
- [ ] XSS prevention (React default escaping enabled)
- [ ] CSRF tokens on forms (if needed)

### Build & Artifacts
- [ ] `npm run build` completes without errors
- [ ] `dist/` directory only contains necessary files
- [ ] No `.env` file in dist/
- [ ] No source maps in production build
- [ ] No debug code left in production

## Server Configuration

### HTTP Security Headers
- [ ] Strict-Transport-Security (HSTS) enabled
- [ ] Content-Security-Policy (CSP) configured
- [ ] X-Frame-Options set to SAMEORIGIN
- [ ] X-Content-Type-Options set to nosniff
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy restricts browser features
- [ ] Server info headers removed (X-Powered-By)

### HTTPS/SSL
- [ ] SSL certificate installed
- [ ] HTTP to HTTPS redirect enforced
- [ ] SSL certificate auto-renewal enabled
- [ ] SSL Labs rating A or A+ (check on ssllabs.com)

### CORS
- [ ] CORS headers configured for your domain only
- [ ] No wildcard (*) CORS allowed
- [ ] Preflight requests handled correctly

### File Access Control
- [ ] `.env` files inaccessible (.htaccess blocking)
- [ ] `package.json` not accessible via HTTP
- [ ] No directory listing allowed
- [ ] `.git` folder not exposed
- [ ] No sensitive file extensions accessible

### Rate Limiting
- [ ] Form submissions rate-limited (5 sec minimum) ✓
- [ ] API endpoints rate-limited (if applicable)
- [ ] DDoS protection enabled (if available)
- [ ] Spam detection active (reCAPTCHA) ✓

## Application Security

### Authentication/Authorization
- [ ] Contact form validates all inputs
- [ ] Email validation is strict
- [ ] Phone number validation (optional)
- [ ] reCAPTCHA working correctly ✓
- [ ] Honeypot field active ✓
- [ ] Admin pages (if any) require authentication

### Data Protection
- [ ] Sensitive data not logged to files
- [ ] Form data validated server-side (if possible)
- [ ] PII handled according to GDPR/privacy laws
- [ ] Backup strategy in place
- [ ] Data retention policy documented
- [ ] Encryption in transit (HTTPS) ✓
- [ ] Encryption at rest (if storing data)

### Email Security
- [ ] Contact form uses verified email service (EmailJS) ✓
- [ ] Email addresses validated
- [ ] No email addresses exposed in HTML comments
- [ ] Email headers prevent injection attacks
- [ ] SPF/DKIM/DMARC records configured (contact FirstHost)

### Chatbot Security (if enabled)
- [ ] API calls proxied through backend (IMPORTANT!)
- [ ] Rate limiting on API calls
- [ ] Input validation on user messages
- [ ] No sensitive data in chat history
- [ ] API key never exposed to client

## Performance & Availability

### Performance
- [ ] Gzip compression enabled
- [ ] Browser caching configured
- [ ] Image optimization applied
- [ ] CSS/JS minification enabled ✓
- [ ] Code splitting optimized ✓
- [ ] Lazy loading implemented (if needed)
- [ ] CDN configured (if using)

### Availability
- [ ] Uptime monitoring set up
- [ ] Error tracking configured
- [ ] Backup schedule configured
- [ ] Disaster recovery plan documented
- [ ] Load testing completed (if high traffic expected)

### Mobile Security
- [ ] Mobile viewport configured ✓
- [ ] Touch events handled securely
- [ ] No sensitive data in local storage
- [ ] Cross-site scripting (XSS) prevention ✓

## Monitoring & Maintenance

### Logging
- [ ] Error logging configured
- [ ] Access logs reviewed for suspicious activity
- [ ] Failed login attempts logged (if applicable)
- [ ] No sensitive data in logs

### Monitoring
- [ ] Uptime monitoring active
- [ ] Email alerts configured for errors
- [ ] Performance monitoring enabled
- [ ] Security monitoring enabled

### Updates & Patches
- [ ] NPM dependencies can be updated automatically
- [ ] Security update schedule documented
- [ ] OS/Server patches scheduled
- [ ] SSL certificate renewal automated

## Documentation

- [ ] `.env.example` created and documented
- [ ] `SECURITY.md` reviewed and updated
- [ ] `DEPLOYMENT_FIRSTHOST.md` available
- [ ] Deployment runbook created
- [ ] Security contacts documented
- [ ] Incident response plan available

## Deployment Steps

1. [ ] Run security checks: `npm audit`
2. [ ] Build for production: `npm run build`
3. [ ] Run deployment script: `bash scripts/deploy.sh`
4. [ ] Review generated deployment package
5. [ ] Upload to FirstHost /public_html/
6. [ ] Upload .htaccess with security headers
7. [ ] Verify HTTPS is working
8. [ ] Test all functionality
9. [ ] Check security headers: https://securityheaders.com
10. [ ] Monitor error logs

## Post-Deployment

- [ ] Website loads over HTTPS ✓
- [ ] All security headers present ✓
- [ ] Contact form sends emails
- [ ] reCAPTCHA validates correctly
- [ ] Images load properly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable (Lighthouse A+)
- [ ] No security warnings in browser

## Contact Information

- **Website:** https://skana.lv
- **Support Email:** info@skana.lv
- **Security Email:** security@skana.lv
- **FirstHost Support:** support@firsthost.lv

## Sign-Off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Developer | | | |
| Security Review | | | |
| QA Testing | | | |
| Deployment | | | |

---

**Checklist Version:** 1.0  
**Last Updated:** 2024-04-28  
**Next Review:** 2024-05-28

---

**Remember:** Security is not a one-time task. Regular updates, monitoring, and audits are essential for maintaining a secure website.

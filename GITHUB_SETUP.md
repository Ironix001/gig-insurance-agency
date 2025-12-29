# GitHub Setup Guide

## Current Git Configuration
- **Username**: Ironix001
- **Email**: georgealoo2003@gmail.com

## Steps to Connect GitHub

### Option 1: Create New Repository on GitHub (Recommended)

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `gig-insurance-agency` (or your preferred name)
3. **Description**: "GIG Insurance Agency Website"
4. **Visibility**: 
   - Choose **Public** (free, visible to everyone)
   - Or **Private** (only you can see it)
5. **DO NOT** check:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Click **"Create repository"**

### Option 2: Use Existing Repository

If you already have a repository:
- Copy the repository URL (e.g., `https://github.com/Ironix001/gig-insurance-agency.git`)

## After Creating Repository

Once you have the repository URL, run these commands:

```bash
# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/Ironix001/gig-insurance-agency.git

# Verify connection
git remote -v
```

## Authentication Methods

### Method 1: GitHub CLI (Easiest)
```bash
# Install GitHub CLI if not installed
# Then authenticate:
gh auth login
```

### Method 2: Personal Access Token (PAT)
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Netlify Deployment"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use token as password:
   ```bash
   git push -u origin main
   # Username: Ironix001
   # Password: [paste your token]
   ```

### Method 3: SSH Key (Most Secure)
1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "georgealoo2003@gmail.com"
   ```
2. Add to GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste key and save
3. Use SSH URL:
   ```bash
   git remote set-url origin git@github.com:Ironix001/gig-insurance-agency.git
   ```

## Next Steps

After connecting GitHub:
1. Add files: `git add .`
2. Commit: `git commit -m "Initial commit - Ready for Netlify"`
3. Push: `git push -u origin main`

## Need Help?

- GitHub Docs: https://docs.github.com
- Authentication: https://docs.github.com/en/authentication


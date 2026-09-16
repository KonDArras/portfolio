#!/bin/bash

# Stop if you get an error
set -e

# AWS CLI v2 pipes output through `less` by default when run in a terminal,
# which makes commands like `sts get-caller-identity` or `s3 sync` appear to
# hang until you manually press q. Disable that for this non-interactive script.
export AWS_PAGER=""

# Usage: ./renew_dist.sh <aws-profile> <s3-bucket> <cloudfront-dist-id>
AWS_PROFILE=$1
S3_BUCKET=$2
CLOUDFRONT_DIST=$3

if [ -z "$AWS_PROFILE" ] || [ -z "$S3_BUCKET" ] || [ -z "$CLOUDFRONT_DIST" ]; then
  echo "Usage: $0 <aws-profile> <s3-bucket> <cloudfront-dist-id>" >&2
  exit 1
fi

cd "$(dirname "$0")"

# Check script prerequisites
node --version
npm --version

# 1. Install dependencies
npm install

# 2. Build the static site
npm run build

# Set aws profile
export AWS_DEFAULT_PROFILE=$AWS_PROFILE
# Check active AWS Profile
aws sts get-caller-identity

# 3. Upload the site to S3
aws s3 sync ./dist "s3://$S3_BUCKET" --delete

# 4. Invalidate the CDN so the new build is served
aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DIST" --paths "/*"

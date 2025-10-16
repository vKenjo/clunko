#!/bin/bash

# Production Deployment Script for Stacks Lottery
# This script helps deploy contracts to mainnet and frontend to Vercel

set -e  # Exit on error

echo "🚀 Stacks Lottery - Production Deployment"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "Clarinet.toml" ]; then
    echo "❌ Error: Clarinet.toml not found. Please run this script from the projectx directory."
    exit 1
fi

echo "⚠️  WARNING: This will deploy to MAINNET and costs real STX!"
echo ""
read -p "Have you updated settings/Mainnet.toml with your mnemonic? (yes/no): " CONFIRM_SETTINGS

if [ "$CONFIRM_SETTINGS" != "yes" ]; then
    echo "❌ Please update settings/Mainnet.toml first, then run this script again."
    exit 1
fi

echo ""
echo "📋 Deployment Options:"
echo "1. Deploy to Testnet (Recommended - FREE)"
echo "2. Deploy to Mainnet (Costs real STX)"
echo "3. Deploy Frontend to Vercel"
echo "4. Full Deployment (Mainnet + Vercel)"
echo ""
read -p "Select option (1-4): " OPTION

case $OPTION in
    1)
        echo ""
        echo "🧪 Deploying to Testnet..."
        echo ""
        
        # Generate testnet deployment plan
        echo "📝 Generating testnet deployment plan..."
        clarinet deployments generate --testnet
        
        # Deploy to testnet
        echo "🚀 Deploying contracts to testnet..."
        clarinet deployments apply --testnet
        
        echo ""
        echo "✅ Testnet deployment complete!"
        echo ""
        echo "📋 Next steps:"
        echo "1. Note your contract addresses (they start with ST...)"
        echo "2. Update projectx-fe/.env.local with your contract addresses"
        echo "3. Set NEXT_PUBLIC_NETWORK=testnet"
        echo "4. Test your frontend locally"
        ;;
        
    2)
        echo ""
        echo "⚠️  MAINNET DEPLOYMENT - THIS COSTS REAL STX!"
        echo ""
        read -p "Are you absolutely sure? Type 'DEPLOY' to continue: " FINAL_CONFIRM
        
        if [ "$FINAL_CONFIRM" != "DEPLOY" ]; then
            echo "❌ Deployment cancelled."
            exit 1
        fi
        
        echo ""
        echo "🌐 Deploying to Mainnet..."
        echo ""
        
        # Generate mainnet deployment plan
        echo "📝 Generating mainnet deployment plan..."
        clarinet deployments generate --mainnet
        
        # Show cost estimate
        echo "💰 Checking deployment costs..."
        clarinet deployments check --mainnet || true
        
        echo ""
        read -p "Proceed with deployment? (yes/no): " PROCEED
        
        if [ "$PROCEED" != "yes" ]; then
            echo "❌ Deployment cancelled."
            exit 1
        fi
        
        # Deploy to mainnet
        echo "🚀 Deploying contracts to mainnet..."
        clarinet deployments apply --mainnet
        
        echo ""
        echo "✅ Mainnet deployment complete!"
        echo ""
        echo "📋 IMPORTANT: Save your contract addresses!"
        echo "You'll need them for the frontend deployment."
        echo ""
        echo "📋 Next steps:"
        echo "1. Create the first lottery round"
        echo "2. Update projectx-fe/.env.production with your contract addresses"
        echo "3. Deploy frontend to Vercel (option 3)"
        ;;
        
    3)
        echo ""
        echo "🌐 Deploying Frontend to Vercel..."
        echo ""
        
        cd ../projectx-fe
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "🔍 Checking .env.production..."
        if [ ! -f ".env.production" ]; then
            echo "⚠️  Warning: .env.production not found."
            echo ""
            read -p "Create .env.production now? (yes/no): " CREATE_ENV
            
            if [ "$CREATE_ENV" = "yes" ]; then
                echo ""
                read -p "Enter your main-lottery contract address (SP...): " CONTRACT_MAIN
                read -p "Enter your number-generator contract address (SP...): " CONTRACT_GEN
                read -p "Enter your prize-disbursement contract address (SP...): " CONTRACT_PRIZE
                
                cat > .env.production << EOF
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_MAIN_LOTTERY_CONTRACT=$CONTRACT_MAIN
NEXT_PUBLIC_NUMBER_GENERATOR_CONTRACT=$CONTRACT_GEN
NEXT_PUBLIC_PRIZE_DISBURSEMENT_CONTRACT=$CONTRACT_PRIZE
EOF
                echo "✅ .env.production created!"
            fi
        fi
        
        echo ""
        echo "📦 Building frontend..."
        npm run build
        
        echo ""
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        
        echo ""
        echo "✅ Frontend deployment complete!"
        echo ""
        echo "📋 Don't forget to set environment variables in Vercel dashboard!"
        ;;
        
    4)
        echo ""
        echo "🌐 Full Production Deployment (Mainnet + Vercel)"
        echo ""
        echo "This will:"
        echo "1. Deploy contracts to mainnet (costs real STX)"
        echo "2. Deploy frontend to Vercel"
        echo ""
        read -p "Type 'DEPLOY' to continue: " FULL_CONFIRM
        
        if [ "$FULL_CONFIRM" != "DEPLOY" ]; then
            echo "❌ Deployment cancelled."
            exit 1
        fi
        
        # Deploy to mainnet first
        $0  # This will re-run the script, user can select option 2
        
        echo ""
        read -p "Continue with frontend deployment? (yes/no): " CONTINUE_FRONTEND
        
        if [ "$CONTINUE_FRONTEND" = "yes" ]; then
            OPTION=3
            $0  # Re-run for frontend
        fi
        ;;
        
    *)
        echo "❌ Invalid option. Please run the script again and select 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process complete!"
echo ""
echo "📋 Useful Links:"
echo "- Stacks Explorer: https://explorer.hiro.so/"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Documentation: See PRODUCTION_DEPLOYMENT.md"

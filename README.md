# SharePacks by MyCardShares

![SharePacks Vending Machine](https://images.unsplash.com/photo-1584385002340-d886f3a0f097?auto=format&fit=crop&q=80&w=1200)

## Overview

SharePacks is a modern, interactive virtual vending machine platform for purchasing and collecting digital card shares. Built with React, TypeScript, and cutting-edge web technologies, it offers an immersive and engaging experience for collectors.

## Features

### 🎮 Interactive Vending Experience
- Realistic mechanical arm simulation with physics-based movements
- Dynamic lighting system with ambient and spotlight effects
- Glass morphism design elements with realistic reflections
- Responsive animations and state transitions
- Real-time sound effects and haptic feedback

### 💳 Multiple Payment Options
- Credit/Debit card payments via Stripe
- BSV cryptocurrency integration
- Real-time balance tracking
- Secure transaction processing
- Automatic payment verification

### 🎁 Pack Opening Experience
- Cinematic reveal animations
- Particle effects and dynamic lighting
- Custom sound effects
- Social sharing integration
- Achievement system

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly controls
- Cross-browser compatibility
- Performance optimized

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account (for payments)
- BSV wallet (for crypto payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sharepacks.git
cd sharepacks
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BSV_ADDRESS=your_bsv_address
MONGODB_URI=your_mongodb_uri
```

4. Start the development server:
```bash
npm run dev
```

## Usage Guide

### Purchasing SharePacks

1. **Select a Pack**
   - Browse available pack options
   - View pack details and pricing
   - Select your desired pack

2. **Add Funds**
   - Click "Add Funds" button
   - Choose payment method (Card/BSV)
   - Complete payment process

3. **Purchase Process**
   - Click "Purchase" on selected pack
   - Watch vending animation sequence
   - Receive your SharePack

4. **Card Reveal**
   - Experience cinematic reveal animation
   - View your new cards
   - Share on social media
   - Track your collection

### Admin Panel

1. **Accessing Admin**
   - Click admin icon
   - Enter admin credentials
   - Access management features

2. **Managing Cards**
   - Upload card images
   - Set card properties
   - Manage inventory
   - Track transactions

3. **Pack Configuration**
   - Create new pack types
   - Set pack contents
   - Configure pricing
   - Adjust drop rates

## Technical Details

### Architecture

```
src/
├── components/         # React components
├── services/          # API and service layers
├── store/             # State management
├── hooks/             # Custom React hooks
├── effects/           # Animation effects
├── utils/            # Utility functions
└── types/            # TypeScript definitions
```

### Key Technologies

- **Frontend**
  - React 18
  - TypeScript
  - Framer Motion
  - Tailwind CSS
  - Stripe Elements

- **State Management**
  - Zustand
  - React Query

- **Animations**
  - Framer Motion
  - React Spring
  - Three.js

- **Payments**
  - Stripe API
  - BSV Integration

### Performance Optimizations

- Code splitting
- Lazy loading
- Asset optimization
- Caching strategies
- Preload animations
- Debounced actions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code style
- Write unit tests
- Document new features
- Optimize for performance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [docs.mycardshares.com](https://docs.mycardshares.com)
- Discord: [discord.gg/mycardshares](https://discord.gg/mycardshares)
- Email: support@mycardshares.com

## Acknowledgments

- [Framer Motion](https://www.framer.com/motion/)
- [Stripe](https://stripe.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

---

Built with ❤️ by MyCardShares Team
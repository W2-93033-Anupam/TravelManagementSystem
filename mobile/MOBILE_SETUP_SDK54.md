# Travel Management Mobile App Setup (Expo SDK 54)

## Prerequisites
- Node.js (v18+)
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device
- Backend server running on `http://localhost:5000`

## Installation

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Start the Development Server
```bash
npx expo start
# or
npm start
```

### 3. Run on Device
- Install Expo Go app on your phone
- Scan the QR code from the terminal/browser
- App will load on your device

## Expo SDK 54 Features

### Updated Dependencies
- **Expo SDK**: 54.0.0
- **React**: 18.3.1
- **React Native**: 0.76.5
- **React Navigation**: 7.x
- **Expo Vector Icons**: Built-in icon support

### Migration from SDK 49 to 54
- Updated all dependencies to latest versions
- Replaced `react-native-vector-icons` with `@expo/vector-icons`
- Updated navigation libraries to v7
- Enhanced AsyncStorage integration

## Quick Start Commands

```bash
# Install dependencies
cd mobile && npm install

# Start development server
npx expo start

# Clear cache if needed
npx expo start --clear
```

## Production Build

### EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

The mobile app provides the same core functionality as the web application with native mobile experience optimized for Expo SDK 54.
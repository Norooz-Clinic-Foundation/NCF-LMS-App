## Setup

This project uses [Expo's EAS build](https://docs.expo.dev/build/introduction/) service.

1. clone the project `git clone https://github.com/bensontnorooz/ncfapp.git`
1. cd into the repo with `cd ncfapp`
1. Install the dependencies: `npm i`
1. Create a [new Expo project](https://expo.dev/accounts/_/projects)
1. Link this app to your project: `npm install --global eas-cli && eas init --id your-expo-project-id`
1. [Create a build for your physical device](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
1. Start the development server for your project: `npx expo start --dev-client`
1. Scan the QR code shown in the terminal with your physical device.
1. Sign up/in to create a user in Supabase Auth.

### iOS Simulator setup

For setting up the iOS simulator, follow [this guide](https://docs.expo.dev/workflow/ios-simulator/)
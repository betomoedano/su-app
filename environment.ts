import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

type Environment = 'development' | 'preview' | 'production';

interface EnvironmentConfig {
  apiUrl: string;
  // Add other environment-specific variables here
}

const defaultConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3002/v1',
};

const environments: Record<Environment, EnvironmentConfig> = {
  development: {
    ...defaultConfig,
  },
  preview: {
    ...defaultConfig,
    apiUrl: 'https://dev.api.socialuniverse.app/v1',
  },
  production: {
    ...defaultConfig,
    apiUrl: 'https://api.socialuniverse.app/v1',
  },
};

let currentEnvironment: Environment = 'development';

if (__DEV__) {
  currentEnvironment = 'development';
} else if (Updates.channel === 'preview') {
  currentEnvironment = 'preview';
} else if (Updates.channel === 'production') {
  currentEnvironment = 'production';
}

// Fallback to using Constants if Updates.channel is not set
if (!Updates.channel && Constants.expoConfig?.extra?.environment) {
  currentEnvironment = Constants.expoConfig.extra.environment as Environment;
}

export const environment: EnvironmentConfig = environments[currentEnvironment];

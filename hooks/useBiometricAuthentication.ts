import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export const useBiometricAuthentication = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasEnrolled, setHasEnrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkBiometricSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSupported(hasHardware);
    setHasEnrolled(isEnrolled);
  };

  const authenticate = async () => {
    if (!isBiometricSupported || !hasEnrolled) {
      return { success: false, message: 'Biometric enrollment is required.' };
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      setIsAuthenticated(true);
      return { success: true, message: 'Authentication successful!' };
    } else {
      return { success: false, message: 'Authentication failed.' };
    }
  };

  return {
    isBiometricSupported,
    hasEnrolled,
    isAuthenticated,
    checkBiometricSupport,
    authenticate,
  };
};
import { act, renderHook } from "@testing-library/react-native";
import { useBiometricAuthentication } from "../useBiometricAuthentication";
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication');

describe('useBiometricAuthentication', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should check if device has biometric hardware', async () => {
        (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);

        const { result } = renderHook(() => useBiometricAuthentication());

        await act(async () => {
            await result.current.checkBiometricSupport();
        });

        expect(result.current.isBiometricSupported).toBe(true);
    });

    it('should check if biometric is enrolled', async () => {
        (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);

        const { result } = renderHook(() => useBiometricAuthentication());

        await act(async () => {
            await result.current.checkBiometricSupport();
        });

        expect(result.current.hasEnrolled).toBe(true);
    });

    describe('when device has biometric hardware and is enrolled', () => {
        it('should perform biometric authentication', async () => {
            (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
            (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
            (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({ success: true });

            const { result } = renderHook(() => useBiometricAuthentication());

            await act(async () => await result.current.checkBiometricSupport());

            await act(async () => {
                await result.current.authenticate();
            });

            expect(result.current.isAuthenticated).toBe(true);
        });
    });

    describe('when device has biometric hardware and has not enrol', () => {
        it('should perform biometric authentication', async () => {
            (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
            (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);
            const authenticateAsyncMock = LocalAuthentication.authenticateAsync as jest.Mock;
            authenticateAsyncMock.mockResolvedValue({ success: true });

            const { result } = renderHook(() => useBiometricAuthentication());

            await act(async () => await result.current.checkBiometricSupport());

            await act(async () => {
                await result.current.authenticate();
            });

            expect(result.current.isAuthenticated).toBe(false);
            expect(authenticateAsyncMock).not.toHaveBeenCalled();
        });
    });
});
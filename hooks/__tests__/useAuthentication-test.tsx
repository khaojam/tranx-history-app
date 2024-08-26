import { act, renderHook } from "@testing-library/react-native";
import { useAuthentication } from "../useAuthentication";

describe('useAuthentication', () => {
    it('should return success as false when username is empty', async () => {
        const { result } = renderHook(() => useAuthentication());
        const loginResult = await result.current.login('', '123');

        expect(loginResult.success).toBe(false);
    });

    it('should return success as false when password is empty', async () => {
        const { result } = renderHook(() => useAuthentication());
        const loginResult = await result.current.login('john', '');
        
        expect(loginResult.success).toBe(false);
    });

    it('should return success as false when both username and password are invalid', async () => {
        const { result } = renderHook(() => useAuthentication());
        const loginResult = await result.current.login('john', '123');
        
        expect(loginResult.success).toBe(false);
    });

    it('should return success as true when both username and password are valid', async () => {
        const { result } = renderHook(() => useAuthentication());
        const loginResult = await result.current.login('user', 'user');
        
        expect(loginResult.success).toBe(true);
    });
});
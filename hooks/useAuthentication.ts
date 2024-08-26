const defaultUsername = 'user';
const defaultPassword = 'user';

export const useAuthentication= () => {
    const login = async (username: string, password: string) => {
        if (!username || !password) {
            return { success: false };
        }

        if (username === defaultUsername && password === defaultPassword) {
            return { success: true };
        } else {
            return { success: false };
        }
    };

    return { login };
}
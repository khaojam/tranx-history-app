export const useAuthentication= () => {
    const login = async (username: string, password: string) => {
        if (!username || !password) {
            return { success: false };
        }

        if (username === 'user' && password === 'user') {
            return { success: true };
        } else {
            return { success: false };
        }
    };

    return { login };
}
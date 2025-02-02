export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("userId");
};

import {useCookies} from "react-cookie";


export const useIsAuthenticated = () => {
    const [cookies] = useCookies(['session']);
    return !!cookies.session;
};
import {useCookies} from "react-cookie";


export const useIsAuthenticated = () => {
    const [cookies] = useCookies(['session']);
    console.log(cookies)
    return !!cookies.session;
};
import {useNavigate} from "react-router-dom";

export function useAppNavigation() {
    const navigate = useNavigate();

    return (url: string) => {
        if (!url) return;

        if (url.startsWith("#")) {
            const element = document.getElementById(url.substring(1));
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        } else {
            navigate(url);
        }
    };
}

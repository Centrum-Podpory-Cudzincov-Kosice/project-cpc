"use client";

import styles from "./auth.module.css";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";

export default function LogOut() {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();

        router.push("/login");
        router.refresh();
    };

    return (
        <button onClick={handleLogout}
                className={styles.logOutBtn}>
            Odhlásiť sa
        </button>
    );
}
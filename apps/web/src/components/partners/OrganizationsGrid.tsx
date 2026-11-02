import {useEffect, useState} from "react";
import {organizations} from "../../lib/partners/organizations";
import {Organization} from "../../types/partners";
import OrganizationBox from "./OrganizationBox";
import styles from "./partners.module.css";

const getColumnCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.matchMedia("(min-width: 1600px)").matches) return 3;
    if (window.matchMedia("(max-width: 640px)").matches) return 1;
    return 2;
};

export default function OrganizationsGrid() {
    const [columnCount, setColumnCount] = useState(getColumnCount);
    const [openOrganizations, setOpenOrganizations] = useState<Set<string>>(() => new Set());

    useEffect(() => {
        const updateColumnCount = () => setColumnCount(getColumnCount());
        window.addEventListener("resize", updateColumnCount);
        return () => window.removeEventListener("resize", updateColumnCount);
    }, []);

    const organizationColumns = Array.from({length: columnCount}, () => [] as Organization[]);
    const organizationsPerColumn = Math.ceil(organizations.length / columnCount);

    organizations.forEach((organization, index) => {
        const columnIndex = Math.min(Math.floor(index / organizationsPerColumn), columnCount - 1);
        organizationColumns[columnIndex].push(organization);
    });

    const toggleOrganizationEvents = (organizationId: string) => {
        setOpenOrganizations(current => {
            const updated = new Set(current);
            if (updated.has(organizationId)) updated.delete(organizationId);
            else updated.add(organizationId);
            return updated;
        });
    };

    return (
        <div className={styles.grid}>
            {organizationColumns.map((column, columnIndex) => (
                <div className={styles.column} key={columnIndex}>
                    {column.map(organization => (
                        <OrganizationBox
                            organization={organization}
                            eventsOpen={openOrganizations.has(organization.id)}
                            onToggleEvents={() => toggleOrganizationEvents(organization.id)}
                            key={organization.id}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

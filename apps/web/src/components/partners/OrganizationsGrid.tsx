import {organizations} from "../../lib/partners/organizations";
import OrganizationBox from "./OrganizationBox";
import styles from "./partners.module.css";

export default function OrganizationsGrid() {
    return (
        <div className={styles.grid}>
            {organizations.map(organization => {
                return (
                    <OrganizationBox organization={organization} key={organization.name}/>
                );
            })}
        </div>
    );
}

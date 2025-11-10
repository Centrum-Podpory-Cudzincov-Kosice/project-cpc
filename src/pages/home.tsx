import ContactsMaps from "../components/home/contact-maps";
import HeroSection from "../components/home/hero-section";
import ServisSection from "../components/home/services";
import AboutKosice from "../components/home/about-kosice";
import AboutUsBrief from "../components/home/about-us-brief";
import Steps from "../components/home/steps";

export default function Home() {
    return (
        <main className={"Home"}>
            <HeroSection/>
            <AboutUsBrief/>
            <ServisSection/>
            <AboutKosice/>
            <Steps/>
            <ContactsMaps />
        </main>
    );
}
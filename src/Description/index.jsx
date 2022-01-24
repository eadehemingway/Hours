import { Section, SectionHeader } from "../shared_styles";
import { Nav } from "../Nav";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../App";

export function Description() {
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.HOME);
    const handleNext = () => navigate(ROUTES.INPUT_CATEGORIES);

    return (
        <Section>
            <Nav
                show_back={true}
                show_next={true}
                handleBack={handleBack}
                handleNext={handleNext}
            />

            <SectionHeader>DESCRIPTION</SectionHeader>
        </Section>
    );
}
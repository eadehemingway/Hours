import { SectionHeaderGrand, Section } from "../shared_styles";
import { Nav } from "../Nav";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../App";

export function Homepage() {
    const navigate = useNavigate();
    const handleNext = () => navigate(ROUTES.DESCRIPTION);
    return (
        <Section>
            <Nav
                show_back={false}
                show_next={true}
                handleNext={handleNext}
            />

            <SectionHeaderGrand>HOURS</SectionHeaderGrand>
        </Section>
    );
}
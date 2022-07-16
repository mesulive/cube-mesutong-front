import SectionBox from "./SectionBox";
import CubePriceContainer from "../../containers/CubePriceContainer";
import DetailSettingContainer from "../../containers/DetailSettingContainer";
import ResultLayoutContainer from "../../containers/ResultLayoutContainer";

function Home() {
    return (
        <>
            <SectionBox title="큐브 가격">
                <CubePriceContainer/>
            </SectionBox>
            <SectionBox title="세부 설정">
                <DetailSettingContainer/>
            </SectionBox>
            <ResultLayoutContainer/>
        </>
    );
}

export default Home;

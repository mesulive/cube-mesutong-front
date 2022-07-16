import React from 'react';
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";

const cx = classNames.bind(styles);

const Guide = () => {
    return (
        <div className={cx("container", "content")}>
            <h1>큐브매수통이란?</h1>
            <p>
                <a href="https://maplestory.nexon.com/" target="_blank" rel="noreferrer">메이플스토리</a> 장비 아이템의 잠재능력을 원하는
                수치로 설정하기 위해 소모되는 큐브 개수의 기댓값과, 그 확률을 계산하는 웹서비스입니다. <a
                href="https://maplestory.nexon.com/Guide/OtherProbability/cube/red" target="_blank" rel="noreferrer">한국
                메이플스토리에 공개된 큐브 확률표</a>에 게시된 확률을 사용합니다.
            </p>
            <h1>사용법</h1>
            <p>
                <video autoPlay loop muted playsInline>
                    <source src="price.mp4"/>
                </video>
                먼저 큐브 가격과 단위를 설정합니다. 수동으로 입력할 수도 있고, 프리셋 버튼으로 자신의 서버에 맞는 값으로 설정할 수도 있습니다.
                <br/>
                일반 서버 프리셋의 경우, 캐시샵에서 판매되는 큐브는 10개 세트 기준으로 설정됩니다.
                <br/><br/><br/>
                <video autoPlay loop muted playsInline>
                    <source src="detail.mp4"/>
                </video>
                이후 세부 설정을 진행합니다. 현재 장비의 상태와 목표, 잠재능력 타입을 설정합니다.
                <br/><br/>
                목표 설정이 "옵션 띄우기"일 경우, 추가로 옵션 설정을 진행합니다. 각 옵션 세트 당 뽑고자 하는 옵션 3줄의 총합을 입력해야 합니다. 옵션 설정 라벨 옆 물음표 위에 마우스를 올리거나
                클릭하면 예시가 나오니 참고하시길 바랍니다.
                <br/>
                옵션 세트가 여러개일 경우, 해당 옵션 세트들 중 하나를 만족하면 결과에 포함됩니다.
                <br/><br/>
                마지막으로 상위 N%의 값을 설정하고 계산하기 버튼을 누르면 결과창이 표시됩니다. 결과창에는 각 큐브의 1회 시행 시 목표 달성 확률과, 들어가는 비용의 기댓값과 상위 N%의 값이
                표시됩니다. 여기서 비용은 사용되는 큐브의 가격과 장비 레벨에 따른 잠재능력 재설정 비용을 모두 포함합니다.
            </p>
            <h1>유의 사항</h1>
            <p>
                <ul>
                    <li>2021년 8월 12일 업데이트에 포함된 큐브 확률 조정이 반영되어 있습니다.</li>
                    <li>"몬스터 방어율 무시 %" 옵션은 합산할 때 메이플스토리의 몬스터 방어율 무시 계산 공식을 적용합니다.</li>
                    <li>올스탯은 주스탯에 포함됩니다.</li>
                    <li>일부 최대 한 줄 또는 두 줄에서만 나타나는 옵션에 따른 확률 조정 로직이 반영되어 있습니다.</li>
                </ul>
            </p>
        </div>
    );
};

export default Guide;
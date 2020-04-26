import React, { Component } from "react";
import { Link } from "react-router-dom"
import styles from "./styles.module.scss"
import Image2 from 'assets/images/image-02.png'
import Image3 from 'assets/images/image-03.png'
import Image4 from 'assets/images/image-04.png'
import Image5 from 'assets/images/image-05.png'
import Image6 from 'assets/images/09.png'
import Image7 from 'assets/images/10.png'
import Image8 from 'assets/images/11.png'

class Features extends Component {
    render(){
        return (
            <div className={styles.features}>
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <h1>Data Driven Features</h1>
                        <Link to="/contact" className={styles.subLink}>Contact us</Link>
                    </div>  
                </div>
                <hr className={styles.gradientHrLine} />
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <h4>Digital Marketing</h4>
                        <div className={styles.twoRow}>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image2} alt="" /></div>
                                <h6>멀티채널 광고 자동 생성</h6>
                                <p>클라우드와 구글 시트를 통해 간편하게<br/>생성 / 운영되는 멀티 채널 광고</p>
                            </div>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image3} alt="" /></div>
                                <h6>멀티채널 광고 운영 최적화</h6>
                                <p>실시간 데이터 분석을 통한<br/>광고 비용 최적화 시스템</p>
                            </div>
                        </div>
                        <div className={styles.twoRow}>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image4} alt="" /></div>
                                <h6>소셜 미디어 마케팅</h6>
                                <p>인스타그램, 유투브 채널 컨텐츠들의 노출 극대화</p>
                            </div>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image5} alt="" /></div>
                                <h6>검색 광고 최적화</h6>
                                <p>키워드 클라우드 자동 생성 시스템을 통한<br/>검색 광고 효율 최적화</p>
                            </div>
                        </div>
                    </div>  
                </div>
                <hr className={styles.gradientHrLine} />
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <h2>Automate Marketing at will</h2>
                        <h5>반복적이거나 시스템이 더 잘할 수 있는 부분은 파노믹스에 맡기고 제품과 전략에 집중하세요.</h5>
                    </div>
                </div>
                <hr className={styles.gradientHrLine} />
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <h4>Data Integration & Connected Apps</h4>
                        <div className={styles.threeRow}>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image6} alt="" /></div>
                                <h6>데이터 통합</h6>
                                <p>구글 애널리틱스, 페이스북 광고 관리자 등<br/>퍼포먼스 분석에 필요한 지표들을<br/>한 곳에서 대시보드로 제공</p>
                            </div>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image7} alt="" /></div>
                                <h6>협업</h6>
                                <p>구글 시트를 통해 협업, 그리고 연결되지 않았던<br/>광고 캠페인과 제품 정보들의 매핑까지!</p>
                            </div>
                            <div className={styles.colDiv}>
                                <div className={styles.imgDiv}><img src={Image8} alt="" /></div>
                                <h6>커뮤니케이션</h6>
                                <p>슬랙을 통해 연동되는 다양한 차트 및<br/>지표들을 통한 협업의 극대화</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Features;
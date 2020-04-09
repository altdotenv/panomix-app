import React, { Component } from "react"
import Loading from "../Loading"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"
import Carousel from "react-material-ui-carousel"
import Image1 from 'assets/images/01.png'
import Image2 from 'assets/images/02.png'
import Image3 from 'assets/images/03.png'
import Image4 from 'assets/images/04.png'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = { isLoading: true }
    }

    componentDidMount(){
        this.setState({ isLoading: false })
    }

    render(){
        return (
            this.state.isLoading ? <Loading /> : 
            <div className={styles.index}>
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <div className={styles.colPartition}>
                            <h1 className={styles.title}>Marketing Growth Mix</h1>
                            <p className={styles.sourceComment}>source ENV/bin/activate</p>
                            <NavLink to="/contact" className={styles.greenRoundTag} >Contact Us</NavLink>
                        </div>
                        <div className={styles.colPartition}>
                            <Carousel className={styles.carouselWrapper}>
                                <div className={styles.carousel}>1</div>
                                <div className={styles.carousel}>2</div>
                                <div className={styles.carousel}>3</div>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <h2>Automate Marketing at will</h2>
                        <h5>반복적이거나 시스템이 더 잘할 수 있는 부분은 파노믹스에 맡기고 제품과 전략에 집중하세요.</h5>
                    </div>
                </div>
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <img src={Image1} alt="social"/>
                        <h3>Connect All Marketing Efforts</h3>
                        <ul>
                            <li>제한적인 리소스</li>
                            <li>복잡한 여러광고 플랫폼, 마케팅툴, 분석툴 등</li>
                            <li>팀간 협업 및 커뮤니케이션의 구조적인 한계</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.partition}>
                    <div className={styles.container}>
                        <div className={styles.threeRow}>
                            <img src={Image2} alt="social"/>
                            <h4>Multi-Channel Marketing</h4>
                            <p>타게팅, 키워드, 광고 세트 등 켐페인에 필요한 모든 세팅을 파노믹스가 구글, 페이스북 등 멀티 채널을 통해 자동 운영 집행합니다.</p>
                        </div>
                        <div className={styles.threeRow}>
                            <img src={Image3} alt="social"/>
                            <h4>Data Integration</h4>
                            <p>구글 시트, 구글 에널리틱스, 페이스북 광고 관리자 등에서의 마게팅 데이터를 통합 분석하여 운영합니다.</p>          
                        </div>
                        <div className={styles.threeRow}>
                            <img src={Image4} alt="social"/>
                            <h4>Reports & Notifications</h4>
                            <p>비지니스에 맞는 광고 지표들을 Redash를 통해 대쉬보드를 제공, 슬랙을 통해 일간, 주간 리포트 및 다양한 알람들을 자동화합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
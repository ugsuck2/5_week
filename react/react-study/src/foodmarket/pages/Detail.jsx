import { useParams,useNavigate } from "react-router";
import {Container,Row,Col,Button,Modal} from 'react-bootstrap'
import { useState,useEffect } from "react";
import './Detail.css'


function Detail({foods}) {

    let {id} = useParams();
    console.log(id);

    // find
    let foodFind = foods.find((food,index)=>{
        return food.id == id;
    } )
    
    console.log(foodFind);

    //------------------------------------------------\
    /*

    useEffect 훅 (Hooks)

    useEffect(실행할함수, 의존성배열)


    useEffect(실행할함수,[]) 빈배열 -> 생성시에만 실행
    useEffect(실행할함수) 모든 로딩될때 실행(생성,update)
    useEffect(실행할함수,[count]) -> conut값이 바뀔때 마다 실행
    useEffect(실행할함수,[a,b,c]) -> a,b,c 중 하나라도 값이 바뀔때마다 실행

    useEffect(실행할함수(){
    return ()=>{ clean up function}}  //upmount  시 실행할 함수
    , 의존성배열)
    */

    useEffect(()=>{
        console.log('useEffect 함수 실행. (의존성배열없음)')
    })  // 의존성배열x -> 매번실행

    useEffect(()=>{
        console.log('useEffect 함수 실행. [] 빈 의존성 배열 의존')
    }, [])   // 빈배열 -> 생성/로딩시 1회 실행

    let [orderCount, setOrderCount] = useState(0);

    let [test, setTest] = useState('');


    useEffect(()=>{
        console.log('useEffect 함수 실행. [ordercount] : ' + orderCount);

        return () =>{  // clean up function
            console.log('useEffect 함수 실행. [ordercount] -> return() 함수 실행');
        }
    },[orderCount])  // 의존성배열있는 orderCount값 -> 참고

    useEffect(()=>{
        console.log('useEffect 함수 실행. [test, orderCount] ');
    } , [test, orderCount])  ; // 의존성배열있는 orderCount값 -> 참고


    let [viewStatus,setViewStatus] = useState(0);

    useEffect(()=>{

        //setTimeout(함수,시간); 일정시간 후에 작동하도록 타이머거는 함수
        setTimeout(()=>{
            setViewStatus('end');
        },300)//0.3초 1000:1초


    },[])

    let [modalShow,setModalShow] = useState(false); // 모달창 표시여부 true | false

    //2초후에 Modal 창 자동으로 닫기

    useEffect(()=>{
        //modalShow state변수값 true -> false

        setTimeout(()=>{
            setModalShow(false);

        },2000)  //2초후 실행
    },[])


    useEffect(()=>{
        //setTimeout 일정시간 후에 작동
        //setInterval 일정시간마다 반복으로 실행
        //비동기방식

        //clearTimeout
        //clearInterval
        const interv = setInterval(()=>{
            console.log('interval')
        },1000)  //1초마다 실행

        //clean up function

        return()=>{
            clearInterval(interv);
        }

    },[orderCount])

    let [soldOut, setSoldOut] = useState(false);


    useEffect(()=>{
        if(foodFind.stockCount === 0) {
            setSoldOut(true);
        } else {
            setSoldOut(false);
        }
    }, [foodFind?.stockCount]);


    //------------------------------------------------------------------------


    //상세보기를 눌렀을때
    //특정 상품의 상세정보를 보여주는 페이지

    // url 주소창 접속 경로 /detail/:id

    // /detail/fd001                 /detail/fd008

    // 상세보기를 누르면 ->  /detail/id값 
    // id값으로 넘어온 값이 무엇이냐? ---> foods 데이터 중에 id가 같은 상품 찾기

    // :id 위치에 있는 값 접근
    

    // id와 같은 id 가진 food 데이터 찾기

    // filter
    // let food = foods.filter((food,index)=>{
    //     return food.id ==id;
    // })

    // console.log(food);

    

    let navigate = useNavigate();

    if( foodFind == undefined || foodFind == null) {
        return(
            <div>
                <h1>존재하지 않는 상품입니다.</h1>
                <h2>잘못된 접근입니다.</h2>
                <Button variant="info" onClick={()=>{
                    navigate('/');
                }}>홈으로 돌아가기</Button>
            </div>
        )
    }

    //-----------------------------------------------------------------
    /*
        스타일 적용

        조건에 따라서 스타일 적용
        가격표시
            1만원 이상 - > 빨간색 금액 표시
            1만원 이하 - > 파란색 금액 표시

        1) js 객체    

        요소에 style 속성에는 js 객체로 설정 가능
        <p style={{color:'red',fontSize:'20px'}}>
        const priceTextStyle = {
        //key : value
        color: foodFind.price >= 10000 ? 'red' : 'blue'}   

        2) js 함수 방식

        const priceTextStyleFunc = (price)=>{
        if(price>=10000) 
            return {color:'red'}
        else
            return {color:'blue'}
        // return(price>=10000 ? 'red' : 'blue')
    }
        <p style={priceTextStyleFunc(foodFind.price)}>{foodFind.price}</p>

        3) css 클래스 연계 사용

        //클래스이름 단일
        <p className={ foodFind.price >= 10000 ? 'price-red' : 'price-blue'}>{foodFind.price}</p>

        //클래스 여러개
        <p className={ 'text-strong ' + (foodFind.price >= 10000 ? 'price-red' : 'price-blue')}>{foodFind.price}</p>
        //배열 구조로 관리시 join함수 활용
        <p className={ ['text-strong ', priceTextClassName ].join(' ') }>{foodFind.price}</p>

        <p className={ `text-strong ${priceTextClassName}` }>{foodFind.price}</p>

        // 백틱문자 활용  `` `` 백틱문자 안에서 js 변수, 수식 활용시 ${} 양식 
        <p className={ `text-strong ${(foodFind.price>=10000 ? 'price-red' : 'price-blue')}` }>{foodFind.price}</p>
        

        
        ['text-strong','price-red'].join(' ')
        >>> text-strong price-red

        [a,b,c].join('-')
        >> a-b-c
        
        4) css class + useState + useEffect 조합 -> 효과 발생
            
        <Container className={"start " + viewStatus}>
        
        let [viewStatus,setViewStatus] = useState(0);

        useEffect(()=>{

        //setTimeout(함수,시간); 일정시간 후에 작동하도록 타이머거는 함수
        setTimeout(()=>{
            setViewStatus('end');
        },300)//0.3초 1000:1초
        },[])

        5) js 객체로 내부에서 스타일 정의 및 사용
        const styles = {
        redStyle : {color:'red'} , 
        blueStyle : {color:'blue'},

        fontBigBold : {
            fontSize : '36px',
            fontWeight : 'bold'
        },

        titleStyle : {
            paddingTop : '30px',
            fontSize : '40px',
            fontWeight : 'bold'
        }
    }
    <h4 style={styles.titleStyle}>{foodFind.title}</h4>
    <p style={styles.fontBigBold}>{foodFind.content}</p>

    */

    //1)
    const priceTextStyle = {
        //key : value
        color: foodFind.price >= 10000 ? 'red' : 'blue'
    }

    //2)
    const priceTextStyleFunc = (price)=>{
        if(price>=10000) 
            return {color:'red'}
        else
            return {color:'blue'}
        // return(price>=10000 ? 'red' : 'blue')
    }

    //3)
    const priceTextClassName = (foodFind.price >= 10000 ? 'price-red' : 'price-blue');

    //5) 
    const styles = {
        redStyle : {color:'red'} , 
        blueStyle : {color:'blue'},

        fontBigBold : {
            fontSize : '36px',
            fontWeight : 'bold'
        },

        titleStyle : {
            paddingTop : '30px',
            fontSize : '40px',
            fontWeight : 'bold'
        }
    }
    


    //--------------------------------------------------------------------
    return(
        <div>
            <Container className={"start " + viewStatus}>
                <Row>
                    <Col md={6}>
                        <img src={import.meta.env.BASE_URL + foodFind.imgPath} style={{width:'100%'}}/>
                    </Col>
                    <Col md={6}>
                        <h4 style={styles.titleStyle}>{foodFind.title}</h4>
                        <p style={styles.fontBigBold}>{foodFind.content}</p>
                        <p style={priceTextStyle}>{foodFind.price}</p>

                        <p className={ foodFind.price >= 10000 ? 'price-red' : 'price-blue'}>{foodFind.price}</p>

                        <p className={ 'text-strong ' + (foodFind.price >= 10000 ? 'price-red' : 'price-blue')}>{foodFind.price}</p>

                        <p className={ ['text-strong ', priceTextClassName ].join(' ') }>{foodFind.price}</p>

                        <p className={ `text-strong ${priceTextClassName}` }>{foodFind.price}</p>

                        <p className={ `text-strong ${(foodFind.price>=10000 ? 'price-red' : 'price-blue')}` }>{foodFind.price}</p>
                        

                        {/* 
                        ['text-strong','price-red'].join(' ')
                        >>> text-strong price-red

                        [a,b,c].join('-')
                        >> a-b-c
                        
                        */}
                        

                        <div>
                            <Button variant="dard" onClick={()=>{
                                setOrderCount(orderCount-1);
                                if(orderCount<=0){
                                    setOrderCount(0)
                                }
                            }}>-</Button>
                            <span>{orderCount}</span>
                            <Button variant="dard" onClick={()=>{
                                setOrderCount(orderCount+1)
                                console.log('onClick() 함수에서 출력' + orderCount)
                                if(orderCount>=foodFind.stockCount) {
                                    setOrderCount(foodFind.stockCount);
                                }
                            }}>+</Button>
                        </div>

                        {
                            soldOut
                            ? <Button variant="primary" disabled>품절</Button>
                            : <Button variant="primary">주문하기</Button>
                        }
                    </Col>
                </Row>

                <Modal
                    show={modalShow}
                    onHide={()=>{ setModalShow(false);} }
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        어서오세요
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>우리 음식 맛있어요.</h4>
                        <p>
                        빨리먹으면 배탈나요. 많이 먹어요.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{ setModalShow(false);}}>Close</Button>
                    </Modal.Footer>
                </Modal>




            </Container>
        </div>
    )

}

export default Detail;
import { useParams,useNavigate } from "react-router";
import {Container,Row,Col,Button,Modal} from 'react-bootstrap'
import { useState,useEffect } from "react";
import './Detail.css'


function Detail({foods}) {

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

    let [modalShow,setModalShow] = useState(true); // 모달창 표시여부 true | false

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



    //------------------------------------------------------------------------


    //상세보기를 눌렀을때
    //특정 상품의 상세정보를 보여주는 페이지

    // url 주소창 접속 경로 /detail/:id

    // /detail/fd001                 /detail/fd008

    // 상세보기를 누르면 ->  /detail/id값 
    // id값으로 넘어온 값이 무엇이냐? ---> foods 데이터 중에 id가 같은 상품 찾기

    // :id 위치에 있는 값 접근
    let {id} = useParams();
    console.log(id);

    // id와 같은 id 가진 food 데이터 찾기

    // filter
    // let food = foods.filter((food,index)=>{
    //     return food.id ==id;
    // })

    // console.log(food);

    // find
    let foodFind = foods.find((food,index)=>{
        return food.id == id;
    } )
    
    console.log(foodFind);

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


    return(
        <div>
            <Container className={"start " + viewStatus}>
                <Row>
                    <Col md={6}>
                        <img src={import.meta.env.BASE_URL + foodFind.imgPath} style={{width:'100%'}}/>
                    </Col>
                    <Col md={6}>
                        <h4>{foodFind.title}</h4>
                        <p>{foodFind.content}</p>
                        <p>{foodFind.price}</p>

                        <div>
                            <Button variant="dard" onClick={()=>{
                                setOrderCount(orderCount-1)
                            }}>-</Button>
                            <span>{orderCount}</span>
                            <Button variant="dard" onClick={()=>{
                                setOrderCount(orderCount+1)
                                console.log('onClick() 함수에서 출력' + orderCount)
                            }}>+</Button>
                        </div>

                        <Button variant="primary">주문하기</Button>
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


function CustomerService() {

    /*
        localStorage

        브라우저에 간단한 데이터 저장 및 활용 용도의 저장소

        읽기 localStorage.getItem(키)
        쓰기 localStorage.setItem(키,값)
        삭제 localStorage.removeItem(키)

    */


    localStorage.setItem('key11','value11');
    localStorage.setItem('hello','안녕하세요');

    console.log(localStorage.getItem('msg'));
    localStorage.removeItem('abc');

    /*
        localStorage 는 단순 텍스트 형태로 저장가능.

        복잡한 배열이나 객체 단위로 저장하려면?
        JSON 포맷 활용.

        js 객체 -> JSON 포멧의 문자열로 변환 -> 문자열 저장
        JSON.stringify()

        읽기 -> JSON 포맷의 문자열 -> js객체 형태로 변환
        JSON.parse()
    */

    let tempFood = {
        d: "fd004",
        title: "팬케이크",
        content: "메이플 시럽 잔뜩",
        price: 8000,
        imgPath: "images/food4.jpg"
    }

    localStorage.setItem('tempFood',tempFood); //[object Object]
    localStorage.setItem('tempFood',JSON.stringify(tempFood));

    let tempFoodJson = localStorage.getItem('tempFood')
    console.log(tempFoodJson);
    console.log(tempFoodJson.title);

    let tempFoodObject = JSON.parse(tempFoodJson);
    console.log(tempFoodObject);
    console.log(tempFoodObject.title);

    return (
        <div>
            <h1>고객 서비스 페이지</h1>
            <h2>정성을 다해 모시겠습니다</h2>
        </div>
    )
}   

export default CustomerService;
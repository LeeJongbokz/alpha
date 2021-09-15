export const getUserBalance = async(req,res) => {

    console.log('Im here');
    console.log('global KRWbalance는 다음과 같습니다.');
    console.log(global.KRWbalance);
    res.status(200).send({"KRWbalance": global.KRWbalance});
}
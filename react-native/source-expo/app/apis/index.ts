
const serverURL = `http://192.168.35.87:3000`

export const getUserBalance = async () => {

  console.log('getUserbalance 실행')

  try{
    const result = await fetch(`${serverURL}/api/user/balance`);
    const resultJson = await result.json();
    return resultJson;
  }catch(error){
    console.error(error);
    return error;
  }
}
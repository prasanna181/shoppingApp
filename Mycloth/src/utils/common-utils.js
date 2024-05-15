export const getAccessToken=()=>{
   const data=localStorage.getItem('refreshToken');
   if(data){
 return data;
   }
  return 0;
}



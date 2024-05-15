// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'loading....',
        message:"data is being loaded,please wait"
    },
    success:{
        title:'Success',
        message:"data successfully loaded"

    },
    responseFailure:{    
        title:'Error',
        message:'An error occured while fetching response from the server . Please try again '
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Error',
        message:"unable to connect with the server. Please check internet connectivity and try again later"
    }
 }



 
 // API service call
// SAMPLE REQUEST
//  NEED SERVICE CALL={url:'/',mehtod:'POST/GET/PUT/DELETE', params:true/false,query:true/false}
export const SERVICE_URLS={
    userMen:{url:'/Men',method:'POST'}
}
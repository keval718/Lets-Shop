function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        //the request was made and server responsded with a astatus code apart from 200 range
        errorMsg = error.response.data;
        console.log("error respond", errorMsg);
        // for cloudnary image upload
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message
        }

    } else if (error.request) {
        //The request was made but no response received\
        errorMsg = error.request;
        console.log("error request", errorMsg);


    } else {
        //something else happened in making the request that triggered an error
        errorMsg = error.message;
        console.log("error message", errorMsg)

    }
    displayError(errorMsg);

}
export default catchErrors
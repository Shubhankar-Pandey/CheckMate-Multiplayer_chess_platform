import axios from "axios";
import { me_endpont } from "./endpoints";




export const meCall = async() => {
    try{
        const response = await axios.get(me_endpont, {withCredentials : true});
        return response.data;
    }
    catch(error){
        return null;
    }
}
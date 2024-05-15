
import {createContext,useState} from 'react'
export const DataContext=createContext(null);

const DataProvider=({children})=>{

const [product,setproduct]=useState([]);

const [recentView,setRecentView]=useState([]);
const [backgroundColor, setBackgorundColor] = useState({
  background: "rgb(255 255 255)",
  color: "black",
});
  const [isAuthenticated, isUserAuthenticated] =useState(false);
  const [UserData, setUserData] = useState({});


return(
    <div>
    <DataContext.Provider value={{
        product,
        setproduct,backgroundColor,setBackgorundColor,recentView,setRecentView,isAuthenticated, isUserAuthenticated,UserData, setUserData
    }}>
  
         {children}
    </DataContext.Provider>
    </div>
)

}

export default DataProvider;

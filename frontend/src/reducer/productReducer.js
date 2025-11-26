

export const productReducer = (state,action)=>{
      switch(action.type){
         case 'SET_PRODUCTS' :{
          return {...state, products:action.payload,loading:false}
         }

        case 'SET_CATEGORY':
        return { ...state, category: action.payload, page: 1 };
         case 'SET_LOADING':{
          return {...state,loading:action.payload}
         }
         case 'SET_TOTAL_COUNT':{ 
                  
            return {...state,totalCount:action.payload}
            }

         case 'SET_SEARCH':
             return { ...state, search: action.payload, page: 1 };
         case 'SET_PAGE':
              return { ...state, page: action.payload };
         case 'SET_FILTERS':
             return { ...state, ...action.payload, page: 1 };

        case 'SET_SORT' : return {...state, sort:action.payload}
         case 'RESET_FILTER' : return {...state, category:[],sort:'',page: 1}
            default :{
          return state
         }
      }
}
import {spendingTabs} from "./spendingTabs.enum" 
const TransSpendingEnum = (value: string | spendingTabs ) =>{
   switch(value){
      case "currentMonth": return "This month"
      case "beforeMonth": return "Last month"
      case "beforeSecondMonth": return "Last two month"
   }
}
export{
   TransSpendingEnum
}
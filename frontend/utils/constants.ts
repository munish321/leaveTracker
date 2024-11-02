export interface SideBarProps {
  icon?:string,
   label:string,
   url?:string
}
export const sideBarList:Array<SideBarProps>= [
  {
   icon:'fa-solid fa-house',
   label:'Home',
   url:'/'
  },
  {
   icon:'fa-solid fa-house',
   label:'Atendence & Leave',
   url:'/leave'
  },
  {
   icon:'fa-solid fa-user',
   label:'Admin Dashboard',
   url:'/dashboard/admin'
  },
]
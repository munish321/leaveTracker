import { BreadCrumb } from 'primereact/breadcrumb';
import { useRouter,usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IList{
    label:string,
    url:string
}
export const BreadComponent=()=>{
    const router = useRouter()
    const paths = usePathname()
    const [breadCrumbList, setBreadCrumbList] = useState<IList[]>([]);
    console.log(router)
    console.log('paths',paths)
    useEffect(() => {
        const getBreadCrumbList = () => {
            const response = paths.split('/').filter(Boolean).map((path, index) => {
                return{
                    label: path.charAt(0).toUpperCase() + path.slice(1),
                    url: `/${paths.split('/').filter(Boolean).slice(0, index + 1).join('/')}`
                }
            });
            setBreadCrumbList(response);
         }
         getBreadCrumbList()
    },[])
    
    const items =  breadCrumbList;
    const home = { icon: 'pi pi-home',url: '/' }

    return (
        <BreadCrumb model={items} home={home} />
    )
}

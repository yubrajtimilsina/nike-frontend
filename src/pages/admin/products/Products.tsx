import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/adminProductSlice";
import ProductTable from "./components/PoductTable";


function AdminProduct(){
   const dispatch = useAppDispatch()
   const {products} = useAppSelector((store)=>store.adminProducts)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[])
    return(

        <AdminLayout>
            <ProductTable products={products} />
        </AdminLayout>
    )
}

export default AdminProduct
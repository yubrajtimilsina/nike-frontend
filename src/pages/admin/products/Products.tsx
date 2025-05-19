import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/adminProductSlice";
import ProductModal from "./components/ProductModal";


function AdminProduct(){
   const dispatch = useAppDispatch()
   const {products} = useAppSelector((store)=>store.adminProducts)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[])
    return(

        <AdminLayout>
            <ProductModal products={products} />
        </AdminLayout>
    )
}

export default AdminProduct
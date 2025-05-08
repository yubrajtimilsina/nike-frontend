import ProductFilters from "../product/components/ProductFilters";

const MenPage = () => {

  // const dispatch=useAppDispatch();
  // const { products } = useAppSelector((store) => store.products);

  // const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  // useEffect(()=>{
  //   dispatch(fetchProducts())
  // },[])
  // useEffect(() => {
  //   setFilteredProducts(products); // default show all
  // }, [products]);

  // const handleFilterChange = (brand: string) => {
  //   const filtered =
  //     brand === "All"
  //       ? products
  //       : products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());

  //   setFilteredProducts(filtered);
  // };
  // console.log("filteredProducts", filteredProducts);
  // console.log("products", products);

  return (
    <>
          <ProductFilters product={product} />

         


        </>
  );
};

export default MenPage;

import { Container} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductCard from './ProductCard';
import PageinationComp from './Pageination';

const Products = ()=>{

    const [data,setData] = useState([]);
    const [filter,setFilter] = useState(data);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(12);
    const [loading,setLoading] = useState(false);
    let componentMounted = true;

    useEffect(()=>{
        const getProducts = async () =>{
            setLoading(true);
            const response = await fetch("https://api.escuelajs.co/api/v1/products");
            if(componentMounted){
                setData( await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }
            return () =>{
                componentMounted = false;
            }
        }
        getProducts();
    },[])

    const Loading = () =>{
        return(
            <Container className="text-center">
                <p>Loading....</p>
                <Skeleton count ={5}/>
            </Container>
        );
    }

    const filterCategory = (cat) =>{
        const updatedList = data.filter((product) => product.category.name === cat);
        setFilter(updatedList);
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filter.slice(firstPostIndex,lastPostIndex);
    

    const DisplayProductCards = () => {
        return (
            <div id="discover">
                <div className="text-center">
                    <button className="m-2" onClick = {()=>setFilter(data)}> ALL</button>
                    <button className="m-2" onClick = {()=>filterCategory("Shoes")}> Shoes</button>
                    <button className="m-2" onClick = {()=> filterCategory("Others")}> Others</button>
                    <button className="m-2" onClick = {()=> filterCategory("Electronics")}> Electronics</button>
                </div>
                <ProductCard filter={currentPosts}/>
                <PageinationComp totalPosts={filter.length}
                 postsPerPage = {postsPerPage}
                 setCurrentPage = {setCurrentPage}
                 currentPage = {currentPage}/>
            </div>
        );
    };


    return (
        <div>
            {loading ? <Loading/> : <DisplayProductCards/>}
        </div>
    );
}

export default Products;
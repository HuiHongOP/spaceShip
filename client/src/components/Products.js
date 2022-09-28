import { Container} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductCard from './ProductCard';
import PageinationComp from './Pageination';
import {CheckBox, Collapse} from "antd";

const Products = ()=>{

    const [data,setData] = useState([]);
    const [filter,setFilter] = useState(data);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(12);
    const [loading,setLoading] = useState(false);
    const [allCategories,setAllCategories] = useState([]);
    let componentMounted = true;


    // Helps to get through all the categories and make them unqiue
    // const getCategories = (datas) =>{
    //     let newCategories = [];
    //     for(let i = 0; i<datas.length;i++){
    //         newCategories.push(datas[i].category.name);
    //         console.log(datas[i].category.name);
    //     }
    //     const uniqueCategories = [...new Set(newCategories)];
    //     setAllCategories(uniqueCategories);
    //     console.log(allCategories);
    // }



    useEffect(()=>{
        const getProducts = async () =>{
            setLoading(true);
            const response = await fetch("https://api.escuelajs.co/api/v1/products");
            if(componentMounted){
                setData( await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                // getCategories(data);
                // console.log("Hello World");
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
        console.log(typeof(cat));
        const updatedList = data.filter((product) => product.category.name === cat);
        setFilter(updatedList);
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filter.slice(firstPostIndex,lastPostIndex);
    

    const DisplayProductCards = () => {
        return (
            <div id="">
                <div className="text-center">
                    <h2>Fliter By category</h2>
                    <button className="m-2" onClick = {()=>setFilter(data)}> ALL</button>
                    {/* {allCategories.map((category,index)=>(
                        <button className="m-2" onClick = {()=>filterCategory({category})}>{category}</button>
                    ))}
                    <p>empty</p> */}
                    {/* <div>
                    </div> */}
                    <button className="m-2" onClick = {()=>filterCategory("Shoes")}> Shoes</button>
                    <button className="m-2" onClick = {()=> filterCategory("Others")}> Others</button>
                    <button className="m-2" onClick = {()=> filterCategory("Electronics")}> Electronics</button>
                </div>
                <div>
                    <ProductCard filter={currentPosts}/>
                    <PageinationComp totalPosts={filter.length}
                    postsPerPage = {postsPerPage}
                    setCurrentPage = {setCurrentPage}
                    currentPage = {currentPage}/>
                </div>
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
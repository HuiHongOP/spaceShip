import { useState,useEffect,useCallback } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductCard from './ProductCard';
import PageinationComp from './Pageination';
import {CheckBox, Collapse} from "antd";
import { useSelector, useDispatch } from 'react-redux';
import {storeProducts} from "../actions/index";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Products = ()=>{

    /*   
        useState is a hook function that allows to have state variables with setState variable that changes/update the current state
        within the component.

        @data: uses to store the fetched api data.
        @filterProducts: store all the display products on the screen with filtered products depending on the feature/category selected.
        @currentPage: display the pagination "current page".
        @postsPerPage: allows up to 12 product cards per age.
        @loading: keep in track of fetching the api process and when it's done.
        @filterFeatures: allow users to filter by features/categories on the product. It holds the categories/features
        @checkState: Keep in track on the state of each "Check Box" on filter

    */
    const [data,setData] = useState([]);
    const [filterProducts,setFilterProducts] = useState(data);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(12);
    const [loading,setLoading] = useState(false);
    const [filterFeatures, setfilterFeatures] = useState({filters: new Set()});
    const [checkState, setCheckedState] = useState([]);


    /*
        Event handler function that will allow user to manipluate the features/categories on the products
        @data: fetched api data
        @index: current index of the feature/category
        @checkState: current "checked" state on the category


    */
    const handleFilterChange = useCallback( (data,index,checkState) => event => {

        //Checking the previous state of the filterFeatures and filter by the checked category and 
        setfilterFeatures(previousState => {
            let filters = new Set(previousState.filters);
            console.log("This is filters",filters);
            let products = data;
            if (event.target.checked) {
            filters.add(event.target.value); // add in the checked feature/category
            } else {
            filters.delete(event.target.value) //delete the filter feature/category
            }
            
            //Check the size of the filters by category/feature and filter the products based on those selected categories only
            if (filters.size) {
            products = products.filter(product => {
                return filters.has(product.category.name);
            })
            }
            console.log(products);
            console.log("this is the after filters", filters);
            //Set the current filterProducts to a new product data for display
            setFilterProducts(products);
            return {
            filters,
            }
    })

        /*

            Check the previousState for the "checked box or non-checked box" and return the opposite when user click on that opinion
        */
        setCheckedState(previousState=>{
            if(previousState.length === 0){
                const unique = [...new Set(data.map(product => product.category.name))];
                const newArray = new Array(unique.length).fill(false);
                let updateCheckedState = newArray.map((item,indx) =>
                    indx === index ? !item : item
                );
                return updateCheckedState;
            }
            else{
                let updateCheckedState = checkState.map((item,indx) =>
                indx === index ? !item : item
                );
                return updateCheckedState;
            }
    },);

    }, [setfilterFeatures]);




    /* 
        @data: api data that is being fetched.
        A function that will help to make an array with filled false values depending on the unique number of categories.
        @setCheckedState: set all the checkedState to false because it's going to help with the checkbox input with "checked" or
        "nonchecked".
    */
    const uniqueCategory = (data) =>{
        const unique = [...new Set(data.map(product => product.category.name))];
        setCheckedState(new Array(unique.length).fill(false));
    }


    /*
        ---Runs only once after initial render---.
        Fetch the api from an URL.
        @setData: the JSON data that being fetched.
        @setFilterProducts: The current data/json/product that would be using to display products.
        @setLoading: Setting the loading to be either still in fetching process or finished loading process.
        @uniqueCategory: a function that passed fetched api data.
    */
    let componentMounted = true;
    useEffect(()=>{
        const getProducts = async () =>{
            setLoading(true);
            const response = await fetch("https://api.escuelajs.co/api/v1/products");
            if(componentMounted){
                setData( await response.clone().json());
                setFilterProducts(await response.json());
                setLoading(false);
                uniqueCategory(data);
            }
            return () =>{
                componentMounted = false;
            }
        }
        getProducts();
    },[]);


    /* 
        This a function that load up the skeletons of loading screen while the api data is in the process of fetching
    */
    const Loading = () =>{
        return(
            <Container className="text-center">
                <p>Loading....</p>
                <Skeleton count ={5}/>
            </Container>
        );
    }


    //Keep in track of the pages that the user is on
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filterProducts.slice(firstPostIndex,lastPostIndex);
    


    /* 
        Render the ProductsCard, pages, and categories into the website
    */
    const DisplayProductCards = () => {
        return (
            <Container fluid id="">
                <div className="text-center m-5 left-feature">
                    <h2>Fliter By category</h2>
                    {
                         /*Allow the data to load up first and if the data is loaded up
                           Then make a new unique list for category.name on the api call
                           Then map out the unique category.name as filter feature
                         */
                    data && checkState && ([...new Set(data.map(product => product.category.name))].map( (product,index) =>(
                        <li key ={product}>
                            <label>
                                <input type ="checkbox" value ={product} onChange = {handleFilterChange(data,index,checkState)} checked = {checkState[index]}/>
                                 {product}
                            </label>
                        </li>
                    )))}
    
                </div>
                    <div className = "text-center right-products">
                        <h2>Check out the products! </h2>
                        <ProductCard filter={currentPosts}/>
                        <PageinationComp totalPosts={filterProducts.length}
                        postsPerPage = {postsPerPage}
                        setCurrentPage = {setCurrentPage}
                        currentPage = {currentPage}/>
                </div>
            </Container>
        );
    };


    return (
        <div>
            {/* Check whether if the api url is in process of fetching or else display all the products into screen */}
            {loading ? <Loading/> : <DisplayProductCards/>}
        </div>
    );
}

export default Products;
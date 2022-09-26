import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PageinationComp = ({totalPosts, postsPerPage, setCurrentPage,currentPage}) => {
    let pages = [];

    // Skip it to the very first page of the products
    if(currentPage > 1 ){
        pages.push(<Pagination.First key="first" onClick = {()=>setCurrentPage(1)} />);
    }

    //Going back to previous by 1 page
    if(currentPage > 1){
        pages.push(<Pagination.Prev key="prev" onClick = {()=>setCurrentPage(currentPage-1)} />);
    }

    /*
        Loop through the number of pages
        Keep the page number for the first and last page.
        Any number within 2 indexes of the current page will be allowed to click
    */
    let pageOutOfRange;
    for( let x = 1; x <=Math.ceil(totalPosts/postsPerPage); x++){

        const lastIndexPage = Math.ceil(totalPosts/postsPerPage);
        const withinTwoIndexes = Math.abs(x-currentPage);
        if(x === 1 || x === lastIndexPage || withinTwoIndexes <=2){
            pages.push(<Pagination.Item key={x} onClick = {()=>setCurrentPage(x)} 
            active = {x ===currentPage}>{x}</Pagination.Item>);
            pageOutOfRange = false;
        }
        else if(!pageOutOfRange){
            pages.push(<Pagination.Ellipsis  key={x} />);
            pageOutOfRange = true;
        }
    }

    // If the @currentPage isn't the last page it will allow to click for very next page
    if(currentPage < Math.ceil(totalPosts/postsPerPage)){
        pages.push(<Pagination.Next key = "next" onClick = {()=> setCurrentPage(currentPage+1)}/>);
    }

    //Skip all the way to the very last page of the products
    if(currentPage < Math.ceil(totalPosts/postsPerPage)){
        pages.push(<Pagination.Last key = "last" onClick = {()=> setCurrentPage(Math.ceil(totalPosts/postsPerPage))}/>);
    }
    return (
        <div>
            <Pagination className="justify-content-md-center mt-4 mt-5">
                {pages}
            </Pagination>
            <br/><br/><br/>
        </div>
    );
};

export default PageinationComp;